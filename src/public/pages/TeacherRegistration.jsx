import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Upload,
  ChevronDown,
  Loader2,
  CheckCircle2
} from "lucide-react";

export default function TeacherRegistration() {
  // State for Form Data
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subjects: "",
    qualification: "",
    experience: "",
    country: "",
    state: "",
    city: "",
    about: "",
    cv: null,
  });

  // State for API Data
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);

  // 1. Fetch Countries on Mount
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setCountries(data.data);
        }
      })
      .catch((err) => console.error("Error fetching countries:", err))
      .finally(() => setLoadingCountries(false));
  }, []);

  // 2. Fetch States when Country changes
  useEffect(() => {
    if (form.country) {
      setLoadingStates(true);
      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: form.country }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data && data.data.states) {
            setStates(data.data.states);
          } else {
            setStates([]);
          }
        })
        .catch((err) => console.error("Error fetching states:", err))
        .finally(() => setLoadingStates(false));
    }
  }, [form.country]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
      // Reset state and city if country changes
      ...(name === "country" && { state: "", city: "" }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Submission:", form);
    alert("Application sent successfully!");
  };

  return (
    <section className="min-h-screen bg-slate-100 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Become a Tutor
          </h1>
          <p className="text-slate-600 mt-3 text-lg">
            Join our global network of professional educators.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
            
            {/* Personal Details */}
            <div>
              <SectionTitle icon={<User size={20} />} title="Personal Details" />
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} placeholder="e.g. Jane Doe" />
                <Input label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" />
                <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                <Input label="Highest Qualification" name="qualification" value={form.qualification} onChange={handleChange} placeholder="M.Sc. Education" />
              </div>
            </div>

            {/* Teaching Details */}
            <div>
              <SectionTitle icon={<Briefcase size={20} />} title="Teaching Background" />
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Subjects" name="subjects" value={form.subjects} onChange={handleChange} placeholder="Mathematics, Physics" />
                <Input label="Years of Experience" name="experience" value={form.experience} onChange={handleChange} placeholder="5 Years" />
              </div>
            </div>

            {/* Location with API Logic */}
            <div>
              <SectionTitle icon={<MapPin size={20} />} title="Location" />
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Country Dropdown */}
                <div className="relative">
                  <Label>Country</Label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full appearance-none bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="">{loadingCountries ? "Loading..." : "Select Country"}</option>
                    {Array.isArray(countries) && countries.map((c, idx) => (
                      <option key={idx} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 bottom-3.5 text-slate-400 pointer-events-none" size={18} />
                </div>

                {/* State Dropdown */}
                <div className="relative">
                  <Label>State / Province</Label>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    disabled={!form.country || loadingStates}
                    className="w-full appearance-none bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">{loadingStates ? "Loading..." : "Select State"}</option>
                    {Array.isArray(states) && states.map((s, idx) => (
                      <option key={idx} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 bottom-3.5 text-slate-400 pointer-events-none" size={18} />
                </div>

                <Input label="City" name="city" value={form.city} onChange={handleChange} placeholder="e.g. New York" />
              </div>
            </div>

            {/* About & CV */}
            <div className="space-y-6">
              <div>
                <Label>About Yourself</Label>
                <textarea
                  name="about"
                  rows={4}
                  value={form.about}
                  onChange={handleChange}
                  placeholder="Share your teaching philosophy..."
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-2xl px-4 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                />
              </div>

              <div className="relative group cursor-pointer">
                <input
                  type="file"
                  name="cv"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center group-hover:border-blue-500 group-hover:bg-blue-50 transition-all">
                  <Upload className="mx-auto text-slate-400 group-hover:text-blue-500 mb-2" size={32} />
                  <p className="text-slate-700 font-bold">
                    {form.cv ? form.cv.name : "Click to upload CV / Resume"}
                  </p>
                  <p className="text-sm text-slate-400">PDF, DOC, DOCX up to 10MB</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              Submit Application
              <CheckCircle2 size={22} />
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}

/* Helper Components to keep the main code clean */

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
      <span className="text-blue-600">{icon}</span>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
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

function Input({ label, type = "text", name, value, onChange, placeholder }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300 font-medium"
      />
    </div>
  );
}