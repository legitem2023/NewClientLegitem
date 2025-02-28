import { useEffect } from "react";

const LoadEruda = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && /Android|iPhone/i.test(navigator.userAgent)) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/eruda";
      script.onload = () => {
        // I-cast sa `any` para maiwasan ang TypeScript error
        (window as any).eruda && (window as any).eruda.init();
      };
      document.body.appendChild(script);
    }
  }, []);

  return null; // Wala itong UI, pero ia-append ang script sa page
};

export default LoadEruda;
