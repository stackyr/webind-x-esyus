"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // High-performance silky Lenis smooth scrolling instance
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      autoRaf: false,
    });

    (window as any).lenis = lenis;

    // Temporarily bypass pointer hover recalculations during active scrolling for 120fps lock
    let scrollTimeout: NodeJS.Timeout | null = null;
    lenis.on("scroll", () => {
      if (!document.body.classList.contains("is-scrolling")) {
        document.body.classList.add("is-scrolling");
      }
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 120);
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      document.body.classList.remove("is-scrolling");
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}
