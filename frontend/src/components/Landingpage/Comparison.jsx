const rows = [
  ['Automated reminders', '✓ Up to 5', '✓ Basic', '✓ Basic', '✗ Manual only'],
  ['AI calling (coming soon)', '✓ Yes', '✗ No', '✗ No', '✗ No'],
  ['Zero transaction fees', '✓ Always', '✓ Yes', '✓ Yes', '✓ Yes'],
  ['Built for collections', '✓ Core focus', '✗ Accounting tool', '✗ Billing tool', '✗ No'],
  ['Reminder history log', '✓ Full history', '✗ No', '✗ No', '✗ No'],
  ['Price', 'From ₹199/mo', '₹1,999/year', 'Free', 'Your time'],
];

export default function Comparison() {
  return (
    <section style={{ padding: '96px 5%', maxWidth: 1200, margin: '0 auto' }}>
      <span className="section-badge">Comparison</span>
      <h2 className="section-title">Why Payflo over others?</h2>
      <p className="section-sub">Every billing tool sends one reminder then stops. Payflo follows up until you get paid.</p>
      <div style={{ overflowX: 'auto', marginTop: 48 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr>
              {['Feature', 'Payflo', 'Vyapar', 'Zoho Invoice', 'Manual'].map((h, i) => (
                <th key={i} style={{ padding: '16px 20px', textAlign: 'left', fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, borderBottom: '1px solid var(--lp-border)', color: i === 1 ? 'var(--green)' : 'var(--lp-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '14px 20px', borderBottom: '1px solid var(--lp-border)', color: j === 0 ? 'var(--lp-text)' : j === 1 ? 'var(--green)' : cell.startsWith('✗') ? '#FF4D4D' : 'var(--lp-muted)', fontWeight: j === 0 ? 500 : j === 1 ? 600 : 'normal' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}