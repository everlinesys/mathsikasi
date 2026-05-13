import { MdWhatsapp } from "react-icons/md";
import { useBranding } from "../../shared/hooks/useBranding";
import { useState } from "react";

export default function Hero() {
  const brand = useBranding();

  const [openWhatsapp, setOpenWhatsapp] =
    useState(true);

  const whatsappNumber =
    brand.contact?.whatsapp;

  const openWhatsApp = () => {
    const text = `Hello ${brand.siteName}, I want to know more about your courses.`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
  };

  const subjects =
    brand.hero?.subjects || [
      "Mathematics",
      "Physics",
      "Chemistry",
    ];

  const classes =
    brand.hero?.classes || [
      "9th",
      "10th",
      "11th",
      "12th",
      "Degree",
    ];

  return (
    <>
      <section className="relative overflow-hidden bg-[#f8f8f8] flex items-center min-h-[100dvh] md:h-[calc(100vh-64px)] py-8 md:py-0">

        <div className="max-w-6xl mx-auto w-full px-6 relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">

            {/* IMAGE SECTION */}

            <div className="relative flex justify-center items-center order-1 md:order-2">

              <div
                className="absolute w-48 h-48 md:w-72 md:h-72 blur-[60px] md:blur-[100px] opacity-20 rounded-full"
                style={{
                  background:
                    brand.colors.primary,
                }}
              />

              <img
                src={
                  brand.hero?.image ||
                  "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                }
                alt={brand.siteName}
                className="relative z-10 w-full max-w-[200px] md:max-w-md h-auto object-contain max-h-[25vh] md:max-h-[60vh]"
              />
            </div>

            {/* TEXT CONTENT */}

            <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-1">

              <h1
                className="text-3xl md:text-5xl font-black leading-[0.95] uppercase tracking-tighter"
                style={{
                  color:
                    brand.colors.primary,
                }}
              >
                {brand.hero?.title ||
                  "Online Education"}
              </h1>

              <p className="mt-2 text-base md:text-lg font-bold text-gray-700">
                {brand.hero?.subtitle ||
                  "CBSE | STATE"}
              </p>

              {/* Subjects */}

              <div className="mt-4 md:mt-6 flex flex-wrap justify-center md:justify-start gap-2">
                {subjects.map((subject) => (
                  <span
                    key={subject}
                    className="text-white font-bold text-[10px] md:text-sm px-3 py-1 md:py-1.5 rounded-lg shadow-sm"
                    style={{
                      background:
                        brand.colors.primary,
                    }}
                  >
                    {subject}
                  </span>
                ))}
              </div>

              {/* Classes */}

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                {classes.map((cls) => (
                  <button
                    key={cls}
                    className="text-white font-bold px-3 py-1 rounded-lg border-b-4 border-black/10 transition active:scale-95 text-[10px] md:text-sm"
                    style={{
                      background:
                        brand.colors.accent,
                    }}
                  >
                    {cls}
                  </button>
                ))}
              </div>

              {/* CTA & CONTACT */}

              <div className="mt-6 md:mt-8 flex flex-col md:flex-row items-center gap-4">

                <a
                  href={"/register"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto text-white font-black text-sm px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition hover:brightness-110 active:scale-95"
                  style={{
                    background:
                      brand.colors.dark ||
                      "#3a1f28",
                  }}
                >
                  REGISTER NOW
                </a>

                <a
                  href={`tel:${
                    brand.contact?.phone ||
                    "86061 33138"
                  }`}
                  className="text-lg font-black text-black flex items-center gap-1"
                >
                  <span className="text-xl">
                    📞
                  </span>

                  {brand.contact?.phone ||
                    "86061 33138"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP */}

      {whatsappNumber && (
        <div className="fixed bottom-6 right-6 z-50">

          {/* POPUP */}

          {openWhatsapp && (
            <div className="bg-white w-72 rounded-2xl shadow-2xl overflow-hidden mb-3 border border-gray-200">

              <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center font-bold">
                WhatsApp Support

                <button
                  onClick={() =>
                    setOpenWhatsapp(
                      false
                    )
                  }
                  className="bg-transparent"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 text-sm text-gray-700 space-y-2">
                <p className="font-semibold">
                  Hi 👋
                </p>

                <p>
                  Need help with admissions,
                  courses or fees?
                </p>

                <p className="text-xs text-gray-500">
                  Chat with our team on
                  WhatsApp.
                </p>

                <button
                  onClick={openWhatsApp}
                  className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-full flex items-center justify-center gap-2"
                >
                  <MdWhatsapp size={22} />

                  Chat on WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* FLOAT BUTTON */}

          {!openWhatsapp && (
            <button
              onClick={() =>
                setOpenWhatsapp(true)
              }
              className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-2xl flex items-center justify-center transition hover:scale-110 active:scale-95"
            >
              <MdWhatsapp size={34} />
            </button>
          )}
        </div>
      )}
    </>
  );
}