import { useEffect, useRef, useSyncExternalStore } from 'react';
import { useTheme } from '../context/useTheme';
import { themeConfig } from '../config/theme.config';

function subscribe(callback) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getSystemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getServerSnapshot() {
  return false;
}

const footerConfig = themeConfig.effects.footerParticles;

const isMobile =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;
const PARTICLE_COUNT = isMobile
  ? footerConfig.particleCount.mobile
  : footerConfig.particleCount.desktop;
const MAX_DPR = footerConfig.maxDpr;

// 从主题配置读取页脚粒子颜色
const footerParticleColors = themeConfig.home.footerParticles.colors;

export default function FooterParticles() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const systemDark = useSyncExternalStore(subscribe, getSystemDark, getServerSnapshot);
  const isDark = theme === 'dark' || (theme === 'system' && systemDark);

  useEffect(() => {
    if (!isDark) return;
    if (footerConfig.status === 'disable') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId = null;
    let particles = [];
    let isVisible = false;
    let resizeRaf = null;

    const resize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
    };

    const createParticle = () => {
      const rect = canvas.getBoundingClientRect();
      const cfg = footerConfig;
      return {
        x: Math.random() * rect.width,
        y: rect.height + Math.random() * 20,
        size: Math.random() * (cfg.sizeMax - cfg.sizeMin) + cfg.sizeMin,
        speedY: Math.random() * (cfg.speedYMax - cfg.speedYMin) + cfg.speedYMin,
        speedX: (Math.random() - 0.5) * cfg.speedXSpread * 2,
        opacity: Math.random() * (cfg.opacityMax - cfg.opacityMin) + cfg.opacityMin,
        color: footerParticleColors[Math.floor(Math.random() * footerParticleColors.length)],
        life: Math.random() * (cfg.lifeMax - cfg.lifeMin) + cfg.lifeMin,
      };
    };

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    };

    const draw = () => {
      if (!isVisible) {
        // 必须重置为 null，否则滚回视口后 observer 因 animationId 非 null
        // 永远不会重新启动动画（参照 ContentParticles 的正确写法）
        animationId = null;
        return;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.forEach((p, index) => {
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.02) * 0.2;
        p.life--;

        if (p.y < -10 || p.life <= 0) {
          particles[index] = createParticle();
          return;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (p.life / 200);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        isVisible = visible;
        if (visible && !animationId) {
          draw();
        }
      },
      { threshold: 0 }
    );

    resize();
    initParticles();
    observer.observe(canvas);

    window.addEventListener('resize', resize);

    return () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  if (!isDark || footerConfig.status === 'disable') return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
