import { Copy, Check } from 'lucide-react';
import { useCallback, useState } from 'react';
import Glass from './Glass';
import Toast from './Toast';

export default function ContactPanel() {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
    key: 0,
  });
  const qqGroup = '231786295';

  const showToast = (message, type = 'success') => {
    setToast((prev) => ({
      show: true,
      message,
      type,
      key: prev.key + 1,
    }));
  };

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  const copyQQ = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(qqGroup);
      } else {
        // 降级：兼容非安全上下文或不支持 Clipboard API 的浏览器
        const textarea = document.createElement('textarea');
        textarea.value = qqGroup;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!ok) throw new Error('execCommand copy failed');
      }
      setCopied(true);
      showToast(`已复制到剪贴板：${qqGroup}`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('复制失败，请手动选择群号', 'error');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.show}
        trigger={toast.key}
        onClose={hideToast}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <Glass className="p-6 md:p-10 max-w-2xl mx-auto" cornerRadius={24}>
          <h2 className="text-3xl md:text-5xl font-title text-center mb-4 gradient-text">
            联系方式
          </h2>
          <p className="text-center text-[var(--text-secondary)] mb-10">
            加入我们的社区，获取最新资讯和活动信息！
          </p>

          <div className="text-center">
            <div className="text-sm text-[var(--text-secondary)] mb-2">QQ交流群</div>
            <div className="text-2xl font-bold mb-2">玉衡一心定天衡</div>

            <div className="flex items-center justify-center gap-3">
              <div className="text-3xl font-mono font-bold gradient-text">
                {qqGroup}
              </div>
              <button
                onClick={copyQQ}
                className="p-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors btn-glow"
                title="复制群号"
              >
                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </Glass>
      </div>
    </section>
  );
}
