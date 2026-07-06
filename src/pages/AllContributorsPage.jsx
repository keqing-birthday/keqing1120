import { Link } from 'react-router-dom';
import { User, ArrowLeft } from 'lucide-react';
import LiquidGlass from '../components/LiquidGlass';
import OptimizedImage from '../components/OptimizedImage';
import { allContributors } from '../data/allContributors';
import { themeConfig } from '../config/theme';

const pageEnterEnabled =
  themeConfig.effects.animations.pageEnter.status === 'enable';

export default function AllContributorsPage() {
  const hasLink = (url) => url && url.trim() !== '' && url.trim() !== '#';

  const validContributors = allContributors.filter(
    (c) => c.name?.trim() || c.role?.trim()
  );

  return (
    <div className={`min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300 ${pageEnterEnabled ? 'animate-fade-in-up' : ''}`}>
      <main className="pt-28 pb-20 md:pt-36 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-10 md:mb-14">
            <Link
              to="/"
              className="link-glow inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-keqing-purple transition-colors mb-6 rounded-lg px-3 py-1.5 -ml-3"
            >
              <ArrowLeft size={18} />
              返回首页
            </Link>
            <h1 className="text-3xl md:text-5xl font-title gradient-text mb-4">
              全部贡献者名单
            </h1>
            <p className="text-[var(--text-secondary)] max-w-2xl">
              感谢每一位为刻晴生日会付出心血的老师，排名不分先后。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {validContributors.map(({ name, role, avatar, bilibili }, i) => {
              const linked = hasLink(bilibili);
              const card = (
                <LiquidGlass
                  key={i}
                  className={`p-4 md:p-5 text-center transition-all duration-300 group glass-card-hover ${
                    linked ? 'cursor-pointer' : ''
                  }`}
                  cornerRadius={16}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden border-2 border-keqing-purple/30 bg-keqing-purple/10 dark:bg-keqing-purple/20 flex items-center justify-center">
                    {avatar ? (
                      <OptimizedImage
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
                </LiquidGlass>
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
