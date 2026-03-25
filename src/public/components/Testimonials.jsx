import { useBranding } from "../../shared/hooks/useBranding";

export default function Testimonials() {
  const brand = useBranding();

  const reviews = brand.reviews || [];
  const primary = brand.colors?.primary || "#6366f1";

  if (!reviews.length) return null;

  return (
    <section className="relative w-full overflow-hidden py-24 bg-white">
      
      {/* ===== THE BRAND BAND ===== */}
      {/* This is the "anti-boxy" element. 
          We skew it -3 degrees and make it slightly taller than the header.
      */}
      <div 
        className="absolute top-0 left-0 w-full h-[400px] -translate-y-20 -skew-y-3 origin-top-right z-0 shadow-xl shadow-slate-200/50"
        style={{ backgroundColor: primary }}
      >
        {/* Subtle pattern overlay to give the band texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">

        {/* ===== HEADER (Content neutralized against the skew) ===== */}
        <div className="flex flex-col items-center text-center mb-20">
          <div
            className={`
              px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-black mb-6
              bg-white/20 backdrop-blur-md text-white border border-white/30
              ${brand.theme.shape.buttonRadius}
            `}
          >
            Success Stories
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            What our learners say
          </h2>
          
          <p className="text-emerald-50/80 max-w-lg font-medium">
            Join thousands of students who have transformed their careers through our platform.
          </p>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className={`
                group relative flex flex-col h-full
                transition-all duration-500 hover:-translate-y-2
                 border border-slate-100 shadow-xl shadow-slate-200/40
                ${brand.theme.shape.cardRadius}
                p-8 md:p-10 bg-black text-white
              `}
            >
              {/* ACCENT BORDER (Top glow) */}
              <div 
                className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: primary }}
              />

              {/* QUOTE ICON */}
              <div
                className="absolute top-8 right-10 transition-transform group-hover:scale-110 duration-500"
                style={{ color: primary + "95" }}
              >
                <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56928 13 4.017 13H2.017V21H5.017Z" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {/* STARS */}
                <div className="flex gap-1 mb-6 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* TEXT */}
                <p className={`text-md italic leading-relaxed mb-8 flex-grow text-slate-200`}>
                  “{t.text}”
                </p>

                {/* AUTHOR */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                  <div
                    className={`
                      w-12 h-12 flex items-center justify-center
                      text-white font-black text-base shadow-lg
                    rounded-full
                    `}
                    style={{
                      backgroundColor: primary,
                      boxShadow: `0 8px 16px ${primary}44`,
                    }}
                  >
                    {t.name?.charAt(0)}
                  </div>

                  <div>
                    <div className={`font-semibold text-md text-slate-300 mb-0.5`}>
                      {t.name}
                    </div>
                    <div className={`text-xs font-bold uppercase tracking-wider text-emerald-600/70`}>
                      {t.role || "Verified Learner"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}