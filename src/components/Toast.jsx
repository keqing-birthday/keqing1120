import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const DURATION = 2500;
const EXIT_DURATION = 350;

export default function Toast({ message, type = 'success', visible, trigger, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!visible) return;

    // 用 setTimeout 把进入动画推到下一帧，避免 StrictMode/HMR 把 rAF 冲掉
    const enter = setTimeout(() => setShow(true), 0);
    const dismiss = setTimeout(() => setShow(false), DURATION);
    const close = setTimeout(() => onClose(), DURATION + EXIT_DURATION);

    return () => {
      clearTimeout(enter);
      clearTimeout(dismiss);
      clearTimeout(close);
    };
  }, [visible, trigger, onClose]);

  if (!visible || typeof document === 'undefined') return null;

  const isSuccess = type === 'success';
  const title = isSuccess ? '复制成功' : '复制失败';

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, EXIT_DURATION);
  };

  return createPortal(
    <div
      className="fixed top-4 right-4 z-[9999] w-80"
      style={{
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
        opacity: show ? 1 : 0,
        transform: show ? 'translateX(0)' : 'translateX(100%)',
        pointerEvents: show ? 'auto' : 'none',
      }}
      role="status"
      aria-live="polite"
    >
      <div
        className={[
          'relative overflow-hidden rounded-2xl p-4',
          'border border-[var(--border-color)]',
          'bg-[var(--card-bg)] text-[var(--text-primary)]',
          'shadow-2xl backdrop-blur-xl',
          'flex items-start gap-3',
        ].join(' ')}
      >
        {/* 左侧主题色图标 */}
        <div
          className={[
            'shrink-0 p-2 rounded-full',
            isSuccess
              ? 'bg-[var(--accent-purple)]/15 text-[var(--accent-purple)]'
              : 'bg-red-500/15 text-red-500',
          ].join(' ')}
        >
          {isSuccess ? <Check size={18} strokeWidth={2.5} /> : <X size={18} strokeWidth={2.5} />}
        </div>

        {/* 标题 + 内容 */}
        <div className="flex-1 min-w-0 pt-0.5">
          <h4 className="text-sm font-semibold leading-tight">{title}</h4>
          <p className="mt-0.5 text-sm opacity-85 leading-snug">{message}</p>
        </div>

        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          className="shrink-0 p-1 rounded-full text-[var(--text-secondary)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="关闭通知"
        >
          <X size={14} />
        </button>

        {/* 底部自动消失进度条 */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-current opacity-20">
          <div
            className="h-full bg-current origin-left"
            style={{
              animation: `toast-progress ${DURATION}ms linear forwards`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes toast-progress {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </div>,
    document.body
  );
}
