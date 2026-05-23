import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div dir="rtl" style={{ 
      minHeight: '100dvh', 
      background: 'url(/bg-sahar.jpg) center/cover no-repeat fixed', 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,16,0.85)', backdropFilter: 'blur(10px)', zIndex: 0 }} />
      
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1000, padding: '20px', textAlign: 'center' }}>
        <img src="/logo-sahar.png" alt="Sahar Shop" style={{ width: 80, height: 80, margin: '0 auto 20px', filter: 'drop-shadow(0 0 20px rgba(249,115,22,0.5))' }} />
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#fff', marginBottom: 12 }}>مرحباً بك في Sahar Shop OS</h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 48 }}>منصتك الذكية للتجارة الإلكترونية وإدارة المتاجر</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {/* Customer Card */}
          <div onClick={() => navigate('/store')} style={{ 
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 40,
            cursor: 'pointer', transition: 'all 0.3s', backdropFilter: 'blur(20px)'
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-10px)'; (e.currentTarget as HTMLElement).style.borderColor = '#f97316'; (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
            <div style={{ width: 70, height: 70, borderRadius: 20, background: 'rgba(249,115,22,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#f97316' }}>
              <ShoppingBag size={32} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 12 }}>تصفح المتجر</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 24, lineHeight: 1.6 }}>اكتشف أحدث المنتجات، اطلب بسهولة، وتوصل لباب منزلك.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#f97316', fontWeight: 800 }}>
              دخول كزبون <ArrowRight size={18} />
            </div>
          </div>

          {/* Merchant Card */}
          <div onClick={() => navigate('/auth')} style={{ 
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 40,
            cursor: 'pointer', transition: 'all 0.3s', backdropFilter: 'blur(20px)'
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-10px)'; (e.currentTarget as HTMLElement).style.borderColor = '#6366f1'; (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}>
            <div style={{ width: 70, height: 70, borderRadius: 20, background: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#818cf8' }}>
              <Store size={32} />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 12 }}>إنشاء متجرك الخاص</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 24, lineHeight: 1.6 }}>للأصحاب المتاجر: سجل الدخول لإدارة منتجاتك، طلباتك، وتحليلاتك.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#818cf8', fontWeight: 800 }}>
              دخول كتاجر <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
