import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MusicProvider } from './context/MusicContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AllContributorsPage from './pages/AllContributorsPage';
import MusicPlayerWidget from './components/MusicPlayerWidget';

function App() {
  return (
    <ThemeProvider>
      <MusicProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contributors" element={<AllContributorsPage />} />
            </Routes>
            <MusicPlayerWidget />
          </div>
        </BrowserRouter>
      </MusicProvider>
    </ThemeProvider>
  );
}

export default App;
