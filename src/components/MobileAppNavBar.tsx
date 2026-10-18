"use client";

import React, { useState, useEffect } from "react";
import { Home, Layers, Sparkles, Film, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface MobileAppNavBarProps {
  onInquireClick: () => void;
}

export const MobileAppNavBar: React.FC<MobileAppNavBarProps> = ({ onInquireClick }) => {
  const [activeTab, setActiveTab] = useState<"home" | "features" | "showcase" | "reel">("home");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Keep dock visible on mobile, or gently tuck if scrolling very fast downwards
      if (currentScrollY > 100 && currentScrollY > lastScrollY + 80) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 20 || currentScrollY < 120) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Section detection
      const sections = [
        { id: "sequence-section", tab: "home" as const },
        { id: "features", tab: "features" as const },
        { id: "showcase", tab: "showcase" as const },
        { id: "reel", tab: "reel" as const },
      ];

      for (const section of sections.reverse()) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveTab(section.tab);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string, tab: "home" | "features" | "showcase" | "reel") => {
    setActiveTab(tab);
    if (tab === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.aside
      initial={{ y: 80, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : 80,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-3 inset-x-3 z-50 md:hidden pointer-events-none"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Mobile Navigation Dock"
    >
      <div className="max-w-[420px] mx-auto w-full pointer-events-auto">
        <nav className="relative flex items-center justify-between px-3 py-2 rounded-full bg-[#0C1017]/88 backdrop-blur-2xl border border-white/12 shadow-[0_12px_45px_rgba(0,0,0,0.85)] ring-1 ring-white/5">
          {/* Subtle Top Inner Highlight */}
          <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

          {/* Tab 1: Home */}
          <button
            onClick={() => scrollTo("sequence-section", "home")}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 active:scale-90 ${
              activeTab === "home" ? "text-white" : "text-[#8E98A8] hover:text-white"
            }`}
            aria-label="Navigate to Home"
          >
            <Home className="w-4 h-4 stroke-[2.2]" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Home</span>
            {activeTab === "home" && (
              <motion.span
                layoutId="activeTabDot"
                className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#FF384C] shadow-[0_0_8px_#FF384C]"
              />
            )}
          </button>

          {/* Tab 2: Capabilities / Architecture */}
          <button
            onClick={() => scrollTo("features", "features")}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 active:scale-90 ${
              activeTab === "features" ? "text-white" : "text-[#8E98A8] hover:text-white"
            }`}
            aria-label="Navigate to Capabilities"
          >
            <Layers className="w-4 h-4 stroke-[2.2]" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Systems</span>
            {activeTab === "features" && (
              <motion.span
                layoutId="activeTabDot"
                className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#FF384C] shadow-[0_0_8px_#FF384C]"
              />
            )}
          </button>

          {/* Tab 3: Showcase */}
          <button
            onClick={() => scrollTo("showcase", "showcase")}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 active:scale-90 ${
              activeTab === "showcase" ? "text-white" : "text-[#8E98A8] hover:text-white"
            }`}
            aria-label="Navigate to Showcase"
          >
            <Sparkles className="w-4 h-4 stroke-[2.2]" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Works</span>
            {activeTab === "showcase" && (
              <motion.span
                layoutId="activeTabDot"
                className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#FF384C] shadow-[0_0_8px_#FF384C]"
              />
            )}
          </button>

          {/* Tab 4: Reel */}
          <button
            onClick={() => scrollTo("reel", "reel")}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all duration-200 active:scale-90 ${
              activeTab === "reel" ? "text-white" : "text-[#8E98A8] hover:text-white"
            }`}
            aria-label="Navigate to Showreel"
          >
            <Film className="w-4 h-4 stroke-[2.2]" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">Reel</span>
            {activeTab === "reel" && (
              <motion.span
                layoutId="activeTabDot"
                className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#FF384C] shadow-[0_0_8px_#FF384C]"
              />
            )}
          </button>

          {/* Tab 5: Inquire / Action Button */}
          <button
            onClick={onInquireClick}
            className="group flex items-center gap-1.5 pl-3.5 pr-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#FF384C] to-[#E01E37] text-white shadow-[0_0_18px_rgba(255,56,76,0.6)] active:scale-90 transition-all duration-150 cursor-pointer ml-1"
            aria-label="Inquire or Start Project"
          >
            <span className="text-[11px] font-semibold tracking-tight">Inquire</span>
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-white">
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
            </span>
          </button>
        </nav>
      </div>
    </motion.aside>
  );
};
