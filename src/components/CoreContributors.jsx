import { User } from 'lucide-react';
import Glass from './Glass';
import { contributors } from '../data/contributors';

export default function CoreContributors() {
  const hasLink = (url) => url && url.trim() !== '' && url.trim() !== '#';

  return (
    <section id="contributors" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-5xl font-title text-center mb-4 gradient-text transition-all duration-300 ease-out">
          核心贡献者
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-12 max-w-2xl mx-auto transition-all duration-300 ease-out">
          感谢每一位为刻晴生日会付出心血的成员。
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ease-out">
          {contributors.map(({ name, role, avatar, bilibili }, i) => {
            const linked = hasLink(bilibili);
            const card = (
              <Glass
                key={i}
                className={`p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300 group ${
                  linked ? 'cursor-pointer' : ''
                }`}
                cornerRadius={16}
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-keqing-purple/30 bg-keqing-purple/10 dark:bg-keqing-purple/20 flex items-center justify-center">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={name || '贡献者头像'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <User size={32} className="text-keqing-purple/60" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1 transition-all duration-300 ease-out">
                  {name || '昵称待补充'}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  {role || '职位待补充'}
                </p>
              </Glass>
            );

            return linked ? (
              <a
                key={i}
                href={bilibili}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {card}
              </a>
            ) : (
              <div key={i}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
