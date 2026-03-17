const testimonials = [
  { initials: 'RK', name: 'Raj Kumar', role: 'Freelance Designer, Chennai', text: '"I used to spend every Monday morning calling clients about pending payments. With Payflo, the reminders go automatically and I get paid without a single call."' },
  { initials: 'PS', name: 'Priya Sundaram', role: 'FMCG Distributor, Coimbatore', text: '"As a distributor with 80+ clients, following up manually was impossible. Payflo sends reminders to everyone automatically. My collections improved in the first week."' },
  { initials: 'AM', name: 'Arjun Mehta', role: 'Digital Agency, Bangalore', text: '"The awkwardness of asking clients for payment was killing me. Payflo does it professionally and automatically. My clients don\'t even realise it is automated."' },
];

export default function Testimonials() {
  return (
    <section style={{ padding: '96px 5%', maxWidth: 1200, margin: '0 auto' }}>
      <span className="section-badge">Early Users</span>
      <h2 className="section-title">What people are saying</h2>
      <p className="section-sub">Real feedback from business owners who stopped chasing.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16, marginTop: 56 }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{ background: 'var(--lp-card)', border: '1px solid var(--lp-border)', borderRadius: 12, padding: 28 }}>
            <div style={{ color: 'var(--green)', fontSize: 14, marginBottom: 16, letterSpacing: 2 }}>★★★★★</div>
            <p style={{ fontSize: 15, color: 'var(--lp-text)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20, fontWeight: 300 }}>{t.text}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,194,122,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--green)', flexShrink: 0 }}>{t.initials}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'white', fontFamily: "'Syne',sans-serif" }}>{t.name}</div>
                <div style={{ fontSize: 12, color: 'var(--lp-muted)', marginTop: 2 }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}