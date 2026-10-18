"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WebindEsyusPartnershipProps {
  onStartJointProject?: () => void;
}

const REVIEWS_ROW_1 = [
  { name: "Alex Vance", role: "Apex Capital", text: "Conversion rate leaped by +280% in 3 weeks.", stars: 5 },
  { name: "Sophia Miller", role: "Kinetic AI", text: "Unmatched performance. Pure 60fps across all devices.", stars: 5 },
  { name: "Marcus Thorne", role: "Vertex Studio", text: "Flawless UI engineering and distinct brand aura.", stars: 5 },
  { name: "Elena Rostova", role: "Prism Labs", text: "Sub-12ms response times. Absolute craftsmanship.", stars: 5 },
  { name: "David Kim", role: "Nova Venture", text: "Delivered 2 weeks ahead of schedule. Exceptional.", stars: 5 },
  { name: "Rachel Brooks", role: "Solis Tech", text: "Turned our complex app vision into pure art.", stars: 5 },
];

const REVIEWS_ROW_2 = [
  { name: "Liam Patel", role: "Horizon Group", text: "The 3D interactions blew our investors away.", stars: 5 },
  { name: "Sarah Chen", role: "Pulse Systems", text: "Enterprise-grade reliability with boutique design soul.", stars: 5 },
  { name: "Nathan Wright", role: "Nexus Financial", text: "Cleanest architecture we have ever audited.", stars: 5 },
  { name: "Chloe Davies", role: "Aether Global", text: "Mobile Lighthouse score jumped from 41 to 99.", stars: 5 },
  { name: "Julian Haas", role: "Stellar Cloud", text: "Exceptional attention to micro-animations.", stars: 5 },
  { name: "Maya Sterling", role: "Catalyst Tech", text: "The undisputed gold standard for web engineering.", stars: 5 },
];

export const WebindEsyusPartnership: React.FC<WebindEsyusPartnershipProps> = ({
  onStartJointProject,
}) => {
  return (
    <section
      id="partner"
      className="relative z-20 w-full max-w-full min-h-[500px] sm:min-h-[85vh] lg:min-h-[90vh] bg-black text-white flex flex-col justify-between py-7 sm:py-10 md:py-12 overflow-hidden select-none scroll-mt-12"
    >
      <style>{`
        @keyframes marqueeRowLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        @keyframes marqueeRowRight {
          0% { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-track-left {
          animation: marqueeRowLeft 38s linear infinite;
          will-change: transform;
        }
        .marquee-track-right {
          animation: marqueeRowRight 38s linear infinite;
        }
      `}</style>

      {/* 1. TOP & BOTTOM DEEP SEAMLESS BLACK GRADIENTS (100% solid pitch black at boundary) */}
      <div className="absolute top-0 inset-x-0 h-32 sm:h-64 bg-gradient-to-b from-black via-black via-45% to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 inset-x-0 h-32 sm:h-64 bg-gradient-to-t from-black via-black via-45% to-transparent pointer-events-none z-20" />

      {/* 2. FOUR CORNER DEEP BLACK MASKS (Zero visible corner boundaries) */}
      <div className="hidden sm:block absolute top-0 left-0 w-80 sm:w-[420px] h-60 sm:h-80 bg-[radial-gradient(ellipse_at_top_left,#000000_0%,#000000_55%,transparent_85%)] pointer-events-none z-20" />
      <div className="hidden sm:block absolute top-0 right-0 w-80 sm:w-[420px] h-60 sm:h-80 bg-[radial-gradient(ellipse_at_top_right,#000000_0%,#000000_55%,transparent_85%)] pointer-events-none z-20" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-80 sm:w-[420px] h-60 sm:h-80 bg-[radial-gradient(ellipse_at_bottom_left,#000000_0%,#000000_55%,transparent_85%)] pointer-events-none z-20" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-80 sm:w-[420px] h-60 sm:h-80 bg-[radial-gradient(ellipse_at_bottom_right,#000000_0%,#000000_55%,transparent_85%)] pointer-events-none z-20" />

      {/* 3. MOBILE CENTER AURA: Focused Keynote Radial Spotlight (Replaces clashing side smears on mobile) */}
      <div className="sm:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[280px] pointer-events-none z-10">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25)_0%,rgba(0,112,255,0.18)_35%,rgba(0,40,150,0.06)_60%,transparent_75%)] blur-[45px]" />
        <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_0%,rgba(56,189,248,0.22)_40%,transparent_70%)] blur-[25px]" />
      </div>

      {/* 4. DESKTOP LEFT SIDE ELECTRIC BLUE FLUID SPOTLIGHT */}
      <div className="hidden sm:block absolute inset-y-0 left-0 w-2/3 pointer-events-none z-10 overflow-hidden">
        {/* Soft Outer Cyan-White Glow Atmosphere */}
        <div
          className="absolute -left-20 top-1/2 -translate-y-1/2 w-[650px] h-[480px] opacity-75 blur-[100px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 15% 50%, rgba(195, 235, 255, 0.8) 0%, rgba(0, 110, 255, 0.75) 35%, rgba(0, 45, 175, 0.35) 60%, transparent 80%)',
          }}
        />

        {/* Luminous Electric Blue Core */}
        <div
          className="absolute -left-12 top-1/2 -translate-y-1/2 w-[500px] h-[340px] opacity-90 blur-[70px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 10% 50%, #BFE0FF 0%, #0070FF 42%, rgba(0, 50, 200, 0.4) 70%, transparent 90%)',
          }}
        />
      </div>

      {/* 5. DESKTOP RIGHT SIDE ELECTRIC BLUE FLUID SPOTLIGHT (SYMMETRIC MIRROR) */}
      <div className="hidden sm:block absolute inset-y-0 right-0 w-2/3 pointer-events-none z-10 overflow-hidden">
        {/* Soft Outer Cyan-White Glow Atmosphere */}
        <div
          className="absolute -right-20 top-1/2 -translate-y-1/2 w-[650px] h-[480px] opacity-75 blur-[100px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 85% 50%, rgba(195, 235, 255, 0.8) 0%, rgba(0, 110, 255, 0.75) 35%, rgba(0, 45, 175, 0.35) 60%, transparent 80%)',
          }}
        />

        {/* Luminous Electric Blue Core */}
        <div
          className="absolute -right-12 top-1/2 -translate-y-1/2 w-[500px] h-[340px] opacity-90 blur-[70px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 90% 50%, #BFE0FF 0%, #0070FF 42%, rgba(0, 50, 200, 0.4) 70%, transparent 90%)',
          }}
        />
      </div>

      {/* 6. UPPER SPACE GAP: COMPACT REVIEW MARQUEE (Row 1 - Moving Left, 100% Seamless 60fps) */}
      <div className="relative z-30 w-full max-w-full overflow-hidden my-1 sm:my-3">
        {/* Left & Right Black Gradient Vignette Fades */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-12 sm:w-48 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-12 sm:w-48 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="flex flex-nowrap w-full max-w-full overflow-hidden">
          {/* Track A */}
          <div className="marquee-track-left flex shrink-0 items-center gap-2.5 sm:gap-4 pr-2.5 sm:pr-4 py-1">
            {REVIEWS_ROW_1.map((review, i) => (
              <div
                key={`r1-a-${i}`}
                className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-3 rounded-full bg-[#0E131E]/95 border border-[#1E2638] backdrop-blur-md whitespace-nowrap shadow-md hover:border-[#38BDF8]/40 active:scale-95 transition-all"
              >
                <div className="flex items-center gap-0.5 text-[#FFB800] text-[10px] sm:text-xs">
                  {"★".repeat(review.stars)}
                </div>
                <span className="text-white font-normal text-[11px] sm:text-[13.5px] tracking-tight">
                  "{review.text}"
                </span>
                <span className="text-[#94A3B8] text-[10px] sm:text-xs font-mono font-medium pl-1.5 sm:pl-2 border-l border-[#2B354A]">
                  {review.name} · {review.role}
                </span>
              </div>
            ))}
          </div>

          {/* Track B (Identical Clone for Zero-Stutter Loop) */}
          <div className="marquee-track-left flex shrink-0 items-center gap-2.5 sm:gap-4 pr-2.5 sm:pr-4 py-1" aria-hidden="true">
            {REVIEWS_ROW_1.map((review, i) => (
              <div
                key={`r1-b-${i}`}
                className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-3 rounded-full bg-[#0E131E]/95 border border-[#1E2638] backdrop-blur-md whitespace-nowrap shadow-md hover:border-[#38BDF8]/40 active:scale-95 transition-all"
              >
                <div className="flex items-center gap-0.5 text-[#FFB800] text-[10px] sm:text-xs">
                  {"★".repeat(review.stars)}
                </div>
                <span className="text-white font-normal text-[11px] sm:text-[13.5px] tracking-tight">
                  "{review.text}"
                </span>
                <span className="text-[#94A3B8] text-[10px] sm:text-xs font-mono font-medium pl-1.5 sm:pl-2 border-l border-[#2B354A]">
                  {review.name} · {review.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. CENTER BRAND LOGOS & CTA BUTTON (Lush, High-Prestige Centerpiece) */}
      <div className="relative z-30 flex flex-col items-center justify-center px-4 sm:px-6 py-5 sm:py-8 text-center my-auto w-full max-w-full">
        {/* Prestige Partnership Pill Badge */}
        <div className="mb-2 sm:mb-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0C121E]/95 border border-[#0070FF]/40 shadow-[0_0_16px_rgba(0,112,255,0.3)] backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#38BDF8] shadow-[0_0_6px_#38BDF8]" />
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-[#93C5FD] uppercase">
            Strategic Alliance
          </span>
        </div>

        {/* BRAND ROW: WEBIND | ESYUS in bold cinematic typography */}
        <div className="flex items-center justify-center gap-2 sm:gap-5 md:gap-7">
          <span className="font-sans font-black tracking-tight sm:tracking-wider text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            WEBIND
          </span>

          {/* Crisp White Center Divider Line */}
          <div className="h-7 min-[380px]:h-8 sm:h-12 md:h-16 w-[1.5px] sm:w-[2px] bg-white/80 rounded-full mx-1 sm:mx-2 shadow-[0_0_10px_rgba(255,255,255,0.6)]" />

          <span className="font-sans font-black tracking-tight sm:tracking-wider text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            ESYUS
          </span>
        </div>

        {/* Tagline for Mobile & Desktop Authority */}
        <p className="mt-2 sm:mt-2.5 max-w-md text-[11px] sm:text-sm text-[#94A3B8] font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] px-4">
          Uniting high-end brand architecture with high-velocity product engineering.
        </p>

        {/* CTA BUTTON: GET STARTED / CREATE ORDER (Compact, Sleek & Ultra-Premium) */}
        <div className="mt-3.5 sm:mt-5 flex flex-col items-center justify-center w-full">
          <button
            onClick={onStartJointProject}
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-2.5 sm:py-2.5 rounded-full bg-gradient-to-b from-white via-[#FAFAFA] to-[#EDF2F7] text-black text-xs sm:text-[13px] font-semibold tracking-tight whitespace-nowrap transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.35),0_0_24px_rgba(56,189,248,0.35)] hover:shadow-[0_4px_32px_rgba(56,189,248,0.6),0_0_16px_rgba(255,255,255,0.7)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer ring-1 ring-white/90"
          >
            <span>Get Started / Create Order</span>
            <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-black text-white flex items-center justify-center transition-all duration-200 group-hover:bg-[#0284C7] group-hover:translate-x-0.5">
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
            </span>
          </button>
        </div>
      </div>

      {/* 8. LOWER SPACE GAP: COMPACT REVIEW MARQUEE (Row 2 - Moving in Opposite Direction, 100% Seamless 60fps) */}
      <div className="relative z-30 w-full max-w-full overflow-hidden my-1 sm:my-3">
        {/* Left & Right Black Gradient Vignette Fades */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-12 sm:w-48 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-12 sm:w-48 bg-gradient-to-l from-black to-transparent z-10" />

        <div className="flex flex-nowrap w-full max-w-full overflow-hidden">
          {/* Track A */}
          <div className="marquee-track-right flex shrink-0 items-center gap-2.5 sm:gap-4 pr-2.5 sm:pr-4 py-1">
            {REVIEWS_ROW_2.map((review, i) => (
              <div
                key={`r2-a-${i}`}
                className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-3 rounded-full bg-[#0E131E]/95 border border-[#1E2638] backdrop-blur-md whitespace-nowrap shadow-md hover:border-[#38BDF8]/40 active:scale-95 transition-all"
              >
                <div className="flex items-center gap-0.5 text-[#FFB800] text-[10px] sm:text-xs">
                  {"★".repeat(review.stars)}
                </div>
                <span className="text-white font-normal text-[11px] sm:text-[13.5px] tracking-tight">
                  "{review.text}"
                </span>
                <span className="text-[#94A3B8] text-[10px] sm:text-xs font-mono font-medium pl-1.5 sm:pl-2 border-l border-[#2B354A]">
                  {review.name} · {review.role}
                </span>
              </div>
            ))}
          </div>

          {/* Track B (Identical Clone for Zero-Stutter Loop) */}
          <div className="marquee-track-right flex shrink-0 items-center gap-2.5 sm:gap-4 pr-2.5 sm:pr-4 py-1" aria-hidden="true">
            {REVIEWS_ROW_2.map((review, i) => (
              <div
                key={`r2-b-${i}`}
                className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-5 sm:py-3 rounded-full bg-[#0E131E]/95 border border-[#1E2638] backdrop-blur-md whitespace-nowrap shadow-md hover:border-[#38BDF8]/40 active:scale-95 transition-all"
              >
                <div className="flex items-center gap-0.5 text-[#FFB800] text-[10px] sm:text-xs">
                  {"★".repeat(review.stars)}
                </div>
                <span className="text-white font-normal text-[11px] sm:text-[13.5px] tracking-tight">
                  "{review.text}"
                </span>
                <span className="text-[#94A3B8] text-[10px] sm:text-xs font-mono font-medium pl-1.5 sm:pl-2 border-l border-[#2B354A]">
                  {review.name} · {review.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
