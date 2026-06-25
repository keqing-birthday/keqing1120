import { useEffect, useRef, useSyncExternalStore } from 'react';
import { useTheme } from '../context/useTheme';

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

export default function FooterParticles() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const systemDark = useSyncExternalStore(subscribe, getSystemDark, getServerSnapshot);
  const isDark = theme === 'dark' || (theme === 'system' && systemDark);

  useEffect(() => {
    if (!isDark) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const createParticle = () => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: Math.random() * rect.width,
        y: rect.height + Math.random() * 20,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.8 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.7 ? '#ffd700' : '#da70d6', // 金色或粉色
        life: Math.random() * 100 + 100,
      };
    };

    const initParticles = () => {
      particles = Array.from({ length: 40 }, createParticle);
    };

    const draw = () => {
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

    resize();
    initParticles();
    draw();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
