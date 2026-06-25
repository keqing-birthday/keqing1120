/**
 * CSS 玻璃拟态卡片组件
 * 使用 backdrop-filter 实现 Apple 风格的毛玻璃效果
 */
export default function Glass({ children, className = '', overLight = false, cornerRadius = 24, ...props }) {
  return (
    <div
      className={[
        'glass-card',
        overLight ? 'over-light' : '',
        className,
      ].filter(Boolean).join(' ')}
      style={{ borderRadius: cornerRadius }}
      {...props}
    >
      {children}
    </div>
  );
}
