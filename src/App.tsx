import { useEffect } from 'react';
import { useStore } from './store';
import AuthPage    from './pages/AuthPage';
import MainLayout  from './pages/MainLayout';
import LandingPage from './pages/LandingPage';
import Storefront  from './pages/Storefront';

function getSeasonalTheme(): string {
  const m = new Date().getMonth();
  const d = new Date().getDate();
  if (m === 10 && d >= 22 && d <= 30) return 'theme-blackfriday';
  if (m >= 5 && m <= 7) return 'theme-summer';
  return '';
}

function ThemeManager() {
  const { settings } = useStore();
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('theme-ramadan','theme-eid','theme-summer','theme-blackfriday','light-theme');
    const manual = (settings as any).design?.seasonalTheme;
    if (manual && manual !== 'auto' && manual !== 'default') { html.classList.add(`theme-${manual}`); return; }
    if (settings.design?.theme === 'light') html.classList.add('light-theme');
    if (!manual || manual === 'auto') { const s = getSeasonalTheme(); if (s) html.classList.add(s); }
  }, [settings.design?.theme, (settings as any).design?.seasonalTheme]);
  return null;
}

export default function App() {
  const { token, currentPage } = useStore();

  // Public storefront
  if (window.location.pathname.startsWith('/store/')) return <Storefront />;
  if (currentPage === 'storefront') return <Storefront />;

  // Check for demo mode (fake token set by demo button)
  const isDemoMode = token === 'demo-token-local';

  return (
    <>
      <ThemeManager />
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob blob-1" /><div className="aurora-blob blob-2" /><div className="aurora-blob blob-3" />
      </div>
      {(!token && !isDemoMode) ? (
        currentPage === 'landing' ? <LandingPage /> : <AuthPage />
      ) : (
        <MainLayout />
      )}
    </>
  );
}
