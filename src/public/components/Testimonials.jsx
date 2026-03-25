import React, { useState, useEffect } from "react";
import { useBranding } from "../../shared/hooks/useBranding";

export default function Testimonials() {
  const brand = useBranding();
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = brand.reviews || [];
  const primary = brand.colors?.primary || "#6366f1";

  // Auto-play logic: Moves one card at a time
  useEffect(() => {
    if (!reviews.length) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000); // Change card every 4 seconds
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (!reviews.length) return null;

  return (
    <section className="relative w-full overflow-hidden py-20 bg-white">
      {/* ===== BACKGROUND ACCENT ===== */}
      <div 
        className="absolute top-0 left-0 w-full h-[350px] -translate-y-12 -skew-y-3 origin-top-right z-0"
        style={{ backgroundColor: primary }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            What our learners say
          </h2>
          <div className="w-12 h-1 bg-white/30 rounded-full" />
        </div>

        {/* ===== CARD CONTAINER (No Overflow) ===== */}
        <div className="relative w-full max-w-md mx-auto overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {reviews.map((t, i) => (
              <div
                key={i}
                className="w-full flex-shrink-0 px-2" // Ensures 1 card per "page"
              >
                <div
                  className={`
                    relative flex flex-col h-full
                    border border-slate-100 shadow-2xl shadow-slate-200/50
                    ${brand.theme.shape.cardRadius}
                    p-8 bg-black text-white
                  `}
                >
                  {/* QUOTE DECORATION */}
                  <span className="text-6xl absolute top-4 right-6 opacity-20 font-serif" style={{ color: primary }}>
                    “
                  </span>

                  <div className="relative z-10">
                    {/* STARS */}
                    <div className="flex gap-1 mb-6 text-amber-400">
                      {[...Array(t.rating || 5)].map((_, idx) => (
                        <svg key={idx} width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-lg italic leading-relaxed mb-8 text-slate-200">
                      {t.text}
                    </p>

                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 flex items-center justify-center text-white font-bold rounded-full"
                        style={{ backgroundColor: primary }}
                      >
                        {t.name?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-100">{t.name}</div>
                        <div className="text-xs text-slate-400 uppercase tracking-widest">
                          {t.role || "Verified Student"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== PAGINATION DOTS ===== */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 transition-all duration-300 rounded-full ${
                activeIndex === i ? "w-8" : "w-2 bg-slate-300"
              }`}
              style={{ backgroundColor: activeIndex === i ? primary : undefined }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}