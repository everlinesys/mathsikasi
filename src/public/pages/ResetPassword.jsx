import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/useBranding";
import { Mail, ArrowLeft } from "lucide-react";

export default function PasswordReset() {
  const brand = useBranding();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // BACKEND APPEND HERE
      await api.post("/auth/forgot-password", {
        email,
      });

      setSuccess(
        "Password reset link has been sent to your email."
      );

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Unable to process request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">

        {/* Back */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-6 hover:underline"
          style={{ color: brand.colors.primary }}
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>

        {/* Header */}
        <div className="text-center mb-8">

          <div
            className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
            style={{
              background: brand.colors.primary,
            }}
          >
            <Mail size={30} color="#fff" />
          </div>

          <h1 className="text-3xl font-black text-gray-900">
            Reset Password
          </h1>

          <p className="text-gray-500 mt-3 text-sm">
            Enter your registered email address and we’ll send you a password reset link.
          </p>

        </div>

        {/* Form */}
        <form onSubmit={handleReset} className="space-y-5">

          {/* Email */}
          <div>

            <label className="text-sm font-bold text-gray-700 mb-2 block">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-2xl border border-red-100">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-2xl border border-green-100">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-bold rounded-2xl transition-all active:scale-[0.98] ${brand.theme.button.primary} ${brand.theme.shape?.radius || ""
              }`}
            style={{
              background: brand.colors.primary,
            }}
          >
            {loading
              ? "Sending Reset Link..."
              : "Send Reset Link"}
          </button>

        </form>

      </div>
    </section>
  );
}