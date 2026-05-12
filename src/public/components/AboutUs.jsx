import React from "react";
import { motion } from "framer-motion";
import {
  Atom,
  Beaker,
  Calculator,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Zap
} from "lucide-react";

export default function About() {
  return (
    <div className="bg-[#f8f9fa] text-slate-900 min-h-screen font-sans">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 px-6 md:px-16">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-8 backdrop-blur-md">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="font-medium tracking-wide uppercase text-[10px]">Premium PCM Coaching</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8">
            About <span className="text-blue-400">Mathsikasi</span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Empowering students through the core pillars of Science: 
            <span className="text-white font-semibold"> Physics, Chemistry, and Mathematics.</span> We transform complex theories into clear, actionable knowledge.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 md:px-16">
        {/* CORE PHILOSOPHY */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Mastering the <br />
              <span className="text-blue-600">Language of Science.</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-10">
              At Mathsikasi, we don't just teach subjects; we build analytical mindsets. 
              Whether it's the laws of Physics, the reactions of Chemistry, or the logic of Mathematics, 
              we ensure every student masters the <span className="font-bold text-slate-900">why</span> before the <span className="font-bold text-slate-900">how</span>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Conceptual Clarity in PCM",
                "Step-by-Step Derivations",
                "Numerical Problem Solving",
                "NEET/JEE Foundation",
                "Board Exam Mastery",
                "Personal Progress Tracking",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-slate-700 text-sm font-semibold bg-white p-3 rounded-2xl border border-slate-100 shadow-sm"
                >
                  <CheckCircle2 className="text-blue-600 w-5 h-5 flex-shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Bento Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">
              <Atom className="w-10 h-10 text-indigo-500 mb-4" />
              <h3 className="text-4xl font-black text-slate-900">100%</h3>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mt-1">Concept Focus</p>
            </div>
            
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200 mt-8">
              <Beaker className="w-10 h-10 text-emerald-500 mb-4" />
              <h3 className="text-4xl font-black text-slate-900">8+</h3>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mt-1">Specialized Subjects</p>
            </div>

            <div className="bg-slate-900 rounded-[32px] p-8 shadow-xl col-span-2 text-white relative overflow-hidden">
              <div className="relative z-10">
                <Calculator className="w-10 h-10 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold leading-tight mb-4">
                  “The science of today is the technology of tomorrow.”
                </h3>
                <p className="text-slate-400 text-sm">
                  We bridge the gap between textbook theory and real-world application.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
            </div>
          </div>
        </div>

        {/* PCM SUBJECTS SECTION */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Our Expertise</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Comprehensive academic support tailored for school, plus-two, and degree levels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Mathematics",
                icon: <Calculator className="w-6 h-6" />,
                color: "bg-blue-50 text-blue-600",
                desc: "From basic algebra to advanced calculus and degree-level pure maths.",
              },
              {
                title: "Physics",
                icon: <Atom className="w-6 h-6" />,
                color: "bg-indigo-50 text-indigo-600",
                desc: "Simplifying mechanics, optics, and thermodynamics through visual learning.",
              },
              {
                title: "Chemistry",
                icon: <Beaker className="w-6 h-6" />,
                color: "bg-emerald-50 text-emerald-600",
                desc: "Organic, Inorganic, and Physical Chemistry made logical and memorable.",
              },
            ].map((subject, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[32px] border border-slate-200 p-10 shadow-sm transition-all"
              >
                <div className={`${subject.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                  {subject.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{subject.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {subject.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* KERALA SYLLABUS BOX */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-blue-600 rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Kerala Syllabus Experts</h2>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
              Specialized coaching for Class 8–10 and Plus One/Two. 
              We focus on SCERT/NCERT patterns to ensure our students top their board exams.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               {["High School", "Higher Secondary", "Degree Level"].map(tag => (
                 <span key={tag} className="px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold border border-white/20">
                   {tag}
                 </span>
               ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
        </motion.div>

        {/* FOOTER */}
        <div className="mt-32 pt-12 border-t border-slate-200 text-center">
          <h3 className="text-3xl font-black text-slate-900 mb-2">Mathsikasi</h3>
          <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-xs">
            The Science of Excellence
          </p>
        </div>
      </div>
    </div>
  );
}