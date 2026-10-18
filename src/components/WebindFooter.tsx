"use client";

import React from 'react';
import { motion } from 'motion/react';

interface WebindFooterProps {
  onContactClick: () => void;
  onHomeClick?: () => void;
}

export const WebindFooter: React.FC<WebindFooterProps> = ({
  onContactClick,
  onHomeClick,
}) => {
  const scrollToTop = () => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSolutions = () => {
    const el = document.getElementById('capabilities');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-20 w-full bg-[#080B10] text-[#F5F7FA] pt-6 sm:pt-10 pb-2 sm:pb-3 md:pb-4 select-none overflow-hidden">
      <style>{`
        @keyframes liquidFlowText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .liquid-animated-text {
          background-size: 250% 100%;
          animation: liquidFlowText 6.5s ease-in-out infinite;
        }
      `}</style>

      {/* 100% Solid Seamless Black Melt at Top (Zero visible boundary with previous section) */}
      <div className="absolute top-0 inset-x-0 h-64 sm:h-80 bg-gradient-to-b from-[#080B10] via-[#080B10] via-70% to-transparent pointer-events-none z-10" />

      {/* SUBTLE SIDE EDGE MASKS */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#080B10] via-[#080B10]/75 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#080B10] via-[#080B10]/75 to-transparent pointer-events-none z-10" />

      {/* VIVID ANIMATED LIVING LIQUID GRADIENT GLOW (Strictly confined to bottom baseline) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Base horizon gradient - 100% pitch black across the top 84% of footer */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #080B10 0%, #080B10 82%, #0A080C 88%, rgba(140, 16, 32, 0.15) 94%, rgba(255, 45, 68, 0.35) 100%)',
          }}
        />

        {/* Living Liquid Wave 1: Molten Crimson Plasma Drift (Pushed strictly down to baseline) */}
        <motion.div
          animate={{
            x: ['-18%', '20%', '-10%', '-18%'],
            y: ['3%', '-7%', '5%', '3%'],
            scaleX: [1, 1.25, 0.95, 1],
            scaleY: [1, 0.85, 1.15, 1],
            rotate: [0, 25, -18, 0],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
          className="absolute -bottom-36 sm:-bottom-44 left-[-2%] w-[420px] sm:w-[650px] h-[130px] sm:h-[180px] rounded-[48%_52%_65%_35%/55%_45%_55%_45%] bg-gradient-to-tr from-[#FF1E38]/30 via-[#FF384C]/35 to-[#E01E37]/18 blur-[50px] sm:blur-[70px] pointer-events-none"
        />

        {/* Living Liquid Wave 2: Molten Ruby-Coral Plasma Flow (Pushed strictly down to baseline) */}
        <motion.div
          animate={{
            x: ['20%', '-20%', '10%', '20%'],
            y: ['-6%', '5%', '-4%', '-6%'],
            scaleX: [1.12, 0.9, 1.18, 1.12],
            scaleY: [0.92, 1.15, 0.88, 0.92],
            rotate: [0, -30, 20, 0],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
          className="absolute -bottom-36 sm:-bottom-44 right-[-2%] w-[440px] sm:w-[680px] h-[140px] sm:h-[190px] rounded-[38%_62%_52%_48%/62%_38%_62%_38%] bg-gradient-to-tl from-[#FF4D61]/25 via-[#FF1E38]/35 to-[#990A1A]/20 blur-[50px] sm:blur-[70px] pointer-events-none"
        />

        {/* Living Liquid Wave 3: Pulsing Molten Core directly under watermark letters */}
        <motion.div
          animate={{
            scaleX: [0.9, 1.25, 0.95, 0.9],
            scaleY: [1.08, 0.88, 1.15, 1.08],
            x: ['-8%', '8%', '-4%', '-8%'],
            y: ['-4%', '5%', '-2%', '-4%'],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
          className="absolute -bottom-28 sm:-bottom-32 left-1/2 -translate-x-1/2 w-[320px] sm:w-[520px] h-[90px] sm:h-[130px] rounded-[50%] bg-gradient-to-r from-[#FF1E38]/25 via-[#FF4D61]/40 to-[#FF1E38]/25 blur-[40px] sm:blur-[55px] pointer-events-none"
        />

        {/* Living Liquid Ribbon 4: Dynamic Molten Horizon Ribbon */}
        <motion.div
          animate={{
            opacity: [0.35, 0.6, 0.35],
            scaleY: [0.85, 1.15, 0.85],
            x: ['-5%', '5%', '-5%'],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ willChange: 'transform, opacity', transform: 'translate3d(0,0,0)' }}
          className="absolute -bottom-14 sm:-bottom-16 inset-x-0 h-[70px] sm:h-[110px] bg-gradient-to-r from-transparent via-[#FF384C]/35 via-50% to-transparent blur-[30px] sm:blur-[45px] pointer-events-none"
        />
      </div>

      {/* FULL-WIDTH CONTAINER WITH SPACIOUS INTERIOR ALIGNMENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* TOP SPLIT: Navigation (Left) & Social / Contact Info (Right) */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 sm:gap-12 pt-4 sm:pt-6">
          
          {/* TOP-LEFT: Clean Vertical Navigation with 44px Mobile Touch Targets */}
          <nav className="flex flex-col items-start space-y-1.5 sm:space-y-4 text-base sm:text-lg font-normal tracking-tight text-[#F5F7FA]">
            <button
              onClick={scrollToTop}
              className="py-1.5 sm:py-0 hover:text-white/80 active:scale-95 transition-all cursor-pointer text-left"
            >
              Home
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("showcase");
                const lenis = (window as any).lenis;
                if (lenis && el) {
                  lenis.scrollTo(el, { offset: -20, duration: 1.2 });
                } else if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="py-1.5 sm:py-0 hover:text-white/80 active:scale-95 transition-all cursor-pointer text-left"
            >
              Projects
            </button>
            <button
              onClick={scrollToSolutions}
              className="py-1.5 sm:py-0 hover:text-white/80 active:scale-95 transition-all cursor-pointer text-left"
            >
              Solutions
            </button>
            <button
              onClick={onContactClick}
              className="py-1.5 sm:py-0 text-white hover:text-[#FF384C] active:scale-95 transition-all cursor-pointer text-left font-medium flex items-center gap-1.5"
            >
              <span>Contact us</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF384C] animate-pulse" />
            </button>
          </nav>

          {/* TOP-RIGHT: Social Media Icons + Contact Details */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right space-y-4">
            
            {/* Social Icons Row with App Touch Feedback */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-white">
              {/* WhatsApp */}
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-1 rounded-full bg-white/5 sm:bg-transparent border border-white/10 sm:border-0 hover:opacity-80 active:scale-90 transition-all"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.97.545 1.831.838 2.781.838h.005c3.18 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.768-5.774-5.768zm3.374 8.212c-.14.394-.712.728-1.02.772-.303.044-.683.078-2.18-.544-1.637-.678-2.684-2.339-2.766-2.449-.081-.11-.664-.883-.664-1.684 0-.801.42-1.194.57-1.353.15-.158.33-.2.44-.2s.22.003.31.008c.1.006.23-.038.36.275.14.337.47 1.15.51 1.233.04.083.07.18.01.291-.06.11-.09.18-.18.28-.09.1-.19.22-.27.3-.09.09-.18.19-.08.36.11.18.47.78 1.01 1.26.7.62 1.28.82 1.46.91.18.09.29.08.4-.04.11-.12.47-.55.6-.74.13-.19.26-.16.44-.09.18.07 1.14.54 1.34.64.2.1.33.15.38.23.05.09.05.51-.09.91z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-1 rounded-full bg-white/5 sm:bg-transparent border border-white/10 sm:border-0 hover:opacity-80 active:scale-90 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" />
                </svg>
              </a>

              {/* Website / Globe */}
              <a
                href="/"
                className="p-2 sm:p-1 rounded-full bg-white/5 sm:bg-transparent border border-white/10 sm:border-0 hover:opacity-80 active:scale-90 transition-all"
                aria-label="Website"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-1 rounded-full bg-white/5 sm:bg-transparent border border-white/10 sm:border-0 hover:opacity-80 active:scale-90 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>

            {/* Direct Contact Lines */}
            <div className="space-y-1 text-xs sm:text-sm font-normal text-[#E2E8F0] leading-relaxed">
              <div>
                <button
                  type="button"
                  onClick={onContactClick}
                  className="hover:text-[#FF384C] transition-colors cursor-pointer text-left inline-flex items-center gap-1.5 group"
                >
                  <span>E-mail: hello@webind.cc</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#FF384C]/15 text-[#FF384C] border border-[#FF384C]/30 opacity-80 group-hover:opacity-100 transition-opacity">
                    Direct Form
                  </span>
                </button>
              </div>
              <div className="text-[#CBD5E1]">
                (415) 886-7023
              </div>
              <div className="text-[#94A3B8] text-xs">
                San Francisco, CA · Distributed with Esyus
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 
        FROSTED WEBIND × ESYUS TITANIC WATERMARK TYPOGRAPHY:
        Positioned in full-width container outside max-w-7xl with safe viewport scaling so letters NEVER get clipped!
      */}
      <div className="relative z-20 mt-8 sm:mt-12 w-full flex items-end justify-center pointer-events-none px-2 sm:px-4 pb-0 overflow-visible">
        
        {/* Dynamic Molten Liquid Aura directly hugging the typography */}
        <motion.div
          animate={{
            x: ['-15%', '15%', '-8%', '-15%'],
            scaleX: [0.95, 1.25, 0.92, 0.95],
            scaleY: [0.95, 1.25, 0.9, 0.95],
            opacity: [0.55, 0.85, 0.6, 0.55],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-10 sm:-bottom-14 left-1/2 -translate-x-1/2 w-[85%] max-w-[1100px] h-[80px] sm:h-[130px] bg-gradient-to-r from-transparent via-[#FF384C]/32 via-50% to-transparent blur-[35px] sm:blur-[50px] pointer-events-none"
        />

        {/* Underlay Ambient Glow Pass (Enhanced with liquid breathing) */}
        <motion.h1
          animate={{
            opacity: [0.15, 0.32, 0.15],
            scale: [0.99, 1.015, 0.99],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute text-[9.5vw] sm:text-[11.2vw] md:text-[12.6vw] lg:text-[13.8vw] font-['Manrope'] font-medium tracking-[0.015em] sm:tracking-[0.025em] leading-[0.8] select-none text-center whitespace-nowrap text-[#FFA6B0]/15"
          style={{
            filter: 'blur(10px)',
            transform: 'translateY(2px)',
          }}
          aria-hidden="true"
        >
          Webind <span className="text-[#FF384C]/65 mx-2 sm:mx-3 font-light">×</span> Esyus
        </motion.h1>

        {/* Secondary Soft Frosted Pass */}
        <h1
          className="absolute text-[9.5vw] sm:text-[11.2vw] md:text-[12.6vw] lg:text-[13.8vw] font-['Manrope'] font-medium tracking-[0.015em] sm:tracking-[0.025em] leading-[0.8] select-none text-center whitespace-nowrap text-[#FFD6DC]/18"
          style={{
            filter: 'blur(4px)',
          }}
          aria-hidden="true"
        >
          Webind <span className="text-[#FF384C]/65 mx-2 sm:mx-3 font-light">×</span> Esyus
        </h1>

        {/* Primary Front Pass with Living Liquid Shimmer Flow */}
        <h1
          className="liquid-animated-text relative text-[9.5vw] sm:text-[11.2vw] md:text-[12.6vw] lg:text-[13.8vw] font-['Manrope'] font-medium tracking-[0.015em] sm:tracking-[0.025em] leading-[0.8] select-none text-center whitespace-nowrap"
          style={{
            background:
              'linear-gradient(90deg, rgba(255, 180, 195, 0.2) 0%, rgba(255, 60, 85, 0.65) 25%, rgba(255, 235, 242, 0.96) 50%, rgba(255, 60, 85, 0.65) 75%, rgba(255, 180, 195, 0.2) 100%)',
            backgroundSize: '250% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'blur(0.6px)',
            textShadow: '0 0 18px rgba(255, 56, 76, 0.28)',
          }}
        >
          Webind <span className="text-[#FF384C]/85 mx-2 sm:mx-3 font-light">×</span> Esyus
        </h1>

      </div>
    </footer>
  );
};
