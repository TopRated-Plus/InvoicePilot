import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div style={{ background: '#0A0F0D', minHeight: '100vh', padding: '80px 5%' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <Link to="/" style={{ color: '#00C27A', textDecoration: 'none', fontSize: 14, fontFamily: "'Syne', sans-serif" }}>
          ← Back to Payflo
        </Link>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: 'white', marginTop: 32, marginBottom: 8 }}>
          Terms of Service
        </h1>
        <p style={{ color: '#7A9485', fontSize: 14, marginBottom: 48 }}>
          Last updated: March 2026
        </p>

        {[
          {
            title: '1. Acceptance of Terms',
            body: 'By accessing or using Payflo, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service. These terms apply to all users including businesses, freelancers, and individuals.'
          },
          {
            title: '2. Description of Service',
            body: 'Payflo is a payment collection and reminder platform for Indian businesses. We send automated reminders via Email and WhatsApp on your behalf to help you collect payments from your clients. Payflo is not a payment gateway and does not process, hold, or transfer any money on your behalf.'
          },
          {
            title: '3. Zero Transaction Fees',
            body: 'Payflo charges a flat monthly subscription fee only. We do not charge any percentage on payments collected. All payments from your clients go directly to your UPI ID and bank account. Payflo never holds or processes your money.'
          },
          {
            title: '4. User Accounts',
            body: 'You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorised use of your account. Each account is for a single business entity only.'
          },
          {
            title: '5. Subscription and Billing',
            body: 'Payflo offers Free, Starter (₹699/month), Growth (₹1,499/month), and Professional (custom) plans. Subscriptions are billed monthly or annually. You may cancel at any time. No refunds are provided for partial months of service already rendered.'
          },
          {
            title: '6. Acceptable Use',
            body: 'You agree to use Payflo only for lawful business purposes. You must not use Payflo to send spam, harass clients, collect fraudulent payments, or engage in any illegal activity. Violation of this policy will result in immediate account termination.'
          },
          {
            title: '7. Client Data Responsibility',
            body: 'You are responsible for ensuring you have the right to contact the clients whose information you enter into Payflo. You must have a legitimate business relationship with every client you add. Payflo is not liable for any disputes between you and your clients.'
          },
          {
            title: '8. Data Security',
            body: 'Payflo uses industry-standard encryption and Firebase security to protect your data. However, no system is 100% secure. You agree that Payflo is not liable for any data breach that occurs despite reasonable security measures being in place.'
          },
          {
            title: '9. Service Availability',
            body: 'Payflo aims for maximum uptime but does not guarantee uninterrupted service. Scheduled maintenance, technical issues, or third-party API failures may cause temporary unavailability. We are not liable for any losses caused by service downtime.'
          },
          {
            title: '10. Intellectual Property',
            body: 'All content, branding, code, and features of Payflo are owned by Payflo and protected under Indian copyright law. You may not copy, reverse engineer, or create derivative products based on Payflo without written permission.'
          },
          {
            title: '11. Limitation of Liability',
            body: 'Payflo is not liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability to you in any month shall not exceed the subscription fee paid by you in that month.'
          },
          {
            title: '12. Third Party Services',
            body: 'Payflo integrates with third-party services including Firebase, Resend, Interakt, and UPI payment infrastructure. We are not responsible for the availability or performance of these third-party services.'
          },
          {
            title: '13. Termination',
            body: 'You may terminate your account at any time from your Settings page. Payflo may terminate or suspend your account if you violate these terms. Upon termination, your data will be retained for 30 days before permanent deletion.'
          },
          {
            title: '14. Governing Law',
            body: 'These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Coimbatore, Tamil Nadu, India.'
          },
          {
            title: '15. Changes to Terms',
            body: 'Payflo reserves the right to update these Terms at any time. We will notify you of significant changes via email. Continued use of Payflo after changes constitutes acceptance of the updated Terms.'
          },
          {
            title: '16. Contact',
            body: 'For any questions about these Terms, please contact us at hello@payflo.in. We will respond within 2 business days.'
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 12 }}>
              {section.title}
            </h2>
            <p style={{ fontSize: 15, color: '#7A9485', lineHeight: 1.7, fontWeight: 300 }}>
              {section.body}
            </p>
          </div>
        ))}

        <div style={{ marginTop: 48, padding: 24, background: 'rgba(0,194,122,0.06)', border: '1px solid rgba(0,194,122,0.15)', borderRadius: 12 }}>
          <p style={{ fontSize: 14, color: '#7A9485', textAlign: 'center' }}>
            Questions? Email us at{' '}
            <a href="mailto:hello@payflo.in" style={{ color: '#00C27A', textDecoration: 'none' }}>
              hello@payflo.in
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}