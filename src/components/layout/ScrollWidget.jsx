import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function ScrollWidget() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showBottomBtn, setShowBottomBtn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show scroll-to-top button if scrolled down past 250px
      setShowTopBtn(scrollY > 250);

      // Hide scroll-to-bottom if already near bottom (within 200px)
      setShowBottomBtn(scrollY + windowHeight < documentHeight - 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2 transition-all duration-300">
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          aria-label="Scroll to Top"
          className="w-10 h-10 rounded-2xl bg-white/90 hover:bg-[#70A352] text-[#27221F] hover:text-white shadow-lg border border-[#ebdcc9] hover:border-[#70A352] flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-md group animate-modal-in"
        >
          <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

      {showBottomBtn && (
        <button
          onClick={scrollToBottom}
          title="Scroll to Bottom"
          aria-label="Scroll to Bottom"
          className="w-10 h-10 rounded-2xl bg-white/90 hover:bg-[#70A352] text-[#27221F] hover:text-white shadow-lg border border-[#ebdcc9] hover:border-[#70A352] flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-md group"
        >
          <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
        </button>
      )}
    </div>
  );
}
