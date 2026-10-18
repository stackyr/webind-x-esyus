"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUpRight, X, Check } from "lucide-react";

interface DesktopNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: (projectName?: string) => void;
  onOpenContact?: (topic?: string) => void;
}

interface NavItem {
  label: string;
  num: string;
  target?: string;
  isAction?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", num: "(01)", target: "#sequence-section" },
  { label: "Architecture", num: "(02)", target: "#features" },
  { label: "Selected Works", num: "(03)", target: "#showcase" },
  { label: "Cinematic Reel", num: "(04)", target: "#reel" },
  { label: "Partnership", num: "(05)", target: "#partner" },
  { label: "Let's Talk", num: "(06)", isAction: true },
];

export const DesktopNavigationModal: React.FC<DesktopNavigationModalProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
  onOpenContact,
}) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Lock body scroll and pause Lenis smooth scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }
  }, [isOpen, onClose]);

  const handleNavClick = (item: NavItem) => {
    onClose();

    if (item.isAction) {
      setTimeout(() => {
        if (onOpenContact) {
          onOpenContact("Navigation / Let's Talk");
        } else {
          onOpenInquiry("Navigation Inquiry");
        }
      }, 300);
      return;
    }

    if (item.target) {
      const targetSelector = item.target;
      setTimeout(() => {
        const lenis = (window as any).lenis;
        if (targetSelector === "#sequence-section") {
          if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          return;
        }

        const targetEl = document.querySelector(targetSelector);
        if (targetEl) {
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -30, duration: 1.2 });
          } else {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 350);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="desktop-nav-modal"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[120] w-full max-w-full bg-[#07090E] text-[#F5F7FA] overflow-y-auto overflow-x-hidden flex flex-col justify-between selection:bg-[#FF384C] selection:text-white"
        >
          {/* Subtle luxury ambient backlights */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-[#FF384C]/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[450px] h-[300px] bg-[#0284C7]/8 rounded-full blur-[120px] pointer-events-none" />

          {/* 1. TOP HEADER (Brand wordmark + "Let's Talk ->" + Close "✕") */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-6 sm:pt-8 pb-4 flex items-center justify-between border-b border-white/[0.06]">
            {/* Logo */}
            <button
              onClick={() => {
                onClose();
                const lenis = (window as any).lenis;
                if (lenis) lenis.scrollTo(0, { duration: 1 });
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:opacity-85 transition-opacity flex items-center gap-1.5 cursor-pointer"
            >
              <span>Webind</span>
              <span className="text-[#FF384C] font-light">×</span>
              <span>Esyus</span>
            </button>

            {/* Right Controls: Let's Talk CTA & Circular Close Button */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    if (onOpenContact) {
                      onOpenContact("Header / Let's Talk");
                    } else {
                      onOpenInquiry("Navigation CTA");
                    }
                  }, 300);
                }}
                className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/25 hover:border-white bg-transparent hover:bg-white/10 text-xs sm:text-sm font-medium tracking-tight text-white transition-all duration-200 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onClose}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/25 hover:border-white bg-transparent hover:bg-white/10 flex items-center justify-center text-white transition-all duration-200 cursor-pointer group"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>
          </div>

          {/* 2. MAIN NAV LIST (Giant typography with numbers and right pill arrows) */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-8 sm:py-12 flex-1 flex flex-col justify-center">
            <div className="divide-y divide-white/[0.05]">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.45,
                    delay: 0.06 + index * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => handleNavClick(item)}
                  className="group flex items-center justify-between py-3 sm:py-4.5 lg:py-5 cursor-pointer transition-all duration-300"
                >
                  {/* Left: Giant title + Parenthetical index */}
                  <div className="flex items-baseline gap-2.5 sm:gap-4 select-none">
                    <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-['Manrope'] tracking-tight text-[#EDEDED] transition-all duration-300 group-hover:text-white group-hover:translate-x-2.5">
                      {item.label}
                    </span>
                    <span className="text-xs sm:text-base md:text-lg font-light text-white/35 transition-colors duration-200 group-hover:text-[#FF384C]">
                      {item.num}
                    </span>
                  </div>

                  {/* Right: Pill arrow button */}
                  <div className="w-14 sm:w-20 md:w-24 h-8 sm:h-11 md:h-12 rounded-full border border-white/20 group-hover:border-white group-hover:bg-white text-white group-hover:text-[#07090E] flex items-center justify-center transition-all duration-300 shadow-sm">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 3. BOTTOM FOOTER AREA (Follow Us + Newsletter Stay Connected) */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-6 pb-8 sm:pb-12 border-t border-white/[0.06] flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            {/* Left: Follow us. */}
            <div className="flex flex-col items-start gap-2.5">
              <span className="text-xs sm:text-sm font-medium text-white/40 tracking-normal">
                Follow us.
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold tracking-wider text-white/85">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#FF384C] transition-colors"
                >
                  INSTAGRAM <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#38BDF8] transition-colors"
                >
                  LINKEDIN <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
                <a
                  href="https://wa.me/14158867023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  WHATSAPP <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  TWITTER <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* Right: Stay connected w/ us. */}
            <div className="w-full md:w-auto md:min-w-[340px] flex flex-col items-start gap-2.5">
              <span className="text-xs sm:text-sm font-medium text-white/40 tracking-normal">
                Stay connected w/ us.
              </span>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 py-1.5">
                  <Check className="w-4 h-4" />
                  <span>Subscribed! Welcome aboard.</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="w-full flex items-center justify-between pb-2 border-b border-white/25 focus-within:border-white transition-colors group"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none pr-3"
                  />
                  <button
                    type="submit"
                    aria-label="Submit email"
                    className="text-white/60 hover:text-white transition-colors cursor-pointer group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
