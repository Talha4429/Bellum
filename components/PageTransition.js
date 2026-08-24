"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [isLoaded, setIsLoaded] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Reset and trigger smooth fade-in
    setIsLoaded(false);
    setProgressBar(30);

    // Scroll to top immediately on navigation
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const step1 = setTimeout(() => {
      setProgressBar(75);
    }, 100);

    const step2 = setTimeout(() => {
      setProgressBar(100);
      setIsLoaded(true);
    }, 200);

    const step3 = setTimeout(() => {
      setProgressBar(0);
    }, 450);

    prevPathRef.current = pathname;

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  }, [pathname]);

  return (
    <>
      {/* Sleek architectural route progress bar */}
      {progressBar > 0 && (
        <div
          className="fixed top-0 left-0 h-[2px] bg-[#111111] z-[9999] pointer-events-none transition-all duration-300 ease-out"
          style={{
            width: `${progressBar}%`,
            opacity: progressBar === 100 ? 0 : 1,
          }}
        />
      )}

      {/* Ultra-smooth content wrapper */}
      <div
        className="flex-grow flex flex-col w-full transition-opacity duration-500 ease-out"
        style={{
          opacity: isLoaded ? 1 : 0.05,
        }}
      >
        {children}
      </div>
    </>
  );
}
