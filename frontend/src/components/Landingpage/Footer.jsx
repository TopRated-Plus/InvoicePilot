const links = {
  Product: [['#how','How it works'],['#features','Features'],['#pricing','Pricing'],['#faq','FAQ']],
  Company: [['#','About'],['#','Blog'],['#','Careers'],['#','Contact']],
  Legal: [['#','Privacy Policy'],['#','Terms of Service'],['#','Refund Policy'],['#','DPDP Compliance']],
};

export default function LandingFooter() {
  return (
    <footer style={{ background: 'var(--lp-card)', borderTop: '1px solid var(--lp-border)', padding: '64px 5% 32px' }}>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3,1fr)', gap: 48, maxWidth: 1200, margin: '0 auto 48px' }}>
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: 'var(--green)' }}>Payflo</div>
          <p style={{ fontSize: 14, color: 'var(--lp-muted)', lineHeight: 1.65, marginTop: 12, maxWidth: 260, fontWeight: 300 }}>
            India's payment collection agent. You create the bill. We follow up until you get paid. Zero transaction fees. Always.
          </p>
        </div>
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>{title}</h4>
            <ul style={{ listStyle: 'none' }}>
              {items.map(([href, label]) => (
                <li key={label} style={{ marginBottom: 10 }}>
                  <a href={href} style={{ fontSize: 14, color: 'var(--lp-muted)', textDecoration: 'none', fontWeight: 300 }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', paddingTop: 24, borderTop: '1px solid var(--lp-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--lp-muted)' }}>© 2026 Payflo. Built in Coimbatore, India 🇮🇳</p>
        <div style={{ display: 'flex', gap: 24 }}>
          {[['#','Twitter'],['#','LinkedIn'],['#','Instagram'],['mailto:hello@payflo.in','hello@payflo.in']].map(([href, label]) => (
            <a key={label} href={href} style={{ fontSize: 13, color: 'var(--lp-muted)', textDecoration: 'none' }}>{label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}