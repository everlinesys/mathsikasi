import { useBranding } from "../../shared/hooks/useBranding";

export default function Testimonials() {
  const brand = useBranding();
  const reviews = brand.reviews || [];
  const primary = brand.colors?.primary || "#1a73e8"; // Google Blue default

  if (!reviews.length) return null;

  return (
    <section className="py-20 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER - Google Style: Centered, clean, focused */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-google font-medium text-gray-900 tracking-tight">
            Loved by learners everywhere
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See how our platform is helping students achieve their goals through flexible, high-quality education.
          </p>
        </div>

        {/* TESTIMONIAL GRID - Card based / Bento layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((t, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-white border border-gray-200 rounded-[28px] p-8 transition-all hover:shadow-md hover:border-gray-300"
            >
              {/* Star Rating - Discrete and clean */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating || 5)].map((_, starIndex) => (
                  <svg key={starIndex} className="w-5 h-5 text-google-yellow fill-current" viewBox="0 0 20 20" style={{ color: '#fbbc04' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote - Standard Sans-Serif (Google Sans/Roboto feel) */}
              <blockquote className="text-gray-800 text-lg leading-relaxed mb-8 font-normal">
                "{t.text}"
              </blockquote>

              {/* Author - Material 3 Avatar Style */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm"
                  style={{ backgroundColor: primary }}
                >
                  {t.name?.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 tracking-wide">
                    {t.role || "Verified Student"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CALL TO ACTION - Minimalist */}
        <div className="mt-16 text-center">
          <button 
            className="px-8 py-3 rounded-full font-medium transition-colors border border-gray-300 hover:bg-gray-50 text-gray-700"
          >
            Read more stories
          </button>
        </div>

      </div>
    </section>
  );
}