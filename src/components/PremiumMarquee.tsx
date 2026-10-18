"use client";

import React from 'react';

interface PartnerBrand {
  id: string;
  name: string;
  subtitle: string;
  logo: React.ReactNode;
}

const BRANDS: PartnerBrand[] = [
  {
    id: 'veloce',
    name: 'VELOCE',
    subtitle: 'Mobility Labs',
    logo: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 4l16 8-16 8 6-8-6-8z" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
  },
  {
    id: 'aether',
    name: 'AETHER',
    subtitle: 'Fintech Terminal',
    logo: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4v16M4 12h16" />
      </svg>
    ),
  },
  {
    id: 'kromic',
    name: 'KROMIC',
    subtitle: 'Studio Flagship',
    logo: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'esyus',
    name: 'ESYUS',
    subtitle: 'Mobile & App Systems',
    logo: (
      <div className="flex items-end gap-0.5 h-4 w-4">
        <div className="w-1 h-2 bg-[#FF384C] rounded-[1px]" />
        <div className="w-1 h-3.5 bg-white rounded-[1px]" />
        <div className="w-1 h-4 bg-white/90 rounded-[1px]" />
      </div>
    ),
  },
  {
    id: 'sovereign',
    name: 'SOVEREIGN',
    subtitle: 'Zero-Trust Protocol',
    logo: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z" />
      </svg>
    ),
  },
  {
    id: 'orbit',
    name: 'ORBIT MEDIA',
    subtitle: 'Global Content Mesh',
    logo: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(-25 12 12)" />
      </svg>
    ),
  },
  {
    id: 'stratum',
    name: 'STRATUM',
    subtitle: 'Asset Management',
    logo: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2l8 4.5-8 4.5-8-4.5L12 2z" />
        <path d="M4 11.5l8 4.5 8-4.5" />
        <path d="M4 16.5l8 4.5 8-4.5" />
      </svg>
    ),
  },
  {
    id: 'nexus',
    name: 'NEXUS',
    subtitle: 'Intelligence Graph',
    logo: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="4" y="4" width="6" height="6" rx="1.5" />
        <rect x="14" y="4" width="6" height="6" rx="1.5" />
        <rect x="9" y="14" width="6" height="6" rx="1.5" />
        <path d="M7 10v4h5M17 10v4h-5" />
      </svg>
    ),
  },
  {
    id: 'luminary',
    name: 'LUMINARY',
    subtitle: 'Clinical Health',
    logo: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'hyperion',
    name: 'HYPERION',
    subtitle: 'Compute Cluster',
    logo: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="currentColor" fillOpacity="0.15" />
      </svg>
    ),
  },
];

export const PremiumMarquee: React.FC = () => {
  // Duplicate brands array 4 times for a rich, continuous infinite scroll
  const marqueeItems = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="relative z-20 w-full bg-black text-[#F5F7FA] py-2 sm:py-3 border-0 overflow-hidden select-none">
      {/* INFINITE MARQUEE STRIP WITH GRADIENT FADE EDGES */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee gap-3.5 sm:gap-5 py-2">
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="group px-4 py-2.5 sm:px-7 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0C1017]/90 border border-[#1A2232] hover:border-[#FF384C]/60 hover:bg-[#121622] active:scale-95 transition-all duration-150 cursor-pointer flex items-center gap-2.5 sm:gap-3.5 shrink-0 shadow-md hover:shadow-[0_0_20px_rgba(255,56,76,0.15)]"
            >
              {/* Brand Logo Symbol */}
              <div className="flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                {brand.logo}
              </div>

              {/* Brand Typography Lockup */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#F5F7FA] group-hover:text-white transition-colors">
                  {brand.name}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#768194] uppercase tracking-wide">
                  {brand.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumMarquee;
