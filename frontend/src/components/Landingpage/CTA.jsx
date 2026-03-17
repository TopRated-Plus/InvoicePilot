import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <div style={{ textAlign: 'center', padding: '96px 5%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle,rgba(0,194,122,0.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <h2 style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.1, marginBottom: 20, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
        Ready to stop chasing<br />and start collecting?
      </h2>
      <p style={{ fontSize: 17, color: 'var(--lp-muted)', marginBottom: 40, fontWeight: 300 }}>
        Join hundreds of Indian businesses who automated their payment follow-ups.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/register" className="btn-hero">Start Free Today →</Link>
        <Link to="/login" className="btn-outline">Sign In</Link>
      </div>
      <p style={{ marginTop: 16, fontSize: 13, color: 'var(--lp-muted)' }}>Free to start · No credit card · 2 minute setup</p>
    </div>
  );
}