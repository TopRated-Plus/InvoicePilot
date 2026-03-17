import { Link } from 'react-router-dom';

export default function LandingNavbar() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 5%', height: 68,
      background: 'rgba(10,15,13,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--lp-border)'
    }}>
      <Link to="/" style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--green)', textDecoration: 'none' }}>
        Payflo
      </Link>

      <ul className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none' }}>
        {[['#how','How it works'],['#features','Features'],['#pricing','Pricing'],['#faq','FAQ']].map(([href, label]) => (
          <li key={href}>
            <a href={href} style={{ color: 'var(--lp-muted)', textDecoration: 'none', fontSize: 14, fontWeight: 500, fontFamily: "'Syne',sans-serif", transition: 'color 0.2s' }}
               onMouseEnter={e => e.target.style.color = 'var(--lp-text)'}
               onMouseLeave={e => e.target.style.color = 'var(--lp-muted)'}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link to="/login" style={{ background: 'none', border: '1px solid var(--lp-border)', color: 'var(--lp-text)', padding: '8px 20px', borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none', fontFamily: "'Syne',sans-serif" }}>
          Sign In
        </Link>
        <Link to="/register" style={{ background: 'var(--green)', color: 'var(--lp-black)', padding: '9px 22px', borderRadius: 6, fontSize: 14, fontWeight: 700, textDecoration: 'none', fontFamily: "'Syne',sans-serif" }}>
          Start Free
        </Link>
      </div>
    </nav>
  );
}