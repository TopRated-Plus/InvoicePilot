const steps = [
  { num: '1', title: 'Create Bill', desc: 'Enter client details, amount, and due date in 30 seconds' },
  { num: '2', title: 'Auto Send', desc: 'Payflo sends invoice via Email instantly on creation' },
  { num: '3', title: 'Smart Remind', desc: 'Automatic reminders before due date and after if unpaid' },
  { num: '4', title: 'Client Pays', desc: 'Client pays directly to your UPI ID. Zero fees. Zero middleman.' },
  { num: '5', title: 'You Get Paid', desc: 'Money hits your bank. Reminders stop automatically.' },
];

export default function HowItWorks() {
  return (
    <div id="how" style={{ background: 'var(--lp-card)', borderTop: '1px solid var(--lp-border)', borderBottom: '1px solid var(--lp-border)', padding: '96px 5%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-badge">How It Works</span>
        <h2 className="section-title">You create the bill.<br />We remind the payment.</h2>
        <p className="section-sub">Five steps. Fully automatic. Zero awkward conversations.</p>

        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, marginTop: 56, position: 'relative' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ padding: '0 20px', textAlign: 'center', position: 'relative' }}>
              {i < steps.length - 1 && (
                <div className="step-arrow" style={{ position: 'absolute', right: -12, top: 20, fontSize: 20, color: 'var(--green)' }}>→</div>
              )}
              <div style={{ width: 56, height: 56, background: 'rgba(0,194,122,0.1)', border: '1px solid rgba(0,194,122,0.3)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, color: 'var(--green)', margin: '0 auto 16px' }}>
                {s.num}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'white' }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--lp-muted)', lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}