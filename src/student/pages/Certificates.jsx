import { useEffect, useState } from "react";
import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/useBranding";
import {
  Award,
  Download,
  FileCheck,
  Trophy,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StudentCertificates() {
  const brand = useBranding();
  const primary = brand.colors?.primary || "#059669";
  const navigate = useNavigate();

  const [certs, setCerts] = useState(null);

  // ---------------- LOAD ----------------
  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get("/student/certificates");
        setCerts(data || []);
      } catch (err) {
        console.error("Certificates load error:", err);
        setCerts([]);
      }
    }
    load();
  }, []);

  // ---------------- LOADING ----------------
  if (!certs) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-sm text-slate-400">
          Loading your certificates...
        </p>
      </div>
    );
  }

  // ---------------- EMPTY ----------------
  if (certs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
          <GraduationCap size={40} className="text-slate-400" />
        </div>

        <h2 className="text-xl font-bold text-slate-800">
          No certificates yet
        </h2>

        <p className="text-slate-500 text-sm">
          Complete a course and pass the test to unlock your certificate.
        </p>

        <button
          onClick={() => navigate("/courses")}
          className="px-6 py-3 rounded-xl text-white text-sm font-semibold"
          style={{ backgroundColor: primary }}
        >
          Browse Courses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">

      {/* HEADER */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase text-slate-300">
            <Award size={14} /> Certificates
          </div>
          <h1 className="text-2xl font-bold mt-2">
            Your Achievements
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Download and share your verified certificates
          </p>
        </div>

        <Trophy size={60} className="text-white/10 hidden md:block" />
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {certs.map((c) => {
          const certId = `EDU-${String(c.courseId).padStart(6, "0")}`;

          return (
            <div
              key={c.courseId}
              className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
            >

              {/* PREVIEW */}
              <div className="h-40 bg-slate-100 flex items-center justify-center">
                {c.thumbnail ? (
                  <img
                    src={`${api.defaults.baseURL.replace("/api", "")}${c.thumbnail}`}
                    className="w-full h-full object-cover"
                    alt={c.title}
                  />
                ) : (
                  <FileCheck size={40} className="text-slate-300" />
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">

                <h3 className="font-semibold text-sm line-clamp-2">
                  {c.title}
                </h3>

                <p className="text-xs text-slate-400">
                  ID: {certId}
                </p>

                <p className="text-xs text-slate-400">
                  Issued{" "}
                  {new Date(c.issuedAt).toLocaleDateString()}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-2 pt-2">

                  <button
                    onClick={async () => {
                      try {
                        console.log(c.downloadUrl);
                        
                        const res = await api.get(c.downloadUrl.replace("/api", ""), {
                          responseType: "blob",
                        });

                        const url = window.URL.createObjectURL(new Blob([res.data]));
                        const link = document.createElement("a");

                        link.href = url;
                        link.setAttribute("download", "coursecompletioncertificate.pdf");
                        document.body.appendChild(link);
                        link.click();

                        link.remove();
                      } catch (err) {
                        console.error(err);
                        alert("Failed to download certificate");
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white text-xs font-semibold"
                    style={{ backgroundColor: primary }}
                  >
                    <Download size={14} /> PDF
                  </button>


                  {/* <button
                    onClick={() =>
                      navigate(`/certificate/${c.courseId}`)
                    }
                    className="px-3 py-2 bg-slate-100 rounded-lg"
                  >
                    <ExternalLink size={14} />
                  </button> */}

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}