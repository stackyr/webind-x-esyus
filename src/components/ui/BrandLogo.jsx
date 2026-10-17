import React from 'react'

/**
 * BrandLogo: Official high-precision circular logos for WEBIND and ESYUS Technology.
 * Optimized for local dev and production deployment on Vercel.
 */
export function BrandLogo({
  variant = 'dual',
  size = 'md',
  className = '',
  overlap = true,
}) {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  }

  const dimension = sizeMap[size] || sizeMap.md
  const overlapClass = overlap
    ? size === 'xl'
      ? '-space-x-2.5'
      : size === 'lg'
      ? '-space-x-2'
      : '-space-x-1.5'
    : 'gap-2'

  if (variant === 'webind') {
    return (
      <div
        className={`relative ${dimension} rounded-full bg-black overflow-hidden flex items-center justify-center ring-1 ring-white/25 shadow-sm shadow-black/20 shrink-0 ${className}`}
      >
        <img
          src="/logos/webind-circle.png"
          alt="WEBIND Official Logo"
          className="w-full h-full object-contain rounded-full"
          loading="eager"
        />
      </div>
    )
  }

  if (variant === 'esyus') {
    return (
      <div
        className={`relative ${dimension} rounded-full bg-white overflow-hidden flex items-center justify-center ring-1 ring-slate-300 dark:ring-white/25 shadow-sm shadow-black/10 shrink-0 ${className}`}
      >
        <img
          src="/logos/esyus-circle.png"
          alt="ESYUS Technology Official Logo"
          className="w-full h-full object-contain rounded-full"
          loading="eager"
        />
      </div>
    )
  }

  // Dual Logo Lockup (WEBIND + ESYUS)
  return (
    <div className={`flex items-center ${overlapClass} shrink-0 ${className}`}>
      {/* WEBIND Logo Disc */}
      <div
        className={`relative ${dimension} rounded-full bg-black overflow-hidden flex items-center justify-center ring-1 ring-white/25 shadow-sm shadow-black/25 shrink-0 z-10 transition-transform`}
      >
        <img
          src="/logos/webind-circle.png"
          alt="WEBIND"
          className="w-full h-full object-contain rounded-full"
          loading="eager"
        />
      </div>

      {/* ESYUS Technology Logo Disc */}
      <div
        className={`relative ${dimension} rounded-full bg-white overflow-hidden flex items-center justify-center ring-2 ring-white dark:ring-[#070B18] shadow-sm shadow-sky-500/20 shrink-0 z-20 transition-transform`}
      >
        <img
          src="/logos/esyus-circle.png"
          alt="ESYUS Technology"
          className="w-full h-full object-contain rounded-full"
          loading="eager"
        />
      </div>
    </div>
  )
}
