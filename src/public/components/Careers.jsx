import React from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  Briefcase, 
  GraduationCap, 
  Users, 
  Atom, 
  Calculator, 
  Beaker 
} from "lucide-react";
import { useBranding } from "../../shared/hooks/useBranding";

export default function Careers() {
  const brand = useBranding();
  const primaryColor = brand.colors?.primary || "#1a73e8";

  const openings = [
    {
      title: "Mathematics Faculty",
      type: "Full-time / Part-time",
      level: "High School & Plus Two",
      icon: <Calculator className="w-6 h-6" />,
    },
    {
      title: "Physics Specialist",
      type: "Part-time",
      level: "Entrance Foundation (JEE/NEET)",
      icon: <Atom className="w-6 h-6" />,
    },
    {
      title: "Chemistry Educator",
      type: "Full-time",
      level: "Plus Two & Degree",
      icon: <Beaker className="w-6 h-6" />,
    },
  ];

  const handleApplyEmail = (jobTitle) => {
    const email = brand.contact?.email || "info@mathsikasi.com";
    const subject = encodeURIComponent(`Application for ${jobTitle} - Mathsikasi`);
    const body = encodeURIComponent(
      `Hello Mathsikasi Team,\n\nI am interested in applying for the ${jobTitle} position. Please find my CV attached.\n\nPhone Number: \nExperience: `
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans">
      {/* --- HERO SECTION --- */}
      <section className="bg-slate-900 text-white py-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              Join the <span className="text-blue-400">Future</span> of Science Education
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
              We are looking for passionate educators who can simplify Physics, Chemistry, and Maths for the next generation of achievers.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* --- WHY JOIN US BENTO GRID --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <Users className="text-blue-600 mb-4" size={32} />
            <h3 className="font-bold text-xl mb-2">Student-First Culture</h3>
            <p className="text-slate-500 text-sm">Join a team that prioritizes conceptual clarity over rote memorization.</p>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <GraduationCap className="text-emerald-600 mb-4" size={32} />
            <h3 className="font-bold text-xl mb-2">Growth Environment</h3>
            <p className="text-slate-500 text-sm">Regular workshops and resources to help you become a master educator.</p>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm">
            <Briefcase className="text-indigo-600 mb-4" size={32} />
            <h3 className="font-bold text-xl mb-2">Flexible Roles</h3>
            <p className="text-slate-500 text-sm">Opportunities for full-time commitment or part-time expert sessions.</p>
          </div>
        </div>

        {/* --- CURRENT OPENINGS --- */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Current Openings</h2>
          <div className="space-y-4">
            {openings.map((job, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 10 }}
                className="bg-white border border-slate-200 p-6 md:p-8 rounded-[24px] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-300 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                    {job.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{job.title}</h4>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {job.type}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {job.level}
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleApplyEmail(job.title)}
                  className="w-full md:w-auto px-8 py-3 rounded-full font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                  style={{ backgroundColor: primaryColor }}
                >
                  Apply Now <Send size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- FOOTER CTA --- */}
        <div className="bg-blue-600 rounded-[40px] p-10 md:p-16 text-center text-white">
          <h2 className="text-3xl font-black mb-4">Don't see a perfect fit?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto leading-relaxed">
            We are always looking for great talent in Physics, Chemistry, and Biology. Send your resume and we'll keep you in mind for future roles.
          </p>
          <button 
            onClick={() => handleApplyEmail("General Interest")}
            className="bg-white text-blue-600 px-10 py-4 rounded-full font-black shadow-xl hover:bg-slate-50 transition-colors"
          >
            Send General Resume
          </button>
        </div>
      </div>
    </div>
  );
}