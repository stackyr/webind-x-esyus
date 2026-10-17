import React from 'react'
import { cn } from '../../utils/cn'

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  className,
}) {
  const isCenter = align === 'center'

  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        isCenter ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase rounded-full mb-4',
            'bg-slate-100 dark:bg-slate-800/90 text-sky-600 dark:text-sky-300 border border-slate-200/80 dark:border-white/10 shadow-xs'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
        {title}{' '}
        {highlight && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 dark:from-sky-400 dark:via-sky-200 dark:to-indigo-300">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  )
}
