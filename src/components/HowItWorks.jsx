import React from "react";

function HowItWorks() {
  return (
    <>
      <section
        id="how-it-works"
        className="bg-[#f6efe4] py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start"
      >
        {/* Left Column */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-28">
          <span className="text-xs font-bold text-[#70A352] uppercase tracking-widest bg-white/80 px-3.5 py-1 rounded-full border border-[#ebdcc9] inline-block mb-3">
            Simple 3-Step Process
          </span>
          <h2 className="text-[#27221F] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-4 sm:mb-6 leading-[0.95]">
            How It Works?
          </h2>

          <p className="text-stone-700 font-medium text-base sm:text-lg leading-relaxed max-w-lg">
            At Vetlio, we make it easy for you to provide the best care for your
            furry friends. Our process is simple and tailored to meet your
            unique needs.
          </p>

          <div className="hidden lg:block mt-8 p-5 bg-white/60 rounded-2xl border border-[#ebdcc9]">
            <p className="text-xs text-stone-600 font-semibold leading-relaxed">
              ⭐ Trusted by over 500+ pet parents nationwide with 24/7 dedicated support.
            </p>
          </div>
        </div>

        {/* Right Column Cards */}
        <div className="w-full lg:w-7/12 flex flex-col gap-8 md:gap-12 pb-8 lg:pb-24">
          {/* Card 1 */}
          <div className="lg:sticky lg:top-24 bg-white rounded-3xl shadow-sm flex flex-col overflow-hidden h-auto min-h-[380px] md:h-[440px] border border-gray-100 transition-transform duration-300">
            <div className="p-6 sm:p-10 md:p-12 md:h-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#8FB3FC] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
                  Step 01
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#27221F] uppercase tracking-tighter mb-3 leading-none">
                Fill Out <br className="hidden sm:inline" />
                The Form
              </h3>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Provide your basic contact information and describe your pet's current care needs or symptoms.
              </p>
            </div>

            <div className="bg-[#8FB3F7] h-48 md:h-1/2 flex items-center justify-center p-6">
              <img
                src="/Step1Image.png"
                alt="Step 1 Form Illustration"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="lg:sticky lg:top-32 bg-white rounded-3xl shadow-sm flex flex-col overflow-hidden h-auto min-h-[380px] md:h-[440px] border border-gray-100 transition-transform duration-300">
            <div className="p-6 sm:p-10 md:p-12 md:h-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#FDBD10] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
                  Step 02
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#27221F] uppercase tracking-tighter mb-3 leading-none">
                Get Matched
              </h3>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Based on your profile, we will connect you with a verified licensed veterinarian or pet caregiver nearby.
              </p>
            </div>
            <div className="bg-[#FDBD10] h-48 md:h-1/2 flex items-center justify-center p-6">
              <img
                src="/Step2Image.png"
                alt="Phone match illustration"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="lg:sticky lg:top-40 bg-white rounded-3xl shadow-sm flex flex-col overflow-hidden h-auto min-h-[380px] md:h-[440px] border border-gray-100 transition-transform duration-300">
            <div className="p-6 sm:p-10 md:p-12 md:h-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#6BA34B] font-extrabold text-xs sm:text-sm tracking-widest uppercase">
                  Step 03
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#27221F] uppercase tracking-tighter mb-3 leading-[0.95]">
                Receive Top- <br className="hidden sm:inline" />
                Tier Service
              </h3>
              <p className="text-xs sm:text-sm font-medium text-gray-600 max-w-sm">
                Prioritizing safety, comfort, and clinical excellence so your pet receives personalized, attentive care.
              </p>
            </div>
            <div className="bg-[#6BA34B] h-48 md:h-1/2 flex items-center justify-center p-6">
              <img
                src="/Step3Image2.png"
                alt="Step 3 Care Illustration"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HowItWorks;
