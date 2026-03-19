import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div style={{ background: '#0A0F0D', minHeight: '100vh', padding: '80px 5%' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <Link to="/" style={{ color: '#00C27A', textDecoration: 'none', fontSize: 14, fontFamily: "'Syne', sans-serif" }}>
          ← Back to Payflo
        </Link>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: 'white', marginTop: 32, marginBottom: 8 }}>
          Privacy Policy
        </h1>
        <p style={{ color: '#7A9485', fontSize: 14, marginBottom: 48 }}>
          Last updated: March 2026 · DPDP Act 2025 Compliant
        </p>

        {[
          {
            title: '1. Who We Are',
            body: 'Payflo is a payment collection platform for Indian businesses, built and operated from Coimbatore, Tamil Nadu, India. We are committed to protecting your privacy and the privacy of your clients in accordance with the Digital Personal Data Protection Act 2025.'
          },
          {
            title: '2. Data We Collect — About You',
            body: 'When you create a Payflo account we collect your name, business name, email address, phone number, and UPI ID. This information is required to operate the service. We do not collect your Aadhaar, PAN, or bank account details.'
          },
          {
            title: '3. Data We Collect — About Your Clients',
            body: 'You provide your clients name, phone number, and email address to send payment reminders. We store this data only to send reminders on your behalf. We do not use your clients data for any other purpose and we never contact them except for payment reminders you authorise.'
          },
          {
            title: '4. How We Use Your Data',
            body: 'We use your data to provide the Payflo service — sending payment reminders, generating invoices, and maintaining your dashboard. We also use your email to send service notifications and product updates. We never use your data for advertising purposes.'
          },
          {
            title: '5. We Never Sell Your Data',
            body: 'Payflo does not sell, rent, or share your personal data or your clients data with any third party for commercial purposes. Your data is yours. We are a subscription business — we have no incentive to monetise your data.'
          },
          {
            title: '6. Third Party Services We Use',
            body: 'Payflo uses Firebase (Google) for authentication and database, Resend for email delivery, and Interakt for WhatsApp messaging. These services process your data only to provide Payflo functionality. Each has their own privacy policy and security standards.'
          },
          {
            title: '7. Data Storage and Security',
            body: 'Your data is stored on Firebase servers with enterprise-grade encryption at rest and in transit. Access to your data is restricted to authorised Payflo team members only. We conduct regular security reviews of our infrastructure.'
          },
          {
            title: '8. Data Retention',
            body: 'We retain your data for as long as your account is active. If you delete your account, your data is permanently deleted within 30 days. Your clients data is deleted along with your account. You may request data deletion at any time by emailing hello@payflo.in.'
          },
          {
            title: '9. Your Rights Under DPDP Act 2025',
            body: 'Under the Digital Personal Data Protection Act 2025, you have the right to access your data, correct inaccurate data, erase your data, and withdraw consent at any time. To exercise any of these rights, email us at hello@payflo.in and we will respond within 72 hours.'
          },
          {
            title: '10. Your Clients Rights',
            body: 'Your clients whose data you enter into Payflo also have rights under DPDP Act 2025. By using Payflo you confirm you have a legitimate business reason to contact each client and that you are responsible for their data rights with respect to your business relationship.'
          },
          {
            title: '11. Cookies',
            body: 'Payflo uses only essential cookies required for authentication and session management. We do not use tracking cookies, advertising cookies, or any third-party analytics cookies. You cannot opt out of essential cookies as they are required for the service to function.'
          },
          {
            title: '12. Children\'s Privacy',
            body: 'Payflo is a business tool intended for adults operating businesses. We do not knowingly collect data from anyone under 18 years of age. If you believe a minor has created an account, please contact us at hello@payflo.in immediately.'
          },
          {
            title: '13. Changes to This Policy',
            body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes via email at least 14 days before they take effect. Continued use of Payflo after changes constitutes acceptance of the updated policy.'
          },
          {
            title: '14. Grievance Officer',
            body: 'In accordance with the DPDP Act 2025, our Grievance Officer can be reached at hello@payflo.in. We will acknowledge your complaint within 24 hours and resolve it within 30 days. If unresolved, you may escalate to the Data Protection Board of India.'
          },
          {
            title: '15. Contact Us',
            body: 'For any privacy-related questions, requests, or concerns please contact us at hello@payflo.in. Our registered address is Coimbatore, Tamil Nadu, India. We take privacy seriously and will respond to all queries promptly.'
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
            Privacy questions? Email us at{' '}
            <a href="mailto:hello@payflo.in" style={{ color: '#00C27A', textDecoration: 'none' }}>
              hello@payflo.in
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}