import { useRef, useState, useEffect, useCallback } from 'react';
import { MusicContext } from './music-context';

const defaultPlaylist = [
  {
    id: 1,
    title: "刻晴赋",
    artist: "夏翊然",
    src: "/music/keqing-fu.mp3",
    cover: "/images/music-cover.jpg"
  }
];

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [playlist, setPlaylist] = useState(defaultPlaylist);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('keqing-volume');
    const parsed = parseFloat(saved);
    return Number.isFinite(parsed) ? Math.max(0, Math.min(1, parsed)) : 0.7;
  });
  const [playMode, setPlayMode] = useState(0); // 0: list, 1: single, 2: random

  const currentTrack = playlist[currentIndex];

  // 使用 ref 保存最新状态，避免 useCallback/useEffect 的依赖循环
  const playModeRef = useRef(playMode);
  const playlistRef = useRef(playlist);
  const isPlayingRef = useRef(isPlaying);

  useEffect(() => { playModeRef.current = playMode; }, [playMode]);
  useEffect(() => { playlistRef.current = playlist; }, [playlist]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  // 延迟初始化音频实例：首次播放时才创建，避免首页加载 13MB MP3
  const initAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio();
    audio.id = 'keqing-audio-player';
    audio.preload = 'none';
    audio.style.display = 'none';
    audio.volume = volume;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (playModeRef.current === 1) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setCurrentIndex(prev => {
          if (playModeRef.current === 2) {
            return Math.floor(Math.random() * playlistRef.current.length);
          }
          return (prev + 1) % playlistRef.current.length;
        });
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    document.body.appendChild(audio);
    audioRef.current = audio;
    return audio;
  }, [volume]);

  // 切换音源：只在当前曲目变化且音频已创建时更新 src
  useEffect(() => {
    const track = playlistRef.current[currentIndex];
    if (!track) return;

    const audio = audioRef.current;
    if (!audio) return;

    const currentPath = audio.src ? new URL(audio.src).pathname : '';
    if (currentPath !== track.src) {
      audio.src = track.src;
    }
  }, [currentIndex]);

  const play = useCallback(() => {
    const track = playlistRef.current[currentIndex];
    if (!track) return;

    const audio = initAudio();
    const currentPath = audio.src ? new URL(audio.src).pathname : '';
    if (currentPath !== track.src) {
      audio.src = track.src;
    }

    audio.play().then(() => {
      setIsPlaying(true);
    }).catch((err) => {
      console.log('Audio play failed:', err.name, err.message);
    });
  }, [currentIndex, initAudio]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) audio.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlayingRef.current) pause();
    else play();
  }, [play, pause]);

  const next = useCallback(() => {
    setCurrentIndex(prev => {
      if (playModeRef.current === 2) {
        return Math.floor(Math.random() * playlistRef.current.length);
      }
      return (prev + 1) % playlistRef.current.length;
    });
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + playlistRef.current.length) % playlistRef.current.length);
  }, []);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (audio) audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((v) => {
    setVolumeState(v);
  }, []);

  // 切歌后自动播放
  useEffect(() => {
    if (isPlayingRef.current) {
      play();
    }
  }, [currentIndex, play]);

  useEffect(() => {
    localStorage.setItem('keqing-volume', volume);
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  // 卸载时清理音频元素
  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        if (audio.parentNode) {
          audio.parentNode.removeChild(audio);
        }
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <MusicContext.Provider value={{
      playlist, currentTrack, currentIndex,
      isPlaying, currentTime, duration, volume, playMode,
      play, pause, toggle, next, prev, seek, setVolume, setPlayMode,
      setCurrentIndex, setPlaylist
    }}>
      {children}
    </MusicContext.Provider>
  );
}
