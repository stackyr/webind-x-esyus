"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Sparkles, Layers, Globe, Cpu, Shield, Zap, Terminal, Box, Flame } from 'lucide-react';

export interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  description: string;
  metrics: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  gradient: string;
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'aether',
    title: 'Aether Platform',
    category: 'Fintech Infrastructure',
    description: 'Ultra-fast institutional trading terminal delivering sub-12ms execution speeds and real-time Merkle validation.',
    metrics: '99.99% Uptime · 12ms Latency',
    icon: <Terminal className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
    accentColor: '#FF384C',
    glowColor: 'rgba(255, 56, 76, 0.65)',
    gradient: 'from-[#FF384C] via-[#991122] to-[#2B080E]',
  },
  {
    id: 'kromic',
    title: 'Kromic Studio',
    category: 'Headless E-Commerce',
    description: 'Bespoke digital flagship store built with Next.js and Shopify Hydrogen, elevating conversion by 42% globally.',
    metrics: '+42% Global Conversion',
    icon: <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-amber-200" />,
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    gradient: 'from-amber-500 via-orange-600 to-[#2A1504]',
  },
  {
    id: 'esyus',
    title: 'Webind × Esyus Engine',
    category: 'Web + Mobile Apps',
    description: 'Our collaborative framework with Esyus unifies high-converting web design tokens directly into flagship iOS and Android mobile apps.',
    metrics: 'Web & Mobile Ecosystem · Co-Developed',
    icon: <Layers className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
    accentColor: '#FF384C',
    glowColor: 'rgba(255, 56, 76, 0.7)',
    gradient: 'from-[#FF384C] via-[#770A1A] to-[#1F070B]',
  },
  {
    id: 'veloce',
    title: 'Veloce Mobility',
    category: 'Interactive 3D WebGL',
    description: 'Real-time 3D automotive configurator letting prospective buyers customize luxury electric vehicles with photo-accuracy.',
    metrics: '60 FPS WebGL · Instant Export',
    icon: <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-200" />,
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    gradient: 'from-cyan-400 via-blue-600 to-[#041A2E]',
  },
  {
    id: 'sovereign',
    title: 'Sovereign Cloud',
    category: 'Zero-Trust Protocol',
    description: 'Privacy-first decentralized enterprise workspace with client-side zero-knowledge proof verification.',
    metrics: 'Zero-Knowledge · FIPS-Certified',
    icon: <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-200" />,
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    gradient: 'from-emerald-400 via-teal-700 to-[#032318]',
  },
  {
    id: 'luminary',
    title: 'Luminary Health',
    category: 'Clinical Biometrics',
    description: 'HIPAA-compliant telemedicine dashboard synthesizing patient IoT vitals into clinician decision-support summaries.',
    metrics: 'HIPAA Validated · Real-Time Vitals',
    icon: <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-pink-200" />,
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.6)',
    gradient: 'from-pink-500 via-rose-700 to-[#2A0818]',
  },
  {
    id: 'stratum',
    title: 'Stratum Wealth',
    category: 'Asset Management Portal',
    description: 'High-touch wealth management portal offering automated waterfall distribution modeling and secure vaulting.',
    metrics: '$2.8B Assets Tracked',
    icon: <Box className="w-8 h-8 sm:w-10 sm:h-10 text-violet-200" />,
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.6)',
    gradient: 'from-violet-500 via-purple-800 to-[#1D0938]',
  },
  {
    id: 'nexus',
    title: 'Nexus Intelligence',
    category: 'Enterprise Knowledge Graph',
    description: 'Vector-indexed search engine processing multi-gigabyte regulatory filings with deterministic audit traces.',
    metrics: '< 15ms Query Response',
    icon: <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-200" />,
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.6)',
    gradient: 'from-indigo-400 via-blue-700 to-[#0A1033]',
  },
  {
    id: 'global-orbit',
    title: 'Orbit Media',
    category: 'Global Content Mesh',
    description: 'Global editorial publishing network reaching over 18 million monthly readers with sub-50ms TTFB worldwide.',
    metrics: '18M+ Monthly Readers',
    icon: <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-sky-200" />,
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.6)',
    gradient: 'from-sky-400 via-cyan-700 to-[#061D2B]',
  },
];

interface ArcShowcaseSectionProps {
  onSelectProjectForInquiry: (projectName: string) => void;
}

export const ArcShowcaseSection: React.FC<ArcShowcaseSectionProps> = ({
  onSelectProjectForInquiry,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [radiusX, setRadiusX] = useState(530);
  const [radiusY, setRadiusY] = useState(140);
  const total = SHOWCASE_PROJECTS.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive radius calculation so the arch fills wide screens magnificently and fits mobile screens
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const mobile = w < 640;
      setIsMobile(mobile);
      if (w < 440) {
        setRadiusX(Math.min(160, Math.max(120, (w - 30) * 0.42)));
        setRadiusY(55);
      } else if (w < 640) {
        setRadiusX(Math.min(220, Math.max(160, (w - 40) * 0.45)));
        setRadiusY(75);
      } else if (w < 1024) {
        setRadiusX(420);
        setRadiusY(115);
      } else {
        setRadiusX(540);
        setRadiusY(140);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, total]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    touchStartX.current = null;
  };

  const activeProject = SHOWCASE_PROJECTS[activeIndex];

  return (
    <section id="showcase" className="relative z-20 w-full max-w-full bg-[#080B10] text-[#F5F7FA] pt-14 pb-4 sm:pt-16 sm:pb-6 overflow-x-clip overflow-y-visible selection:bg-[#FF384C] selection:text-white scroll-mt-12">
      {/* 1. TOP CURVED / ROUNDED BOUNDARY ARCH (Electric Blue Laser Glow Outline - 100% Mobile Responsive) */}
      <div className="absolute -top-7 sm:-top-9 md:-top-11 left-0 right-0 w-full pointer-events-none z-30 leading-none overflow-x-clip overflow-y-visible">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-7 sm:h-9 md:h-11 block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="arcLaserStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0070FF" stopOpacity="0" />
              <stop offset="15%" stopColor="#0070FF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
              <stop offset="85%" stopColor="#0070FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0070FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="arcLaserGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0070FF" stopOpacity="0" />
              <stop offset="20%" stopColor="#0070FF" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#0070FF" stopOpacity="0.85" />
              <stop offset="80%" stopColor="#0070FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0070FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Seamless Solid Fill matching Section Background */}
          <path
            d="M 0 48 Q 720 4 1440 48 L 1440 50 L 0 50 Z"
            fill="#080B10"
          />

          {/* Soft Bloom Laser Glow along the curve (Electric Blue) */}
          <path
            d="M 0 48 Q 720 4 1440 48"
            stroke="url(#arcLaserGlow)"
            strokeWidth="4"
            fill="none"
            className="blur-[2px] opacity-80"
          />

          {/* Precision Crisp Laser Line along the curve (Cyan/Electric Blue) */}
          <path
            d="M 0 48 Q 720 4 1440 48"
            stroke="url(#arcLaserStroke)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        {/* Ambient Center Glow Bloom at the apex of the curve (Premium Electric Blue) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-64 sm:w-[460px] h-5 bg-gradient-to-r from-transparent via-[#0070FF]/40 to-transparent blur-md" />
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-72 sm:w-[480px] h-14 bg-[#0070FF]/15 blur-2xl pointer-events-none" />
      </div>

      {/* 2. AMBIENT SIDE GLOW ORBS: TWO SIDES STAY MINIMAL RED (Strictly clipped to section) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-36 w-[450px] h-[450px] bg-[#FF384C]/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-36 w-[460px] h-[460px] bg-[#FF384C]/8 rounded-full blur-[150px] pointer-events-none" />
      </div>

      {/* 3. MINIMAL PRECISION TECH GRID OVERLAY */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 25%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 25%, transparent 85%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        {/* Section Header: Tight vertical spacing without excessive gap */}
        <div className="text-center mb-6 sm:mb-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121622]/80 border border-[#FF384C]/40 text-[#FF384C] text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mb-2.5 shadow-[0_0_20px_rgba(255,56,76,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF384C] animate-pulse" />
            <span>Selected Works // Auto Showcase</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#F5F7FA]">
            Digital Experiences <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F7FA] to-[#929AA7]">in Motion</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#929AA7] mt-2 leading-relaxed">
            Curated web products engineered for performance, scale, and brand distinction.
          </p>
        </div>

        {/* EXPANDED & IMMERSIVE ARC CAROUSEL STAGE (Continuous Autoplay + Touch Swipe) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-6xl h-[520px] sm:h-[620px] md:h-[660px] flex flex-col items-center justify-end pb-4 select-none touch-pan-y"
        >
          {/* DYNAMIC AMBIENT BACKLIGHT BEHIND THE ARCH */}
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-[650px] h-[360px] rounded-full blur-[110px] pointer-events-none transition-all duration-700 opacity-60"
            style={{
              background: `radial-gradient(circle, ${activeProject.glowColor} 0%, rgba(255, 56, 76, 0.22) 50%, transparent 80%)`,
            }}
          />

          {/* LARGE ARCH CANOPY OF SQUIRCLES */}
          <div className="absolute top-2 left-0 right-0 h-[320px] sm:h-[400px] flex items-center justify-center pointer-events-none overflow-x-clip">
            {SHOWCASE_PROJECTS.map((project, idx) => {
              let diff = idx - activeIndex;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              const stepAngle = 18;
              const angleDeg = diff * stepAngle;
              const angleRad = (angleDeg * Math.PI) / 180;

              // Wide dynamic arch coordinates
              const x = Math.sin(angleRad) * radiusX;
              const y = (1 - Math.cos(angleRad)) * radiusY + 15;

              const isCurrent = idx === activeIndex;
              const isVisible = Math.abs(diff) <= (isMobile ? 2 : 4);

              if (!isVisible) return null;

              return (
                <motion.div
                  key={project.id}
                  animate={{
                    x,
                    y,
                    rotate: angleDeg * 0.85,
                    scale: isCurrent ? (isMobile ? 1.15 : 1.35) : (isMobile ? 0.8 : 0.9),
                    opacity: isCurrent ? 1 : Math.max(0.35, 1 - Math.abs(diff) * 0.17),
                    zIndex: isCurrent ? 30 : 20 - Math.abs(diff),
                  }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute pointer-events-auto cursor-pointer"
                  style={{ transformOrigin: 'center center' }}
                  onClick={() => setActiveIndex(idx)}
                >
                  {/* Rich responsive squircle */}
                  <div
                    className={`relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-col items-center justify-center border transition-all duration-300 bg-gradient-to-br ${project.gradient} ${
                      isCurrent
                        ? 'border-white/95 ring-3 sm:ring-4 ring-[#FF384C]/50 shadow-[0_0_45px_rgba(255,56,76,0.7)]'
                        : 'border-[#1E2638] hover:border-white/50 shadow-lg'
                    }`}
                    style={{
                      boxShadow: isCurrent ? `0 0 50px ${project.glowColor}` : undefined,
                    }}
                  >
                    {/* Scaled Icon */}
                    <div className="flex items-center justify-center scale-110 sm:scale-125">
                      {project.icon}
                    </div>

                    {/* Active Indicator Dot */}
                    {isCurrent && (
                      <span className="absolute -bottom-2 w-2.5 h-2.5 rounded-full bg-[#FF384C] ring-2 ring-[#080B10] shadow-[0_0_10px_#FF384C]" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CENTRAL CONTENT DISPLAY (Positioned smoothly under the wide arch) */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-xl px-4 sm:px-6 mt-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center w-full"
              >
                <span className="text-[11px] sm:text-sm font-mono font-medium text-[#FF384C] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF384C]" />
                  {activeProject.category}
                </span>

                <h3 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#F5F7FA] mb-2">
                  {activeProject.title}
                </h3>

                <p className="text-xs sm:text-sm md:text-base text-[#CBD5E1] leading-relaxed mb-4 max-w-lg">
                  {activeProject.description}
                </p>

                {/* Mobile Touch Indicators & Arrows */}
                <div className="flex items-center justify-center gap-3 mb-3.5 sm:hidden">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-white/5 border border-white/10 active:scale-90 text-white"
                    aria-label="Previous work"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-1">
                    {SHOWCASE_PROJECTS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeIndex ? 'w-4 bg-[#FF384C]' : 'w-1.5 bg-white/20'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-white/5 border border-white/10 active:scale-90 text-white"
                    aria-label="Next work"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center w-full">
                  <button
                    onClick={() => onSelectProjectForInquiry(activeProject.title)}
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 sm:px-7 sm:py-3 rounded-full bg-[#F5F7FA] text-[#080B10] hover:bg-white text-xs sm:text-sm font-semibold transition-all shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.45)] hover:scale-[1.03] active:scale-95 cursor-pointer w-full max-w-[280px] sm:w-auto"
                  >
                    <span>Start Similar Project</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
