import React from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  BookOpen,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen font-sans">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 px-6 md:px-16">

        {/* Glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm mb-6">
            <Calculator className="w-4 h-4 text-blue-400" />
            Trusted Tuition Centre
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            About <span className="text-blue-400">Mathsikasi</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Mathsikasi helps students build strong academic foundations through
            clear explanations, concept-based learning, and exam-focused guidance.
            We make Maths easier, simpler, and more confident for every student.
          </p>
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-24 md:px-16">

        {/* ABOUT */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Strong Foundations.
              <span className="text-blue-500"> Confident Students.</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              At Mathsikasi, we focus on helping students truly understand concepts
              instead of memorizing formulas. Every topic is simplified step-by-step
              so students can solve problems independently and perform confidently
              in exams.
            </p>

            <div className="space-y-4">
              {[
                "Concept-Based Learning",
                "Step-by-Step Problem Solving",
                "Exam-Oriented Preparation",
                "Personal Attention & Guidance",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-slate-700 font-medium"
                >
                  <CheckCircle2 className="text-blue-500 w-5 h-5" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-5"
          >

            <div className="bg-white rounded-3xl p-8 shadow-sm border">
              <BookOpen className="w-8 h-8 text-blue-500 mb-4" />

              <h3 className="text-3xl font-bold">
                500+
              </h3>

              <p className="text-slate-500 mt-2">
                Students Guided
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border">
              <GraduationCap className="w-8 h-8 text-blue-500 mb-4" />

              <h3 className="text-3xl font-bold">
                8+
              </h3>

              <p className="text-slate-500 mt-2">
                Academic Levels
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border col-span-2">
              <Calculator className="w-8 h-8 text-blue-500 mb-4" />

              <h3 className="text-2xl font-bold italic">
                “Understanding beats memorizing.”
              </h3>

              <p className="text-slate-500 mt-3">
                Simplified learning for better results and stronger confidence.
              </p>
            </div>
          </motion.div>
        </div>

        {/* COURSES */}
        <div className="mt-28">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold mb-4">
              What We Teach
            </h2>

            <p className="text-slate-500 max-w-2xl mx-auto">
              Structured academic support from school level to degree level.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                title: "Kerala Syllabus (Class 8–10)",
                desc: "Complete Maths guidance with exam-oriented preparation.",
              },
              {
                title: "Plus One & Plus Two",
                desc: "Advanced Maths coaching with board exam strategies.",
              },
              {
                title: "Degree Level Maths",
                desc: "Simplified explanations for higher-level concepts.",
              },
              {
                title: "Hindi & Other Subjects",
                desc: "Additional academic support with structured learning.",
              },
            ].map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl border p-8 shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-2xl font-bold mb-3">
                  {course.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {course.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-28 pt-10 border-t text-center">

          <h3 className="text-3xl font-bold mb-3">
            Mathsikasi
          </h3>

          <p className="text-slate-500">
            Master Maths with Confidence
          </p>
        </div>
      </div>
    </div>
  );
}