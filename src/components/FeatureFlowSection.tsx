"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';

interface FeatureItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  side: 'left' | 'right';
}

const FEATURES: FeatureItem[] = [
  {
    id: 'organized',
    num: '01',
    title: 'All Your Information',
    subtitle: 'Organized',
    description: 'Unified content architecture and modular component systems ensuring every page and asset functions with structured clarity.',
    details: ['Modular Component System', 'Design Token Governance'],
    side: 'left',
  },
  {
    id: 'secure',
    num: '02',
    title: 'Secure & Private',
    subtitle: 'Your Data Stays Yours',
    description: 'Zero-trust infrastructure and client-side encryption protocols that guarantee codebases and customer data remain strictly private.',
    details: ['Zero-Trust Architecture', 'End-to-End Privacy'],
    side: 'right',
  },
  {
    id: 'search',
    num: '03',
    title: 'Smart Search',
    subtitle: 'Find Anything, Instantly',
    description: 'Ultra-low-latency discovery engines designed to eliminate friction and convert intent into immediate action.',
    details: ['Sub-15ms Query Latency', 'Edge-Cached Indexing'],
    side: 'left',
  },
  {
    id: 'productivity',
    num: '04',
    title: 'Boost Productivity',
    subtitle: 'Focus On What Matters',
    description: 'High-velocity deployment workflows built in partnership with Esyus, streamlining release cycles and allowing rapid iteration.',
    details: ['Automated Production Pipelines', 'Webind × Esyus Engine'],
    side: 'right',
  },
];

export const FeatureFlowSection: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div id="features" className="relative z-10 w-full bg-transparent text-[#F5F7FA] pt-12 sm:pt-20 pb-20 sm:pb-36 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-20 md:mb-28 max-w-lg ml-auto flex flex-col items-start md:items-end text-left md:text-right">
          <span className="text-[11px] sm:text-xs uppercase font-mono tracking-widest text-[#FF384C] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF384C] animate-pulse" />
            Architecture & Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mt-1.5 mb-2 sm:mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Structured Digital Systems
          </h2>
          <p className="text-xs sm:text-base text-[#CBD5E1] leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Compact operational foundations pushed to the margins, leaving generous central negative space.
          </p>
        </div>

        {/* Opposite Alternating Divs Layout with Mobile-Adaptive Rhythm */}
        <div className="space-y-4 sm:space-y-12 md:space-y-44">
          {FEATURES.map((feat) => {
            const isLeft = feat.side === 'left';
            const isExpanded = activeItem === feat.id;

            return (
              <div
                key={feat.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center"
              >
                {/* LEFT SIDE: Hugs the left margin tightly (Cols 1-5) */}
                {isLeft ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="md:col-span-5 lg:col-span-4"
                  >
                    <div
                      onClick={() => setActiveItem(isExpanded ? null : feat.id)}
                      className={`p-4 sm:p-6 rounded-2xl bg-[#0C1017]/88 backdrop-blur-xl border transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                        isExpanded
                          ? 'border-[#FF384C] shadow-2xl shadow-black/80 ring-1 ring-[#FF384C]/40'
                          : 'border-[#1E2638] hover:border-[#FF384C]/60 shadow-xl shadow-black/40'
                      }`}
                    >
                      {/* Numeration & Subtitle */}
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[#FF384C] font-semibold text-[11px] px-2 py-0.5 rounded-md bg-[#FF384C]/10 border border-[#FF384C]/25">
                            {feat.num}
                          </span>
                          <span className="text-[#929AA7] uppercase tracking-wider text-[10px]">
                            {feat.subtitle}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#64748B] sm:hidden font-sans">
                          {isExpanded ? "Collapse" : "Details"}
                        </span>
                      </div>

                      {/* Heading */}
                      <h3 className="text-sm sm:text-base font-medium tracking-tight text-[#F5F7FA] mb-1">
                        {feat.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#929AA7] leading-relaxed mb-3">
                        {feat.description}
                      </p>

                      {/* Detail points */}
                      <div className="pt-2.5 border-t border-[#182030]/80 space-y-1.5">
                        {feat.details.map((point, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-[11px] text-[#CCD2DE]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF384C]" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Wide Central Space Framing the 3D Canvas */
                  <div className="hidden md:block md:col-span-7 lg:col-span-8" />
                )}

                {/* RIGHT SIDE: Hugs the right margin tightly (Cols 8-12) */}
                {!isLeft ? (
                  <>
                    {/* Wide Central Space Framing the 3D Canvas */}
                    <div className="hidden md:block md:col-span-7 lg:col-span-8" />
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="md:col-span-5 lg:col-span-4"
                    >
                      <div
                        onClick={() => setActiveItem(isExpanded ? null : feat.id)}
                        className={`p-4 sm:p-6 rounded-2xl bg-[#0C1017]/88 backdrop-blur-xl border transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                          isExpanded
                            ? 'border-[#FF384C] shadow-2xl shadow-black/80 ring-1 ring-[#FF384C]/40'
                            : 'border-[#1E2638] hover:border-[#FF384C]/60 shadow-xl shadow-black/40'
                        }`}
                      >
                        {/* Numeration & Subtitle */}
                        <div className="flex items-center justify-between text-xs font-mono mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[#FF384C] font-semibold text-[11px] px-2 py-0.5 rounded-md bg-[#FF384C]/10 border border-[#FF384C]/25">
                              {feat.num}
                            </span>
                            <span className="text-[#929AA7] uppercase tracking-wider text-[10px]">
                              {feat.subtitle}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#64748B] sm:hidden font-sans">
                            {isExpanded ? "Collapse" : "Details"}
                          </span>
                        </div>

                        {/* Heading */}
                        <h3 className="text-sm sm:text-base font-medium tracking-tight text-[#F5F7FA] mb-1">
                          {feat.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-[#929AA7] leading-relaxed mb-3">
                          {feat.description}
                        </p>

                        {/* Detail points */}
                        <div className="pt-2.5 border-t border-[#182030]/80 space-y-1.5">
                          {feat.details.map((point, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-[11px] text-[#CCD2DE]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF384C]" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
