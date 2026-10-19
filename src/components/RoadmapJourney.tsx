"use client";

import React, { useState, useEffect, useRef } from "react";
import { Flag, BarChart2, Package, Sparkles, ArrowRight } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";

interface Milestone {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Flag;
  targetProgress: number; // 0.0 to 1.0 along the road
  x: number;
  y: number;
  numX: number;
  numY: number;
  numLabel: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 1,
    title: "Strategic Architecture",
    subtitle: "Phase 01 // Blueprint & Discovery",
    description: "Deep brand immersion, technical discovery, system constraints, user flows, and modular design token foundations.",
    icon: Flag,
    targetProgress: 0.16,
    x: 210,
    y: 330,
    numX: 410,
    numY: 480,
    numLabel: "01",
  },
  {
    id: 2,
    title: "High-Velocity Engineering",
    subtitle: "Phase 02 // Product Assembly",
    description: "Precision Next.js & React engineering, Webind aesthetic typography, dynamic shaders, and Esyus cloud infrastructure.",
    icon: BarChart2,
    targetProgress: 0.54,
    x: 630,
    y: 260,
    numX: 840,
    numY: 410,
    numLabel: "02",
  },
  {
    id: 3,
    title: "Flagship Launch & Scale",
    subtitle: "Phase 03 // Global Deployment",
    description: "Sub-second global edge CDN delivery, lighthouse 100 SEO & accessibility calibration, and continuous growth scaling.",
    icon: Package,
    targetProgress: 0.86,
    x: 1040,
    y: 220,
    numX: 1250,
    numY: 370,
    numLabel: "03",
  },
];

const ROAD_PATH =
  "M 80 300 C 130 315, 170 330, 210 330 C 310 330, 340 380, 440 380 C 540 380, 580 270, 630 260 C 720 248, 770 280, 860 280 C 960 280, 990 230, 1040 220 C 1130 205, 1220 160, 1340 100";

export function RoadmapJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const activePathRef = useRef<SVGPathElement>(null);
  const coreBeamRef = useRef<SVGPathElement>(null);
  const sparkGroupRef = useRef<SVGGElement>(null);

  const [activeStep, setActiveStep] = useState<number>(1);
  const [totalPathLength, setTotalPathLength] = useState<number>(1400);

  // Bind scroll position directly to the 260vh scroll container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth buttery-smooth spring interpolation for zero-lag scroll tracking
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.0005,
  });

  // Measure path length on mount
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setTotalPathLength(len);
    }
  }, []);

  // Update SVG path stroke and traveling spark directly on spring changes (Zero React re-renders!)
  useEffect(() => {
    let lastStep = 1;

    const unsubscribe = smoothProgress.on("change", (v) => {
      if (!pathRef.current || totalPathLength <= 0) return;

      // Start at 0.08 progress so first milestone is immediately visible, scale to 1.0
      const clamped = Math.max(0.06, Math.min(1.0, 0.06 + v * 0.94));
      const currentLen = clamped * totalPathLength;

      // Direct DOM style updates for 120fps hardware acceleration
      if (activePathRef.current) {
        activePathRef.current.style.strokeDasharray = `${currentLen} ${totalPathLength * 2}`;
      }
      if (coreBeamRef.current) {
        coreBeamRef.current.style.strokeDasharray = `${currentLen} ${totalPathLength * 2}`;
      }

      // Compute spark coordinates along the SVG curve
      const pt = pathRef.current.getPointAtLength(currentLen);
      const ptAhead = pathRef.current.getPointAtLength(Math.min(totalPathLength, currentLen + 2));
      const angle = Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x) * (180 / Math.PI);

      if (sparkGroupRef.current) {
        sparkGroupRef.current.setAttribute("transform", `translate(${pt.x}, ${pt.y}) rotate(${angle})`);
      }

      // Only update React state when step boundary actually changes (avoids frame re-renders!)
      let currentStep = 1;
      if (clamped >= 0.72) {
        currentStep = 3;
      } else if (clamped >= 0.38) {
        currentStep = 2;
      } else {
        currentStep = 1;
      }

      if (currentStep !== lastStep) {
        lastStep = currentStep;
        setActiveStep(currentStep);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, totalPathLength]);

  const scrollToMilestone = (stepId: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const scrollableDistance = container.offsetHeight - window.innerHeight;

    const progressTarget = stepId === 1 ? 0.1 : stepId === 2 ? 0.5 : 0.88;
    const targetY = scrollTop + scrollableDistance * progressTarget;

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const activeMilestone = MILESTONES.find((m) => m.id === activeStep) || MILESTONES[0];

  return (
    <div
      ref={containerRef}
      id="roadmap"
      className="relative z-10 w-full h-[270vh] bg-black text-white scroll-mt-12 select-none"
    >
      {/* 
        STICKY FULLSCREEN VIEWPORT WINDOW:
        Pins firmly in place ("okhane darabe to") as user scrolls through the 270vh height,
        smoothly drawing the road path from start to finish!
      */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-10 lg:px-16 overflow-hidden">
        
        {/* 100% Seamless Top & Bottom Black Melt (Zero visible boundary) */}
        <div className="absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-black via-black/85 to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none z-20" />

        {/* Ambient Radial Nebula Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(24, 45, 88, 0.32) 0%, rgba(10, 14, 24, 0.7) 60%, #000000 100%)",
          }}
        />

        {/* Fine Star Dust Grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Giant Subtle Background Watermark */}
        <div className="absolute top-4 right-6 lg:right-16 pointer-events-none select-none z-0">
          <span className="text-[75px] sm:text-[130px] lg:text-[160px] font-extrabold tracking-tighter text-slate-800/20 leading-none">
            ROADMAP
          </span>
        </div>

        {/* TOP HEADER */}
        <div className="relative z-10 max-w-2xl mt-2 sm:mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1524] border border-[#1E293B] text-[10px] sm:text-[11px] font-mono tracking-widest text-[#38BDF8] mb-2 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <Sparkles className="w-3 h-3 text-[#38BDF8]" />
            <span>SCROLL-DRIVEN JOURNEY</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-[40px] font-semibold text-white tracking-tight leading-[1.2]">
            Our Proven Engineering &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#60A5FA] to-[#0284C7] font-semibold">
              Execution Roadmap
            </span>
          </h2>
          <p className="text-[11px] sm:text-sm text-slate-400 mt-1 max-w-lg leading-relaxed hidden sm:block">
            Scroll down to drive along the path from initial architectural blueprint to production deployment.
          </p>
        </div>

        {/* INTERACTIVE ROAD CANVAS (Calibrated SVG) */}
        <div className="relative z-10 w-full my-auto flex flex-col items-center">
          <div className="relative w-full max-w-[1240px] aspect-[1440/560]">
            <svg
              viewBox="0 0 1440 560"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Ultra-luminous multi-pass neon road glow filter */}
                <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feGaussianBlur stdDeviation="4" result="innerGlow" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="innerGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Spark Head Halo */}
                <radialGradient id="spark-halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="25%" stopColor="#60a5fa" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#2563eb" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                </radialGradient>

                {/* Hexagon Node Volumetric Atmospheric Lighting */}
                <radialGradient id="node-light-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#208bfe" stopOpacity="0.85" />
                  <stop offset="40%" stopColor="#1d4ed8" stopOpacity="0.45" />
                  <stop offset="75%" stopColor="#0f172a" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0b0f19" stopOpacity="0" />
                </radialGradient>

                {/* Road Core Neon Gradient */}
                <linearGradient id="road-active-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#208bfe" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>

                {/* Dark Inactive Road Gradient */}
                <linearGradient id="road-inactive-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* BASE LAYER 1: Wide Deep Dark Bed */}
              <path
                d={ROAD_PATH}
                fill="none"
                stroke="#0a101f"
                strokeWidth="28"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* BASE LAYER 2: Inactive Road Body */}
              <path
                d={ROAD_PATH}
                fill="none"
                stroke="url(#road-inactive-grad)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />

              {/* INACTIVE DASHED ROAD CENTER LANE */}
              <path
                d={ROAD_PATH}
                fill="none"
                stroke="#334155"
                strokeWidth="2.5"
                strokeDasharray="9 16"
                strokeLinecap="round"
                opacity="0.6"
              />

              {/* HIDDEN MEASUREMENT PATH (Fixed geometry) */}
              <path
                ref={pathRef}
                d={ROAD_PATH}
                fill="none"
                stroke="transparent"
                strokeWidth="1"
              />

              {/* DYNAMIC ACTIVE ROAD: Ultra-luminous Cyan-Blue Plasma Glow */}
              <path
                ref={activePathRef}
                d={ROAD_PATH}
                fill="none"
                stroke="url(#road-active-grad)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`100 ${totalPathLength * 2}`}
                filter="url(#neon-glow)"
                opacity="0.9"
              />

              {/* DYNAMIC ACTIVE ROAD: Pure White Core Hot Beam */}
              <path
                ref={coreBeamRef}
                d={ROAD_PATH}
                fill="none"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={`100 ${totalPathLength * 2}`}
                opacity="0.95"
              />

              {/* TRAVELING SPARK / LIVING HEAD AT TIP (Driven by scroll) */}
              <g
                ref={sparkGroupRef}
                transform="translate(210, 330)"
                className="pointer-events-none"
              >
                <circle cx="0" cy="0" r="28" fill="url(#spark-halo)" opacity="0.85" />
                <circle cx="0" cy="0" r="14" fill="#38bdf8" opacity="0.9" filter="url(#neon-glow)" />
                <circle cx="0" cy="0" r="5" fill="#ffffff" />
                <ellipse cx="-18" cy="0" rx="22" ry="5.5" fill="#60a5fa" opacity="0.6" filter="url(#neon-glow)" />
                <ellipse cx="-32" cy="0" rx="16" ry="3.5" fill="#2563eb" opacity="0.4" />
              </g>

              {/* ROAD MILESTONE NODES (1, 2, 3) */}
              {MILESTONES.map((m) => {
                const IconComp = m.icon;
                const isPassed = activeStep >= m.id;
                const isCurrent = activeStep === m.id;

                return (
                  <g
                    key={m.id}
                    onClick={() => scrollToMilestone(m.id)}
                    className="cursor-pointer group"
                  >
                    {/* Atmospheric Number in Background */}
                    <text
                      x={m.numX}
                      y={m.numY}
                      fontSize="135"
                      fontWeight="800"
                      className="select-none pointer-events-none transition-all duration-500 font-sans"
                      style={{
                        fill: isPassed ? "rgba(32, 139, 254, 0.22)" : "rgba(71, 85, 105, 0.12)",
                        transform: isCurrent ? "scale(1.05)" : "scale(1)",
                        transformOrigin: `${m.numX}px ${m.numY}px`,
                      }}
                    >
                      {m.numLabel}
                    </text>

                    {/* Volumetric Radial Aura underneath the node */}
                    {isPassed && (
                      <circle
                        cx={m.x}
                        cy={m.y}
                        r="54"
                        fill="url(#node-light-glow)"
                        className="transition-all duration-500 pointer-events-none"
                      />
                    )}

                    {/* Hexagon Milestone Badge directly on the road */}
                    <foreignObject
                      x={m.x - 27}
                      y={m.y - 30}
                      width="54"
                      height="60"
                      className="overflow-visible"
                    >
                      <div
                        className={`w-[54px] h-[60px] flex items-center justify-center transition-all duration-500 transform group-hover:scale-115 ${
                          isPassed
                            ? "bg-[#101c34] text-[#38bdf8] shadow-[0_0_35px_rgba(32,139,254,0.85)] scale-105"
                            : "bg-[#0f1728] text-slate-500 scale-95 opacity-80"
                        }`}
                        style={{
                          clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                          border: isPassed
                            ? "1.5px solid rgba(56, 189, 248, 0.65)"
                            : "1px solid rgba(51, 65, 85, 0.6)",
                        }}
                      >
                        <IconComp
                          size={23}
                          className={`transition-all duration-300 ${
                            isPassed
                              ? "text-[#38bdf8] drop-shadow-[0_0_10px_rgba(56,189,248,0.9)] stroke-[2.2]"
                              : "text-slate-500 stroke-[1.8]"
                          }`}
                        />
                      </div>
                    </foreignObject>

                    {/* Desktop Milestone Content Box (Visible on tablet/desktop) */}
                    <foreignObject
                      x={m.x - 15}
                      y={m.y + 46}
                      width="260"
                      height="140"
                      className="overflow-visible hidden sm:block"
                    >
                      <div className="pt-2 select-text transition-all duration-500">
                        <span className="text-[10px] font-mono tracking-wider uppercase text-[#38BDF8]">
                          {m.subtitle}
                        </span>
                        <h3
                          className={`text-[19px] sm:text-[21px] font-semibold tracking-tight transition-all duration-400 mt-0.5 ${
                            isPassed ? "text-white" : "text-slate-400"
                          }`}
                        >
                          {m.title}
                        </h3>
                        <p className="text-[13px] text-slate-400/90 leading-relaxed mt-1 font-normal max-w-[220px]">
                          {m.description}
                        </p>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* DEDICATED MOBILE MILESTONE CARD (Visible only on mobile for razor-sharp readability) */}
          <div className="w-full sm:hidden mt-3 px-2">
            <div className="p-3.5 rounded-xl bg-[#0C1220]/90 border border-[#1E293B] shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#38BDF8]">
                  {activeMilestone.subtitle}
                </span>
                <span className="text-[10px] font-mono font-bold text-white px-2 py-0.5 rounded-full bg-[#1E293B]">
                  {activeMilestone.numLabel} / 03
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white tracking-tight">
                {activeMilestone.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                {activeMilestone.description}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM STEP CONTROLS (Pill Navigation) */}
        <div className="relative z-20 w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-900/60 max-w-7xl mx-auto">
          {/* Scroll instruction indicator */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]" />
            </span>
            <span className="font-mono text-slate-300">Scroll to cover path</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Section stays pinned</span>
          </div>

          {/* Milestone Quick Jump Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0E1524]/90 border border-[#1E293B] backdrop-blur-md shadow-lg">
            {MILESTONES.map((m) => (
              <button
                key={m.id}
                onClick={() => scrollToMilestone(m.id)}
                className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-200 cursor-pointer ${
                  activeStep === m.id
                    ? "bg-gradient-to-r from-[#208BFE] to-[#0284C7] text-white shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
                aria-label={`Jump to Milestone ${m.id}: ${m.title}`}
              >
                Step {m.id}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default RoadmapJourney;
