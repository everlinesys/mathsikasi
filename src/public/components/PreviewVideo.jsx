import { useBranding } from "../../shared/hooks/useBranding";
import VideoPlayer from "../../shared/video/VideoPlayer";

export default function PreviewVideo() {
  const brand = useBranding();
  const preview = brand.preview || {};

  // Placeholder logic for video/poster
  const videoId = preview.bunnyVideoId || brand.hero?.bunnyVideoId;
  const poster = preview.poster || brand.hero?.image;

  return (
    <section className="relative py-12 md:py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl shadow-black/5 grid lg:grid-cols-2 items-center">
          
          {/* MEDIA SECTION */}
          <div className="relative group aspect-video lg:aspect-square bg-black flex items-center justify-center overflow-hidden">
            {/* 
               Uncomment VideoPlayer when ready. 
               The img below acts as a high-fidelity placeholder/fallback 
            */}
            <img 
              src={poster} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt="Course Preview" 
            />
            
            {/* Play Button Overlay (Visual hint for video) */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl transform transition group-hover:scale-110">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-black border-b-[10px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="p-8 md:p-12 lg:p-16">
            <div 
              className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 text-white"
              style={{ backgroundColor: brand.colors.primary }}
            >
              Class Preview
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
              {preview.title}{" "}
              <span style={{ color: brand.colors.primary }}>
                {preview.highlight}
              </span>
            </h2>

            <div 
              className="w-12 h-1 mb-6 rounded-full" 
              style={{ backgroundColor: brand.colors.primary }}
            />

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              {preview.description || "Experience our unique teaching methodology designed to make complex concepts simple and engaging."}
            </p>

            {/* Optional Feature list for more value-driven design */}
            <ul className="space-y-3">
              {['Expert Mentors', 'Interactive Sessions'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-bold text-gray-700">
                   <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px]" style={{ background: brand.colors.primary }}>✓</span>
                   {item}
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}