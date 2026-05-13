import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
  ChevronDown,
  Loader2,
  CheckCircle2,
  GraduationCap,
  Globe,
} from "lucide-react";

import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/useBranding";

export default function TeacherRegistration() {
  const brand = useBranding();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",

    qualification: "",
    country: "",
    district: "",
    city: "",
    address: "",
    pincode: "",

    cv: null,
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [loadingCountries, setLoadingCountries] =
    useState(true);

  const [loadingStates, setLoadingStates] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [uploadingCv, setUploadingCv] =
    useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  // =========================================================
  // FETCH COUNTRIES
  // =========================================================

  useEffect(() => {
    fetch(
      "https://countriesnow.space/api/v0.1/countries/positions"
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setCountries(data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingCountries(false));
  }, []);

  // =========================================================
  // FETCH STATES
  // =========================================================

  useEffect(() => {
    if (!form.country) return;

    setLoadingStates(true);

    fetch(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: form.country,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.states) {
          setStates(data.data.states);
        } else {
          setStates([]);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingStates(false));
  }, [form.country]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  function handleChange(e) {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,

      ...(name === "country" && {
        district: "",
      }),
    }));
  }

  // =========================================================
  // PDF UPLOAD
  // =========================================================

  async function uploadCV() {
    if (!form.cv) return "";

    setUploadingCv(true);

    const safeName = form.cv.name.replace(
      /\s+/g,
      "-"
    );

    const filePath = `teacher-cv/${Date.now()}-${safeName}`;

    const uploadUrl = `https://storage.bunnycdn.com/${
      import.meta.env.VITE_BUNNY_STORAGE_ZONE
    }/${filePath}`;

    const res = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        AccessKey:
          import.meta.env.VITE_BUNNY_STORAGE_KEY,
        "Content-Type": "application/pdf",
      },
      body: form.cv,
    });

    if (!res.ok) {
      throw new Error("CV upload failed");
    }

    const fileUrl = `${
      import.meta.env.VITE_BUNNY_PULL_ZONE
    }/${filePath}`;

    return fileUrl;
  }

  // =========================================================
  // SUBMIT
  // =========================================================

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      !/^[0-9]{10}$/.test(
        form.phone.replace(/\D/g, "")
      )
    ) {
      return setError(
        "Enter valid 10-digit phone number"
      );
    }

    if (form.password.length < 6) {
      return setError(
        "Password must be at least 6 characters"
      );
    }

    if (!form.cv) {
      return setError("Please upload your CV");
    }

    if (form.cv.type !== "application/pdf") {
      return setError("Only PDF files allowed");
    }

    if (form.cv.size > 10 * 1024 * 1024) {
      return setError(
        "CV must be under 10MB"
      );
    }

    try {
      setLoading(true);

      // ===================================================
      // UPLOAD CV
      // ===================================================

      const cvUrl = await uploadCV();

      // ===================================================
      // CREATE USER
      // ===================================================

      await api.post("/auth/teacher-application", {
        name: form.name,
        email: form.email,
        password: form.password,

        phone: form.phone.replace(/\D/g, ""),

        qualification: form.qualification,

        country: form.country,
        district: form.district,
        city: form.city,
        address: form.address,
        pincode: form.pincode,

        cv: cvUrl,

        role: "teacher-application",
      });

      setSuccess(true);

      // RESET

      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",

        qualification: "",
        country: "",
        district: "",
        city: "",
        address: "",
        pincode: "",

        cv: null,
      });
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Application submission failed"
      );
    } finally {
      setLoading(false);
      setUploadingCv(false);
    }
  }

  // =========================================================
  // SUCCESS SCREEN
  // =========================================================

  if (success) {
    return (
      <section className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-white max-w-xl w-full rounded-3xl shadow-2xl p-10 text-center border border-slate-200">
          <div
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6"
            style={{
              background: `${brand.colors.primary}15`,
            }}
          >
            <CheckCircle2
              size={42}
              style={{
                color: brand.colors.primary,
              }}
            />
          </div>

          <h2 className="text-3xl font-black text-slate-900">
            Application Submitted
          </h2>

          <p className="text-slate-600 mt-4 leading-relaxed">
            Your teacher application has been
            received successfully.
            <br />
            Our team will review your profile and
            contact you soon.
          </p>
        </div>
      </section>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <section className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-12">
          <div
            className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-xl"
            style={{
              background: brand.colors.primary,
            }}
          >
            <GraduationCap
              className="text-white"
              size={38}
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Become a Teacher
          </h1>

          <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">
            Join our educator network and inspire
            students worldwide through high-quality
            teaching.
          </p>
        </div>

        {/* FORM */}

        <div className="bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden">

          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-12 space-y-10"
          >

            {/* PERSONAL */}

            <div>
              <SectionTitle
                icon={<User size={20} />}
                title="Personal Information"
              />

              <div className="grid md:grid-cols-2 gap-6">

                <Input
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  required
                />
              </div>
            </div>

            {/* QUALIFICATION */}

            <div>
              <SectionTitle
                icon={<GraduationCap size={20} />}
                title="Professional Information"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Qualification"
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  placeholder="MSc Mathematics"
                  required
                />

                <Input
                  label="Pincode"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="682001"
                />
              </div>
            </div>

            {/* LOCATION */}

            <div>
              <SectionTitle
                icon={<Globe size={20} />}
                title="Location"
              />

              <div className="grid md:grid-cols-3 gap-6 text-black">

                {/* COUNTRY */}

                <div className="relative">
                  <Label>Country</Label>

                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 outline-none transition-all"
                  >
                    <option value="">
                      {loadingCountries
                        ? "Loading..."
                        : "Select Country"}
                    </option>

                    {countries.map((c, idx) => (
                      <option
                        key={idx}
                        value={c.name}
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    className="absolute right-3 bottom-3.5 text-slate-400"
                    size={18}
                  />
                </div>

                {/* DISTRICT */}

                <div className="relative">
                  <Label>District / State</Label>

                  <select
                    name="district"
                    value={form.district}
                    onChange={handleChange}
                    disabled={
                      !form.country ||
                      loadingStates
                    }
                    required
                    className="w-full appearance-none bg-white border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 outline-none transition-all disabled:bg-slate-100"
                  >
                    <option value="">
                      {loadingStates
                        ? "Loading..."
                        : "Select District"}
                    </option>

                    {states.map((s, idx) => (
                      <option
                        key={idx}
                        value={s.name}
                      >
                        {s.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    className="absolute right-3 bottom-3.5 text-slate-400"
                    size={18}
                  />
                </div>

                <Input
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Kochi"
                  required
                />
              </div>

              <div className="mt-6">
                <Input
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Full address"
                />
              </div>
            </div>

            {/* CV */}

            <div>
              <SectionTitle
                icon={<Upload size={20} />}
                title="Upload CV"
              />

              <div className="relative group">
                <input
                  type="file"
                  name="cv"
                  accept="application/pdf"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="border-2 border-dashed border-slate-300 rounded-3xl p-10 text-center transition-all group-hover:border-slate-900 group-hover:bg-slate-50">

                  <Upload
                    className="mx-auto text-slate-400 mb-4"
                    size={36}
                  />

                  <p className="font-bold text-slate-800">
                    {form.cv
                      ? form.cv.name
                      : "Click to upload your CV"}
                  </p>

                  <p className="text-sm text-slate-500 mt-2">
                    PDF only • Max 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* ERROR */}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-2xl text-sm font-medium">
                {error}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: brand.colors.primary,
              }}
              className="w-full text-white py-5 rounded-2xl font-black text-lg shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={22}
                  />
                  {uploadingCv
                    ? "Uploading CV..."
                    : "Submitting..."}
                </>
              ) : (
                <>
                  Submit Application
                  <CheckCircle2 size={22} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// =============================================================
// HELPERS
// =============================================================

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
      <span className="text-slate-700">
        {icon}
      </span>

      <h2 className="text-xl font-black text-slate-900">
        {title}
      </h2>
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 block">
      {children}
    </label>
  );
}

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <Label>{label}</Label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400"
      />
    </div>
  );
}