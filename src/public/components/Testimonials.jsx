import { useBranding } from "../../shared/hooks/useBranding";

export default function Testimonials() {
  const brand = useBranding();
  const reviews = brand.reviews || [];
  const primaryColor = brand.colors?.primary || "#1a73e8"; // Google Blue default

  // Material 3/Google style fallback palette for avatars
  const avatarColors = [
    "bg-blue-600",
    "bg-red-500",
    "bg-amber-500",
    "bg-green-600",
    "bg-purple-600",
    "bg-teal-600"
  ];

  // Helper to generate a stable background color per student name
  const getAvatarBgClass = (name) => {
    if (!name) return avatarColors[0];
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  if (!reviews.length) return null;

  return (
    <section className="py-20 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* HEADER - Google Style: Centered, clean, focused */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-google font-medium text-gray-900 tracking-tight">
            Loved by learners everywhere
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See how our platform is helping students achieve their goals through flexible, high-quality education.
          </p>
        </div>

        {/* TESTIMONIAL GRID - Clean Robust Grid Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max items-start">
          {reviews.map((t, i) => (
            <div
              key={i}
              className="flex flex-col justify-between h-full bg-white border border-gray-100 rounded-[24px] p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:border-gray-200"
            >
              <div>
                {/* Star Rating Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5">
                    {[...Array(t.rating || 5)].map((_, starIndex) => (
                      <svg 
                        key={starIndex} 
                        className="w-5 h-5 fill-current" 
                        viewBox="0 0 20 20" 
                        style={{ color: '#fbbc04' }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  {/* Subtle, premium design accent */}
                  <span className="text-4xl font-serif text-gray-200 select-none leading-none -mt-2">”</span>
                </div>

                {/* Quote Block with newline processing */}
                <blockquote className="text-gray-700 text-[15px] sm:text-base leading-relaxed mb-6 font-normal whitespace-pre-line tracking-wide">
                  "{t.text}"
                </blockquote>
              </div>

              {/* Author Footer Profile Block */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-gray-100 mt-auto">
                {/* Dynamically colored Avatar if your brand primary isn't strictly requested */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm shrink-0 ${getAvatarBgClass(t.name)}`}
                >
                  {t.name?.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 font-medium truncate" title={t.role}>
                    {t.role || "Verified Student"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CALL TO ACTION - Minimalist */}
        {/* <div className="mt-16 text-center">
          <button 
            className="px-8 py-3 rounded-full font-medium transition-colors border border-gray-300 hover:bg-gray-50 text-gray-700 shadow-sm"
          >
            Read more stories
          </button>
        </div> */}

      </div>
    </section>
  );
}