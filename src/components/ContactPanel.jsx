import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Glass from './Glass';

export default function ContactPanel() {
  const [copied, setCopied] = useState(false);
  const qqGroup = '231786295';

  const copyQQ = () => {
    navigator.clipboard.writeText(qqGroup).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32">
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
                className="p-2 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
                title="复制群号"
              >
                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>

            {copied && (
              <p className="text-sm text-green-500 mt-2">已复制到剪贴板！</p>
            )}
          </div>
        </Glass>
      </div>
    </section>
  );
}
