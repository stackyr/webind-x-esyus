import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import {
  ArrowRight,
  Layers,
  Smartphone,
  Globe,
  CheckCircle2,
  Activity,
  Terminal,
  Zap,
  Sparkles,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { TypewriterText } from '../ui/TypewriterText'

export function Hero() {
  const [activeLayer, setActiveLayer] = useState('all') // 'all', 'web', 'software', 'mobile'
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 45])
  const canvasRotate = useTransform(scrollYProgress, [0, 1], [0, 4])
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 0.97])

  const handleScrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-36 overflow-hidden bg-ambient-mesh"
    >
      {/* Dynamic Animated Liquid Glass Glowing Orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] sm:w-[900px] sm:h-[450px] bg-gradient-to-tr from-sky-500/15 via-indigo-500/15 to-transparent blur-3xl rounded-full -z-10 animate-fluid-pulse" />
      <div className="pointer-events-none absolute top-1/2 right-10 w-[400px] h-[300px] bg-gradient-to-br from-cyan-400/10 via-sky-500/10 to-transparent blur-3xl rounded-full -z-10 animate-fluid-pulse-delayed" />


      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Narrative & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 text-left space-y-6 sm:space-y-8">
            
            {/* Studio Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/12 shadow-sm backdrop-blur-md">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                </span>
                <span className="text-slate-800 dark:text-slate-200">
                  WEBIND <span className="text-slate-400">×</span> ESYUS
                </span>
                <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                <span className="hidden sm:inline text-sky-600 dark:text-sky-400 font-mono">
                  LIQUID DIGITAL PRODUCT STUDIO
                </span>
              </div>
            </motion.div>

            {/* Main Headline with Animated Text Writing Loop */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-[66px] font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.08]">
                Your next idea.{' '}
                <span className="block min-h-[1.25em] text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 dark:from-sky-400 dark:via-cyan-300 dark:to-indigo-300">
                  <TypewriterText
                    words={[
                      'Built for the real world.',
                      'Engineered with liquid precision.',
                      'High-velocity SaaS platforms.',
                      'Enterprise cloud systems.',
                      'Native iOS & Android apps.',
                      'Conversion-driven websites.'
                    ]}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Supporting Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl"
            >
              <strong className="font-semibold text-slate-900 dark:text-white">WEBIND</strong> designs
              bespoke websites, marketing flagships, and digital brands.{' '}
              <strong className="font-semibold text-slate-900 dark:text-white">ESYUS Technology</strong>{' '}
              engineers custom cloud systems, enterprise backends, and mobile applications.{' '}
              Together, we deliver frictionless digital products with zero vendor hand-off gaps.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2"
            >
              <Button
                variant="primary"
                size="lg"
                rightIcon={ArrowRight}
                onClick={() => handleScrollTo('#inquiry')}
                className="shadow-xl shadow-slate-950/10 dark:shadow-white/5"
              >
                Start a Project
              </Button>

              <Button
                variant="glass"
                size="lg"
                leftIcon={Layers}
                onClick={() => handleScrollTo('#services')}
              >
                Explore Services
              </Button>
            </motion.div>

            {/* Trust Proof Micro-Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                <span>Websites & Landing Pages</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>Custom Software & Cloud</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                <span>iOS & Android Apps</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Connected Liquid Precision Product Canvas */}
          <div className="lg:col-span-6 xl:col-span-6 relative">
            
            {/* Interactive Architecture Filter Bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span>CONNECTED STACK PREVIEW</span>
              </div>
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-200/50 dark:bg-slate-800/60 border border-slate-300/40 dark:border-white/10 text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveLayer('all')}
                  className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
                    activeLayer === 'all'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Unified
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLayer('web')}
                  className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
                    activeLayer === 'web'
                      ? 'bg-sky-500 text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-sky-500'
                  }`}
                >
                  WEBIND
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLayer('software')}
                  className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
                    activeLayer === 'software'
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-indigo-400'
                  }`}
                >
                  ESYUS Core
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLayer('mobile')}
                  className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
                    activeLayer === 'mobile'
                      ? 'bg-cyan-500 text-white shadow-xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-cyan-400'
                  }`}
                >
                  Mobile
                </button>
              </div>
            </div>

            {/* Main Interactive Stage Container with Scroll Parallax */}
            <motion.div
              style={{ y: canvasY, scale: canvasScale }}
              className="relative rounded-3xl p-4 sm:p-6 liquid-card border border-slate-200/80 dark:border-white/12 dark:bg-[#090E1C]/90 shadow-2xl backdrop-blur-2xl specular-border"
            >
              
              {/* Layer 1: WEBIND Web Experience Browser Mockup */}
              <motion.div
                animate={{
                  opacity: activeLayer === 'all' || activeLayer === 'web' ? 1 : 0.35,
                  scale: activeLayer === 'web' ? 1.02 : 1,
                  y: activeLayer === 'web' ? -4 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-[#0C1224] shadow-lg mb-4"
              >
                {/* Browser Chrome Header */}
                <div className="px-4 py-2.5 bg-slate-100/80 dark:bg-[#070B16] border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white/70 dark:bg-[#0F172A] border border-slate-200/60 dark:border-white/10 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    <Globe className="w-3 h-3 text-sky-500" />
                    <span>webind.studio/client-portal</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-500/20">
                    WEBIND LIVE
                  </span>
                </div>

                {/* Web Viewport Content */}
                <div className="p-4 sm:p-5 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider font-mono">
                        Frontend Commerce Engine
                      </div>
                      <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        Global Order Stream & Conversion
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        Lighthouse Score
                      </div>
                      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                        99/100
                      </div>
                    </div>
                  </div>

                  {/* Micro Visual Chart/Graph in Mockup */}
                  <div className="h-14 w-full bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-sky-500/5 dark:from-sky-500/20 dark:via-indigo-500/15 dark:to-transparent rounded-xl border border-sky-500/20 dark:border-sky-500/30 p-2 flex items-end gap-1.5">
                    {[38, 62, 45, 80, 55, 90, 75, 96, 84, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-sky-500 to-indigo-500 rounded-t-sm transition-all duration-500 hover:brightness-125"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
                    <span>TTFB: 42ms</span>
                    <span>Edge Cached: Global</span>
                    <span className="text-sky-500 dark:text-sky-400 font-medium">Synced with ESYUS Core</span>
                  </div>
                </div>
              </motion.div>

              {/* Lower Dual Node System: ESYUS Software Backend & Mobile App Screen */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                
                {/* ESYUS Software Backend Terminal Node */}
                <motion.div
                  animate={{
                    opacity: activeLayer === 'all' || activeLayer === 'software' ? 1 : 0.35,
                    scale: activeLayer === 'software' ? 1.02 : 1,
                    y: activeLayer === 'software' ? -4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="sm:col-span-7 rounded-2xl p-4 bg-slate-950 dark:bg-[#040711] text-slate-200 border border-slate-800 dark:border-indigo-500/20 shadow-md font-mono text-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 dark:border-white/10 text-[11px]">
                    <div className="flex items-center gap-1.5 text-indigo-400">
                      <Terminal className="w-3.5 h-3.5" />
                      <span className="font-semibold">ESYUS CLOUD ENGINE</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                      ONLINE
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-400">
                    <p className="flex justify-between">
                      <span className="text-slate-500">API Gateway:</span>
                      <span className="text-slate-200 font-semibold">POST /v2/orders/settle</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-500">Latency:</span>
                      <span className="text-emerald-400">14ms p99</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-500">PostgreSQL Pool:</span>
                      <span className="text-indigo-300">Healthy (0.4% load)</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-500">Push Dispatcher:</span>
                      <span className="text-sky-300">APNs & FCM active</span>
                    </p>
                  </div>

                  <div className="pt-1 flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                    <span>Real-time webhook relay to Mobile Client</span>
                  </div>
                </motion.div>

                {/* ESYUS Mobile App Mockup Screen */}
                <motion.div
                  animate={{
                    opacity: activeLayer === 'all' || activeLayer === 'mobile' ? 1 : 0.35,
                    scale: activeLayer === 'mobile' ? 1.02 : 1,
                    y: activeLayer === 'mobile' ? -4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="sm:col-span-5 rounded-2xl p-3.5 bg-gradient-to-b from-slate-900 to-slate-950 dark:from-[#090F20] dark:to-[#040711] border border-slate-800 dark:border-cyan-500/20 text-white shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1 font-mono text-cyan-400 font-semibold">
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>ESYUS MOBILE</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">iOS 18</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 dark:bg-white/[0.04] border border-white/10 space-y-1">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                        Client Balance
                      </div>
                      <div className="text-base font-extrabold text-white tracking-tight">
                        $142,850.00
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                        <Zap className="w-2.5 h-2.5" />
                        <span>Instant Push Confirmed</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Touch ID: Ready</span>
                    <span className="text-cyan-400">Synced</span>
                  </div>
                </motion.div>

              </div>

              {/* Bottom Connection Status Banner */}
              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
                  </span>
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    Zero-Friction Studio Architecture
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  WEBIND Frontend ↔ ESYUS Backend & Mobile
                </span>
              </div>

            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  )
}
