import { useEffect, useMemo, useRef } from 'react';
import { themeConfig } from '../config/theme';

const starfieldConfig = themeConfig.effects.starfield;
const heroColors = themeConfig.home.hero;

const isMobile =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;
const STAR_COUNT = isMobile
  ? starfieldConfig.starCount.mobile
  : starfieldConfig.starCount.desktop;

function createStars(count) {
  const { min, max } = starfieldConfig.starSize;
  const twinkle = starfieldConfig.twinkle;
  const drift = starfieldConfig.drift;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * (max - min) + min,
    delay: Math.random() * twinkle.delayMax,
    twinkleDuration: Math.random() * (twinkle.durationMax - twinkle.durationMin) + twinkle.durationMin,
    driftDuration: Math.random() * (drift.durationMax - drift.durationMin) + drift.durationMin,
    driftDelay: Math.random() * (drift.durationMin * 0.75),
  }));
}

const nebulas = starfieldConfig.nebula.items.map((item, index) => ({
  top: item.top,
  left: item.left,
  size: item.size,
  color: heroColors[`nebula${index + 1}`],
  duration: item.duration,
}));

export default function Starfield() {
  const containerRef = useRef(null);

  // 当星空滚出视口时暂停动画，避免后台持续占用 GPU
  useEffect(() => {
    if (starfieldConfig.status === 'disable') return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? true;
        container.style.setProperty(
          '--starfield-paused',
          visible ? 'running' : 'paused'
        );
      },
      { threshold: 0, rootMargin: '100px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const stars = useMemo(() => createStars(STAR_COUNT), []);

  if (starfieldConfig.status === 'disable') return null;

  return (
    <div
      ref={containerRef}
      className="starfield absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ '--starfield-paused': 'running', background: 'var(--home-hero-background)' }}
    >
      {nebulas.map((n, i) => (
        <div
          key={i}
          className="starfield-nebula absolute rounded-full"
          style={{
            top: n.top,
            left: n.left,
            width: n.size,
            height: n.size,
            background: `radial-gradient(circle, ${n.color} 0%, transparent 70%)`,
            animationDuration: `${n.duration}s`,
          }}
        />
      ))}
      {stars.map((s) => (
        <div
          key={s.id}
          className="starfield-star absolute"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: heroColors.starColor,
            boxShadow: `0 0 5px ${heroColors.starGlow}`,
            animationDelay: `${s.delay}s, ${s.driftDelay}s`,
            animationDuration: `${s.twinkleDuration}s, ${s.driftDuration}s`,
          }}
        />
      ))}
    </div>
  );
}
