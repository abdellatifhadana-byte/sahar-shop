import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useStore } from './store';
import AuthPage    from './pages/AuthPage';
import MainLayout  from './pages/MainLayout';
import LandingPage from './pages/LandingPage';
import Storefront  from './pages/Storefront';

// Page → URL mapping
const PAGE_URLS: Record<string, string> = {
  dashboard:     '/dashboard',
  products:      '/products',
  orders:        '/orders',
  conversations: '/messages',
  customers:     '/customers',
  analytics:     '/analytics',
  connections:   '/connections',
  delivery:      '/delivery',
  notifications: '/notifications',
  settings:      '/settings',
  banner:        '/studio',
  editor:        '/editor',
};

const URL_PAGES: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_URLS).map(([k, v]) => [v, k])
);

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

// Sync URL → page state and page state → URL
function RouterSync() {
  const { currentPage, setPage } = useStore();
  const navigate  = useNavigate();
  const location  = useLocation();

  // When URL changes → update page state
  useEffect(() => {
    const page = URL_PAGES[location.pathname];
    if (page && page !== currentPage) setPage(page as any);
  }, [location.pathname]);

  // When page state changes → update URL
  useEffect(() => {
    const url = PAGE_URLS[currentPage];
    if (url && location.pathname !== url) {
      navigate(url, { replace: false });
    }
  }, [currentPage]);

  return null;
}

function AppShell() {
  const { token } = useStore();
  const isDemoMode = token === 'demo-token-local';
  const isAuthed   = !!token || isDemoMode;

  return (
    <>
      <ThemeManager />
      <RouterSync />
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
        <div className="aurora-blob blob-3" />
      </div>

      <Routes>
        {/* Public storefront */}
        <Route path="/store/:userId" element={<Storefront />} />
        <Route path="/store/:userId/*" element={<Storefront />} />

        {/* Auth pages */}
        <Route path="/login"    element={isAuthed ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
        <Route path="/register" element={isAuthed ? <Navigate to="/dashboard" replace /> : <AuthPage />} />
        <Route path="/landing"  element={<LandingPage />} />

        {/* Protected app */}
        <Route path="/dashboard"     element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />
        <Route path="/products"      element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />
        <Route path="/orders"        element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />
        <Route path="/messages"      element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />
        <Route path="/customers"     element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />
        <Route path="/analytics"     element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />
        <Route path="/connections"   element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />
        <Route path="/delivery"      element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />
        <Route path="/notifications" element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />
        <Route path="/settings"      element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />
        <Route path="/studio"        element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />
        <Route path="/editor"        element={isAuthed ? <MainLayout /> : <Navigate to="/login" replace />} />

        {/* Default */}
        <Route path="/" element={
          isAuthed ? <Navigate to="/dashboard" replace /> : <AuthPage />
        } />
        <Route path="*" element={
          isAuthed ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        } />
      </Routes>
    </>
  );
}

export default function App() {
  return <AppShell />;
}
