"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";

const TOTAL_FRAMES = 240;

// Persistent cache across component remounts and React 19 StrictMode
const imageCache: HTMLImageElement[] = [];
let preloadingStarted = false;

function getFrameUrl(index: number): string {
  const padded = String(index + 1).padStart(3, "0");
  return `/sequence/ezgif-frame-${padded}.jpg`;
}

export default function ImageSequenceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef<number>(0);
  const isRunningRef = useRef<boolean>(true);

  // Draw a frame onto the canvas with cover sizing
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const rounded = Math.round(frameIndex);
    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, rounded));

    // Get frame from cache or closest loaded neighbour
    let img = imageCache[clamped];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = clamped; i >= 0; i--) {
        if (imageCache[i]?.complete && imageCache[i]!.naturalWidth > 0) {
          img = imageCache[i];
          break;
        }
      }
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = clamped; i < TOTAL_FRAMES; i++) {
          if (imageCache[i]?.complete && imageCache[i]!.naturalWidth > 0) {
            img = imageCache[i];
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    // object-fit: cover calculation
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) * 0.5;
    const dy = (ch - dh) * 0.5;

    ctx.fillStyle = "#080B10";
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Sync canvas resolution to window dimensions & devicePixelRatio
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload all 240 frames immediately
  useEffect(() => {
    if (!preloadingStarted) {
      preloadingStarted = true;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (i === 0 || Math.abs(i - Math.round(currentFrameRef.current)) <= 2) {
            drawFrame(currentFrameRef.current);
          }
        };
        imageCache[i] = img;
      }
    } else {
      drawFrame(currentFrameRef.current);
    }
  }, [drawFrame]);

  // Main scroll sync and render loop
  useEffect(() => {
    isRunningRef.current = true;
    updateCanvasDimensions();

    window.addEventListener("resize", updateCanvasDimensions);

    let rafId: number;
    const loop = () => {
      if (!isRunningRef.current) return;

      const sequenceSection = document.getElementById("sequence-section");
      let progress = 0;

      if (sequenceSection) {
        const totalScrollable = sequenceSection.offsetHeight - window.innerHeight;
        const currentScrolled = -sequenceSection.getBoundingClientRect().top;
        progress = totalScrollable > 0 ? Math.min(Math.max(currentScrolled / totalScrollable, 0), 1) : 0;
      } else {
        const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        progress = scrollable > 0 ? Math.min(Math.max(scrollTop / scrollable, 0), 1) : 0;
      }

      const targetFrame = progress * (TOTAL_FRAMES - 1);

      // Smooth lerping towards target frame
      const diff = targetFrame - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * 0.18;
      } else {
        currentFrameRef.current = targetFrame;
      }

      drawFrame(currentFrameRef.current);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      isRunningRef.current = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateCanvasDimensions);
    };
  }, [drawFrame, updateCanvasDimensions]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0"
      style={{ backgroundColor: "#080B10" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ backgroundColor: "#080B10" }}
      />

      {/* Ambient Red Gradient Glows (Webind Crimson #FF384C) - 2 Corners Only, Completely Clear of MacBook */}
      {/* 1. Top-Left Corner Ambient Glow */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -20, 25, 0],
          scale: [1, 1.12, 0.94, 1],
          opacity: [0.75, 1, 0.8, 0.75],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 -left-24 w-[500px] sm:w-[660px] h-[500px] sm:h-[660px] bg-[radial-gradient(circle_at_top_left,rgba(255,56,76,0.22),transparent_70%)] blur-3xl pointer-events-none"
      />

      {/* 2. Top-Right Corner Ambient Glow */}
      <motion.div
        animate={{
          x: [0, -25, 20, 0],
          y: [0, 20, -25, 0],
          scale: [1, 1.14, 0.92, 1],
          opacity: [0.75, 1, 0.8, 0.75],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -top-24 -right-24 w-[500px] sm:w-[660px] h-[500px] sm:h-[660px] bg-[radial-gradient(circle_at_top_right,rgba(255,56,76,0.22),transparent_70%)] blur-3xl pointer-events-none"
      />
    </div>
  );
}
