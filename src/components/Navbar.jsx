import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Calendar,
  User,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const userDropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { openBooking, appointments } = useBooking();
  const { user, profile, openAuthModal, signOut } = useAuth();

  const activeBookingsCount = appointments.filter(
    (a) => a.status === "Confirmed"
  ).length;

  const navLinks = [
    { label: "HOME", to: "/", sectionId: "hero" },
    { label: "SERVICES", to: "/services", sectionId: "services" },
    { label: "HOW IT WORKS", to: "/how-it-works", sectionId: "how-it-works" },
    { label: "ABOUT US", to: "/about", sectionId: "about" },
    { label: "CONTACT", to: "/contact", sectionId: "contact" },
    {
      label: "MY BOOKINGS",
      to: "/my-appointments",
      badge: activeBookingsCount > 0 ? activeBookingsCount : null
    }
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Track active section on scroll if on home page
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = ["hero", "services", "how-it-works", "about", "testimonials", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Smooth scroll handler for all navigation links (from top, middle, or bottom)
  const handleNavClick = (e, link) => {
    closeMobileMenu();

    // If it's a page link with no sectionId (like My Bookings)
    if (!link.sectionId) {
      return;
    }

    const targetElement = document.getElementById(link.sectionId);

    // If target section exists on current page (Home page)
    if (targetElement) {
      e.preventDefault();
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: link.sectionId === "hero" ? 0 : Math.max(0, elementPosition - navOffset),
        behavior: "smooth"
      });

      window.history.pushState(
        null,
        "",
        link.sectionId === "hero" ? "/" : `/#${link.sectionId}`
      );
    } else {
      // If we are on another route (e.g. /my-appointments), navigate to /#sectionId
      e.preventDefault();
      navigate(link.sectionId === "hero" ? "/" : `/#${link.sectionId}`);
    }
  };

  const handleLogoClick = (e) => {
    closeMobileMenu();
    const heroEl = document.getElementById("hero");
    if (heroEl) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Pet Parent";

  const isLinkActive = (link) => {
    if (location.pathname === "/" && link.sectionId) {
      return activeSection === link.sectionId;
    }
    return location.pathname === link.to;
  };

  return (
    <>
      <header className="w-full bg-[#f6efe4]/95 backdrop-blur-md sticky top-0 z-40 transition-all border-b border-[#ebdcc9]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="w-32 sm:w-36 h-11 sm:h-13 flex justify-center items-center bg-white rounded-xl shadow-xs px-3 hover:shadow-md transition-all group border border-[#ebdcc9]/50 shrink-0"
          >
            <img
              className="max-h-7 sm:max-h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="/VetlioLogo.png"
              alt="Vetlio Pet Care Logo"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 bg-white rounded-full px-4 xl:px-6 py-2 font-semibold text-xs xl:text-sm text-[#27221F] shadow-xs border border-[#ebdcc9]/50">
            {navLinks.map((link) => {
              const active = isLinkActive(link);
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer tracking-wider flex items-center gap-1.5 ${
                    active
                      ? "bg-[#70A352] text-white font-bold shadow-xs"
                      : "text-[#27221F]/80 hover:text-[#70A352] hover:bg-stone-50"
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="bg-amber-400 text-[#27221F] text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none shadow-2xs">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Right Controls (Auth & Booking) */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              /* User Avatar & Dropdown */
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 bg-white hover:bg-stone-50 text-[#27221F] px-4 py-2 rounded-full border border-[#ebdcc9] shadow-2xs transition cursor-pointer text-xs font-bold"
                >
                  <div className="w-6 h-6 rounded-full bg-[#70A352]/20 text-[#70A352] flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="max-w-[120px] truncate">{displayName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#ebdcc9] p-2 z-50 animate-modal-in">
                    <div className="px-3 py-2 border-b border-stone-100 mb-1">
                      <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Signed in as
                      </p>
                      <p className="text-xs font-bold text-[#27221F] truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/my-appointments"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#27221F] hover:bg-[#f6efe4] transition"
                    >
                      <Calendar className="w-4 h-4 text-[#70A352]" />
                      My Appointments
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Guest Mode: Sign In Button */
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="bg-white hover:bg-stone-50 text-[#27221F] border border-[#ebdcc9] px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-[#70A352]" />
                Sign In
              </button>
            )}

            {/* Book Appointment CTA */}
            <button
              onClick={() => openBooking()}
              className="bg-[#70A352] hover:bg-[#5b8c3d] active:scale-95 text-white px-5 xl:px-6 py-2.5 xl:py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {!user ? (
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="bg-white border border-stone-200 text-[#27221F] text-xs font-bold px-3 py-2 rounded-xl shadow-2xs flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5 text-[#70A352]" />
              </button>
            ) : (
              <Link
                to="/my-appointments"
                className="bg-white border border-[#ebdcc9] text-[#70A352] text-xs font-bold px-3 py-2 rounded-xl shadow-2xs flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
              </Link>
            )}

            <button
              onClick={() => openBooking()}
              className="bg-[#70A352] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-1.5 active:scale-95 transition-transform"
            >
              <Calendar className="w-3.5 h-3.5" /> Book
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white text-[#27221F] shadow-xs border border-stone-200 hover:bg-stone-50 transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden backdrop-blur-xs transition-opacity duration-300"
          onClick={closeMobileMenu}
        >
          <div
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#f6efe4] shadow-2xl p-6 flex flex-col justify-between border-l border-[#ebdcc9] animate-modal-in overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-5 border-b border-[#ebdcc9]">
                <img
                  className="h-7 w-auto object-contain"
                  src="/VetlioLogo.png"
                  alt="Vetlio Logo"
                />
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-xl bg-white text-stone-700 hover:bg-stone-100 transition shadow-2xs"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Greeting if Logged In */}
              {user ? (
                <div className="mt-4 p-3.5 bg-white rounded-2xl border border-[#ebdcc9] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#70A352]/20 text-[#70A352] flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#27221F]">
                        {displayName}
                      </p>
                      <p className="text-[11px] text-stone-500 truncate max-w-[140px]">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      signOut();
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-4 p-3 bg-white/70 rounded-2xl border border-[#ebdcc9] flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-600">
                    Browsing as Guest
                  </span>
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      openAuthModal("login");
                    }}
                    className="text-xs font-extrabold text-[#70A352] hover:underline uppercase tracking-wider"
                  >
                    Sign In &rarr;
                  </button>
                </div>
              )}

              {/* Navigation Items */}
              <ul className="mt-5 space-y-2">
                {navLinks.map((link) => {
                  const active = isLinkActive(link);
                  return (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        onClick={(e) => handleNavClick(e, link)}
                        className={`flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm tracking-wider uppercase transition shadow-2xs ${
                          active
                            ? "bg-[#70A352] text-white shadow-xs"
                            : "bg-white/80 hover:bg-white text-[#27221F] hover:text-[#70A352]"
                        }`}
                      >
                        <span>{link.label}</span>
                        {link.badge && (
                          <span className="bg-amber-400 text-[#27221F] text-xs font-black px-2 py-0.5 rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile Drawer Bottom CTA */}
            <div className="pt-6 border-t border-[#ebdcc9] space-y-3 mt-6">
              <button
                onClick={() => {
                  closeMobileMenu();
                  openBooking();
                }}
                className="w-full bg-[#70A352] hover:bg-[#5b8c3d] text-white font-bold py-3.5 px-4 rounded-xl text-center text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book an Appointment
              </button>
              <div className="text-center text-xs text-stone-600 font-medium">
                Emergency & Same-Day slots available
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
