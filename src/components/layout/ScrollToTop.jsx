import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If navigating to a specific element hash (smooth scroll from top to section)
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const navOffset = 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navOffset,
            behavior: "smooth"
          });
          return;
        }
      }, 50);
      return;
    }

    // Smooth scroll to top on page navigation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname, hash]);

  return null;
}
