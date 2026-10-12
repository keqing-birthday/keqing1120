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

const contentConfig = themeConfig.effects.contentParticles;
const particleColors = themeConfig.home.contentParticles;

const isMobile =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;

const PARTICLE_COUNT = isMobile
  ? contentConfig.particleCount.mobile
  : contentConfig.particleCount.desktop;
const MIST_COUNT = isMobile
  ? contentConfig.mistCount.mobile
  : contentConfig.mistCount.desktop;
const ENABLE_TRAIL = contentConfig.enableTrail && !isMobile;
const ENABLE_LIGHTNING = contentConfig.enableLightning && !isMobile;
const MAX_DPR_MOBILE = contentConfig.maxDprMobile;

export default function ContentParticles() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const systemDark = useSyncExternalStore(subscribe, getSystemDark, getServerSnapshot);
  const isDark = theme === 'dark' || (theme === 'system' && systemDark);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId = null;
    let particles = [];
    let mists = [];
    let isVisible = false;
    let resizeRaf = null;
    const ln = contentConfig.lightning;
    let lightning = null;
    let lightningTimer = Math.floor(
      Math.random() * (ln.initialTimerMax - ln.initialTimerMin) + ln.initialTimerMin
    );

    const resize = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = null;
        const dpr = isMobile
          ? Math.min(window.devicePixelRatio || 1, MAX_DPR_MOBILE)
          : window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
    };

    const createLightParticle = (initial = false) => {
      const rect = canvas.getBoundingClientRect();
      const colors = particleColors.light;
      const petal = contentConfig.petal;
      return {
        x: Math.random() * rect.width,
        y: initial
          ? Math.random() * (rect.height + 80) - 40
          : -Math.random() * 60 - 15,
        size: Math.random() * (petal.sizeMax - petal.sizeMin) + petal.sizeMin,
        speedY: Math.random() * (petal.speedYMax - petal.speedYMin) + petal.speedYMin,
        speedX: (Math.random() - 0.5) * petal.speedXSpread * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * petal.rotationSpeedSpread * 2,
        opacity: Math.random() * (petal.opacityMax - petal.opacityMin) + petal.opacityMin,
        color: colors[Math.floor(Math.random() * colors.length)],
        swayFrequency: Math.random() * (petal.swayFrequencyMax - petal.swayFrequencyMin) + petal.swayFrequencyMin,
        phase: Math.random() * Math.PI * 2,
        trail: [],
        trailLength: ENABLE_TRAIL
          ? Math.floor(Math.random() * (petal.trailLengthMax - petal.trailLengthMin) + petal.trailLengthMin)
          : 0,
      };
    };

    const createDarkParticle = (initial = false) => {
      const rect = canvas.getBoundingClientRect();
      const colors = particleColors.dark;
      const dot = contentConfig.darkDot;
      return {
        x: Math.random() * rect.width,
        y: initial
          ? Math.random() * (rect.height + 80) - 40
          : rect.height + Math.random() * 40 + 10,
        size: Math.random() * (dot.sizeMax - dot.sizeMin) + dot.sizeMin,
        speedY: Math.random() * (dot.speedYMax - dot.speedYMin) + dot.speedYMin,
        speedX: (Math.random() - 0.5) * dot.speedXSpread * 2,
        opacity: Math.random() * (dot.opacityMax - dot.opacityMin) + dot.opacityMin,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    const createDarkMist = () => {
      const rect = canvas.getBoundingClientRect();
      const colors = particleColors.mist;
      const mist = contentConfig.mist;
      return {
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * (mist.sizeMax - mist.sizeMin) + mist.sizeMin,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * mist.speedXSpread * 2,
        speedY: (Math.random() - 0.5) * mist.speedYSpread * 2,
      };
    };

    const drawPetal = (p) => {
      // faint purple trail behind the blossom
      if (ENABLE_TRAIL && p.trail.length > 1) {
        ctx.save();
        const start = p.trail[0];
        const gradient = ctx.createLinearGradient(start.x, start.y, p.x, p.y);
        gradient.addColorStop(0, 'rgba(216, 160, 255, 0)');
        gradient.addColorStop(1, 'rgba(216, 160, 255, 0.32)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.size * 0.45;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = p.opacity * 0.75;
        ctx.beginPath();
        p.trail.forEach((point, idx) => {
          if (idx === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.stroke();
        ctx.restore();
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = isMobile ? 6 : 14;
      ctx.shadowColor = 'rgba(255, 105, 180, 0.55)';

      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 5) * i);
        ctx.beginPath();
        ctx.ellipse(0, -p.size * 0.78, p.size * 0.3, p.size * 0.78, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 240, 200, 0.85)';
      ctx.fill();

      ctx.restore();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const drawDot = (p, rect) => {
      let alpha = p.opacity;
      if (p.y > rect.height - 20) {
        alpha *= Math.max(0, (rect.height + 50 - p.y) / 70);
      } else if (p.y < 40) {
        alpha *= Math.max(0, (p.y + 10) / 50);
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = isMobile ? p.size * 2 : p.size * 5;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawMist = (m, rect) => {
      const gradient = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.size);
      gradient.addColorStop(0, m.color);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      m.x += m.speedX;
      m.y += m.speedY;

      if (m.x < -m.size) m.x = rect.width + m.size;
      if (m.x > rect.width + m.size) m.x = -m.size;
      if (m.y < -m.size) m.y = rect.height + m.size;
      if (m.y > rect.height + m.size) m.y = -m.size;
    };

    const buildBolt = (x1, y1, x2, y2, displacement, depth) => {
      if (depth <= 0) {
        return [
          { x: x1, y: y1 },
          { x: x2, y: y2 },
        ];
      }

      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy) || 1;
      const offset = (Math.random() - 0.5) * displacement;
      const midX = mx + (-dy / len) * offset;
      const midY = my + (dx / len) * offset;

      const left = buildBolt(x1, y1, midX, midY, displacement * 0.55, depth - 1);
      const right = buildBolt(midX, midY, x2, y2, displacement * 0.55, depth - 1);
      return [...left, ...right.slice(1)];
    };

    const createLightning = (rect) => {
      const ln = contentConfig.lightning;
      const startX = Math.random() * rect.width;
      const endX = Math.random() * rect.width;
      const mainBolt = buildBolt(startX, -40, endX, rect.height + 40, ln.mainDisplacement, ln.mainDepth);

      const bolts = [mainBolt];
      const branchCount = Math.floor(
        Math.random() * (ln.branchCountMax - ln.branchCountMin) + ln.branchCountMin
      );
      for (let i = 0; i < branchCount; i++) {
        const baseBolt = bolts[Math.floor(Math.random() * bolts.length)];
        const baseIdx = Math.floor(Math.random() * (baseBolt.length - 4)) + 2;
        const base = baseBolt[baseIdx];
        const angle = Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
        const branchLen = rect.height * (0.25 + Math.random() * 0.35);
        const bx2 = base.x + Math.cos(angle) * branchLen;
        const by2 = base.y + Math.sin(angle) * branchLen;
        bolts.push(buildBolt(base.x, base.y, bx2, by2, ln.branchDisplacement, ln.branchDepth));
      }

      return {
        bolts,
        age: 0,
        maxAge: Math.floor(Math.random() * (ln.maxAgeMax - ln.maxAgeMin) + ln.maxAgeMin),
        flash: Math.random() * 0.03 + 0.015,
      };
    };

    const drawBolt = (points) => {
      if (points.length < 2) return;

      ctx.beginPath();
      points.forEach((pt, idx) => {
        if (idx === 0) {
          ctx.moveTo(pt.x, pt.y);
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      });

      // wide purple glow
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.18)';
      ctx.lineWidth = 32;
      ctx.stroke();

      // inner glow
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
      ctx.lineWidth = 12;
      ctx.stroke();

      // hot core
      ctx.strokeStyle = 'rgba(245, 243, 255, 0.95)';
      ctx.lineWidth = 1.6;
      ctx.stroke();
    };

    const drawLightning = (rect, alpha) => {
      if (!lightning || alpha <= 0) return;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = alpha;
      lightning.bolts.forEach((bolt) => drawBolt(bolt));

      // subtle background flash
      ctx.fillStyle = `rgba(168, 85, 247, ${lightning.flash * alpha})`;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.restore();
      ctx.globalAlpha = 1;
    };

    const updateAndDraw = () => {
      if (!isVisible) {
        animationId = null;
        return;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (isDark) {
        mists.forEach((m) => drawMist(m, rect));

        if (ENABLE_LIGHTNING) {
          if (lightning) {
            lightning.age++;
            let alpha;
            if (lightning.age <= 2) {
              alpha = 1;
            } else if (lightning.age === 3 || lightning.age === 5) {
              alpha = 0.35;
            } else if (lightning.age === 4) {
              alpha = 0.9;
            } else {
              alpha = Math.max(0, 1 - (lightning.age - 6) / (lightning.maxAge - 6));
            }
            drawLightning(rect, alpha);
            if (lightning.age >= lightning.maxAge) {
              lightning = null;
            }
          }
          lightningTimer--;
          if (lightningTimer <= 0) {
            lightning = createLightning(rect);
            lightningTimer = Math.floor(
              Math.random() * (ln.recurrenceTimerMax - ln.recurrenceTimerMin) + ln.recurrenceTimerMin
            );
          }
        }

        particles.forEach((p, index) => {
          p.y -= p.speedY;
          p.x += p.speedX + Math.sin(p.y * 0.01) * 0.1;

          if (p.y < -10) {
            particles[index] = createDarkParticle();
            return;
          }

          drawDot(p, rect);
        });
      } else {
        particles.forEach((p, index) => {
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(p.y * p.swayFrequency + p.phase) * 0.3;
          p.rotation += p.rotationSpeed;

          if (ENABLE_TRAIL) {
            p.trail.push({ x: p.x, y: p.y });
            if (p.trail.length > p.trailLength) {
              p.trail.shift();
            }
          }

          if (p.y > rect.height + 40) {
            particles[index] = createLightParticle();
            return;
          }

          drawPetal(p);
        });
      }

      animationId = requestAnimationFrame(updateAndDraw);
    };

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        isDark ? createDarkParticle(true) : createLightParticle(true)
      );
      mists = isDark ? Array.from({ length: MIST_COUNT }, createDarkMist) : [];
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        isVisible = visible;
        if (visible && !animationId) {
          updateAndDraw();
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

  if (contentConfig.status === 'disable') return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
