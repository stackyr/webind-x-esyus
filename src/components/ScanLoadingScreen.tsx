"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ScanLoadingScreenProps {
  onComplete?: () => void;
}

export const ScanLoadingScreen: React.FC<ScanLoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING");

  useEffect(() => {
    // Lock scrolling during loading screen
    document.body.style.overflow = "hidden";
    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }

    // High precision simulated progressive loader
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds optimal duration

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      setProgress(rawProgress);

      if (rawProgress < 30) {
        setStatusText("INITIALIZING");
      } else if (rawProgress < 70) {
        setStatusText("CALIBRATING 3D MATRIX");
      } else if (rawProgress < 95) {
        setStatusText("VERIFYING ASSETS");
      } else {
        setStatusText("SYSTEM READY");
      }

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        // Complete loading
        setProgress(100);
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = "";
          if ((window as any).lenis) {
            (window as any).lenis.start();
          }
          if (onComplete) onComplete();
        }, 350);
      }
    };

    const rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="scan-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(16px)",
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] text-white select-none overflow-hidden"
        >
          {/* Subtle Ambient Depth Lighting */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,112,255,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* MAIN CIRCULAR ORBITAL HUD (Exact match to reference image) */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            
            {/* Outer Circular Ring with Electric Blue Edge Glow */}
            <div
              className="absolute inset-0 rounded-full border border-[#0070FF]/40 shadow-[0_0_35px_rgba(0,112,255,0.35),inset_0_0_20px_rgba(0,112,255,0.15)] pointer-events-none"
            />

            {/* Orbiting Specular Lens Flare along the top-right perimeter */}
            <motion.div
              animate={{
                rotate: [55, 65, 55],
                opacity: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Hot Specular Core Glint at top-right edge */}
              <div
                className="absolute top-[8%] right-[13%] -translate-y-1/2 translate-x-1/2 flex items-center justify-center"
              >
                {/* Horizontal flare streak */}
                <div className="absolute w-28 sm:w-36 h-[1.5px] bg-gradient-to-r from-transparent via-[#C2E4FF] via-50% to-transparent blur-[0.5px]" />
                
                {/* Diagonal flare streak */}
                <div className="absolute w-16 sm:w-20 h-[1.5px] rotate-45 bg-gradient-to-r from-transparent via-white via-50% to-transparent blur-[0.5px]" />

                {/* White-hot center beacon */}
                <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#FFFFFF,0_0_28px_#0070FF,0_0_45px_#0070FF]" />
                
                {/* Outer cyan corona */}
                <div className="absolute w-12 h-12 rounded-full bg-[#0070FF]/45 blur-md" />
              </div>
            </motion.div>

            {/* SECONDARY ROTATING SUBTLE RING PARTICLE */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[#0070FF]/15 pointer-events-none"
            />

            {/* INNER RETICLE: 4 Rounded Corner Brackets */}
            <div className="relative w-36 sm:w-44 h-24 sm:h-28 flex items-center justify-center">
              
              {/* Top-Left Bracket ┌ */}
              <div className="absolute top-0 left-0 w-6 sm:w-7 h-6 sm:h-7 border-t-2 border-l-2 border-[#0070FF] rounded-tl-xl shadow-[0_0_10px_rgba(0,112,255,0.8),inset_0_0_6px_rgba(0,112,255,0.4)]" />
              
              {/* Top-Right Bracket ┐ */}
              <div className="absolute top-0 right-0 w-6 sm:w-7 h-6 sm:h-7 border-t-2 border-r-2 border-[#0070FF] rounded-tr-xl shadow-[0_0_10px_rgba(0,112,255,0.8),inset_0_0_6px_rgba(0,112,255,0.4)]" />
              
              {/* Bottom-Left Bracket └ */}
              <div className="absolute bottom-0 left-0 w-6 sm:w-7 h-6 sm:h-7 border-b-2 border-l-2 border-[#0070FF] rounded-bl-xl shadow-[0_0_10px_rgba(0,112,255,0.8),inset_0_0_6px_rgba(0,112,255,0.4)]" />
              
              {/* Bottom-Right Bracket ┘ */}
              <div className="absolute bottom-0 right-0 w-6 sm:w-7 h-6 sm:h-7 border-b-2 border-r-2 border-[#0070FF] rounded-br-xl shadow-[0_0_10px_rgba(0,112,255,0.8),inset_0_0_6px_rgba(0,112,255,0.4)]" />

              {/* Animated Horizontal Laser Scan Sweep Line */}
              <motion.div
                animate={{
                  y: ["-36px", "36px", "-36px"],
                  opacity: [0.3, 0.9, 0.3],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-[#00A3FF] via-50% to-transparent shadow-[0_0_8px_#0070FF] pointer-events-none"
              />

              {/* CENTER DISPLAY: "SCAN" (Exact Typography & Lettering) */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.28em] uppercase text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.85)] font-mono pl-[0.28em]">
                  SCAN
                </span>
              </div>
            </div>

          </div>

          {/* LOWER HUD STATUS & PERCENTAGE PROGRESS */}
          <div className="absolute bottom-12 sm:bottom-16 flex flex-col items-center gap-2.5">
            {/* Numeric Percentage */}
            <div className="flex items-baseline gap-1 text-xs sm:text-sm font-mono tracking-widest text-[#BFE0FF]">
              <span className="font-semibold text-white drop-shadow-[0_0_8px_rgba(0,112,255,0.6)]">
                {String(progress).padStart(2, "0")}
              </span>
              <span className="text-white/40">%</span>
            </div>

            {/* Technical Sub-label */}
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#0070FF] uppercase opacity-90">
              {statusText}
            </span>

            {/* Thin Minimal Progress Bar */}
            <div className="w-36 sm:w-48 h-[1.5px] bg-white/10 rounded-full overflow-hidden mt-1">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0038D6] via-[#0070FF] to-[#38BDF8] shadow-[0_0_8px_#0070FF]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
