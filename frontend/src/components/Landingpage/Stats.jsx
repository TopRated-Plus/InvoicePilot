const stats = [
  { num: '63M+', label: 'Indian SMEs losing time to manual follow-ups' },
  { num: '63%',  label: 'B2B invoices paid late every month' },
  { num: '15hrs',label: 'Average time spent chasing payments per week' },
  { num: '0%',   label: 'Transaction fees. Money goes direct to your bank.' },
];

export default function Stats() {
  return (
    <div className="stats-grid" style={{ background: 'var(--lp-card)', borderTop: '1px solid var(--lp-border)', borderBottom: '1px solid var(--lp-border)', padding: '32px 5%', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
      {stats.map((s, i) => (
        <div key={i} style={{ textAlign: 'center', padding: '16px 24px', borderRight: i < 3 ? '1px solid var(--lp-border)' : 'none' }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: 'var(--green)', lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
          <div style={{ fontSize: 13, color: 'var(--lp-muted)' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}