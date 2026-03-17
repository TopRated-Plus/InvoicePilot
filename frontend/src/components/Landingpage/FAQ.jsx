import { useState } from 'react';

const faqs = [
  { q: 'Does Payflo take a commission on payments?', a: 'No. Never. Your clients pay directly to your UPI ID. Money goes straight to your bank account. Payflo only charges a flat monthly subscription. We are the reminder engine, not a payment processor.' },
  { q: 'What happens if my client ignores all reminders?', a: 'After 5 reminders, Payflo marks the invoice as needing personal attention and alerts you. Some clients simply need a human conversation. Payflo handles the 80% who just forgot.' },
  { q: 'Is my client data safe with Payflo?', a: 'Yes. We store only what is needed to send a reminder. We never sell your data. You can delete everything with one click. We are DPDP Act 2025 compliant.' },
  { q: 'Will my clients know it is automated?', a: 'Reminders are sent in your business name. Clients see it as a professional communication from your business, not a generic automated message.' },
  { q: 'Can I cancel anytime?', a: 'Yes. No lock-in. No cancellation fee. Cancel anytime from your settings. Your data remains accessible for 30 days after cancellation for export.' },
  { q: 'Does it work for large invoices above ₹1 lakh?', a: 'Yes. For invoices above ₹1 lakh, the payment page shows your UPI ID clearly with a copy button and step-by-step instructions. Client pays directly via their UPI app with no limit and no gateway fee.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" style={{ padding: '96px 5%', maxWidth: 1200, margin: '0 auto' }}>
      <span className="section-badge">FAQ</span>
      <h2 className="section-title">Common questions</h2>
      <div style={{ maxWidth: 700, marginTop: 56 }}>
        {faqs.map((f, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--lp-border)', padding: '24px 0', cursor: 'pointer' }} onClick={() => setOpen(open === i ? null : i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 16, fontWeight: 600, color: 'white', fontFamily: "'Syne',sans-serif" }}>
              {f.q}
              <span style={{ color: 'var(--green)', fontSize: 20, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 16 }}>+</span>
            </div>
            {open === i && (
              <p style={{ fontSize: 14, color: 'var(--lp-muted)', lineHeight: 1.7, marginTop: 12 }}>{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}