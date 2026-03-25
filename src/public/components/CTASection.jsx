import { useNavigate } from "react-router-dom";
import { useBranding } from "../../shared/hooks/useBranding";
export default function CTASection() {
  const navigate = useNavigate();
  const brand = useBranding();

  return (
    <section className="bg-emerald-600/60 text-white py-16"
      style={{ background: brand.colors.primary }}>
      <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl font-bold">
          Ready to start learning?
        </h2>

        <p className="text-gray-300">
          Join thousands of students already learning on {brand.siteName}.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-white text-black rounded-full font-medium"
          style={{ backgroundColor: brand.colors.accent, color: brand.colors.primary, borderRadius: "50px" }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
