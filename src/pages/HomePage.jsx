import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import CoreContributors from '../components/CoreContributors';
import RecruitPanel from '../components/RecruitPanel';
import ContactPanel from '../components/ContactPanel';
import Footer from '../components/Footer';

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

  return (
    <div className="animate-fade-in-up">
      <main>
        <HeroSection />
        <CoreContributors />
        <RecruitPanel />
        <ContactPanel />
      </main>
      <Footer />
    </div>
  );
}
