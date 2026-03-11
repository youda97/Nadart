import LegalPageLayout from "../components/LegalPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="This Privacy Policy explains how Nadart collects, uses, and protects information when you browse the website or place an order."
    >
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Information We Collect</h2>
      <p>
        When you browse Nadart, we may collect limited technical information
        such as browser type, device information, and general site usage data.
        When you place an order, we may collect personal details necessary to
        complete the purchase, such as your name, email address, billing
        details, shipping address, and order information.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>Your information may be used to:</p>
      <ul>
        <li>process and fulfill orders</li>
        <li>communicate with you about your purchase</li>
        <li>respond to inquiries and customer support requests</li>
        <li>improve the website and shopping experience</li>
        <li>comply with legal or payment-related obligations</li>
      </ul>

      <h2>3. Payments</h2>
      <p>
        Payments on Nadart are processed through secure third-party payment
        providers such as Stripe. Nadart does not store full payment card
        information on its own servers.
      </p>

      <h2>4. Sharing of Information</h2>
      <p>
        Nadart does not sell or rent your personal information. Information may
        be shared only with trusted service providers where necessary to operate
        the website, process payments, deliver orders, or comply with legal
        obligations.
      </p>

      <h2>5. Cookies and Analytics</h2>
      <p>
        Nadart may use cookies or similar technologies to support site
        functionality, understand visitor activity, and improve performance. You
        can control cookies through your browser settings.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        Personal information is retained only as long as necessary for order
        fulfillment, record-keeping, customer support, and legal or tax
        requirements.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Depending on your location, you may have the right to request access to,
        correction of, or deletion of your personal information. To make such a
        request, contact Nadart using the contact details provided below.
      </p>

      <h2>8. Third-Party Links</h2>
      <p>
        This website may include links to third-party websites such as Instagram
        or payment providers. Nadart is not responsible for the privacy
        practices of those external services.
      </p>

      <h2>9. Changes to This Policy</h2>
      <p>
        Nadart may update this Privacy Policy from time to time. Any updates
        will be posted on this page with a revised effective date.
      </p>

      <h2>10. Contact</h2>
      <p>
        For questions regarding this Privacy Policy, please contact Nadart
        through the contact information provided on the website.
      </p>
    </LegalPageLayout>
  );
}
