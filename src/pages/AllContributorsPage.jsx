import { Link } from 'react-router-dom';
import { User, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import OptimizedImage from '../components/OptimizedImage';
import { contributorsPage } from '../config/content.config';
import { themeConfig } from '../config/theme.config';

const pageEnterEnabled =
  themeConfig.effects.animations.pageEnter.status === 'enable';

function MemberItem({ member, delay }) {
  const { name, role, avatar, bilibili } = member;
  const linked = bilibili && bilibili.trim() !== '' && bilibili.trim() !== '#';

  const inner = (
    <div
      className={`reveal flex items-center gap-3 py-2.5 group ${linked ? 'cursor-pointer' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="w-10 h-10 shrink-0 rounded-full overflow-hidden border border-keqing-purple/30 bg-keqing-purple/10 flex items-center justify-center">
        {avatar ? (
          <OptimizedImage
            src={avatar}
            alt={name || '贡献者头像'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <User size={18} className="text-keqing-purple/60" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block font-bold truncate transition-colors ${
            linked ? 'group-hover:text-keqing-purple' : ''
          }`}
        >
          {name || '昵称待补充'}
        </span>
        {role && (
          <span className="block text-xs md:text-sm text-[var(--text-secondary)] truncate">
            {role}
          </span>
        )}
      </span>
    </div>
  );

  return linked ? (
    <a href={bilibili} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function AllContributorsPage() {
  const { title, description, members } = contributorsPage;
  const validMembers = (members || []).filter(
    (m) => m.name?.trim() || m.role?.trim()
  );

  // 成员滚动渐入：进入视口时添加 is-visible
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300 ${pageEnterEnabled ? 'animate-fade-in-up' : ''}`}>
      <main className="pt-28 pb-20 md:pt-36 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-16">
            <Link
              to="/"
              className="link-glow inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-keqing-purple transition-colors mb-6 rounded-lg px-3 py-1.5 -ml-3"
            >
              <ArrowLeft size={18} />
              返回首页
            </Link>
            <h1 className="text-3xl md:text-5xl font-title gradient-text mb-4">
              {title}
            </h1>
            <p className="text-[var(--text-secondary)] max-w-2xl">
              {description}
            </p>
          </div>

          {validMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
              {validMembers.map((member, i) => (
                <MemberItem
                  key={member.name + i}
                  member={member}
                  delay={Math.min(i * 40, 320)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-[var(--text-secondary)]">
              暂无贡献者信息，请在 src/config/content.config.js 的 contributorsPage.members 中添加。
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
