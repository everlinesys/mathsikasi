import { useBranding } from "../../shared/hooks/useBranding";

export default function Privacy() {
  const brand = useBranding();

  return (
    <div className={`${brand.theme.layout.container} my-0 px-6 md:px-16 min-w-[100vw]`} style={{ marginTop: 0 }}>
      <div
        className={`${brand.theme.layout.container} py-10 my-0 `}
        style={{ marginTop: 0 }}
      >
        <h1 className={brand.theme.text.title} style={{ paddingTop: 10 }}>
          Privacy Policy
        </h1>

        <p className={`${brand.theme.text.body} `}>
          {brand.siteName} is committed to protecting your privacy. This policy
          explains how we collect, use, and safeguard your information.
        </p>

        <h2 className="mt-6 font-semibold">1. Information We Collect</h2>
        <p className={brand.theme.text.body}>
          We collect basic information such as name, email, phone number, and
          payment details when you register or make a purchase.
        </p>

        <h2 className="mt-6 font-semibold">2. How We Use Information</h2>
        <p className={brand.theme.text.body}>
          Your information is used to provide access to courses, improve our
          services, and communicate important updates.
        </p>

        <h2 className="mt-6 font-semibold">3. Payment Security</h2>
        <p className={brand.theme.text.body}>
          Payments are processed through secure third-party gateways. We do not
          store your card or banking details.
        </p>

        <h2 className="mt-6 font-semibold">4. Data Protection</h2>
        <p className={brand.theme.text.body}>
          We implement appropriate security measures to protect your personal
          data from unauthorized access or misuse.
        </p>

        <h2 className="mt-6 font-semibold">5. Sharing of Information</h2>
        <p className={brand.theme.text.body}>
          We do not sell or share your personal data with third parties except
          as required to provide services or comply with legal obligations.
        </p>

        <h2 className="mt-6 font-semibold">6. Cookies</h2>
        <p className={brand.theme.text.body}>
          Our platform may use cookies to enhance user experience and analyze
          usage patterns.
        </p>

        <h2 className="mt-6 font-semibold">7. Changes to Policy</h2>
        <p className={brand.theme.text.body}>
          We may update this policy from time to time. Continued use of the
          platform indicates acceptance of the updated policy.
        </p>

        <h2 className="mt-6 font-semibold">8. Contact</h2>
        <p className={brand.theme.text.body}>
          For privacy-related concerns, contact us at {brand.contact?.email}.
        </p>
      </div>
    </div>
  );
}
