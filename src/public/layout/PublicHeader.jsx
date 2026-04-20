import { Link, NavLink } from "react-router-dom";
import { getUser } from "../../shared/auth";
import { useBranding } from "../../shared/hooks/useBranding";
import themes from "../../config/themes.json" // make sure this exists

export default function PublicHeader() {
  const user = getUser();
  const brand = useBranding();

  // ✅ get theme config safely
  const theme = themes?.[brand.theme] || themes.softSaaSMarketing;

  return (
    <header className={`${theme.layout.header} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-3 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className={`${theme.text.title} text-lg`}
        > 
        <img src="/logo.png" alt="" className="h-19"/>
          {/* {brand.siteName?.toUpperCase() || "ELearn"} */}
        </Link>

        {/* Navigation */}
        <nav className={`hidden md:flex gap-6 text-sm ${theme.text.body}`}>
          <NavLink
            to="/courses"
            className="hover:opacity-80 transition"
          >
            Courses
          </NavLink>

          <NavLink
            to="/contact"
            className="hover:opacity-80 transition"
          >
            Contact
          </NavLink>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4 text-sm">

          {!user && (
            <>
              <Link
                to="/login"
                className={`${theme.text.body} hover:opacity-80`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`${theme.button.primary} px-4 py-2 ${theme.shape.buttonRadius}`}
                style={{
                  background: brand.colors?.accent,
                }}
              >
                Get Started
              </Link>
            </>
          )}

          {user?.role === "student" && (
            <Link
              to="/student"
              className={`${theme.button.secondary} px-4 py-2 ${theme.shape.buttonRadius}`}
            >
              Dashboard
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link
              to="/admin"
              className={`${theme.button.secondary} px-4 py-2 ${theme.shape.buttonRadius}`}
            >
              Admin Panel
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}