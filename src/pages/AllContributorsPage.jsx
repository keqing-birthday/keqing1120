import { Link } from 'react-router-dom';
import { User, ArrowLeft } from 'lucide-react';
import Glass from '../components/Glass';
import { allContributors } from '../data/allContributors';

export default function AllContributorsPage() {
  const hasLink = (url) => url && url.trim() !== '' && url.trim() !== '#';

  const validContributors = allContributors.filter(
    (c) => c.name?.trim() || c.role?.trim()
  );

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300">
      <main className="pt-28 pb-20 md:pt-36 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-10 md:mb-14">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-keqing-purple transition-colors mb-6"
            >
              <ArrowLeft size={18} />
              返回首页
            </Link>
            <h1 className="text-3xl md:text-5xl font-title gradient-text mb-4">
              全部贡献者名单
            </h1>
            <p className="text-[var(--text-secondary)] max-w-2xl">
              感谢每一位为刻晴生日会付出心血的朋友，排名不分先后。
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {validContributors.map(({ name, role, avatar, bilibili }, i) => {
              const linked = hasLink(bilibili);
              const card = (
                <Glass
                  key={i}
                  className={`p-4 md:p-5 text-center hover:transform hover:-translate-y-1.5 transition-all duration-300 group ${
                    linked ? 'cursor-pointer' : ''
                  }`}
                  cornerRadius={16}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden border-2 border-keqing-purple/30 bg-keqing-purple/10 dark:bg-keqing-purple/20 flex items-center justify-center">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={name || '贡献者头像'}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <User size={28} className="text-keqing-purple/60" />
                    )}
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-1 truncate">
                    {name || '昵称待补充'}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--text-secondary)] line-clamp-2">
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

          {validContributors.length === 0 && (
            <div className="text-center py-20 text-[var(--text-secondary)]">
              暂无贡献者信息，请在 src/data/contributors.js 中添加。
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
