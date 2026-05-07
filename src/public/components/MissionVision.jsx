import { useBranding } from "../../shared/hooks/useBranding";

export default function MissionVision() {
  const brand = useBranding();
  const primary = brand?.primaryColor || "#1e3a8a";

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-14">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: primary }}
          >
            Our Mission & Vision
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Driving excellence in psychology, behavioural science, and human development through education, research, and professional training.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* MISSION */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4" style={{ borderColor: primary }}>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: primary }}>
              Mission
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>• Promote scientific understanding of human behaviour and psychology</li>
              <li>• Provide accessible and meaningful learning opportunities</li>
              <li>• Support research and innovation in behavioural sciences</li>
              <li>• Build a community focused on mental wellbeing and ethics</li>
              <li>• Empower individuals with emotional intelligence and skills</li>
            </ul>
          </div>

          {/* VISION */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4" style={{ borderColor: primary }}>
            <h3 className="text-2xl font-semibold mb-4" style={{ color: primary }}>
              Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To become a globally respected council dedicated to advancing mind sciences,
              behavioural research, and psychological education — contributing to a more
              emotionally intelligent, mentally healthy, and professionally competent society.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}