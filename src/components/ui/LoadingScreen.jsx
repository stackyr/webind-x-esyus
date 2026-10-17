import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles } from 'lucide-react'

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [statusText, setStatusText] = useState('Initializing Studio Architecture...')

  useEffect(() => {
    let currentProgress = 0
    let videoReady = false

    // Preload background video in memory to verify buffer readiness
    const testVideo = document.createElement('video')
    testVideo.src = '/hero-bg.mp4'
    testVideo.preload = 'auto'
    testVideo.muted = true

    const onCanPlay = () => {
      videoReady = true
    }

    testVideo.addEventListener('canplaythrough', onCanPlay)
    testVideo.load()

    // Smooth progress ticker
    const interval = setInterval(() => {
      const step = videoReady ? 8 : 4
      currentProgress += Math.floor(Math.random() * 7) + step

      if (currentProgress >= 40 && currentProgress < 75) {
        setStatusText('Loading Core Engine & Video Assets...')
      } else if (currentProgress >= 75 && currentProgress < 98) {
        setStatusText('Synchronizing Liquid Interface...')
      }

      if (currentProgress >= 100) {
        currentProgress = 100
        setStatusText('Ready.')
        clearInterval(interval)
        setTimeout(() => {
          setIsLoaded(true)
        }, 250)
      }

      setProgress(currentProgress)
    }, 45)

    // Fallback safety timeout (maximum 2.2 seconds)
    const timeout = setTimeout(() => {
      setProgress(100)
      setStatusText('Ready.')
      clearInterval(interval)
      setTimeout(() => {
        setIsLoaded(true)
      }, 200)
    }, 2200)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      testVideo.removeEventListener('canplaythrough', onCanPlay)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {!isLoaded && (
        <motion.div
          key="studio-loader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1], // Luxury cubic-bezier curtain reveal
            },
          }}
          className="fixed inset-0 z-[100] bg-[#050811] flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-sky-500/15 via-indigo-500/10 to-cyan-400/10 blur-[140px] rounded-full" />

          {/* Top Brand Marker */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
              </span>
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                Studio Preloader
              </span>
            </div>
            <div className="text-[11px] font-mono text-sky-400/80 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              v2.4
            </div>
          </motion.div>

          {/* Center Brand Identity & Pulse */}
          <div className="flex flex-col items-center justify-center space-y-6 my-auto text-center">
            {/* Dual Brand Icon Graphic */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center -space-x-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-xl shadow-sky-500/40">
                <span className="font-bold text-lg font-mono tracking-tighter">W</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/40 ring-4 ring-[#050811]">
                <span className="font-bold text-lg font-mono tracking-tighter">E</span>
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-1.5"
            >
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
                <span>WEBIND</span>
                <span className="text-slate-500 font-light text-base">×</span>
                <span className="text-slate-200">ESYUS</span>
              </h2>
              <div className="inline-flex items-center gap-1.5 text-xs text-sky-400 font-medium">
                <Sparkles className="w-3 h-3" />
                <span>Liquid Digital Product Studio</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Progress Bar & Percentage Counter */}
          <div className="space-y-3 max-w-md w-full mx-auto">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 tracking-wide text-[11px] truncate pr-4">
                {statusText}
              </span>
              <span className="text-sky-400 font-bold tracking-tight">
                {progress}%
              </span>
            </div>

            {/* Glowing Hairline Progress Track */}
            <div className="w-full h-[2.5px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(56,189,248,1)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
