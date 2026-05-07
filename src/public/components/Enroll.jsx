import { useState } from "react";
import { useBranding } from "../../shared/hooks/useBranding";

export default function Enroll() {
  const brand = useBranding();
  const whatsappNumber = brand.contact?.whatsapp;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
    message: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const text = `
📚 *Enrollment Request — ${brand.siteName}*

👤 Name: ${form.name}
📞 Phone: ${form.phone}
🎓 Course: ${form.course}
 
📝 Message:
${form.message || "N/A"}
`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2"  style={{ backgroundColor: brand.primaryColor }}>

      {/* LEFT — Branding Panel */}
      <div
        className="hidden md:flex flex-col justify-center p-16 text-white"
        style={{ backgroundColor: brand.primaryColor }}
      >
        {/* <h1 className="text-5xl font-black mb-6 leading-tight">
          {brand.hero?.title}
        </h1> */}


        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold">
           Get started with {brand.siteName} for free!
          </div>
          <div className="opacity-80">
           
          </div>
        </div>

        {brand.hero?.image && (
          <img
            src={brand.hero.image}
            alt="Hero"
            className="mt-10 rounded-2xl shadow-2xl max-w-md"
          />
        )}
      </div>

      {/* RIGHT — Form */}
      <div className="flex items-center justify-center p-6">

        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

          <h2
            className="text-3xl font-bold mb-2"
            style={{ color: brand.primaryColor }}
          >
            Enroll Now
          </h2>

          <p className="mb-6 text-gray-600">
            Join {brand.siteName} and start learning today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-black">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={handleChange}
              className="w-full  p-3 rounded-lg"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              className="w-full  p-3 rounded-lg"
            />

            <input
              type="text"
              name="course"
              placeholder="Course Interested In"
              required
              onChange={handleChange}
              className="w-full  p-3 rounded-lg"
            />

            <textarea
              name="message"
              placeholder="Additional Message (optional)"
              onChange={handleChange}
              className="w-full  p-3 rounded-lg"
              rows={3}
            />

            <button
              type="submit"
              className="w-full py-3 rounded-full text-white font-semibold transition hover:opacity-90"
              style={{ backgroundColor: brand.colors.primary , borderRadius: "50px" }}
            >
              Start
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
