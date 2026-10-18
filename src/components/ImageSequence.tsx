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
  const lastDrawnFrameRef = useRef<number>(-1);
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

    // Check if current viewport is mobile / portrait orientation
    const isMobile = (typeof window !== "undefined" && window.innerWidth < 768) || (cw / ch < 1.15);

    let scale: number;
    let dx: number;
    let dy: number;

    if (isMobile) {
      // Mobile: Preserve original widescreen aspect ratio with slight natural zoom (1.22x), sides remain solid #080B10 black
      const mobileZoom = 1.22;
      scale = (cw / iw) * mobileZoom;
      const dw = iw * scale;
      const dh = ih * scale;
      dx = (cw - dw) * 0.5;
      dy = (ch - dh) * 0.44; // Centered gracefully in the optical view between hero header and bottom CTA

      ctx.fillStyle = "#080B10";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);

      // Smooth organic black gradient feathering on mobile edges to seamlessly dissolve boundary lines into #080B10
      const featherH = Math.min(50, dh * 0.18);

      // Top edge melt
      const topMelt = ctx.createLinearGradient(0, dy - 2, 0, dy + featherH);
      topMelt.addColorStop(0, "#080B10");
      topMelt.addColorStop(1, "rgba(8, 11, 16, 0)");
      ctx.fillStyle = topMelt;
      ctx.fillRect(0, dy - 4, cw, featherH + 4);

      // Bottom edge melt
      const bottomMelt = ctx.createLinearGradient(0, dy + dh - featherH, 0, dy + dh + 2);
      bottomMelt.addColorStop(0, "rgba(8, 11, 16, 0)");
      bottomMelt.addColorStop(1, "#080B10");
      ctx.fillStyle = bottomMelt;
      ctx.fillRect(0, dy + dh - featherH, cw, featherH + 4);
    } else {
      // Desktop: Standard cover fit
      scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      dx = (cw - dw) * 0.5;
      dy = (ch - dh) * 0.5;

      ctx.fillStyle = "#080B10";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }
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

  // Staged progressive loading to avoid choking Vercel's HTTP/2 network queue
  useEffect(() => {
    if (preloadingStarted) {
      drawFrame(currentFrameRef.current);
      return;
    }
    preloadingStarted = true;

    const loadSingleFrame = (idx: number, priority: "high" | "auto" | "low" = "auto"): Promise<void> => {
      return new Promise((resolve) => {
        if (imageCache[idx] && imageCache[idx].complete) {
          resolve();
          return;
        }
        const img = new Image();
        if ("fetchPriority" in img) {
          (img as any).fetchPriority = priority;
        }
        img.onload = () => {
          if (idx === 0 || Math.abs(idx - Math.round(currentFrameRef.current)) <= 3) {
            drawFrame(currentFrameRef.current);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = getFrameUrl(idx);
        imageCache[idx] = img;
      });
    };

    // Phase 1: High Priority initial viewport frames (0 to 5) - Instant visual hero render
    for (let i = 0; i <= 5; i++) {
      loadSingleFrame(i, "high");
    }

    // Phase 2: Keyframe Skeleton (every 4th frame across the entire timeline)
    const keyframes: number[] = [];
    for (let i = 6; i < TOTAL_FRAMES; i += 4) {
      keyframes.push(i);
    }

    // Phase 3: In-between fill frames
    const fillFrames: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (i > 5 && !keyframes.includes(i)) {
        fillFrames.push(i);
      }
    }

    // Concurrent batch loader (8 parallel downloads max so network bandwidth is never choked)
    const queue = [...keyframes, ...fillFrames];
    const CONCURRENCY = 8;
    let active = 0;
    let index = 0;

    const next = () => {
      while (active < CONCURRENCY && index < queue.length) {
        const frameIdx = queue[index++];
        active++;
        loadSingleFrame(frameIdx, "auto").finally(() => {
          active--;
          next();
        });
      }
    };

    // Start background batch queue smoothly
    setTimeout(next, 40);
  }, [drawFrame]);

  // Main scroll sync and render loop
  useEffect(() => {
    isRunningRef.current = true;
    updateCanvasDimensions();

    const targetProgressRef = { current: 0 };
    let totalScrollable = 1;
    let sequenceTop = 0;

    const measure = () => {
      const sequenceSection = document.getElementById("sequence-section");
      if (sequenceSection) {
        totalScrollable = Math.max(1, sequenceSection.offsetHeight - window.innerHeight);
        sequenceTop = sequenceSection.offsetTop;
      }
    };

    measure();

    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const currentScrolled = scrollY - sequenceTop;
      targetProgressRef.current = Math.min(Math.max(currentScrolled / totalScrollable, 0), 1);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    const handleResize = () => {
      measure();
      onScroll();
      updateCanvasDimensions();
    };

    window.addEventListener("resize", handleResize);

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.on("scroll", onScroll);
    }

    let rafId: number;
    const loop = () => {
      if (!isRunningRef.current) return;

      const targetFrame = targetProgressRef.current * (TOTAL_FRAMES - 1);

      // Ultra-smooth lerping (0.18) towards target frame
      const diff = targetFrame - currentFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.18;
        const rounded = Math.round(currentFrameRef.current);
        if (rounded !== lastDrawnFrameRef.current) {
          lastDrawnFrameRef.current = rounded;
          drawFrame(rounded);
        }
      } else if (currentFrameRef.current !== targetFrame) {
        currentFrameRef.current = targetFrame;
        const rounded = Math.round(targetFrame);
        if (rounded !== lastDrawnFrameRef.current) {
          lastDrawnFrameRef.current = rounded;
          drawFrame(rounded);
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      isRunningRef.current = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      if (lenis) {
        lenis.off("scroll", onScroll);
      }
    };
  }, [drawFrame, updateCanvasDimensions]);

  return (
    <div
      className="fixed inset-0 w-full max-w-full h-screen overflow-hidden pointer-events-none z-0"
      style={{ backgroundColor: "#080B10" }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ backgroundColor: "#080B10" }}
      />

      {/* Mobile Top & Bottom Seamless Pure Black Edge Melts (Zero visible boundary) */}
      <div className="sm:hidden absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#080B10] via-[#080B10]/80 to-transparent pointer-events-none z-10" />
      <div className="sm:hidden absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#080B10] via-[#080B10]/80 to-transparent pointer-events-none z-10" />

      {/* Ambient Red Gradient Glows (Webind Crimson #FF384C) - Desktop & Tablet Only, Hidden completely on mobile */}
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
        className="hidden sm:block absolute -top-24 -left-24 w-[500px] sm:w-[660px] h-[500px] sm:h-[660px] bg-[radial-gradient(circle_at_top_left,rgba(255,56,76,0.22),transparent_70%)] blur-3xl pointer-events-none"
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
        className="hidden sm:block absolute -top-24 -right-24 w-[500px] sm:w-[660px] h-[500px] sm:h-[660px] bg-[radial-gradient(circle_at_top_right,rgba(255,56,76,0.22),transparent_70%)] blur-3xl pointer-events-none"
      />
    </div>
  );
}
