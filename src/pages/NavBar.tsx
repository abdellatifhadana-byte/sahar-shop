import { useStore } from '../store';
import type { Page } from '../types';
import {
  Home, Package, ShoppingCart, MessageCircle, Users,
  BarChart3, Settings, Wifi, BellRing, Truck,
  Sun, Moon, X, Search, Zap, PlusCircle, Sparkles
} from 'lucide-react';

const NAV: { page: Page; icon: typeof Home; label: string; mobileShow: boolean }[] = [
  { page: 'dashboard',     icon: Home,          label: 'الرئيسية',   mobileShow: true },
  { page: 'products',      icon: Package,        label: 'المنتجات',  mobileShow: true },
  { page: 'orders',        icon: ShoppingCart,   label: 'الطلبات',   mobileShow: true },
  { page: 'conversations', icon: MessageCircle,  label: 'الرسائل',   mobileShow: true },
  { page: 'customers',     icon: Users,          label: 'الزبائن',   mobileShow: false },
  { page: 'analytics',     icon: BarChart3,      label: 'التحليلات', mobileShow: false },
  { page: 'delivery',      icon: Truck,          label: 'التوصيل',   mobileShow: false },
  { page: 'connections',   icon: Wifi,           label: 'الربط',     mobileShow: false },
  { page: 'notifications', icon: BellRing,       label: 'الإشعارات', mobileShow: false },
  { page: 'settings',      icon: Settings,       label: 'الإعدادات', mobileShow: false },
  { page: 'banner',        icon: Sparkles,       label: 'AI Studio',  mobileShow: false },
  { page: 'editor',        icon: Zap,            label: 'محرر الصور', mobileShow: false },
];

const MOBILE_MAIN: Page[] = ['dashboard','products','orders','conversations'];

// Zellige SVG pattern for header
function ZelligePattern() {
  return (
    <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:.07,pointerEvents:'none' }}
         viewBox="0 0 400 60" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map(i => (
        <polygon key={i}
          points={`${i*22},0 ${i*22+11},11 ${i*22},22 ${i*22-11},11`}
          fill={['#FF4D1A','#C9954C','#00C896','#FF4D1A','#C9954C'][i%5]}
        />
      ))}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map(i => (
        <polygon key={`b${i}`}
          points={`${i*22+11},22 ${i*22+22},33 ${i*22+11},44 ${i*22},33`}
          fill={['#C9954C','#FF4D1A','#C9954C','#00C896','#FF4D1A'][i%5]}
        />
      ))}
    </svg>
  );
}

export default function NavBar() {
  const {
    currentPage, setPage, settings, updateSettings,
    orders, conversations, notifications, sidebarOpen, setSidebarOpen,
    logout, isOnline, user
  } = useStore();

  const pending   = orders.filter(o => o.status === 'pending').length;
  const unreadMsg = conversations.reduce((s,c) => s + c.unread, 0);
  const unreadN   = notifications.filter(n => !n.read).length;
  const isDark    = settings.design.theme !== 'light';

  const badge = (p: Page) =>
    p === 'orders' ? pending :
    p === 'conversations' ? unreadMsg :
    p === 'notifications' ? unreadN : 0;

  const go = (p: Page) => { setPage(p); setSidebarOpen(false); };
  const totalAlerts = pending + unreadMsg;

  return (
    <>
      {/* ══ DESKTOP TOP NAV ═══════════════════════ */}
      <header className="topnav" style={{ display:'none' }} id="topnav-desktop">
        {/* Zellige decoration */}
        <ZelligePattern />

        <div className="nav-logo" style={{ position:'relative', zIndex:1 }}>
          <div style={{
            width:32,height:32,borderRadius:9,background:'var(--ember)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:14,fontWeight:900,color:'#fff',flexShrink:0,
            boxShadow:'0 2px 10px rgba(255,77,26,.35)',
          }}>م</div>
          <span className="nav-brand">{settings.brand.name || 'متجري'}</span>
        </div>

        <nav className="nav-links" style={{ position:'relative', zIndex:1 }}>
          {NAV.map(item => {
            const active = currentPage === item.page;
            const b = badge(item.page);
            return (
              <button key={item.page} onClick={() => go(item.page)}
                className={`nav-item ${active ? 'active' : ''}`}>
                <item.icon size={14} />
                {item.label}
                {b > 0 && <span className="nav-badge">{b > 9 ? '9+' : b}</span>}
              </button>
            );
          })}
        </nav>

        <div style={{ display:'flex',alignItems:'center',gap:8,flexShrink:0,position:'relative',zIndex:1 }}>
          <button
            onClick={() => { const e = new KeyboardEvent('keydown',{key:'k',ctrlKey:true,bubbles:true}); window.dispatchEvent(e); }}
            className="btn btn-ghost btn-sm" style={{ gap:6,color:'var(--ink3)' }}>
            <Search size={13} /><span>بحث</span><kbd style={{ fontSize:10,opacity:.6 }}>Ctrl+K</kbd>
          </button>
          <span style={{
            padding:'4px 10px',borderRadius:7,fontSize:12,fontWeight:700,
            color:'var(--ink3)',background:'rgba(255,255,255,.05)',border:'1px solid var(--border)',
          }}>{settings.brand.currency}</span>
          {settings.ai.humanSimulation && (
            <div style={{ display:'flex',alignItems:'center',gap:5,padding:'4px 10px',
              borderRadius:7,background:'rgba(0,200,150,.08)',border:'1px solid rgba(0,200,150,.18)' }}>
              <div className="dot-live" />
              <span style={{ fontSize:11,fontWeight:700,color:'var(--mint)' }}>AI</span>
            </div>
          )}
          <button
            onClick={() => updateSettings('design',{...settings.design,theme:isDark?'light':'dark'})}
            style={{ width:34,height:34,borderRadius:9,display:'flex',alignItems:'center',
              justifyContent:'center',background:'rgba(255,255,255,.06)',
              border:'1px solid var(--border)',color:'var(--ink2)',cursor:'pointer',transition:'all .15s' }}>
            {isDark ? <Sun size={14} style={{ color:'var(--gold2)' }} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => { if (window.confirm('تأكيد الخروج؟')) logout(); }}
            style={{ width:34, height:34, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(255,77,26,.08)', border:'1px solid rgba(255,77,26,.2)', color:'var(--ember)', cursor:'pointer' }}
            title="خروج">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </header>

      {/* ══ MOBILE TOP BAR ═══════════════════════ */}
      <header className="topnav lg:hidden">
        <ZelligePattern />
        <div className="nav-logo" style={{ position:'relative',zIndex:1 }}>
          <div style={{ width:30,height:30,borderRadius:8,background:'var(--ember)',
            display:'flex',alignItems:'center',justifyContent:'center',
            fontSize:13,fontWeight:900,color:'#fff',flexShrink:0 }}>م</div>
          <span className="nav-brand" style={{ maxWidth:140,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>
            {settings.brand.name}
          </span>
        </div>
        <div style={{ display:'flex',alignItems:'center',gap:8,marginRight:'auto',marginLeft:12,position:'relative',zIndex:1 }}>
          {settings.ai.humanSimulation && <div className="dot-live" title="AI نشط" />}
          {totalAlerts > 0 && (
            <span style={{ fontSize:11,fontWeight:700,color:'var(--ember2)',
              background:'rgba(255,77,26,.12)',border:'1px solid rgba(255,77,26,.2)',
              borderRadius:99,padding:'2px 8px' }}>
              {totalAlerts} تنبيه
            </span>
          )}
        </div>
        <div style={{ display:'flex',alignItems:'center',gap:8,position:'relative',zIndex:1 }}>
          <button onClick={() => { const e = new KeyboardEvent('keydown',{key:'k',ctrlKey:true,bubbles:true}); window.dispatchEvent(e); }}
            style={{ width:34,height:34,borderRadius:9,display:'flex',alignItems:'center',
              justifyContent:'center',background:'rgba(255,255,255,.06)',
              border:'1px solid var(--border)',color:'var(--ink3)',cursor:'pointer' }}>
            <Search size={15} />
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ width:34,height:34,borderRadius:9,display:'flex',alignItems:'center',
              justifyContent:'center',background:'rgba(255,255,255,.07)',
              border:'1px solid var(--border)',color:'var(--ink2)',cursor:'pointer' }}>
            {sidebarOpen ? <X size={16} /> : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ══ DESKTOP INJECT ══════════════════════ */}
      <style>{`
        @media(min-width:1024px){
          #topnav-desktop{display:flex!important}
          .lg-hide{display:none!important}
        }
      `}</style>

      {/* ══ MOBILE SIDEBAR ═══════════════════════ */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
          <div className="sidebar-panel" onClick={e => e.stopPropagation()}>
            <div style={{ padding:'18px 16px 12px',borderBottom:'1px solid var(--border)',
              display:'flex',alignItems:'center',justifyContent:'space-between' }}>
              <div className="nav-logo">
                <div style={{ width:28,height:28,borderRadius:7,background:'var(--ember)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:12,fontWeight:900,color:'#fff' }}>م</div>
                <span className="nav-brand">{settings.brand.name}</span>
              </div>
              <button onClick={() => setSidebarOpen(false)}
                style={{ width:28,height:28,borderRadius:7,display:'flex',alignItems:'center',
                  justifyContent:'center',background:'rgba(255,255,255,.07)',
                  border:'1px solid var(--border)',color:'var(--ink3)',cursor:'pointer' }}>
                <X size={14} />
              </button>
            </div>

            <nav style={{ padding:'8px 0',flex:1,overflowY:'auto' }}>
              {NAV.map(item => {
                const active = currentPage === item.page;
                const b = badge(item.page);
                return (
                  <button key={item.page} onClick={() => go(item.page)}
                    className={`sidebar-item ${active ? 'active' : ''}`}>
                    <item.icon size={16} style={{ flexShrink:0 }} />
                    <span style={{ flex:1 }}>{item.label}</span>
                    {b > 0 && (
                      <span style={{ minWidth:20,height:20,borderRadius:99,background:'var(--ember)',
                        color:'#fff',fontSize:10,fontWeight:900,
                        display:'flex',alignItems:'center',justifyContent:'center',padding:'0 5px' }}>
                        {b > 9 ? '9+' : b}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div style={{ padding:'12px 16px',borderTop:'1px solid var(--border)',display:'flex',gap:8 }}>
              <button onClick={() => updateSettings('design',{...settings.design,theme:isDark?'light':'dark'})}
                className="btn btn-ghost btn-sm" style={{ flex:1 }}>
                {isDark ? <><Sun size={13} /> فاتح</> : <><Moon size={13} /> داكن</>}
              </button>
              <button onClick={() => go('settings')} className="btn btn-ghost btn-sm" style={{ flex:1 }}>
                <Settings size={13} /> إعدادات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ MOBILE BOTTOM NAV ════════════════════ */}
      <nav className="mobile-nav" role="navigation" aria-label="التنقل الرئيسي">
        {MOBILE_MAIN.map((page,i) => {
          const item = NAV.find(n => n.page === page)!;
          if (!item) return null;
          const active = currentPage === page;
          const b = badge(page);
          // Insert FAB in middle (after index 1)
          const FAB = i === 2 ? (
            <div key="fab" className="mob-fab-wrap">
              <button className="mob-fab" onClick={() => {
                if (currentPage==='products') setPage('products');
                else if (currentPage==='orders') setPage('orders');
                else setPage('products');
              }} aria-label="إضافة جديد">
                <PlusCircle size={22} />
              </button>
            </div>
          ) : null;
          return [
            FAB,
            <button key={page} onClick={() => go(page)}
              className={`mob-item ${active ? 'active' : ''}`}>
              <div className="mob-icon" style={{ position:'relative' }}>
                <item.icon size={20} />
                {b > 0 && (
                  <span style={{ position:'absolute',top:-3,right:-3,
                    minWidth:14,height:14,borderRadius:99,
                    background:'var(--ember)',color:'#fff',fontSize:8,fontWeight:900,
                    display:'flex',alignItems:'center',justifyContent:'center',padding:'0 2px',
                    border:'1.5px solid var(--void2)' }}>
                    {b>9?'9+':b}
                  </span>
                )}
              </div>
              <span className="mob-label">{item.label}</span>
            </button>
          ];
        })}
        {/* Settings */}
        <button key="settings" onClick={() => go('settings')}
          className={`mob-item ${currentPage==='settings'?'active':''}`}>
          <div className="mob-icon"><Settings size={20} /></div>
          <span className="mob-label">إعدادات</span>
        </button>
      </nav>
    </>
  );
}
