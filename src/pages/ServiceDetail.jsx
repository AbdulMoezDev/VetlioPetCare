import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Award,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import { SERVICES_DATA } from "../data/servicesData";
import { useBooking } from "../context/BookingContext";

function ServiceDetail() {
  const { serviceId } = useParams();
  const { openBooking } = useBooking();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const service = SERVICES_DATA.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="bg-[#f6efe4] min-h-screen py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-[#ebdcc9] shadow-sm">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-[#27221F] uppercase mb-2">
            Service Not Found
          </h2>
          <p className="text-stone-600 text-sm mb-6">
            We couldn't locate the veterinary service you are looking for.
          </p>
          <Link
            to="/services"
            className="bg-[#70A352] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl inline-block"
          >
            Browse All Services
          </Link>
        </div>
      </div>
    );
  }

  // Other related services
  const relatedServices = SERVICES_DATA.filter(
    (s) => s.id !== service.id
  ).slice(0, 3);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <div className="bg-[#f6efe4] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 mb-8">
          <Link to="/" className="hover:text-[#70A352] transition">
            Home
          </Link>
          <span>/</span>
          <Link to="/services" className="hover:text-[#70A352] transition">
            Services
          </Link>
          <span>/</span>
          <span className="text-[#27221F]">{service.title}</span>
        </nav>

        {/* Top Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#ebdcc9] shadow-sm flex flex-col lg:flex-row gap-10 items-center mb-12">
          {/* Left info */}
          <div className="w-full lg:w-3/5">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold text-[#70A352] uppercase tracking-widest bg-[#f6efe4] px-3.5 py-1 rounded-full border border-[#ebdcc9]">
                {service.tag}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5" /> {service.duration}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#27221F] uppercase tracking-tight leading-tight mb-4">
              {service.title}
            </h1>

            <p className="text-stone-700 font-medium text-base sm:text-lg leading-relaxed mb-6">
              {service.fullDesc}
            </p>

            {/* Price and CTA */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-stone-100">
              <div>
                <span className="text-xs text-stone-400 font-bold uppercase tracking-wider block">
                  Service Rate
                </span>
                <span className="text-3xl font-extrabold text-[#27221F]">
                  {service.price}
                </span>
              </div>

              <button
                onClick={() => openBooking(service.id)}
                className="bg-[#70A352] hover:bg-[#5b8c3d] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Calendar className="w-4 h-4" /> Book This Service Now
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-2/5">
            <div className="bg-stone-50 rounded-3xl p-6 border border-stone-100 flex items-center justify-center relative overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="max-h-72 w-auto object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* 2-Column Details: What's Included & Preparation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Features / Included */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ebdcc9] shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#70A352]/20 text-[#70A352] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#27221F] uppercase tracking-tight">
                What's Included
              </h3>
            </div>

            <ul className="space-y-3.5">
              {service.features.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-100 text-sm font-semibold text-[#27221F]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#70A352] text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits / Outcomes */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ebdcc9] shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#27221F] uppercase tracking-tight">
                Key Benefits for Your Pet
              </h3>
            </div>

            <ul className="space-y-3.5">
              {service.benefits.map((benefit, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-100 text-sm font-semibold text-[#27221F]"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-[#27221F] flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    ★
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Preparation Guidelines */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#ebdcc9] shadow-xs mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#27221F] uppercase tracking-tight">
              How to Prepare Your Pet
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {service.prepTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-[#f6efe4]/60 p-5 rounded-2xl border border-[#ebdcc9]"
              >
                <span className="text-xs font-extrabold text-[#70A352] uppercase tracking-wider block mb-1">
                  Step 0{idx + 1}
                </span>
                <p className="text-sm font-medium text-stone-800 leading-relaxed">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs for this service */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#ebdcc9] shadow-xs mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#70A352]/20 text-[#70A352] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#27221F] uppercase tracking-tight">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-stone-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#27221F] flex items-center justify-between gap-4 bg-stone-50/50 hover:bg-stone-50 transition cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#70A352] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 bg-white text-sm font-medium text-stone-700 leading-relaxed border-t border-stone-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Services */}
        <div>
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-xs font-bold text-[#70A352] uppercase tracking-widest">
                Explore More
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#27221F] uppercase tracking-tight">
                Other Veterinary Programs
              </h3>
            </div>
            <Link
              to="/services"
              className="text-xs font-bold uppercase tracking-wider text-[#70A352] hover:underline"
            >
              All Services &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-3xl p-6 border border-[#ebdcc9] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#70A352] uppercase tracking-wider bg-[#f6efe4] px-2.5 py-0.5 rounded-full border border-[#ebdcc9]">
                    {rel.tag}
                  </span>
                  <h4 className="font-extrabold text-lg text-[#27221F] uppercase mt-2 mb-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-stone-600 font-medium line-clamp-2">
                    {rel.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-extrabold text-sm text-[#27221F]">
                    {rel.price}
                  </span>
                  <Link
                    to={`/services/${rel.id}`}
                    className="text-xs font-bold text-[#70A352] hover:underline uppercase"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;
