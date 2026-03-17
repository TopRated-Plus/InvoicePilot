const problems = [
  { icon: '📞', title: 'Awkward payment calls', desc: 'Calling clients to ask for money feels uncomfortable. So you delay, they delay, and the invoice ages.' },
  { icon: '⏰', title: 'Hours lost every week', desc: 'You spend 10-20 hours every week manually following up. That is time you should be growing your business.' },
  { icon: '💬', title: '"I\'ll pay by Friday"', desc: 'Friday comes. No payment. You follow up again. They say next Friday. The cycle never ends without a system.' },
  { icon: '🧾', title: 'Invoices fall through cracks', desc: 'With 50+ clients, some invoices simply get forgotten. That is money you earned but never collected.' },
];

export default function Problem() {
  return (
    <section style={{ padding: '96px 5%', maxWidth: 1200, margin: '0 auto' }}>
      <span className="section-badge">The Problem</span>
      <h2 className="section-title">Sound familiar?</h2>
      <p className="section-sub">Every Indian business owner knows this pain. Payflo solves it automatically.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginTop: 56 }}>
        {problems.map((p, i) => (
          <div key={i} className="card" style={{ padding: 28 }}>
            <div style={{ fontSize: 28, marginBottom: 16 }}>{p.icon}</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: 'white' }}>{p.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--lp-muted)', lineHeight: 1.6 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}