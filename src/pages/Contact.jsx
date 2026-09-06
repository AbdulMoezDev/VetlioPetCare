import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  PhoneCall,
  Calendar
} from "lucide-react";
import { useBooking } from "../context/BookingContext";

function Contact() {
  const { openBooking, showToast } = useBooking();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    petType: "Dog",
    subject: "General Inquiry",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    setIsSubmitted(true);
    showToast("Message sent successfully! Our team will respond within 2-4 hours.", "success");
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      petType: "Dog",
      subject: "General Inquiry",
      message: ""
    });
    setIsSubmitted(false);
  };

  return (
    <div className="bg-[#f6efe4] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-[#70A352] uppercase tracking-widest bg-white/80 px-4 py-1.5 rounded-full border border-[#ebdcc9] inline-block mb-3 shadow-2xs">
            We're Here For You & Your Pets
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#27221F] uppercase tracking-tight leading-tight">
            Contact & Clinic Location
          </h1>
          <p className="text-stone-600 text-sm sm:text-base md:text-lg mt-3 font-medium">
            Have questions about an upcoming checkup, dietary plan, or need emergency assistance? Reach out to our friendly veterinary team.
          </p>
        </div>

        {/* 2-Column Section: Info on Left, Interactive Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ebdcc9] shadow-xs">
              <h3 className="text-2xl font-extrabold text-[#27221F] uppercase tracking-tight mb-6">
                Clinic Information
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#70A352]/20 text-[#70A352] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#27221F] uppercase text-xs">
                      Main Clinic Address
                    </h5>
                    <p className="text-stone-600 mt-0.5 leading-relaxed font-medium">
                      452 Paws & Claws Boulevard, Suite 100<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#27221F] uppercase text-xs">
                      Appointments & Front Desk
                    </h5>
                    <p className="text-stone-600 mt-0.5 font-medium">
                      (555) 349-8720
                    </p>
                    <p className="text-xs text-stone-400 font-semibold">
                      Toll-free: +1 (800) VET-CARE
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#27221F] uppercase text-xs">
                      Developer & Support
                    </h5>
                    <p className="text-stone-700 mt-0.5 font-bold">
                      Made by Abdul Moez
                    </p>
                    <a
                      href="https://instagram.com/abdulmoezdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#70A352] hover:underline font-bold inline-block mt-0.5"
                    >
                      Instagram: @abdulmoezdev
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ebdcc9] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#70A352]" />
                  <h4 className="font-extrabold text-lg text-[#27221F] uppercase">
                    Operating Hours
                  </h4>
                </div>
                <span className="bg-[#E7F5E4] text-[#70A352] text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Open Now
                </span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-stone-100 font-medium">
                  <span className="text-stone-600">Monday – Friday</span>
                  <span className="font-bold text-[#27221F]">8:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-stone-100 font-medium">
                  <span className="text-stone-600">Saturday</span>
                  <span className="font-bold text-[#27221F]">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 font-medium">
                  <span className="text-stone-600">Sunday</span>
                  <span className="font-bold text-amber-600">Emergency Triage Only</span>
                </div>
              </div>
            </div>

            {/* 24/7 Emergency Card */}
            <div className="bg-[#27221F] text-white rounded-3xl p-6 border border-stone-800">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-extrabold text-red-400 uppercase tracking-widest">
                  24/7 Trauma & Urgent Line
                </span>
              </div>
              <p className="text-xs text-stone-300 mb-4 font-medium">
                For sudden collapse, bleeding, or poison ingestion, call our direct emergency dispatch line immediately:
              </p>
              <a
                href="tel:5559117387"
                className="bg-red-500 hover:bg-red-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition w-full shadow-md"
              >
                <PhoneCall className="w-4 h-4" /> (555) 911-PETS
              </a>
            </div>
          </div>

          {/* Right Column: Contact & Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#ebdcc9] shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-bold text-[#70A352] uppercase tracking-widest">
                  Send a Direct Message
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#27221F] uppercase tracking-tight mt-1">
                  How Can We Help You Today?
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm font-medium mt-1">
                  Fill in your details below and our clinic staff will get back to you promptly.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#E7F5E4] text-[#70A352] flex items-center justify-center mb-4 ring-8 ring-[#E7F5E4]/50">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-[#27221F] mb-2">
                    Message Received!
                  </h4>
                  <p className="text-stone-600 text-sm max-w-md mb-6 leading-relaxed">
                    Thank you, <span className="font-bold text-[#27221F]">{formData.name}</span>. A copy of your inquiry has been forwarded to our veterinary coordinators.
                  </p>
                  <button
                    onClick={handleResetForm}
                    className="bg-[#70A352] hover:bg-[#5b8c3d] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-[#27221F] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#70A352] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. sarah@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-[#27221F] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#70A352] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. (555) 019-2834"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-[#27221F] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#70A352] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1.5">
                        Pet Type
                      </label>
                      <select
                        value={formData.petType}
                        onChange={(e) =>
                          setFormData({ ...formData, petType: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-[#70A352] focus:bg-white"
                      >
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Exotic">Reptile / Exotic</option>
                        <option value="Other">Other Pet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-[#27221F] focus:outline-none focus:ring-2 focus:ring-[#70A352] focus:bg-white"
                    >
                      <option value="General Inquiry">General Question</option>
                      <option value="Appointment Question">Appointment Inquiry</option>
                      <option value="Prescription Refill">Prescription & Diet Refill</option>
                      <option value="Vaccination Records">Vaccination & Health Records</option>
                      <option value="Feedback">Feedback / Testimonial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#27221F] uppercase tracking-wider mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Please tell us more about your pet's current needs..."
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-[#27221F] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#70A352] focus:bg-white"
                    />
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="bg-[#70A352] hover:bg-[#5b8c3d] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Send className="w-4 h-4" /> Send Message
                    </button>

                    <button
                      type="button"
                      onClick={() => openBooking()}
                      className="text-xs font-bold text-[#27221F] hover:text-[#70A352] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-[#70A352]" /> Book Appointment Online &rarr;
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map / Directions Preview */}
        <div className="bg-white rounded-3xl p-8 border border-[#ebdcc9] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#70A352]/20 text-[#70A352] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg text-[#27221F] uppercase">
                Complimentary Pet Parking & Drive-Up Intake
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm font-medium mt-0.5">
                We have 15 designated pet-parent parking bays directly adjacent to our low-stress entrance.
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#f6efe4] hover:bg-stone-200 text-[#27221F] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition border border-[#ebdcc9] shrink-0"
          >
            Open in Google Maps &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
