import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    desc: 'Get started with no commitment. Perfect for trying Payflo with your first few clients.',
    features: [
      '5 bills per month',
      'Email reminders only',
      'UPI payment links',
      'Basic dashboard',
      'Payment page for clients',
    ],
    disabled: [
      'WhatsApp reminders',
      'AI calling',
      'Client management',
      'Reminder history',
      'Priority support',
    ],
    cta: 'Start for Free',
    ctaLink: '/register',
    featured: false,
    tag: null,
  },
  {
    name: 'Starter',
    price: '699',
    period: 'month',
    desc: 'For freelancers and small businesses ready to automate their payment follow-ups.',
    features: [
      '50 bills per month',
      'Automated email reminders',
      'WhatsApp reminders',
      'UPI payment links',
      'Client management',
      'Reminder history log',
      'Payment dashboard',
    ],
    disabled: ['AI calling', 'Dedicated support'],
    cta: 'Get Started',
    ctaLink: '/register',
    featured: false,
    tag: null,
  },
  {
    name: 'Growth',
    price: '1,499',
    period: 'month',
    desc: 'For growing businesses with multiple clients and higher collection volumes.',
    features: [
      '200 bills per month',
      'Automated email reminders',
      'WhatsApp reminders',
      'AI calling (Hindi + English)',
      'UPI payment links',
      'Client management',
      'Full reminder history',
      'Payment dashboard',
      'Priority email support',
    ],
    disabled: [],
    cta: 'Get Started',
    ctaLink: '/register',
    featured: true,
    tag: 'Most Popular',
  },
  {
    name: 'Professional',
    price: 'Custom',
    period: null,
    desc: 'For distributors, large agencies and enterprises with high invoice volumes and custom needs.',
    features: [
      'Unlimited bills',
      'Email + WhatsApp + AI calling',
      'Multilingual AI calls',
      'Dedicated account manager',
      'Custom reminder workflows',
      'API access',
      'Team access (multi-user)',
      'SLA guarantee',
      'Custom integrations',
    ],
    disabled: [],
    cta: 'Contact Us',
    ctaLink: 'mailto:hello@payflo.in',
    featured: false,
    tag: 'Enterprise',
  },
];

export default function Pricing() {
  return (
    <div
      id="pricing"
      style={{
        background: 'var(--lp-card)',
        borderTop: '1px solid var(--lp-border)',
        borderBottom: '1px solid var(--lp-border)',
        padding: '96px 5%',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <span className="section-badge">Pricing</span>
        <h2 className="section-title">Start free. Scale as you grow.</h2>
        <p className="section-sub">
          No hidden fees. No transaction commissions. Cancel anytime.
        </p>

        {/* Pricing Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
            marginTop: 56,
            alignItems: 'start',
          }}
        >
          {plans.map((plan, i) => (
            <div
              key={i}
              style={{
                background: plan.featured
                  ? 'rgba(0,194,122,0.04)'
                  : 'var(--lp-black)',
                border: `1px solid ${
                  plan.featured ? 'var(--green)' : 'var(--lp-border)'
                }`,
                borderRadius: 16,
                padding: 32,
                position: 'relative',
              }}
            >
              {/* Badge */}
              {plan.tag && (
                <div
                  style={{
                    position: 'absolute',
                    top: -13,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: plan.featured
                      ? 'var(--green)'
                      : 'var(--lp-muted)',
                    color: plan.featured ? 'var(--lp-black)' : 'white',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '4px 16px',
                    borderRadius: 100,
                    fontFamily: "'Syne', sans-serif",
                    whiteSpace: 'nowrap',
                  }}
                >
                  {plan.tag}
                </div>
              )}

              {/* Plan Name */}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--lp-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: "'Syne', sans-serif",
                  marginBottom: 12,
                }}
              >
                {plan.name}
              </div>

              {/* Price */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 4,
                  marginBottom: 8,
                }}
              >
                {plan.price === 'Custom' ? (
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 800,
                      color: 'white',
                      fontFamily: "'Syne', sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    Custom
                  </span>
                ) : (
                  <>
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: 'var(--lp-text)',
                        fontFamily: "'Syne', sans-serif",
                      }}
                    >
                      ₹
                    </span>
                    <span
                      style={{
                        fontSize: plan.price === '0' ? 48 : 40,
                        fontWeight: 800,
                        color: 'white',
                        fontFamily: "'Syne', sans-serif",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        style={{ fontSize: 14, color: 'var(--lp-muted)' }}
                      >
                        /{plan.period}
                      </span>
                    )}
                  </>
                )}
              </div>

              {/* Annual note */}
              {plan.price !== '0' && plan.price !== 'Custom' && (
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--green)',
                    marginBottom: 12,
                    fontWeight: 500,
                  }}
                >
                  {plan.price === '699'
                    ? 'Billed annually: ₹7,999/year'
                    : 'Billed annually: ₹16,999/year'}
                </div>
              )}

              {/* Description */}
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--lp-muted)',
                  lineHeight: 1.6,
                  marginBottom: 24,
                  paddingBottom: 24,
                  borderBottom: '1px solid var(--lp-border)',
                }}
              >
                {plan.desc}
              </p>

              {/* Features */}
              <ul style={{ listStyle: 'none', marginBottom: 28 }}>
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      fontSize: 13,
                      color: 'var(--lp-text)',
                      padding: '6px 0',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--green)',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}

                {plan.disabled.map((f, j) => (
                  <li
                    key={j}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      fontSize: 13,
                      color: 'var(--lp-muted)',
                      padding: '6px 0',
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--lp-muted)',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      ×
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              {plan.ctaLink.startsWith('/') ? (
                <Link
                  to={plan.ctaLink}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "'Syne', sans-serif",
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: plan.featured
                      ? 'var(--green)'
                      : 'transparent',
                    color: plan.featured
                      ? 'var(--lp-black)'
                      : 'var(--lp-text)',
                    border: plan.featured
                      ? 'none'
                      : '1px solid var(--lp-border)',
                  }}
                >
                  {plan.cta}
                </Link>
              ) : (
                <a
                  href={plan.ctaLink}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '12px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "'Syne', sans-serif",
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: plan.featured
                      ? 'var(--green)'
                      : 'transparent',
                    color: plan.featured
                      ? 'var(--lp-black)'
                      : 'var(--lp-text)',
                    border: plan.featured
                      ? 'none'
                      : '1px solid var(--lp-border)',
                  }}
                >
                  {plan.cta}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Zero fees note */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 40,
            padding: '20px 24px',
            background: 'rgba(0,194,122,0.06)',
            border: '1px solid rgba(0,194,122,0.15)',
            borderRadius: 12,
            maxWidth: 640,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: 'var(--lp-text)',
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            Zero transaction fees on every plan including Free
          </p>
          <p style={{ fontSize: 13, color: 'var(--lp-muted)' }}>
            Your clients pay directly to your UPI ID. Payflo never touches your
            money. No 2% gateway fee. Ever.
          </p>
        </div>

        {/* Compare plans link */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <p style={{ fontSize: 13, color: 'var(--lp-muted)' }}>
            Need help choosing?{' '}
            <a
              href="mailto:hello@payflo.in"
              style={{
                color: 'var(--green)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Talk to us →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}