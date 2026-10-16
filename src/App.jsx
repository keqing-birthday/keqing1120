import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
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

// 路由切换时回到顶部（React Router 不会自动重置滚动位置）
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-6xl font-title gradient-text">404</h1>
      <p className="text-[var(--text-secondary)]">页面不存在或已被移动</p>
      <Link
        to="/"
        className="px-4 py-2 rounded-lg text-keqing-purple bg-keqing-purple/10 hover:bg-keqing-purple/20 transition-colors"
      >
        返回首页
      </Link>
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MusicProvider>
        <BrowserRouter>
          <ScrollToTop />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MusicPlayerWidget />
          </div>
        </BrowserRouter>
      </MusicProvider>
    </ThemeProvider>
  );
}

export default App;
