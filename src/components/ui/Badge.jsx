import React from 'react'
import { cn } from '../../utils/cn'

export function Badge({
  children,
  variant = 'default',
  dot = false,
  dotColor = 'bg-sky-400',
  className,
  ...props
}) {
  const variantStyles = {
    default:
      'bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-white/10',
    webind:
      'bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-200/60 dark:border-sky-500/30',
    esyus:
      'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-500/30',
    success:
      'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200/60 dark:border-emerald-500/30',
    subtle:
      'bg-slate-50/50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border-slate-200/50 dark:border-white/10',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium tracking-tight rounded-full border transition-colors',
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0 animate-pulse',
            dotColor
          )}
        />
      )}
      <span>{children}</span>
    </span>
  )
}
