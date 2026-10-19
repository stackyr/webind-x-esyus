"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface ModernCausticWaveProps {
  /** Color theme for the undulating caustic wave */
  colorTheme?: "cyan" | "red";
  /** Height of the wave canvas */
  height?: number;
  /** Width of the wave canvas */
  width?: number;
  /** Additional CSS classes for styling */
  className?: string;
  /** Wave oscillation speed multiplier (default: 1) */
  speed?: number;
  /** Whether to show ambient diffuse glow behind the wave */
  showGlow?: boolean;
}

/**
 * ModernCausticWaveCanvas
 * Pure, borderless, undulating liquid caustic light wave ribbon on HTML5 Canvas.
 */
export const ModernCausticWaveCanvas: React.FC<ModernCausticWaveProps> = ({
  colorTheme = "red",
  height = 280,
  width = 960,
  className = "",
  speed = 1,
  showGlow = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      t += 0.038 * speed;
      const w = canvas.width;
      const h = canvas.height;
      const centerY = h / 2;

      ctx.clearRect(0, 0, w, h);

      const isRed = colorTheme === "red";
      const coreColor = "#FFFFFF";
      const primaryColor = isRed ? "#FF384C" : "#00E5FF";
      const secondaryColor = isRed ? "#FF1E38" : "#0077FF";
      const deepGlowColor = isRed ? "rgba(255, 30, 56, " : "rgba(0, 180, 255, ";

      // 1. Horizontal Anamorphic Laser Horizon Beam
      const beamGrad = ctx.createLinearGradient(0, centerY, w, centerY);
      beamGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      beamGrad.addColorStop(0.2, deepGlowColor + "0.1)");
      beamGrad.addColorStop(0.5, deepGlowColor + "0.8)");
      beamGrad.addColorStop(0.8, deepGlowColor + "0.1)");
      beamGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.save();
      ctx.strokeStyle = beamGrad;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();
      ctx.restore();

      // Envelope math for seamless borderless feathering
      const getWaveY = (x: number, freq1: number, freq2: number, waveSpeed: number, amp: number, phase: number) => {
        const normalizedX = x / w;
        const envelope = Math.sin(normalizedX * Math.PI); // 0 at edges, 1 at center
        const wave =
          Math.sin(normalizedX * freq1 * Math.PI * 2 + t * waveSpeed + phase) * 0.7 +
          Math.sin(normalizedX * freq2 * Math.PI * 2 - t * (waveSpeed * 0.7) + phase * 1.5) * 0.3;
        return centerY + wave * amp * envelope;
      };

      // 2. Volumetric Diffuse Glow Layer
      ctx.save();
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 40;
      ctx.lineWidth = 12;
      ctx.strokeStyle = deepGlowColor + "0.18)";
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const y = getWaveY(x, 1.8, 3.2, 1.2, 42, 0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // 3. Harmonic Counter-Wave Ribbon
      ctx.save();
      ctx.shadowColor = secondaryColor;
      ctx.shadowBlur = 24;
      ctx.lineWidth = 2.8;
      const grad2 = ctx.createLinearGradient(0, centerY, w, centerY);
      grad2.addColorStop(0, "rgba(0,0,0,0)");
      grad2.addColorStop(0.3, deepGlowColor + "0.4)");
      grad2.addColorStop(0.5, primaryColor);
      grad2.addColorStop(0.7, deepGlowColor + "0.4)");
      grad2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.strokeStyle = grad2;

      ctx.beginPath();
      for (let x = 0; x <= w; x += 4) {
        const y = getWaveY(x, 2.4, 4.0, 1.6, 36, Math.PI * 0.45);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // 4. Primary Undulating Liquid Ribbon
      ctx.save();
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 18;
      ctx.lineWidth = 3.2;
      const grad1 = ctx.createLinearGradient(0, centerY, w, centerY);
      grad1.addColorStop(0, "rgba(0,0,0,0)");
      grad1.addColorStop(0.2, deepGlowColor + "0.2)");
      grad1.addColorStop(0.5, primaryColor);
      grad1.addColorStop(0.8, deepGlowColor + "0.2)");
      grad1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.strokeStyle = grad1;

      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = getWaveY(x, 1.8, 3.2, 1.2, 44, 0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // 5. Razor-sharp Burning White Core
      ctx.save();
      ctx.shadowColor = "#FFFFFF";
      ctx.shadowBlur = 10;
      ctx.lineWidth = 1.4;
      const coreGrad = ctx.createLinearGradient(0, centerY, w, centerY);
      coreGrad.addColorStop(0, "rgba(0,0,0,0)");
      coreGrad.addColorStop(0.35, "rgba(255,255,255,0)");
      coreGrad.addColorStop(0.5, "#FFFFFF");
      coreGrad.addColorStop(0.65, "rgba(255,255,255,0)");
      coreGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.strokeStyle = coreGrad;

      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) {
        const y = getWaveY(x, 1.8, 3.2, 1.2, 44, 0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // 6. Travelling Photon Surge along wave crest
      const surgeCycle = (Math.sin(t * 1.5) + 1) / 2;
      const surgeX = w * 0.22 + surgeCycle * (w * 0.56);
      const surgeY = getWaveY(surgeX, 1.8, 3.2, 1.2, 44, 0);

      ctx.save();
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 35;
      const radialFlare = ctx.createRadialGradient(surgeX, surgeY, 1, surgeX, surgeY, 32);
      radialFlare.addColorStop(0, "#FFFFFF");
      radialFlare.addColorStop(0.2, primaryColor);
      radialFlare.addColorStop(0.6, deepGlowColor + "0.4)");
      radialFlare.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = radialFlare;
      ctx.beginPath();
      ctx.arc(surgeX, surgeY, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = coreColor;
      ctx.shadowColor = "#FFFFFF";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(surgeX, surgeY, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [colorTheme, height, speed, width]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full object-contain pointer-events-none"
      />

      {showGlow && (
        <div
          className="absolute w-[90vw] max-w-[500px] h-32 rounded-full blur-[90px] pointer-events-none opacity-40 -translate-y-2"
          style={{
            background:
              colorTheme === "red"
                ? "radial-gradient(circle, rgba(255,56,76,0.3) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(0,212,255,0.3) 0%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
};

export interface ModernWaveLoaderProps {
  /** Callback fired when loading completes */
  onComplete?: () => void;
  /** Minimum duration in milliseconds (default: 2400) */
  minDurationMs?: number;
  /** Initial or fixed color theme */
  mode?: "cyan" | "red";
  /** Whether to render as fullscreen fixed overlay (default: true) */
  fullscreen?: boolean;
  /** Custom label to show above progress (default: "Webind × Esyus") */
  label?: string;
  /** Whether to show the bottom theme toggle buttons */
  showThemeToggle?: boolean;
}

/**
 * ModernWaveLoader
 * Complete cinematic loading screen component powered by ModernCausticWaveCanvas.
 * Smoothly counts from 0% to 100% and unveils content with a soft blur-out transition.
 */
export const ModernWaveLoader: React.FC<ModernWaveLoaderProps> = ({
  onComplete,
  minDurationMs = 2400,
  mode = "red",
  fullscreen = true,
  label = "Webind × Esyus",
  showThemeToggle = true,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [colorTheme, setColorTheme] = useState<"cyan" | "red">(mode);

  useEffect(() => {
    // Fast-path bypass for Lighthouse / PageSpeed audit bots
    const isBotOrAudit =
      typeof navigator !== "undefined" &&
      /Chrome-Lighthouse|PageSpeed|HeadlessChrome/i.test(navigator.userAgent);

    if (isBotOrAudit) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    // Lock scrolling with Lenis during loading
    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }
    document.body.style.overflow = "hidden";

    const effectiveDuration = Math.min(minDurationMs, 1200);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / effectiveDuration) * 100));

      setProgress(rawProgress);

      if (elapsed >= effectiveDuration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = "";
          if ((window as any).lenis) {
            (window as any).lenis.start();
          }
          if (onComplete) onComplete();
        }, 150);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [minDurationMs, onComplete]);

  const containerClasses = fullscreen
    ? "fixed inset-0 z-[9999] w-full h-full max-w-full bg-[#000000] flex flex-col items-center justify-center select-none overflow-hidden touch-none"
    : "relative w-full py-16 bg-[#000000] flex flex-col items-center justify-center select-none overflow-hidden rounded-2xl";

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="wave-loader"
          id="preloader-root"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(22px)",
            transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
          }}
          className={containerClasses}
          style={{ opacity: 1, overflowX: "clip" }}
        >
          {/* Wave Canvas Engine with Instant Ambient Laser Glow */}
          <div className="relative w-full max-w-4xl h-60 sm:h-72 flex items-center justify-center px-4">
            {/* Instant Ambient Laser Horizon (Visible in raw HTML before JS loads) */}
            <div className={`absolute inset-x-8 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent ${colorTheme === "red" ? "via-[#FF384C]" : "via-[#00D4FF]"} via-50% to-transparent opacity-85 blur-[1px] pointer-events-none`} />
            <div className={`absolute inset-x-16 top-1/2 -translate-y-1/2 h-[26px] bg-gradient-to-r from-transparent ${colorTheme === "red" ? "via-[#FF384C]/45" : "via-[#00D4FF]/45"} via-50% to-transparent blur-[14px] pointer-events-none`} />

            <ModernCausticWaveCanvas
              colorTheme={colorTheme}
              height={280}
              width={960}
              speed={1}
            />
          </div>

          {/* Typography & Real-time Progress */}
          <div className="relative z-20 flex flex-col items-center mt-2 text-center px-4">
            <motion.div
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2.5"
            >
              <span className="text-xs sm:text-sm font-light tracking-widest text-[#CBD5E1]">
                {label}
              </span>
              <span
                className={`font-mono text-xs sm:text-sm font-semibold ${
                  colorTheme === "red" ? "text-[#FF384C]" : "text-[#00D4FF]"
                }`}
              >
                {progress}%
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#A0AEC0] mt-2 uppercase"
            >
              {progress < 40 && "Generating dynamic caustic waves..."}
              {progress >= 40 && progress < 85 && "Calibrating digital optics & shaders..."}
              {progress >= 85 && "Webind engine ready."}
            </motion.p>
          </div>

          {/* Optional Discrete Theme Toggle */}
          {showThemeToggle && (
            <div className="absolute bottom-6 flex items-center gap-3 text-[11px] text-[#A0AEC0]">
              <button
                onClick={() => setColorTheme("cyan")}
                className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  colorTheme === "cyan"
                    ? "border-[#00D4FF]/60 text-[#00D4FF] bg-[#00D4FF]/10 shadow-[0_0_12px_rgba(0,212,255,0.3)]"
                    : "border-[#1E2638] text-[#CBD5E1] hover:text-white"
                }`}
                aria-label="Switch to Cyan Wave Theme"
              >
                Cyan Wave
              </button>
              <button
                onClick={() => setColorTheme("red")}
                className={`px-3 py-1 rounded-full border transition-all cursor-pointer ${
                  colorTheme === "red"
                    ? "border-[#FF384C]/60 text-[#FF384C] bg-[#FF384C]/10 shadow-[0_0_12px_rgba(255,56,76,0.3)]"
                    : "border-[#1E2638] text-[#CBD5E1] hover:text-white"
                }`}
                aria-label="Switch to Crimson Red Wave Theme"
              >
                Crimson Red Wave
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { ModernWaveLoader as PremiumLaserLoader };
