import { ThemeProvider } from './context/ThemeContext';
import { MusicProvider } from './context/MusicContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CoreContributors from './components/CoreContributors';
import RecruitPanel from './components/RecruitPanel';
import ContactPanel from './components/ContactPanel';
import Footer from './components/Footer';
import MusicPlayerWidget from './components/MusicPlayerWidget';

function App() {
  return (
    <ThemeProvider>
      <MusicProvider>
        <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300">
          <Navbar />
          <main>
            <HeroSection />
            <CoreContributors />
            <RecruitPanel />
            <ContactPanel />
          </main>
          <Footer />
          <MusicPlayerWidget />
        </div>
      </MusicProvider>
    </ThemeProvider>
  );
}

export default App;
