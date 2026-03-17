import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Starter', price: '199', desc: 'Perfect for freelancers and solo business owners with up to 50 invoices per month.',
    features: ['Up to 50 bills per month', 'Automated email reminders', 'UPI payment links', 'Client management', 'Payment dashboard'],
    disabled: ['WhatsApp reminders', 'AI calling'],
    featured: false
  },
  {
    name: 'Growth', price: '499', desc: 'For growing businesses with multiple clients and higher invoice volumes.',
    features: ['Up to 200 bills per month', 'Automated email reminders', 'UPI payment links', 'Client management', 'Payment dashboard', 'WhatsApp reminders'],
    disabled: ['AI calling'],
    featured: true
  },
  {
    name: 'Business', price: '999', desc: 'For distributors, manufacturers and agencies with high invoice volumes.',
    features: ['Unlimited bills', 'Automated email reminders', 'UPI payment links', 'Client management', 'Payment dashboard', 'WhatsApp reminders', 'AI calling (multilingual)'],
    disabled: [],
    featured: false
  },
];

export default function Pricing() {
  return (
    <div id="pricing" style={{ background: 'var(--lp-card)', borderTop: '1px solid var(--lp-border)', borderBottom: '1px solid var(--lp-border)', padding: '96px 5%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-badge">Pricing</span>
        <h2 className="section-title">Simple, honest pricing.</h2>
        <p className="section-sub">No hidden fees. No transaction commissions. Cancel anytime.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginTop: 56, alignItems: 'start' }}>
          {plans.map((plan, i) => (
            <div key={i} style={{ background: 'var(--lp-black)', border: `1px solid ${plan.featured ? 'var(--green)' : 'var(--lp-border)'}`, borderRadius: 16, padding: 36, position: 'relative', background: plan.featured ? 'rgba(0,194,122,0.04)' : 'var(--lp-black)' }}>
              {plan.featured && (
                <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: 'var(--green)', color: 'var(--lp-black)', fontSize: 11, fontWeight: 700, padding: '4px 16px', borderRadius: 100, fontFamily: "'Syne',sans-serif", whiteSpace: 'nowrap' }}>
                  Most Popular
                </div>
              )}
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--lp-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Syne',sans-serif", marginBottom: 12 }}>{plan.name}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--lp-text)', fontFamily: "'Syne',sans-serif" }}>₹</span>
                <span style={{ fontSize: 48, fontWeight: 800, color: 'white', fontFamily: "'Syne',sans-serif", lineHeight: 1 }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: 'var(--lp-muted)' }}>/month</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--lp-muted)', lineHeight: 1.5, marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid var(--lp-border)' }}>{plan.desc}</p>
              <ul style={{ listStyle: 'none', marginBottom: 32 }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--lp-text)', padding: '7px 0' }}>
                    <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
                {plan.disabled.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--lp-muted)', padding: '7px 0' }}>
                    <span style={{ color: 'var(--lp-muted)', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>×</span>{f}
                  </li>
                ))}
              </ul>
              <Link to="/register" style={{ display: 'block', textAlign: 'center', padding: 13, borderRadius: 8, fontSize: 15, fontWeight: 700, fontFamily: "'Syne',sans-serif", textDecoration: 'none', background: plan.featured ? 'var(--green)' : 'none', color: plan.featured ? 'var(--lp-black)' : 'var(--lp-text)', border: plan.featured ? 'none' : '1px solid var(--lp-border)', transition: 'all 0.2s' }}>
                Get Started
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, padding: 24, background: 'rgba(0,194,122,0.06)', border: '1px solid rgba(0,194,122,0.15)', borderRadius: 12, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          <p style={{ fontSize: 15, color: 'var(--lp-text)', fontWeight: 500, marginBottom: 6 }}>Zero transaction fees on all plans</p>
          <p style={{ fontSize: 14, color: 'var(--lp-muted)' }}>Your clients pay directly to your UPI ID. Payflo never touches your money. No gateway fee. Ever.</p>
        </div>
      </div>
    </div>
  );
}