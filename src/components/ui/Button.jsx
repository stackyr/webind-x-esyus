import React from 'react'
import { motion } from 'motion/react'
import { cn } from '../../utils/cn'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  href,
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed rounded-xl'

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 font-medium tracking-tight',
    md: 'text-sm px-4.5 py-2.5 gap-2 tracking-tight',
    lg: 'text-sm sm:text-base px-6 py-3.5 gap-2.5 font-semibold tracking-tight shadow-sm',
  }

  const variantStyles = {
    primary:
      'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:active:bg-slate-200 shadow-md hover:shadow-lg dark:shadow-white/5 transition-all active:scale-[0.98] font-semibold',
    secondary:
      'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-white/10',
    glass:
      'glass-surface-interactive text-slate-900 dark:text-white border border-slate-300/50 dark:border-white/15 dark:bg-[#0D1426]/80 hover:border-sky-500/40 dark:hover:border-sky-400/50 shadow-sm',
    ghost:
      'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10',
    accent:
      'bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 text-white shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 hover:brightness-110 active:scale-[0.98]',
    outline:
      'border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-white/30 hover:bg-slate-50 dark:hover:bg-white/5',
  }

  const content = (
    <>
      {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {RightIcon && <RightIcon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
    </>
  )

  const combinedClass = cn(
    baseStyles,
    sizeStyles[size] || sizeStyles.md,
    variantStyles[variant] || variantStyles.primary,
    'group',
    className
  )

  if (href) {
    return (
      <a href={href} className={combinedClass} {...props}>
        {content}
      </a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={combinedClass}
      {...props}
    >
      {content}
    </motion.button>
  )
}
