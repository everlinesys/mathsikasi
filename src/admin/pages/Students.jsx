import { useEffect, useState } from "react";
import api from "../../shared/api";

export default function Students() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("students");

  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [assigningUser, setAssigningUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [uiModal, setUiModal] = useState({
    show: false,
    title: "",
    msg: "",
    onConfirm: null,
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const u = await api.get("/students");
    const c = await api.get("/courses");
    setUsers(u.data || []);
    setCourses(c.data || []);
  }

  function toggle(id) {
    setExpanded((p) => ({ ...p, [id]: !p[id] }));
  }

  const showAlert = (title, msg) =>
    setUiModal({ show: true, title, msg, onConfirm: null });

  const showConfirm = (title, msg, fn) =>
    setUiModal({ show: true, title, msg, onConfirm: fn });

  /* ================= CREATE USER ================= */

  async function addUser(e) {
    e.preventDefault();
    if (!email) return showAlert("Required", "Email required");

    await api.post("/admin/students", { name, email });

    setName("");
    setEmail("");
    setShowAdd(false);
    load();
    showAlert("Success", "User created");
  }

  /* ================= ACTIONS ================= */

  async function resetPassword(userId) {
    showConfirm(
      "Reset Password",
      "Send new password to user?",
      async () => {
        await api.post(`/admin/students/${userId}/reset-password`);
        setUiModal({ show: false });
      }
    );
  }

  async function toggleBlock(user) {
    const label = user.blocked ? "Unblock" : "Block";

    showConfirm(`${label} User`, `Confirm ${label.toLowerCase()}?`, async () => {
      await api.post(`/admin/students/${user.id}/block`);
      load();
      setUiModal({ show: false });
    });
  }

  async function assignCourse() {
    if (!assigningUser || !selectedCourse) return;

    await api.post(`/admin/students/${assigningUser.id}/assign-course`, {
      courseId: Number(selectedCourse),
    });

    setAssigningUser(null);
    setSelectedCourse("");
    load();
    showAlert("Assigned", "Course assigned");
  }

  /* ================= FILTER ================= */

  const filtered = users.filter(
    (u) =>
      u.email?.toLowerCase().includes(query.toLowerCase()) ||
      u.name?.toLowerCase().includes(query.toLowerCase())
  );

  const students = filtered.filter((u) => u.purchases?.length > 0);
  const visitors = filtered.filter((u) => !u.purchases?.length);

  const list = activeTab === "students" ? students : visitors;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 space-y-6">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-sm text-slate-400">
            Manage students, access, and enrollments
          </p>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          + Create User
        </button>
      </div>

      {/* ===== TABS & SEARCH ===== */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">

        <div className="flex bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 text-sm ${
              activeTab === "students"
                ? "bg-indigo-600"
                : "hover:bg-slate-800"
            }`}
          >
            Students ({students.length})
          </button>

          <button
            onClick={() => setActiveTab("visitors")}
            className={`px-4 py-2 text-sm ${
              activeTab === "visitors"
                ? "bg-indigo-600"
                : "hover:bg-slate-800"
            }`}
          >
            Visitors ({visitors.length})
          </button>
        </div>

        <input
          className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg text-sm w-full md:w-72"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* ===== USER LIST ===== */}
      <div className="space-y-3">

        {list.map((u) => (
          <div
            key={u.id}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
          >
            {/* USER HEADER */}
            <button
              onClick={() => toggle(u.id)}
              className="w-full flex justify-between items-center p-5 hover:bg-slate-800 transition"
            >
              <div className="text-left">
                <div className="font-semibold">
                  {u.name || "Unnamed User"}
                </div>
                <div className="text-xs text-slate-100">
                  {u.email}
                </div>
              </div>

              <span
                className={`transition-transform ${
                  expanded[u.id] ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {/* EXPANDED PANEL */}
            {expanded[u.id] && (
              <div className="border-t border-slate-800 p-5 space-y-5">

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => resetPassword(u.id)}
                    className="px-3 py-1 bg-slate-800 rounded text-xs"
                  >
                    Reset Password
                  </button>

                  <button
                    onClick={() => setAssigningUser(u)}
                    className="px-3 py-1 bg-indigo-600 rounded text-xs"
                  >
                    Assign Course
                  </button>

                  <button
                    onClick={() => toggleBlock(u)}
                    className={`px-3 py-1 rounded text-xs ${
                      u.blocked
                        ? "bg-emerald-600"
                        : "bg-rose-600"
                    }`}
                  >
                    {u.blocked ? "Unblock" : "Block"}
                  </button>
                </div>

                {/* PURCHASES */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase text-slate-400">
                    Enrollments
                  </h4>

                  {u.purchases?.length === 0 ? (
                    <div className="text-sm text-slate-500">
                      No enrollments
                    </div>
                  ) : (
                    u.purchases.map((p) => (
                      <div
                        key={p.id}
                        className="bg-slate-800 p-4 rounded-lg"
                      >
                        <div className="flex justify-between text-sm">
                          <span>{p.course?.title}</span>
                          <span className="text-slate-400">
                            {p.progressPercent ?? 0}%
                          </span>
                        </div>

                        <div className="mt-2 bg-slate-700 h-2 rounded">
                          <div
                            className="bg-indigo-500 h-full rounded"
                            style={{
                              width: `${p.progressPercent ?? 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ===== ADD USER MODAL ===== */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-8 rounded-xl w-full max-w-md space-y-4">

            <h3 className="text-lg font-bold">Create User</h3>

            <form onSubmit={addUser} className="space-y-3">
              <input
                className="w-full bg-slate-800 p-3 rounded"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full bg-slate-800 p-3 rounded"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="flex-1 bg-slate-700 py-2 rounded"
                >
                  Cancel
                </button>

                <button className="flex-1 bg-indigo-600 py-2 rounded">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
