import FooterParticles from './FooterParticles';
import { footerConfig } from '../config/content.config';
import { siteConfig } from '../config/site.config';
import pkg from '../../package.json';

export default function Footer() {
  const isEnabled = (section) => section?.status === 'enable';

  return (
    <footer className="relative py-12 bg-[var(--page-bg)] border-t border-[var(--border-color)] overflow-hidden transition-colors duration-300">
      <FooterParticles />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        {isEnabled(footerConfig.brand) && (
          <p className="mb-2">
            <span className="font-title text-2xl gradient-text">{siteConfig.siteName}</span>
          </p>
        )}

        {isEnabled(footerConfig.tagline) && (
          <p className="text-[var(--text-secondary)] mb-2">{footerConfig.tagline.text}</p>
        )}

        {isEnabled(footerConfig.description) && (
          <p className="text-sm text-[var(--text-secondary)] mb-4">{footerConfig.description.text}</p>
        )}

        {isEnabled(footerConfig.credits) && (
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            由{siteConfig.groupName}制作 · QQ群：{siteConfig.qqGroup}
          </p>
        )}

        <div className="text-xs text-[var(--text-secondary)] space-y-1">
          {isEnabled(footerConfig.copyright) && (
            <p>{footerConfig.copyright.text}</p>
          )}

          {isEnabled(footerConfig.version) && (
            <p>版本号 v{pkg.version}</p>
          )}

          {siteConfig.icp?.text && (
            <p>
              <a
                href={siteConfig.icp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent-purple)] transition-colors"
              >
                {siteConfig.icp.text}
              </a>
            </p>
          )}

          {isEnabled(footerConfig.disclaimers) &&
            (footerConfig.disclaimers.items ?? []).map((text, i) => (
              <p key={i}>{text}</p>
            ))}
        </div>
      </div>
    </footer>
  );
}
