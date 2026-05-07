import { NavLink, useNavigate } from "react-router-dom";
import {
    MdDashboard,
    MdMenuBook,
    MdWorkspacePremium,
    MdPerson,
    MdSecurity,
    MdHistory,
    MdLogout,
} from "react-icons/md";

export default function StudentSidebar({ closeSidebar }) {

    const navigate = useNavigate();

    const menu = [
        { name: "Dashboard", path: "/student", icon: <MdDashboard size={18} /> },
        { name: "My Courses", path: "/student/my-courses", icon: <MdMenuBook size={18} /> },
        { name: "Certificates", path: "/student/certificates", icon: <MdWorkspacePremium size={18} /> },
        { name: "Profile", path: "/student/profile", icon: <MdPerson size={18} /> },
        { name: "Security", path: "/student/security", icon: <MdSecurity size={18} /> },
        { name: "History", path: "/student/history", icon: <MdHistory size={18} /> },
    ];

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <aside className="w-64 bg-white border-r min-h-screen flex flex-col p-5">

            {/* ===== TOP ===== */}
            <div>
                <h2 className="text-xl font-bold mb-8 text-gray-800">
                    Student Panel
                </h2>

                <nav className="space-y-2">
                    {menu.map((item) => (
                        <NavLink
                            onClick={closeSidebar}
                            key={item.name}
                            to={item.path}
                            end={item.path === "/student"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition 
                ${isActive
                                    ? "bg-black text-white"
                                    : "hover:bg-gray-100 text-gray-700"
                                }`
                            }
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* ===== BOTTOM SECTION ===== */}
            <div className="mt-auto space-y-6">

                {/* ⭐ TOTAL PROGRESS */}
                <div className="p-4 rounded-xl bg-gray-50 border">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Total Progress
                    </p>

                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        {/* Replace 65 with API value later */}
                        <div
                            className="h-full bg-black"
                            style={{ width: "65%" }}
                        />
                    </div>

                    <p className="text-xs text-blue-600 mt-2">
                         “An investment in knowledge pays the best interest.” - Benjamin Franklin
                    </p>
                </div>

                {/* ⭐ LOGOUT BUTTON */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                    <MdLogout size={18} />
                    Logout
                </button>

            </div>
        </aside>
    );
}
