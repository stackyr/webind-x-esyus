import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function KineticTextRotator({
  phrases = [
    'Bespoke Web Flagships.',
    'Resilient Cloud Systems.',
    'Native Mobile Apps.',
    'High-Velocity SaaS Platforms.',
    'Custom Enterprise Backends.',
    'Digital Brand Experiences.',
  ],
  interval = 3200,
  className = '',
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, interval)
    return () => clearInterval(timer)
  }, [phrases.length, interval])

  return (
    <span
      className={`relative inline-flex items-center justify-center min-h-[1.25em] align-baseline select-none ${className}`}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 32, opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
          exit={{ y: -32, opacity: 0, filter: 'blur(10px)', scale: 0.98 }}
          transition={{
            y: { type: 'spring', damping: 26, stiffness: 260 },
            opacity: { duration: 0.32 },
            filter: { duration: 0.32 },
            scale: { duration: 0.32 },
          }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 dark:from-sky-400 dark:via-cyan-300 dark:to-indigo-300 font-extrabold tracking-tight"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

