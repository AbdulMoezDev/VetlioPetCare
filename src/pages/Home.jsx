import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Star,
  ShieldCheck,
  PhoneCall,
  Clock
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import OurServices from "../components/OurServices";
import HowItWorks from "../components/HowItWorks";
import OurValuesSection from "../components/OurValuesSection";
import { TESTIMONIALS_DATA } from "../data/testimonialsData";

function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Main Hero Section */}
      <HeroSection />

      {/* 2. Trust Bar Metrics */}
      <section className="bg-white border-y border-[#ebdcc9]/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[#70A352] mb-1">
              <Heart className="w-5 h-5 fill-current" />
              <span className="text-2xl sm:text-3xl font-extrabold text-[#27221F]">12,000+</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-600">Loved Pets Treated</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-amber-500 mb-1">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-2xl sm:text-3xl font-extrabold text-[#27221F]">4.9 / 5</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-600">Pet Parent Rating</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[#8FB3FC] mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-2xl sm:text-3xl font-extrabold text-[#27221F]">100%</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-600">Fear-Free Certified</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[#FB7E46] mb-1">
              <Clock className="w-5 h-5" />
              <span className="text-2xl sm:text-3xl font-extrabold text-[#27221F]">24/7</span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-600">Urgent Care Ready</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Services Carousel */}
      <OurServices />

      {/* 4. How It Works Interactive Breakdown */}
      <HowItWorks />

      {/* 5. Core Values */}
      <OurValuesSection />

      {/* 6. Pet Parent Testimonials */}
      <section id="testimonials" className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[#ebdcc9]/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="text-xs font-bold text-[#70A352] uppercase tracking-widest bg-[#f6efe4] px-3.5 py-1 rounded-full border border-[#ebdcc9] inline-block mb-3">
              Pet Parent Stories
            </span>
            <h2 className="font-extrabold text-[#27221F] tracking-tight text-3xl sm:text-4xl md:text-5xl uppercase">
              Loved by Pets, Trusted by Owners
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-3">
              See how our fear-free philosophy and attentive medical care make a difference every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#f6efe4]/60 hover:bg-[#f6efe4] p-6 rounded-3xl border border-[#ebdcc9] flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-md"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-[#27221F]/90 text-sm italic font-medium leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ebdcc9]/70">
                  <h4 className="font-extrabold text-sm text-[#27221F]">
                    {rev.author}
                  </h4>
                  <p className="text-xs font-bold text-[#70A352]">
                    Pet: {rev.petName} ({rev.petType})
                  </p>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Service: {rev.serviceUsed}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Urgent Hotline Callout */}
      <section id="contact" className="bg-[#27221F] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <PhoneCall className="w-7 h-7 animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                Immediate Urgent Assistance
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Pet emergency? We're on standby 24/7.
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:5559117387"
              className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition shadow-lg flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> (555) 911-PETS
            </a>
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition border border-white/20"
            >
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
