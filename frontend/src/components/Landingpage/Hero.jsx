import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 5% 80px', position: 'relative', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 800, height: 800, background: 'radial-gradient(circle,rgba(0,194,122,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />

      {/* Badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,194,122,0.1)', border: '1px solid rgba(0,194,122,0.25)', color: 'var(--green)', padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 500, marginBottom: 32, animation: 'fadeUp 0.6s ease both' }}>
        <span style={{ width: 6, height: 6, background: 'var(--green)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
        Now live for Indian businesses
      </div>

      <h1 style={{ fontSize: 'clamp(42px,7vw,82px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, marginBottom: 24, animation: 'fadeUp 0.6s ease 0.1s both' }}>
        Stop Chasing.<br />
        <span style={{ color: 'var(--green)' }}>Start Collecting.</span>
      </h1>

      <p style={{ fontSize: 'clamp(16px,2vw,20px)', color: 'var(--lp-muted)', maxWidth: 560, lineHeight: 1.6, fontWeight: 300, marginBottom: 40, animation: 'fadeUp 0.6s ease 0.2s both' }}>
        Payflo automatically follows up on every unpaid invoice via Email — so you never have to make an awkward payment call again.
      </p>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp 0.6s ease 0.3s both' }}>
        <Link to="/register" className="btn-hero">Get Started Free →</Link>
        <a href="#how" className="btn-outline">See How It Works</a>
      </div>

      <p style={{ marginTop: 16, fontSize: 13, color: 'var(--lp-muted)', animation: 'fadeUp 0.6s ease 0.4s both' }}>
        No credit card required · Free to start · Takes 2 minutes
      </p>
    </div>
  );
}