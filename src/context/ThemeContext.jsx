import { useEffect, useState } from 'react';
import { ThemeContext } from './theme-context';
import { themeConfig } from '../config/theme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('keqing-theme') || 'system'
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // 应用主题预设（liquid-glass / frosted-glass / opaque / minimal）
    root.dataset.themePreset = themeConfig.preset;

    // 根据 effects 配置设置 CSS 微交互开关
    const animations = themeConfig.effects.animations;
    const toggleAttr = (name, disabled) => {
      if (disabled) {
        root.setAttribute(name, '');
      } else {
        root.removeAttribute(name);
      }
    };
    toggleAttr('data-disable-button-glow', animations.buttonGlow.status === 'disable');
    toggleAttr('data-disable-card-hover', animations.cardHover.status === 'disable');
    toggleAttr('data-disable-icon-hover', animations.iconHover.status === 'disable');
    toggleAttr('data-disable-link-glow', animations.linkGlow.status === 'disable');
    toggleAttr('data-disable-music-visualizer', animations.musicVisualizer.status === 'disable');

    localStorage.setItem('keqing-theme', theme);
  }, [theme]);

  // 监听系统主题变化
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
