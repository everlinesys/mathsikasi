import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getUser } from "../../shared/auth";
import { useBranding } from "../../shared/hooks/useBranding";
import { Menu, X, ArrowRight } from "lucide-react";

export default function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const user = getUser();
  const brand = useBranding();

  const toggleMenu = () => setIsOpen(!isOpen);

  const activeClassName =
    "relative md:after:absolute md:after:bottom-[-4px] md:after:left-0 md:after:w-full md:after:h-[2px]";

  const navLinkClasses = ({ isActive }) =>
    `transition-all duration-200 font-medium ${
      isActive
        ? `opacity-100 ${activeClassName}`
        : "opacity-60 hover:opacity-100"
    }`;

  const navLinks = [
    { to: "/courses", label: "Courses" },
    { to: "/aboutus", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-[100] w-full backdrop-blur-md border-b border-black/5"
        style={{
          backgroundColor: "rgba(255,255,255,0.92)",
          color: brand.colors.primary || "#13205f",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group z-[120]">

            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.siteName}
                className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            ) : (
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center text-lg font-black text-white shadow-lg"
                style={{ background: brand.colors.primary }}
              >
                {brand.siteName?.charAt(0)}
              </div>
            )}

            <span
              className="font-black text-lg md:text-xl tracking-tight"
              style={{ color: brand.colors.primary }}
            >
              {brand.siteName}
            </span>

          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] tracking-tight">

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClasses}
              >
                {link.label}
              </NavLink>
            ))}

          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-4">

              {/* PROMINENT TUTOR BUTTON */}
              <Link
                to="/tutor-registration"
                className="px-5 py-2.5 rounded-full text-sm font-black shadow-xl hover:scale-105 transition-all animate-pulse"
                style={{
                  background: brand.colors.accent || "#ef4444",
                  color: "#fff",
                }}
              >
                Join as Tutor
              </Link>

              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-bold hover:opacity-70 transition"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/register"
                    className="px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                    style={{
                      background: brand.colors.primary || "#1a73e8",
                      color: "#fff",
                    }}
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <Link
                  to={
                    user.role === "ADMIN"
                      ? "/admin"
                      : user.role === "TEACHER"
                      ? "/teacher"
                      : "/student"
                  }
                  className="px-5 py-2 rounded-full text-sm font-bold border-2"
                  style={{
                    borderColor: brand.colors.primary,
                    color: brand.colors.primary,
                  }}
                >
                  Dashboard
                </Link>
              )}

            </div>

            {/* MOBILE HAMBURGER */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-xl bg-white shadow-md border border-black/5 hover:bg-gray-100 transition z-[120]"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X size={28} color={brand.colors.primary || "#111"} />
              ) : (
                <Menu size={28} color={brand.colors.primary || "#111"} />
              )}
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`
          fixed inset-0 bg-white z-[110] md:hidden
          transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
        `}
      >

        {/* TOP BAR */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-black/5">

          <div
            className="font-black text-xl"
            style={{ color: brand.colors.primary }}
          >
            {brand.siteName}
          </div>

          <button
            onClick={toggleMenu}
            className="p-2 rounded-xl bg-gray-100"
          >
            <X size={26} color={brand.colors.primary || "#111"} />
          </button>

        </div>

        {/* MENU LINKS */}
        <div className="flex flex-col px-6 py-8">

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={toggleMenu}
              className="text-3xl font-black py-5 border-b border-black/5 flex items-center justify-between"
              style={{ color: brand.colors.primary }}
            >
              {link.label}

              <ArrowRight
                size={26}
                className="opacity-20"
              />
            </NavLink>
          ))}

          {/* JOIN AS TUTOR */}
          <Link
            to="/tutor-registration"
            onClick={toggleMenu}
            className="mt-8 w-full py-4 rounded-2xl text-center font-black text-white shadow-2xl text-lg"
            style={{
              background: brand.colors.accent || "#ef4444",
            }}
          >
            Join as Tutor
          </Link>

          {/* ACTIONS */}
          <div className="mt-6 flex flex-col gap-4">

            {!user ? (
              <>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="w-full py-4 rounded-2xl text-center font-bold text-white shadow-xl"
                  style={{
                    background: brand.colors.primary,
                  }}
                >
                  Get Started
                </Link>

                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="w-full py-4 rounded-2xl text-center font-bold border-2"
                  style={{
                    borderColor: brand.colors.primary,
                    color: brand.colors.primary,
                  }}
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link
                to={
                  user.role === "ADMIN"
                    ? "/admin"
                    : user.role === "TEACHER"
                    ? "/teacher"
                    : "/student"
                }
                onClick={toggleMenu}
                className="w-full py-4 rounded-2xl text-center font-bold text-white"
                style={{
                  background: brand.colors.primary,
                }}
              >
                Go to Dashboard
              </Link>
            )}

          </div>
        </div>
      </div>
    </>
  );
}