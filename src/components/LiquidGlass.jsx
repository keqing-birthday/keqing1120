import '../styles/LiquidGlass.css';

/**
 * Liquid Glass（液态玻璃）卡片容器
 * 使用纯 CSS 实现跨浏览器稳定的磨砂玻璃效果：
 * - backdrop-filter: blur() 作为底层模糊
 * - 渐变高光 + 内阴影模拟玻璃折射与边缘
 * - 不依赖 SVG feDisplacementMap / mask-composite，避免部分浏览器渲染异常
 */
export default function LiquidGlass({
  children,
  className = '',
  cornerRadius = 26,
  // blur 不传时不写 --lg-blur，模糊半径由 theme.config.js 的 effects.glassBlur 控制
  blur,
  edge = 5,
  ...props
}) {
  return (
    <div
      className={['liquid-glass', className].filter(Boolean).join(' ')}
      style={{
        '--lg-radius': `${cornerRadius}px`,
        ...(blur != null ? { '--lg-blur': `${blur}px` } : null),
        '--lg-edge': `${edge}px`,
      }}
      {...props}
    >
      <div className="liquid-glass-blur" />
      <div className="liquid-glass-sheen" />
      <div className="liquid-glass-edge" />
      <div className="liquid-glass-reflect" />
      <div className="liquid-glass-content">{children}</div>
    </div>
  );
}
