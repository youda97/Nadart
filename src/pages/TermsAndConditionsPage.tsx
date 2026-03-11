import LegalPageLayout from "../components/LegalPageLayout";

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="These Terms & Conditions govern the use of the Nadart website and the purchase of artwork through the site."
    >
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Overview</h2>
      <p>
        Nadart offers original acrylic paintings and related artwork for sale.
        By using this website or placing an order, you agree to these Terms &
        Conditions.
      </p>

      <h2>2. Products</h2>
      <p>
        All artwork listed on Nadart is described as accurately as possible.
        Because many works are original, handmade acrylic paintings, slight
        variations in texture, tone, and appearance may be part of the nature of
        the piece.
      </p>

      <h2>3. Pricing and Availability</h2>
      <p>
        All prices are listed in the currency shown on the website and are
        subject to change without notice. Availability is not guaranteed until
        payment is completed successfully. Nadart reserves the right to correct
        errors in pricing, descriptions, or availability.
      </p>

      <h2>4. Orders and Payment</h2>
      <p>
        Orders are subject to acceptance and availability. Payment must be
        completed through the provided checkout process before an order is
        confirmed. Nadart reserves the right to cancel or refuse any order if
        fraudulent, unauthorized, or suspicious activity is suspected.
      </p>

      <h2>5. Shipping</h2>
      <p>
        Shipping timelines may vary depending on destination, carrier, and
        artwork preparation requirements. Nadart is not responsible for delays
        caused by shipping providers, customs, or circumstances outside its
        control.
      </p>

      <h2>6. Returns and Refunds</h2>
      <p>
        Because many items are original works of art, returns and refunds may be
        limited. Any return, refund, or damage policy should be clearly stated
        on the product page or communicated before purchase. If an item arrives
        damaged, the customer should contact Nadart promptly with supporting
        photos and order details.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All artwork, images, branding, and website content displayed on Nadart
        remain the property of Nadart or the artist unless otherwise stated.
        Purchase of artwork does not transfer copyright or reproduction rights.
      </p>

      <h2>8. Website Use</h2>
      <p>
        You agree not to misuse the website, interfere with its operation, or
        attempt to gain unauthorized access to any part of the site or its
        systems.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Nadart is not liable for any
        indirect, incidental, or consequential damages arising from use of the
        website or the purchase of products through it.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        Nadart may revise these Terms & Conditions at any time. Continued use of
        the website after updates are posted means you accept the revised terms.
      </p>

      <h2>11. Contact</h2>
      <p>
        For any questions about these Terms & Conditions, please contact Nadart
        through the contact information listed on the website.
      </p>
    </LegalPageLayout>
  );
}
