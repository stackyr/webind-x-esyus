"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

export const ScrollVideoShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Track scroll position across the 260vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(() => {});
            }
          } else {
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
            }
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Smooth out scroll transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Dynamic animations as user scrolls:
  // 1. Width expands from 92% (mobile) / 66% (desktop) to 100%
  const widthPercent = useTransform(smoothProgress, [0, 0.75], [isMobile ? 92 : 66, 100]);
  const widthString = useTransform(widthPercent, (v) => `${v}%`);

  // 2. Height expands from 38vh (mobile) / 58vh (desktop) to 100vh
  const heightPercent = useTransform(smoothProgress, [0, 0.75], [isMobile ? 38 : 58, 100]);
  const heightString = useTransform(heightPercent, (v) => `${v}vh`);

  // 3. Border radius transitions from pro-level 28px/32px to 0px (full bleed)
  const borderRadius = useTransform(smoothProgress, [0, 0.75], [isMobile ? '24px' : '32px', '0px']);

  // 4. Border opacity fades as it becomes full bleed
  const borderOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);

  // 5. Header above video fades out smoothly as video expands
  const headerOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const headerY = useTransform(smoothProgress, [0, 0.3], [0, -30]);

  return (
    <div
      ref={containerRef}
      id="reel"
      className="relative z-20 w-full h-[260vh] bg-black text-[#F5F7FA] selection:bg-[#FF384C] selection:text-white scroll-mt-12"
    >
      {/* Sticky Fullscreen Viewport Window */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Intro Header (fades out smoothly as video grows full screen) */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="absolute top-8 sm:top-16 z-20 text-center max-w-xl px-4 sm:px-6 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12161F] border border-[#202634] text-[10px] sm:text-[11px] font-mono tracking-widest text-[#FF384C] mb-2 sm:mb-3 shadow-[0_0_15px_rgba(255,56,76,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF384C] animate-pulse" />
            <span>CINEMATIC SHOWREEL // 2026</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-light tracking-tight text-[#F5F7FA]">
            The Webind Experience
          </h2>
          <p className="text-[11px] sm:text-sm text-[#929AA7] mt-1">
            Scroll down to expand our work into full immersion.
          </p>
        </motion.div>

        {/* EXPANDING VIDEO FRAME */}
        <motion.div
          style={{
            width: widthString,
            height: heightString,
            borderRadius: borderRadius,
          }}
          className="relative overflow-hidden flex items-center justify-center bg-[#0C1017] shadow-2xl transition-shadow duration-300"
        >
          {/* Subtle Outer Glowing Border */}
          <motion.div
            style={{
              opacity: borderOpacity,
              borderRadius: borderRadius,
            }}
            className="absolute inset-0 border border-[#242E42] pointer-events-none z-10 shadow-[0_0_40px_rgba(255,56,76,0.15)]"
          />

          {/* Autoplaying Seamless Cinematic Video */}
          <video
            ref={videoRef}
            src="https://res.cloudinary.com/rqfwenpk/video/upload/lv_0_20261006132723.mp4"
            loop
            muted
            playsInline
            preload="none"
            aria-label="Webind Cinematic Showcase Reel"
            className="w-full h-full object-cover select-none"
          />

          {/* Mobile Tap Sound Toggle Pill in Bottom-Left */}
          <button
            onClick={toggleSound}
            className="absolute bottom-4 left-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white shadow-lg active:scale-90 transition-transform cursor-pointer"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#FF384C]" />
                <span>Tap for Sound</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sound On</span>
              </>
            )}
          </button>

          {/* Clean Subtle Watermark in Top Right */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] font-mono text-[#F5F7FA] pointer-events-none shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF384C]" />
            <span>WEBIND · REEL</span>
          </div>
        </motion.div>

        {/* Scroll down indicator when not yet expanded */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute bottom-6 z-20 flex flex-col items-center gap-1.5 text-xs text-[#929AA7] pointer-events-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#64748B]">
            Scroll to expand
          </span>
          <div className="w-4 h-7 rounded-full border border-[#2A3448] flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-1.5 rounded-full bg-[#FF384C]"
            />
          </div>
        </motion.div>
      </div>

      {/* BOTTOM SEAMLESS FADE INTO PURE BLACK */}
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-b from-transparent to-black pointer-events-none z-10" />
    </div>
  );
};
