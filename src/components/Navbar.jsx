import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, X, Music, Play, Pause } from 'lucide-react';
import { useMusic } from '../context/useMusic';
import MusicPlayerCard from './MusicPlayerCard';
import Glass from './Glass';
import OptimizedImage from './OptimizedImage';
import BilibiliIcon from './icons/BilibiliIcon';

const navLinks = [
  { id: 'home', label: '首页', to: '/' },
  { id: 'recruit', label: '招募信息', to: '/#recruit' },
  { id: 'contact', label: '联系方式', to: '/#contact' },
];

const rightNavLinks = [
  { id: 'contributors', label: '贡献者', to: '/contributors' },
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
  const location = useLocation();
  const navigate = useNavigate();

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
    setIsMobileMenuOpen(false);

    if (id === 'home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
                  <OptimizedImage
                    src="/favicon.png"
                    alt="刻晴生日会"
                    className="w-8 h-8 object-contain flex-shrink-0 rounded-md"
                    loading="eager"
                    width={32}
                    height={32}
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
                  {navLinks.map(({ id, label, to }) => {
                    const isRoute = to && !to.startsWith('/#');
                    const active = location.pathname === to;
                    const className = `px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      active
                        ? 'text-keqing-purple bg-keqing-purple/10'
                        : 'text-gray-700 dark:text-gray-300 hover:text-keqing-purple dark:hover:text-keqing-purple hover:bg-black/5 dark:hover:bg-white/5'
                    }`;

                    return isRoute ? (
                      <Link key={id} to={to} className={className}>
                        {label}
                      </Link>
                    ) : (
                      <button key={id} onClick={() => scrollToSection(id)} className={className}>
                        {label}
                      </button>
                    );
                  })}
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

                {/* 右侧页面导航 */}
                <div className="hidden md:flex items-center gap-1 pr-2 border-r border-gray-300/50 dark:border-gray-700/50">
                  {rightNavLinks.map(({ id, label, to }) => {
                    const active = location.pathname === to;
                    return (
                      <Link
                        key={id}
                        to={to}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          active
                            ? 'text-keqing-purple bg-keqing-purple/10'
                            : 'text-gray-700 dark:text-gray-300 hover:text-keqing-purple dark:hover:text-keqing-purple hover:bg-black/5 dark:hover:bg-white/5'
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>

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
            {rightNavLinks.map(({ id, label, to }, i) => (
              <Link
                key={id}
                to={to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block w-full text-left py-2 px-4 rounded-lg transition-all duration-200 transform ${
                  isMobileMenuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2'
                }`}
                style={{ transitionDelay: `${i * 25}ms` }}
              >
                {label}
              </Link>
            ))}

            {navLinks.map(({ id, label, to }, i) => {
              const isRoute = to && !to.startsWith('/#');
              const baseClass = `block w-full text-left py-2 px-4 rounded-lg transition-all duration-200 transform ${
                isMobileMenuOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2'
              }`;

              return isRoute ? (
                <Link
                  key={id}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={baseClass}
                  style={{ transitionDelay: `${(rightNavLinks.length + i) * 25}ms` }}
                >
                  {label}
                </Link>
              ) : (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={baseClass}
                  style={{ transitionDelay: `${(rightNavLinks.length + i) * 25}ms` }}
                >
                  {label}
                </button>
              );
            })}

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
                    style={{ transitionDelay: `${(rightNavLinks.length + navLinks.length + i) * 25}ms` }}
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
