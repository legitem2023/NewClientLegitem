import { useEffect } from "react";

const LoadEruda = () => {
  useEffect(() => {
    // I-check kung nasa mobile bago i-load
    if (typeof window !== "undefined" && /Android|iPhone/i.test(navigator.userAgent)) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/eruda";
      script.onload = () => {
        // Hintayin matapos ang pag-load bago i-initialize
        window.eruda && window.eruda.init();
      };
      document.body.appendChild(script);
    }
  }, []);

  return null; // Wala itong UI, pero ilalagay nito ang script sa page
};

export default LoadEruda;
