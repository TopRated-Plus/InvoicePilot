const features = [
  { icon: '📧', title: 'Automated Email Reminders', desc: 'Professional payment reminder emails sent automatically — before due date, on due date, and after if unpaid. Up to 5 reminders per invoice.', tag: 'Automatic' },
  { icon: '💸', title: 'Zero Fee UPI Payments', desc: 'Every reminder includes your UPI ID. Client pays directly to your bank account. No gateway. No 2% commission. Ever.', tag: 'Zero Fees' },
  { icon: '📊', title: 'Live Payment Dashboard', desc: 'See every bill, every reminder sent, every payment received. Know exactly which clients have paid and which need attention.', tag: 'Real-time' },
  { icon: '👥', title: 'Client Management', desc: 'Save client details once. Create bills in seconds with pre-filled information. Build your client database as you invoice.', tag: 'Simple' },
  { icon: '⏱️', title: 'Smart Reminder Schedule', desc: 'Reminders sent 3 days before due date, on due date, 3 days after, and 7 days after. Persistent but never harassing.', tag: 'Intelligent' },
  { icon: '🔒', title: 'Your Data Stays Yours', desc: 'Payflo never touches your money. DPDP Act 2025 compliant. Delete everything with one click. Your client data never sold.', tag: 'Private' },
];

export default function Features() {
  return (
    <section id="features" style={{ padding: '96px 5%', maxWidth: 1200, margin: '0 auto' }}>
      <span className="section-badge">Features</span>
      <h2 className="section-title">Everything you need.<br />Nothing you don't.</h2>
      <p className="section-sub">Built specifically for Indian businesses. No bloat. No complexity.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 16, marginTop: 56 }}>
        {features.map((f, i) => (
          <div key={i} className="card" style={{ padding: 32 }}>
            <div style={{ width: 44, height: 44, background: 'rgba(0,194,122,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 20 }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: 'white' }}>{f.title}</h3>
            <p style={{ fontSize: 14, color: 'var(--lp-muted)', lineHeight: 1.65 }}>{f.desc}</p>
            <span style={{ display: 'inline-block', background: 'rgba(0,194,122,0.1)', color: 'var(--green)', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 4, marginTop: 16, fontFamily: "'Syne',sans-serif", textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {f.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}