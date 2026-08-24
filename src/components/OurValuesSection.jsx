import React from "react";
import { Heart, ShieldCheck, Stethoscope, Award } from "lucide-react";

function OurValuesSection() {
  const values = [
    {
      title: "Compassion",
      desc: "We treat every pet with kindness, patience, and genuine empathy, ensuring they feel secure and comforted throughout their visit.",
      color: "#A0DF6D",
      icon: Heart,
    },
    {
      title: "Personalized Care",
      desc: "Every pet is one-of-a-kind. We customize medical treatments, wellness routines, and nutrition to match individual health profiles.",
      color: "#FB7E46",
      icon: Award,
    },
    {
      title: "Trusted Expertise",
      desc: "Our board-certified veterinarians and seasoned staff deliver reliable veterinary care utilizing modern, evidence-backed medical standards.",
      color: "#FEBF03",
      icon: Stethoscope,
    },
    {
      title: "Commitment to Wellbeing",
      desc: "We advocate for proactive, preventive health programs, ongoing checkups, and transparent guidance for dedicated pet parents.",
      color: "#8FB3F7",
      icon: ShieldCheck,
    },
  ];

  return (
    <>
      <section
        id="about"
        className="bg-[#f6efe4] flex flex-col items-center py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center max-w-2xl mb-12 md:mb-20">
          <span className="text-xs font-bold text-[#70A352] uppercase tracking-widest bg-white/80 px-3.5 py-1 rounded-full border border-[#ebdcc9] inline-block mb-3">
            What Drives Us
          </span>
          <h2 className="font-extrabold text-[#27221F] tracking-tighter text-4xl sm:text-5xl md:text-6xl uppercase">
            Our Core Values
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3">
            The guiding principles that define our commitment to animal healthcare and pet parent trust.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-x-24 lg:gap-y-16 max-w-5xl w-full">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white/60 hover:bg-white p-6 sm:p-8 rounded-3xl border border-[#ebdcc9] transition-all duration-300 shadow-2xs hover:shadow-md group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${item.color}30`, color: item.color }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3
                    className="font-extrabold text-xl sm:text-2xl tracking-tighter uppercase"
                    style={{ color: item.color }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p className="text-[#27221F]/80 leading-relaxed text-sm sm:text-base font-medium pl-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default OurValuesSection;
