import { MdMenu, MdNotifications, MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../shared/auth";
import { useBranding } from "../../shared/hooks/useBranding";

export default function StudentHeader({ onMenuClick }) {
    const navigate = useNavigate();
    const user = getUser();
    const brand= useBranding();

    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">

            {/* ===== LEFT SIDE ===== */}
            <div className="flex  items-center gap-3">

                {/* ⭐ HAMBURGER (mobile only) */}
                <button
                    onClick={onMenuClick}
                    className="lg:hidden text-gray-700 "
                    style={{background:"transparent", color: "gray", padding:"0px"}}
                >
                    <MdMenu size={24} />
                </button>

                <h1 className="text-md lg:text-lg font-semibold text-gray-800" style={{fontSize:"medium" , fontWeight:"bold"}}>
                    {brand.siteName}
                </h1>
            </div>

            {/* ===== RIGHT SIDE ===== */}
            <div className="flex items-center gap-5">
                {/* <button>
                    <MdNotifications size={20} />
                </button> */}

                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/student/profile")}
                >
                    <MdPerson size={20} />
                    <span className=" text-sm font-medium">
                        {user?.name || "Student"}
                    </span>
                </div>
            </div>
        </header>
    );
}
