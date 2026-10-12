import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import ContentParticles from '../components/ContentParticles';
import CoreContributors from '../components/CoreContributors';
import RecruitPanel from '../components/RecruitPanel';
import ContactPanel from '../components/ContactPanel';
import Footer from '../components/Footer';
import { homeSections } from '../config/content.config';
import { themeConfig } from '../config/theme.config';

const pageEnterEnabled =
  themeConfig.effects.animations.pageEnter.status === 'enable';

const sectionComponents = {
  hero: HeroSection,
  coreContributors: CoreContributors,
  recruit: RecruitPanel,
  contact: ContactPanel,
};

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;
    if (scrollTo) {
      const element = document.getElementById(scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const enabledSections = homeSections.filter((section) => section.status === 'enable');
  const heroSection = enabledSections.find((section) => section.id === 'hero');
  const contentSections = enabledSections.filter((section) => section.id !== 'hero');

  const renderSection = (section) => {
    const Component = sectionComponents[section.id];
    if (!Component) return null;
    return <Component key={section.id} {...section} />;
  };

  return (
    <div className={pageEnterEnabled ? 'animate-fade-in-up' : ''}>
      <main>
        {heroSection && renderSection(heroSection)}
        {contentSections.length > 0 && (
          <div className="relative">
            <ContentParticles />
            <div className="relative z-10">
              {contentSections.map(renderSection)}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
