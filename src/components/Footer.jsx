import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

// Clean brand SVG icon
const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

function Footer() {
  const { openBooking, showToast } = useBooking();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes("@")) {
      setIsSubscribed(true);
      showToast("Thank you for subscribing to Vetlio Pet Health tips!", "success");
      setNewsletterEmail("");
    }
  };

  return (
    <>
      <footer className="bg-[#f6efe4] flex flex-col items-center justify-center pt-8 sm:pt-16">
        {/* Schedule Appointment Banner */}
        <div className="w-full max-w-5xl px-4 sm:px-6 mb-14 md:mb-20">
          <div className="bg-[#27221F] flex flex-col md:flex-row items-center justify-between rounded-3xl p-6 sm:p-10 md:p-12 gap-8 shadow-xl border border-stone-800">
            <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left">
              <span className="text-xs font-bold text-[#A0DF6D] uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full mb-3">
                Ready to get started?
              </span>
              <h3 className="text-[#FFFFFF] font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.05] uppercase">
                Schedule your appointment today
              </h3>
              <p className="text-stone-300 text-sm mt-3 font-medium">
                Give your furry companion the personalized attention and veterinary excellence they deserve.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <button
                  onClick={() => openBooking()}
                  className="bg-[#6E9B49] hover:bg-[#5b8c3d] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Now
                </button>
                <Link
                  to="/services"
                  className="text-stone-200 hover:text-white text-xs font-bold uppercase tracking-wider underline underline-offset-4 transition-colors"
                >
                  Explore All Services &rarr;
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/2 h-52 sm:h-64 md:h-72 overflow-hidden rounded-2xl">
              <img
                src="/AppointmentImage.png"
                alt="Vet examining pet with care"
                className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Main Footer Green Section */}
        <div className="bg-[#6E9B49] w-full rounded-t-[32px] sm:rounded-t-[48px] pt-14 md:pt-20 pb-10 px-6 sm:px-12 md:px-20 flex flex-col items-center text-white">
          <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl gap-10 md:gap-14">
            {/* Left Brand Area */}
            <div className="w-full md:w-4/12">
              <Link to="/" className="inline-block">
                <h1 className="text-white font-extrabold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter leading-none mb-3">
                  VETLIO
                </h1>
              </Link>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-sm">
                Gentle, modern, and compassionate veterinary healthcare for dogs, cats, and all cherished companion animals.
              </p>
              <div className="mt-6 flex items-center gap-2 text-white/95 text-xs font-semibold bg-black/15 px-3.5 py-2.5 rounded-xl w-fit backdrop-blur-xs">
                <Clock className="w-4 h-4 text-[#f6efe4]" />
                Mon - Sat: 8:00 AM - 8:00 PM • Sun: Emergencies
              </div>
            </div>

            {/* Middle Quick Links */}
            <div className="w-full md:w-2/12">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-stone-100 mb-4 pb-1 border-b border-white/20">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-white/85">
                <li>
                  <Link to="/" className="hover:text-white hover:underline transition-all">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white hover:underline transition-all">
                    About Our Clinic
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-white hover:underline transition-all">
                    All Services
                  </Link>
                </li>
                <li>
                  <Link to="/how-it-works" className="hover:text-white hover:underline transition-all">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/my-appointments" className="hover:text-white hover:underline transition-all">
                    My Appointments
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white hover:underline transition-all">
                    Contact & Emergency
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services Links */}
            <div className="w-full md:w-3/12">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-stone-100 mb-4 pb-1 border-b border-white/20">
                Featured Care
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-white/85">
                <li>
                  <Link to="/services/checkup" className="hover:text-white hover:underline transition-all">
                    General Health Checkup
                  </Link>
                </li>
                <li>
                  <Link to="/services/walking" className="hover:text-white hover:underline transition-all">
                    Dog Walking & Activity
                  </Link>
                </li>
                <li>
                  <Link to="/services/grooming" className="hover:text-white hover:underline transition-all">
                    Pet Grooming & Spa
                  </Link>
                </li>
                <li>
                  <Link to="/services/dental" className="hover:text-white hover:underline transition-all">
                    Dental Hygiene
                  </Link>
                </li>
                <li>
                  <Link to="/services/vaccines" className="hover:text-white hover:underline transition-all">
                    Vaccinations & Boosters
                  </Link>
                </li>
                <li>
                  <Link to="/services/emergency" className="hover:text-white hover:underline transition-all text-amber-200 font-bold">
                    24/7 Urgent Care
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div className="w-full md:w-3/12">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-stone-100 mb-4 pb-1 border-b border-white/20">
                Pet Health Tips
              </h4>
              <p className="text-white/80 text-xs mb-3">
                Subscribe for monthly vet-approved nutritional guides and seasonal pet wellness tips.
              </p>
              {isSubscribed ? (
                <div className="bg-white/20 p-3 rounded-xl flex items-center gap-2 text-xs font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" /> You're subscribed!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white text-[#27221F] px-3.5 py-2.5 rounded-xl text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#27221F] hover:bg-black text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Subscribe <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              <div className="mt-5 space-y-2 text-xs text-white/90">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#A0DF6D]" /> (555) 349-8720
                </p>
                <a
                  href="https://instagram.com/abdulmoezdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-amber-200 hover:text-white font-semibold transition"
                >
                  <InstagramIcon /> Made by Abdul Moez
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full max-w-6xl mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/75">
            <p>© {new Date().getFullYear()} Vetlio Pet Care. Crafted with 💚 by <span className="font-bold text-white">Abdul Moez</span>.</p>
            <div className="flex items-center gap-4">
              <a href="#privacy" className="hover:text-white transition">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-white transition">Terms of Care</a>
              <span>•</span>
              <a href="#faq" className="hover:text-white transition">FAQs</a>
            </div>
            <div className="flex items-center gap-3 text-white">
              <a
                href="https://instagram.com/abdulmoezdev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @abdulmoezdev"
                className="flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/25 rounded-full transition font-semibold text-xs shadow-2xs"
              >
                <InstagramIcon />
                <span>@abdulmoezdev</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
