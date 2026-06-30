import { useEffect, useMemo, useRef } from 'react';

function createStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2.2 + 0.8,
    delay: Math.random() * 4,
    twinkleDuration: Math.random() * 2 + 1.5,
    driftDuration: Math.random() * 25 + 20,
    driftDelay: Math.random() * 15,
  }));
}

const nebulas = [
  {
    top: '5%',
    left: '15%',
    size: '55vw',
    color: 'rgba(138, 43, 226, 0.22)',
    duration: 12,
  },
  {
    top: '55%',
    left: '65%',
    size: '45vw',
    color: 'rgba(218, 112, 214, 0.20)',
    duration: 15,
  },
  {
    top: '35%',
    left: '45%',
    size: '60vw',
    color: 'rgba(75, 0, 130, 0.18)',
    duration: 18,
  },
];

const isMobile =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;
const STAR_COUNT = isMobile ? 28 : 45;

export default function Starfield() {
  const containerRef = useRef(null);

  // 当星空滚出视口时暂停动画，避免后台持续占用 GPU
  useEffect(() => {
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

  return (
    <div
      ref={containerRef}
      className="starfield absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ '--starfield-paused': 'running' }}
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
            animationDelay: `${s.delay}s, ${s.driftDelay}s`,
            animationDuration: `${s.twinkleDuration}s, ${s.driftDuration}s`,
          }}
        />
      ))}
    </div>
  );
}
