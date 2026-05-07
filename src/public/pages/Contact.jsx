import { useBranding } from "../../shared/hooks/useBranding";

export default function Contact() {
  const branding = useBranding();

  const primary = branding?.primaryColor || "#1e3a8a";
  const accent = branding?.colors?.accent || "#111827";

  // WhatsApp link formatter
  const whatsappLink = `https://wa.me/${branding.contact.whatsapp?.replace("+", "")}`;

  return (
    <div
      className="mx-auto px-6 py-16 space-y-10 md:px-16 max-w-7xl"
      style={{ background: "#f9fafb", color: accent }}
    >
      {/* HEADER */}
      <div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: primary }}
        >
          Contact {branding.siteName}
        </h1>
        <p className="text-gray-600">
          We’d love to hear from you.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 text-black">

        {/* CONTACT INFO */}
        <div className="space-y-4 bg-white border rounded-xl p-6 shadow-sm">
          <h2
            className="text-lg font-semibold"
            style={{ color: primary }}
          >
            Contact Info
          </h2>

          <p>
            <span className="font-medium">Email:</span>{" "}
            {branding.contact.email}
          </p>

          <p>
            <span className="font-medium">Phone:</span>{" "}
            {branding.contact.phone}
          </p>

          <p>
            <span className="font-medium">Address:</span>{" "}
            {branding.contact.address}
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 px-5 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "#25D366", color: "white" }}
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">
          <h2
            className="text-lg font-semibold"
            style={{ color: primary }}
          >
            Send Message
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg p-2 focus:outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg p-2 focus:outline-none"
          />

          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full border rounded-lg p-2 focus:outline-none"
          />

          <button
            className="w-full py-2 rounded-lg font-semibold"
            style={{ backgroundColor: primary, color: "white" }}
          >
            Send Message
          </button>
        </div>

      </div>
    </div>
  );
}