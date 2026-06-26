/**
 * 图片组件：保持与原生 img 一致的普通图片渲染。
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      {...props}
    />
  );
}
