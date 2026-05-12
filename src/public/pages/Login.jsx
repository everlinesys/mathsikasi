import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/useBranding";

export default function Login() {
  const brand = useBranding();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      if (data.user.role === "ADMIN") navigate("/admin");
      else if (data.user.role === "TEACHER") navigate("/teacher");
      else navigate("/student");

    } catch (err) {
      setPopup(true);

      setTimeout(() => setPopup(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10 text-black">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">

        {/* Header */}
        <div className="text-center mb-8">

          <h2 className="text-3xl font-black text-gray-900">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-2">
            Login to continue to {brand.siteName}
          </p>

        </div>

        {/* Email */}
        <div className="mb-5 ">

          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Password */}
        <div className="mb-3">

          <label className="text-sm font-bold text-gray-700 mb-2 block">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-6">

          <Link
            to="/forgot-password"
            className="text-sm font-semibold hover:underline"
            style={{ color: brand.colors.primary }}
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 text-white font-bold rounded-2xl transition-all active:scale-[0.98] ${brand.theme.button.primary} ${brand.theme.shape?.radius || ""
            }`}
          style={{
            background: brand.colors.primary,
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register */}
        <p className="text-center text-gray-600 mt-6">

          New to {brand.siteName}?{" "}

          <Link
            to="/register"
            className="font-bold hover:underline"
            style={{ color: brand.colors.primary }}
          >
            Register Here
          </Link>

        </p>

        {/* Popup */}
        {popup && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-5 py-3 rounded-2xl shadow-2xl z-50">
            Invalid credentials. Please try again.
          </div>
        )}

      </div>
    </div>
  );
}