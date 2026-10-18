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
      className="relative z-20 w-full max-w-full min-h-[70vh] sm:min-h-[85vh] lg:min-h-[90vh] bg-[#080B10] text-white flex flex-col justify-between py-6 sm:py-8 overflow-hidden select-none scroll-mt-12"
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
      <div className="absolute top-0 inset-x-0 h-40 sm:h-64 bg-gradient-to-b from-[#080B10] via-[#080B10] via-45% to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 inset-x-0 h-40 sm:h-64 bg-gradient-to-t from-[#080B10] via-[#080B10] via-45% to-transparent pointer-events-none z-20" />

      {/* 2. FOUR CORNER DEEP BLACK MASKS (Zero visible corner boundaries) */}
      <div className="absolute top-0 left-0 w-64 sm:w-[420px] h-48 sm:h-80 bg-[radial-gradient(ellipse_at_top_left,#080B10_0%,#080B10_55%,transparent_85%)] pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-64 sm:w-[420px] h-48 sm:h-80 bg-[radial-gradient(ellipse_at_top_right,#080B10_0%,#080B10_55%,transparent_85%)] pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-[420px] h-48 sm:h-80 bg-[radial-gradient(ellipse_at_bottom_left,#080B10_0%,#080B10_55%,transparent_85%)] pointer-events-none z-20" />
      <div className="absolute bottom-0 right-0 w-64 sm:w-[420px] h-48 sm:h-80 bg-[radial-gradient(ellipse_at_bottom_right,#080B10_0%,#080B10_55%,transparent_85%)] pointer-events-none z-20" />

      {/* 3. AMBIENT BACKLIGHT AURA (Natural spherical glow behind center brand on both mobile and desktop) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] md:w-[750px] h-[180px] sm:h-[320px] rounded-full bg-gradient-to-r from-[#0284C7]/25 via-[#38BDF8]/30 to-[#0284C7]/25 blur-[55px] sm:blur-[100px] pointer-events-none z-10" />

      {/* 4. SIDE ELECTRIC BLUE WING GRADIENTS (Desktop & Tablet Wings) */}
      <div className="hidden sm:block absolute inset-y-0 left-0 w-1/2 pointer-events-none z-10 overflow-hidden">
        <div
          className="absolute -left-16 top-1/2 -translate-y-1/2 w-[500px] h-[380px] opacity-65 blur-[90px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(195, 235, 255, 0.75) 0%, rgba(0, 110, 255, 0.65) 35%, rgba(0, 45, 175, 0.3) 60%, transparent 80%)',
          }}
        />
      </div>

      <div className="hidden sm:block absolute inset-y-0 right-0 w-1/2 pointer-events-none z-10 overflow-hidden">
        <div
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-[500px] h-[380px] opacity-65 blur-[90px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 80% 50%, rgba(195, 235, 255, 0.75) 0%, rgba(0, 110, 255, 0.65) 35%, rgba(0, 45, 175, 0.3) 60%, transparent 80%)',
          }}
        />
      </div>

      {/* 5. UPPER SPACE GAP: COMPACT REVIEW MARQUEE (Row 1 - Moving Left, 100% Seamless 60fps) */}
      <div className="relative z-30 w-full max-w-full overflow-hidden my-2 sm:my-3">
        {/* Left & Right Black Gradient Vignette Fades */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-12 sm:w-48 bg-gradient-to-r from-[#080B10] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-12 sm:w-48 bg-gradient-to-l from-[#080B10] to-transparent z-10" />

        <div className="flex flex-nowrap w-full max-w-full overflow-hidden">
          {/* Track A */}
          <div className="marquee-track-left flex shrink-0 items-center gap-2.5 sm:gap-4 pr-2.5 sm:pr-4 py-1">
            {REVIEWS_ROW_1.map((review, i) => (
              <div
                key={`r1-a-${i}`}
                className="inline-flex items-center gap-2 sm:gap-3 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full bg-[#0E131E]/95 border border-[#1E2638] backdrop-blur-md whitespace-nowrap shadow-md hover:border-[#38BDF8]/40 active:scale-95 transition-all"
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
                className="inline-flex items-center gap-2 sm:gap-3 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full bg-[#0E131E]/95 border border-[#1E2638] backdrop-blur-md whitespace-nowrap shadow-md hover:border-[#38BDF8]/40 active:scale-95 transition-all"
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

      {/* 6. CENTER BRAND LOGOS & CTA BUTTON */}
      <div className="relative z-30 flex flex-col items-center justify-center px-4 sm:px-6 py-6 sm:py-8 text-center my-auto w-full max-w-full">
        {/* BRAND ROW: WEBIND | ESYUS in identical sleek typography */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-5 md:gap-7">
          <span className="font-sans font-black tracking-normal sm:tracking-wider text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            WEBIND
          </span>

          {/* Crisp White Center Divider Line */}
          <div className="h-6 min-[380px]:h-8 sm:h-12 md:h-16 w-[1.5px] sm:w-[2px] bg-white/80 rounded-full mx-1 sm:mx-2" />

          <span className="font-sans font-black tracking-normal sm:tracking-wider text-2xl min-[380px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            ESYUS
          </span>
        </div>

        {/* CTA BUTTON: GET STARTED / CREATE ORDER (Compact, Sleek & Ultra-Premium) */}
        <div className="mt-3.5 sm:mt-5 flex flex-col items-center justify-center w-full">
          <button
            onClick={onStartJointProject}
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-b from-white via-[#FAFAFA] to-[#EDF2F7] text-[#080B10] text-[11px] sm:text-xs md:text-[13px] font-medium tracking-tight whitespace-nowrap transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.35),0_0_26px_rgba(56,189,248,0.32)] hover:shadow-[0_4px_32px_rgba(56,189,248,0.6),0_0_16px_rgba(255,255,255,0.7)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer ring-1 ring-white/80"
          >
            <span>Get Started / Create Order</span>
            <span className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-[#080B10] text-white flex items-center justify-center transition-all duration-200 group-hover:bg-[#0284C7] group-hover:translate-x-0.5">
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
            </span>
          </button>
        </div>
      </div>

      {/* 7. LOWER SPACE GAP: COMPACT REVIEW MARQUEE (Row 2 - Moving in Opposite Direction, 100% Seamless 60fps) */}
      <div className="relative z-30 w-full max-w-full overflow-hidden my-2 sm:my-3">
        {/* Left & Right Black Gradient Vignette Fades */}
        <div className="pointer-events-none absolute left-0 inset-y-0 w-12 sm:w-48 bg-gradient-to-r from-[#080B10] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-12 sm:w-48 bg-gradient-to-l from-[#080B10] to-transparent z-10" />

        <div className="flex flex-nowrap w-full max-w-full overflow-hidden">
          {/* Track A */}
          <div className="marquee-track-right flex shrink-0 items-center gap-2.5 sm:gap-4 pr-2.5 sm:pr-4 py-1">
            {REVIEWS_ROW_2.map((review, i) => (
              <div
                key={`r2-a-${i}`}
                className="inline-flex items-center gap-2 sm:gap-3 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full bg-[#0E131E]/95 border border-[#1E2638] backdrop-blur-md whitespace-nowrap shadow-md hover:border-[#38BDF8]/40 active:scale-95 transition-all"
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
                className="inline-flex items-center gap-2 sm:gap-3 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full bg-[#0E131E]/95 border border-[#1E2638] backdrop-blur-md whitespace-nowrap shadow-md hover:border-[#38BDF8]/40 active:scale-95 transition-all"
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
