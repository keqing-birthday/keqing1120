import { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import { Menu, X, Music, Play, Pause } from 'lucide-react';
import { useMusic } from '../context/useMusic';
import MusicPlayerCard from './MusicPlayerCard';
import Glass from './Glass';
import BilibiliIcon from './icons/BilibiliIcon';

const navLinks = [
  { id: 'home', label: '首页' },
  { id: 'recruit', label: '招募信息' },
  { id: 'contact', label: '联系方式' },
];

// 右侧外链预留区，后续可直接添加
const externalLinks = [
  {
    label: 'B站',
    href: 'https://space.bilibili.com/3632305880959347?spm_id_from=333.1387.follow.user_card.click',
    icon: BilibiliIcon,
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMusicCardOpen, setIsMusicCardOpen] = useState(false);
  const { isPlaying, currentTrack } = useMusic();
  const musicRef = useRef(null);

  // 点击外部关闭音乐卡片
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (musicRef.current && !musicRef.current.contains(e.target)) {
        setIsMusicCardOpen(false);
      }
    };
    if (isMusicCardOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMusicCardOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-3 left-3 right-3 md:top-4 md:left-6 md:right-6 z-50">
        <Glass className="w-full shadow-lg shadow-black/5 dark:shadow-black/20" cornerRadius={16}>
          <div className="max-w-7xl mx-auto px-3 md:px-6">
            <div className="flex items-center justify-between h-14 min-w-0">
              {/* 左侧：Logo + 目录导航 */}
              <div className="flex items-center gap-2 md:gap-6 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src="/favicon.png"
                    alt="刻晴生日会"
                    className="w-8 h-8 object-contain flex-shrink-0 rounded-md"
                  />
                  <span className="font-title text-xl gradient-text whitespace-nowrap truncate hidden [@media(min-width:380px)]:inline">刻晴生日会</span>
                  {isPlaying && (
                    <span className="text-xs text-keqing-purple animate-pulse flex-shrink-0">
                      <Music size={12} className="inline" />
                    </span>
                  )}
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                  {navLinks.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-keqing-purple dark:hover:text-keqing-purple transition-colors rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 右侧：外链 + 主题切换 + 音乐 + 移动端菜单 */}
              <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                {/* 外链预留区 */}
                {externalLinks.length > 0 && (
                  <div className="hidden md:flex items-center gap-1 pr-2 border-r border-gray-300/50 dark:border-gray-700/50">
                    {externalLinks.map(({ label, href, icon: Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex items-center justify-center w-9 h-9 text-gray-700 dark:text-gray-300 hover:text-keqing-purple dark:hover:text-keqing-purple transition-colors rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        {Icon && <Icon size={20} />}
                      </a>
                    ))}
                  </div>
                )}

                <ThemeToggle />

                {/* 音乐按钮 + 弹出卡片 */}
                {currentTrack && (
                  <div className="2xl:hidden relative" ref={musicRef}>
                    <button
                      onClick={() => setIsMusicCardOpen(!isMusicCardOpen)}
                      aria-label="音乐播放器"
                      aria-expanded={isMusicCardOpen}
                      className={`p-2 rounded-full transition-colors ${
                        isMusicCardOpen
                          ? 'bg-keqing-purple text-white'
                          : 'bg-keqing-purple/10 hover:bg-keqing-purple/20 text-keqing-purple'
                      }`}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                    </button>

                    <div
                      className={`absolute right-0 top-full mt-2 z-50 origin-top-right transition-all duration-200 ease-out ${
                        isMusicCardOpen
                          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                      }`}
                    >
                      <Glass cornerRadius={16}>
                        <MusicPlayerCard />
                      </Glass>
                    </div>
                  </div>
                )}

                {/* 移动端菜单按钮 */}
                <button
                  className="md:hidden p-2 relative w-9 h-9 flex items-center justify-center"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
                  aria-expanded={isMobileMenuOpen}
                >
                  <span
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                      isMobileMenuOpen
                        ? 'opacity-0 rotate-90 scale-50'
                        : 'opacity-100 rotate-0 scale-100'
                    }`}
                  >
                    <Menu size={24} />
                  </span>
                  <span
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                      isMobileMenuOpen
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 -rotate-90 scale-50'
                    }`}
                  >
                    <X size={24} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Glass>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[72px] left-3 right-3 z-40 transition-all duration-200 ease-out origin-top ${
          isMobileMenuOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <Glass className="w-full shadow-lg shadow-black/5 dark:shadow-black/20" cornerRadius={16}>
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(({ id, label }, i) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left py-2 px-4 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 transform ${
                  isMobileMenuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2'
                }`}
                style={{ transitionDelay: `${i * 25}ms` }}
              >
                {label}
              </button>
            ))}

            {externalLinks.length > 0 && (
              <div className="pt-3 mt-2 border-t border-gray-300/30 dark:border-gray-700/30 space-y-2">
                {externalLinks.map(({ label, href, icon: Icon }, i) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-center w-full py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 transform ${
                      isMobileMenuOpen
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-2'
                    }`}
                    style={{ transitionDelay: `${(navLinks.length + i) * 25}ms` }}
                  >
                    {Icon && <Icon size={22} />}
                    <span className="sr-only">{label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </Glass>
      </div>
    </>
  );
}
