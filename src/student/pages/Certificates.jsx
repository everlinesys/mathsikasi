import { useEffect, useState } from "react";
import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/useBranding";
import { Award, Download, FileCheck, Trophy, ExternalLink, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentCertificates() {
  const brand = useBranding();
  const theme = brand.theme;
  const primary = brand.colors?.primary || "#059669";
  const navigate = useNavigate();
  const [certs, setCerts] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get("/student/certificates");
        setCerts(data || []);
      } catch (err) {
        console.error("Certificates load error:", err);
        setCerts([]); // Fallback to empty array on error
      }
    }
    load();
  }, []);

  if (!certs) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-400 animate-pulse">Verifying your achievements...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-10">

      {/* HEADER: ACHIEVEMENT BANNER */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 lg:p-12 text-white shadow-2xl">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: primary }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold uppercase tracking-widest">
              <Award size={14} className="text-amber-400" /> Professional Credentials
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Your Achievements</h2>
            <p className="text-slate-400 text-sm md:text-base max-w-md leading-relaxed">
              Congratulations! Here are your officially verified certificates. You can download or share them directly on LinkedIn.
            </p>
          </div>

          <div className="hidden lg:block">
            <Trophy size={120} className="text-white/10 rotate-12" />
          </div>
        </div>
      </div>

      {/* EMPTY STATE: ENCOURAGEMENT */}
      {certs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white border border-dashed border-slate-200 rounded-[3rem] text-center space-y-6">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center">
            <GraduationCap size={40} className="text-slate-300" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">No certificates yet</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">
              Complete your first course to unlock your professional certificate and share it with the world!
            </p>
          </div>
          <button
            className="px-8 py-3 rounded-2xl text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-transform active:scale-95"
            style={{ backgroundColor: primary }}
            onClick={() => navigate("/courses")}
          >
            Browse Courses
          </button>
        </div>
      )}

      {/* CERTIFICATE GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certs.map((c) => (
          <div
            key={c.courseId}
            className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500"
          >
            {/* THUMBNAIL / PREVIEW AREA */}
            <div className="h-48 bg-slate-50 overflow-hidden relative">
              {c.thumbnail ? (
                <img
                  src={`${api.defaults.baseURL.replace("/api", "")}${c.thumbnail}`}
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition duration-700"
                  alt={c.title}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-300">
                  <FileCheck size={48} strokeWidth={1} />
                </div>
              )}

              {/* DATE OVERLAY */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-black uppercase tracking-tighter text-slate-600 shadow-sm">
                Issued {new Date(c.issuedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="p-7 space-y-5">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 leading-snug h-12 line-clamp-2">
                  {c.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-emerald-500" /> Verified ID: {c.courseId.slice(-6).toUpperCase()}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex gap-3">
                <a
                  href={`${api.defaults.baseURL}${c.downloadUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-grow flex items-center justify-center gap-2 py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/10 hover:brightness-110 transition-all"
                  style={{ backgroundColor: primary }}
                >
                  <Download size={16} /> PDF
                </a>

                <button className="px-4 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-component for simple shield
function ShieldCheck({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}