import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { MusicProvider } from './context/MusicContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MusicPlayerWidget from './components/MusicPlayerWidget';

const AllContributorsPage = lazy(() => import('./pages/AllContributorsPage'));

function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--page-bg)]">
      <div className="w-10 h-10 border-4 border-keqing-purple border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MusicProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/contributors"
                element={
                  <Suspense fallback={<PageSpinner />}>
                    <AllContributorsPage />
                  </Suspense>
                }
              />
            </Routes>
            <MusicPlayerWidget />
          </div>
        </BrowserRouter>
      </MusicProvider>
    </ThemeProvider>
  );
}

export default App;
