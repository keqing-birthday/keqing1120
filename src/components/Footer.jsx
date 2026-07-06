import FooterParticles from './FooterParticles';
import { footerConfig } from '../config/footer';

export default function Footer() {
  const isEnabled = (section) => section?.status === 'enable';

  return (
    <footer className="relative py-12 bg-[var(--page-bg)] border-t border-[var(--border-color)] overflow-hidden transition-colors duration-300">
      <FooterParticles />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
        {isEnabled(footerConfig.brand) && (
          <p className="mb-2">
            <span className="font-title text-2xl gradient-text">{footerConfig.brand.title}</span>
          </p>
        )}

        {isEnabled(footerConfig.tagline) && (
          <p className="text-[var(--text-secondary)] mb-2">{footerConfig.tagline.text}</p>
        )}

        {isEnabled(footerConfig.description) && (
          <p className="text-sm text-[var(--text-secondary)] mb-4">{footerConfig.description.text}</p>
        )}

        {isEnabled(footerConfig.credits) && (
          <p className="text-sm text-[var(--text-secondary)] mb-6">{footerConfig.credits.text}</p>
        )}

        <div className="text-xs text-[var(--text-secondary)] space-y-1">
          {isEnabled(footerConfig.copyright) && (
            <p>{footerConfig.copyright.text}</p>
          )}

          {isEnabled(footerConfig.version) && (
            <p>{footerConfig.version.text}</p>
          )}

          {isEnabled(footerConfig.icp) && (
            <p>
              <a
                href={footerConfig.icp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent-purple)] transition-colors"
              >
                {footerConfig.icp.text}
              </a>
            </p>
          )}

          {isEnabled(footerConfig.disclaimers) &&
            footerConfig.disclaimers.items.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
        </div>
      </div>
    </footer>
  );
}
