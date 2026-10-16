/**
 * CSS 玻璃拟态卡片组件
 * 使用 backdrop-filter 实现 Apple 风格的毛玻璃效果
 * 模糊半径由 theme.config.js 的 effects.glassBlur 控制
 */
export default function Glass({ children, className = '', cornerRadius = 24, ...props }) {
  return (
    <div
      className={['glass-card', className].filter(Boolean).join(' ')}
      style={{ borderRadius: cornerRadius }}
      {...props}
    >
      {children}
    </div>
  );
}
