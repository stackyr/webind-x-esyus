import React from 'react'
import { motion } from 'motion/react'
import { cn } from '../../utils/cn'

export function GlassCard({
  children,
  className,
  interactive = false,
  elevation = 'md',
  asMotion = false,
  ...props
}) {
  const elevationStyles = {
    sm: 'p-4 sm:p-5 rounded-2xl',
    md: 'p-6 sm:p-7 rounded-2xl',
    lg: 'p-7 sm:p-9 rounded-3xl',
  }

  const surfaceClass = cn(
    'relative overflow-hidden transition-all duration-300',
    interactive
      ? 'glass-surface-interactive cursor-pointer group'
      : 'glass-surface',
    elevationStyles[elevation] || elevationStyles.md,
    className
  )

  if (asMotion) {
    return (
      <motion.div className={surfaceClass} {...props}>
        {children}
      </motion.div>
    )
  }

  return (
    <div className={surfaceClass} {...props}>
      {children}
    </div>
  )
}
