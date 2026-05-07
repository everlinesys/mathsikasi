import { useBranding } from "../../shared/hooks/useBranding";

export default function Terms() {
  const brand = useBranding();

  return (
   <div className={`${brand.theme.layout.container} my-0 px-6 md:px-16 min-w-[100vw]`} style={{ marginTop: 0 }}>
      <div className={`${brand.theme.layout.container} py-10  my-0 max-w-3xl`} style={{marginTop:0}}>
        
        <h1 className={brand.theme.text.title} style={{paddingTop:10}}>Terms & Conditions</h1>

        <p className={`${brand.theme.text.body} `}>
          Welcome to {brand.siteName}. By accessing or using our services, you agree to be bound by the following terms and conditions.
        </p>

        <h2 className="mt-6 font-semibold">1. Services</h2>
        <p className={brand.theme.text.body}>
          {brand.siteName} provides online educational services including live classes, recorded sessions, and learning materials for preschool students.
        </p>

        <h2 className="mt-6 font-semibold">2. User Responsibility</h2>
        <p className={brand.theme.text.body}>
          Users are responsible for providing accurate information during registration and maintaining the confidentiality of their account.
        </p>

        <h2 className="mt-6 font-semibold">3. Payments</h2>
        <p className={brand.theme.text.body}>
          All payments must be made in full through our approved payment gateways. Access to courses will be granted only after successful payment.
        </p>

        <h2 className="mt-6 font-semibold">4. Refund Policy</h2>
        <p className={brand.theme.text.body}>
          Fees once paid are generally non-refundable. However, refund requests may be considered within 7 days of enrollment if no significant portion of the course has been accessed.
          Approved refunds will be processed within 7–10 business days.
        </p>

        <h2 className="mt-6 font-semibold">5. Content Usage</h2>
        <p className={brand.theme.text.body}>
          All course materials are the intellectual property of {brand.siteName} and may not be copied, distributed, or reused without permission.
        </p>

        <h2 className="mt-6 font-semibold">6. Limitation of Liability</h2>
        <p className={brand.theme.text.body}>
          {brand.siteName} shall not be held liable for any indirect or incidental damages arising from the use of our services.
        </p>

        <h2 className="mt-6 font-semibold">7. Changes to Terms</h2>
        <p className={brand.theme.text.body}>
          We reserve the right to update these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.
        </p>

        <h2 className="mt-6 font-semibold">8. Contact</h2>
        <p className={brand.theme.text.body} style={{paddingBottom:20}}>
          For any queries, contact us at {brand.contact?.email}.
        </p>

      </div>
    </div>
  );
}