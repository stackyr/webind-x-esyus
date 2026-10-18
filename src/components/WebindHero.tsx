"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface WebindHeroProps {
  onStartProject: () => void;
  onOpenNav?: () => void;
}

export const WebindHero: React.FC<WebindHeroProps> = ({ onStartProject, onOpenNav }) => {
  return (
    <div className="min-h-screen w-full bg-transparent text-[#F5F7FA] flex flex-col justify-between selection:bg-[#FF384C] selection:text-white pointer-events-none">
      {/* 1. TOP NAVIGATION */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 pt-4 sm:pt-8 pb-3 sm:pb-4 flex items-center justify-between pointer-events-auto">
        {/* Top-left: Webind × Esyus wordmark */}
        <a
          href="/"
          className="text-base sm:text-2xl font-semibold tracking-tight text-white hover:opacity-90 active:scale-95 transition-all drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] flex items-center gap-1.5"
        >
          <span>Webind</span>
          <span className="text-[#FF384C] font-light">×</span>
          <span>Esyus</span>
        </a>

        {/* Top-right Controls: Live Status Pill & Animated 3-line Navigation Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Highlighted Partnership Electric Blue Live Status Pill */}
          <div className="relative group">
            {/* Subtle Ambient Electric Blue Backlight Glow (Matching Partnership Section Aura) */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#0038D6] via-[#0070FF] to-[#38BDF8] opacity-60 blur-md group-hover:opacity-90 group-hover:blur-lg transition-all duration-300 pointer-events-none" />

            <div className="relative flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#060D1A]/95 backdrop-blur-md border border-[#0070FF]/65 shadow-[0_0_20px_rgba(0,112,255,0.45),0_0_36px_rgba(0,70,220,0.25)] transition-all duration-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0070FF] opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0070FF] shadow-[0_0_10px_#0070FF,0_0_4px_#BFE0FF]" />
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-white tracking-tight drop-shadow-[0_1px_6px_rgba(0,112,255,0.85)]">
                Digital Solutions
              </span>
            </div>
          </div>

          {/* Animated 3-Line Hamburger Menu Button */}
          {onOpenNav && (
            <button
              onClick={onOpenNav}
              className="group relative flex items-center gap-2 sm:gap-2.5 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0C1017]/90 hover:bg-[#141B26] backdrop-blur-md border border-white/20 hover:border-white/50 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.6)] focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide uppercase text-white/90 group-hover:text-white transition-colors hidden sm:inline-block">
                Menu
              </span>
              {/* 3 Animated Horizontal Lines */}
              <div className="flex flex-col justify-center items-end gap-[4px] w-4 sm:w-5 h-3.5 sm:h-4 py-0.5">
                <span className="h-[2px] w-4 sm:w-5 bg-white rounded-full transition-all duration-300 group-hover:w-3 group-hover:bg-[#FF384C]" />
                <span className="h-[2px] w-3 sm:w-4 bg-white/90 rounded-full transition-all duration-300 group-hover:w-5 group-hover:bg-white" />
                <span className="h-[2px] w-4 sm:w-5 bg-white rounded-full transition-all duration-300 group-hover:w-2.5 group-hover:bg-[#38BDF8]" />
              </div>
            </button>
          )}
        </div>
      </header>

      {/* 2. MAIN HERO SECTION (Spacious Canvas, Responsive Margin-Aligned Content) */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 flex-1 flex flex-col justify-end pt-4 pb-1 sm:pb-2 pointer-events-none">
        {/* LOWER AREA: Pushed flush down and to margins to clear the centered 3D MacBook */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-4 sm:gap-8 pb-1 sm:pb-2">
          
          {/* LOWER-LEFT AREA: Paragraph + Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-2.5 sm:gap-4 max-w-[360px] pointer-events-auto w-full sm:w-auto"
          >
            {/* Supporting paragraph: responsive size, high-contrast drop-shadow */}
            <p className="text-xs sm:text-[15px] leading-relaxed text-[#F1F5F9] font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              We design and develop high-performance websites and digital experiences that help ambitious brands grow.
            </p>

            {/* Primary CTA: Highlighted pill-shaped button labelled "Start a Project" with circular arrow */}
            <div className="relative group w-auto">
              {/* Subtle ambient backlight glow in Webind Crimson */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#FF384C] via-[#FF1E38] to-[#FF5E73] opacity-65 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 pointer-events-none" />

              <button
                onClick={onStartProject}
                className="relative inline-flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3 pl-3.5 pr-2 py-2 sm:pl-4.5 sm:pr-2 sm:py-2 rounded-full bg-gradient-to-r from-[#171C26] via-[#10141D] to-[#171C26] border border-[#FF384C]/65 hover:border-[#FF384C] active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF384C] shadow-[0_0_22px_rgba(255,56,76,0.32),0_4px_16px_rgba(0,0,0,0.8)] w-auto"
                aria-label="Start a Project with Webind"
              >
                {/* Glowing live beacon indicator */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF384C] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF384C] shadow-[0_0_8px_#FF384C]" />
                </span>

                <span className="text-xs sm:text-base font-semibold tracking-tight text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  Start a Project
                </span>

                <span
                  className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-[#080B10] shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all duration-200 group-hover:bg-[#FF384C] group-hover:text-white group-hover:translate-x-0.5 group-active:scale-90"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* LOWER-RIGHT AREA: 2-column mobile app widget cards */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-auto md:max-w-[360px] pointer-events-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5 sm:gap-3.5 w-full md:text-right pt-1 md:pt-0">
              {/* Item 1 Card */}
              <div className="p-2.5 sm:p-0 rounded-xl sm:rounded-none bg-[#0C1017]/70 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-white/8 sm:border-0 shadow-sm sm:shadow-none">
                <h3 className="text-xs sm:text-base font-semibold sm:font-medium text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  Web + Digital
                </h3>
                <p className="text-[10px] sm:text-xs leading-relaxed text-[#CBD5E1] mt-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  Websites, landing pages and digital experiences.
                </p>
              </div>

              {/* Item 2 Card */}
              <div className="p-2.5 sm:p-0 rounded-xl sm:rounded-none bg-[#0C1017]/70 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border border-white/8 sm:border-0 md:border-t md:border-[#202634] md:pt-3 shadow-sm sm:shadow-none">
                <h3 className="text-xs sm:text-base font-semibold sm:font-medium text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  Webind × Esyus
                </h3>
                <p className="text-[10px] sm:text-xs leading-relaxed text-[#CBD5E1] mt-0.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  A collaborative approach to websites, apps and software.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* 3. BOTTOM SCROLL INDICATOR */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-14 pb-4 sm:pb-5 flex items-center justify-between pointer-events-auto">
        <span className="font-mono text-[10px] sm:text-xs font-medium text-[#CBD5E1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          01 // OVERVIEW
        </span>
        <span className="text-[10px] sm:text-xs font-medium text-[#CBD5E1] tracking-wider uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] flex items-center gap-1.5">
          <span>Scroll to explore capabilities</span>
          <span className="text-[#FF384C] font-bold">↓</span>
        </span>
      </div>
    </div>
  );
};
