import { useMusic } from '../context/useMusic';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic } from 'lucide-react';
import Glass from './Glass';

export default function MusicPlayerCard({ compact = false }) {
  const {
    currentTrack, isPlaying, currentTime, duration, volume,
    toggle, next, prev, seek, setVolume
  } = useMusic();

  if (!currentTrack) return null;

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (compact) {
    return (
      <Glass className="p-3 w-64 sm:w-72" cornerRadius={16}>
        <div className="flex items-center gap-3">
          {/* 封面 */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-keqing-purple/10">
            {currentTrack.cover ? (
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ListMusic size={24} className="text-keqing-purple/50" />
              </div>
            )}
          </div>

          {/* 信息 + 控制 */}
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm truncate">{currentTrack.title}</div>
            <div className="text-xs text-[var(--text-secondary)] truncate">{currentTrack.artist}</div>
            <div className="flex items-center gap-1 mt-1">
              <button
                onClick={prev}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="上一首"
              >
                <SkipBack size={14} />
              </button>
              <button
                onClick={toggle}
                aria-label={isPlaying ? '暂停' : '播放'}
                className="p-1.5 bg-keqing-purple hover:bg-purple-600 rounded-full transition-colors text-white"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
              </button>
              <button
                onClick={next}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="下一首"
              >
                <SkipForward size={14} />
              </button>
            </div>
          </div>
        </div>
      </Glass>
    );
  }

  return (
    <Glass className="p-4 w-full" cornerRadius={16}>
      {/* 封面 */}
      <div className="relative rounded-xl overflow-hidden mb-4 bg-keqing-purple/10 aspect-square">
        {currentTrack.cover ? (
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className={`w-full h-full object-cover ${isPlaying ? 'animate-pulse' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ListMusic size={48} className="text-keqing-purple/50" />
          </div>
        )}
        {isPlaying && (
          <div className="absolute bottom-2 right-2 flex gap-0.5 items-end h-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-keqing-purple rounded-full music-bar"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: `${0.6 + i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 信息 */}
      <div className="mb-4">
        <div className="font-bold text-lg truncate">{currentTrack.title}</div>
        <div className="text-sm text-[var(--text-secondary)] truncate">{currentTrack.artist}</div>
      </div>

      {/* 进度条 */}
      <div className="mb-4">
        <div
          className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full cursor-pointer overflow-hidden"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            seek(percent * duration);
          }}
        >
          <div
            className="h-full bg-keqing-purple rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={prev}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="上一首"
        >
          <SkipBack size={18} />
        </button>
        <button
          onClick={toggle}
          aria-label={isPlaying ? '暂停' : '播放'}
          className="p-3 bg-keqing-purple hover:bg-purple-600 rounded-full transition-colors text-white"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>
        <button
          onClick={next}
          className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="下一首"
        >
          <SkipForward size={18} />
        </button>
      </div>

      {/* 音量 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
          className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label={volume === 0 ? '取消静音' : '静音'}
        >
          {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-1 accent-keqing-purple"
        />
      </div>
    </Glass>
  );
}
