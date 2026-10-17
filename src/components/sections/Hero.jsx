import React, { useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import {
  ArrowRight,
  Layers,
  Store,
  Smartphone,
  ShieldCheck,
  Zap,
  Sparkles,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { BrandLogo } from '../ui/BrandLogo'
import { KineticTextRotator } from '../ui/KineticTextRotator'
import { useOrderModal } from '../../context/useOrderModal'

export function Hero() {
  const { openOrderModal } = useOrderModal()
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      })
    }
  }, [])

  const handleScrollTo = (id) => {
    const el = document.querySelector(id)
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, {
          offset: -85,
          duration: 1.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
        })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative pt-24 pb-16 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-36 overflow-hidden bg-[#F8FAFC] dark:bg-[#060911]"
    >
      {/* Ambient Autoplay Background Video (Blended Highlights & Shadows) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none will-change-transform transform-gpu">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-45 sm:opacity-55 dark:opacity-60 filter contrast-110 brightness-105 pointer-events-none will-change-transform transform-gpu"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Ambient Tone Overlay: In light mode, balanced studio glass sheen allowing video motion to shine through */}
        <div className="absolute inset-0 bg-white/45 dark:bg-[#060911]/55 backdrop-blur-[1px]" />

        {/* Center Content Shield: soft vignette ensuring 100% crisp typography while keeping surrounding video beautifully visible */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_38%,rgba(248,250,252,0.68)_0%,rgba(248,250,252,0.45)_50%,rgba(248,250,252,0.1)_85%,transparent_100%)] dark:bg-[radial-gradient(ellipse_75%_65%_at_50%_38%,rgba(6,9,17,0.92)_0%,rgba(6,9,17,0.72)_45%,rgba(6,9,17,0.25)_80%,transparent_100%)]" />

        {/* Seamless Top & Bottom Gradients (Smooth fade to navbar and next sections) */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#F8FAFC] dark:from-[#060911] via-[#F8FAFC]/70 dark:via-[#060911]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#F8FAFC] dark:from-[#060911] via-[#F8FAFC]/70 dark:via-[#060911]/80 to-transparent" />
      </div>

      {/* Volumetric Overhead Studio Spotlight: vibrant studio glow in light & dark mode */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] sm:w-[1200px] h-[600px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(14,165,233,0.35)_0%,rgba(99,102,241,0.22)_45%,transparent_75%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(56,189,248,0.25)_0%,rgba(99,102,241,0.16)_45%,transparent_75%)] blur-2xl z-0" />

      {/* Dual Volumetric Aurora Blooms (WEBIND Cyan on Left + ESYUS Indigo on Right) with rich saturated glow */}
      <div className="pointer-events-none absolute top-1/4 -left-20 w-[460px] h-[460px] bg-sky-500/28 sm:bg-sky-500/32 dark:bg-sky-500/20 rounded-full blur-[110px] sm:blur-[140px] z-0" />
      <div className="pointer-events-none absolute top-1/3 -right-20 w-[460px] h-[460px] bg-indigo-500/28 sm:bg-indigo-500/32 dark:bg-indigo-500/20 rounded-full blur-[110px] sm:blur-[140px] z-0" />

      {/* Center Ambient Chroma Glow behind headline */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-gradient-to-tr from-sky-400/30 via-cyan-300/20 to-indigo-400/25 dark:from-sky-500/15 dark:via-cyan-400/10 dark:to-indigo-500/15 rounded-full blur-3xl z-0" />

      {/* Luminous Specular Horizon Flare Line */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 dark:via-sky-400/45 to-transparent z-0" />

      <Container size="wide" className="relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-10">

          {/* Studio Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/12 shadow-lg shadow-sky-500/5 backdrop-blur-xl group hover:border-sky-500/40 transition-all cursor-default">
              <BrandLogo size="xs" />
              <span className="text-slate-800 dark:text-slate-200 font-mono text-[11px] uppercase tracking-wider">
                WEBIND <span className="text-sky-500 font-bold">×</span> ESYUS
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-sky-600 dark:text-sky-400 font-medium">
                Liquid Digital Product Studio
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                <Sparkles className="w-2.5 h-2.5" />
                Unified Architecture
              </span>
            </div>
          </motion.div>

          {/* Main Dynamic Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="space-y-2 sm:space-y-3"
          >
            <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.14] sm:leading-[1.12]">
              <span className="block text-slate-950 dark:text-white">
                Architecting the Next Era of
              </span>
              <span className="block mt-1 sm:mt-2">
                <KineticTextRotator
                  phrases={[
                    'Bespoke Web Flagships.',
                    'Resilient Cloud Systems.',
                    'High-Impact Digital Brands.',
                    'Native iOS & Android Apps.',
                    'Modern SaaS Platforms.',
                    'Scalable Enterprise APIs.',
                  ]}
                />
              </span>
            </h1>
          </motion.div>

          {/* Editorial Subtitle Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-xs sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto px-2 sm:px-0"
          >
            <strong className="font-semibold text-slate-900 dark:text-white">WEBIND</strong> designs bespoke digital flagships, interactive web experiences, and brand identities.{' '}
            <strong className="font-semibold text-slate-900 dark:text-white">ESYUS Technology</strong> engineers resilient cloud engines, enterprise backends, and mobile ecosystems.{' '}
            <span className="text-sky-600 dark:text-sky-400 font-medium">One unified partnership. Zero vendor hand-off friction.</span>
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 pt-1 sm:pt-2 w-full max-w-md mx-auto"
          >
            <button
              type="button"
              onClick={() => openOrderModal()}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-4 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-base shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 active:scale-[0.97] transition-all cursor-pointer whitespace-nowrap group"
            >
              <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 shrink-0" />
              <span>Order Website</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <Button
              variant="glass"
              size="lg"
              leftIcon={Layers}
              onClick={() => handleScrollTo('#services')}
              className="flex-1 sm:flex-initial justify-center min-h-[44px] sm:min-h-[50px] px-3 sm:px-8 text-xs sm:text-base py-3.5 sm:py-4 rounded-xl sm:rounded-2xl active:scale-[0.97] whitespace-nowrap"
            >
              Capabilities
            </Button>
          </motion.div>

          {/* Mobile App Quick Feature Strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[10px] sm:text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              48h Turnaround
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>100% Custom Architecture</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Direct WhatsApp</span>
          </div>

          {/* Modern Interactive Studio Architecture Bento Strip with Color Borders & Gradient Backgrounds */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-8 sm:pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left"
          >
            {/* Card 1: WEBIND Design */}
            <div className="relative group p-5 rounded-2xl bg-gradient-to-br from-white/98 via-sky-50/60 to-white/95 dark:from-[#0F1932]/98 dark:via-[#0B1224]/95 dark:to-[#050811]/98 border border-sky-500/35 dark:border-sky-400/30 shadow-lg shadow-sky-500/5 dark:shadow-black/40 hover:border-sky-400 dark:hover:border-sky-300 hover:shadow-md hover:shadow-sky-500/10 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 cursor-default will-change-transform">
              <div className="flex items-center justify-between mb-3">
                <BrandLogo variant="webind" size="lg" className="group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-300 font-semibold border border-sky-500/30 shadow-xs">
                  WEBIND
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                Design & Web Flagships
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed mb-3">
                Bespoke interactive frontend, micro-animations, and fluid design systems.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-sky-600 dark:text-sky-400 font-medium pt-1 border-t border-sky-500/15 dark:border-white/5">
                <Zap className="w-3 h-3 text-sky-500 animate-pulse" />
                <span>Lighthouse 99+ Score</span>
              </div>
            </div>

            {/* Card 2: ESYUS Cloud Engine */}
            <div className="relative group p-5 rounded-2xl bg-gradient-to-br from-white/98 via-indigo-50/60 to-white/95 dark:from-[#111636]/98 dark:via-[#0D1026]/95 dark:to-[#050811]/98 border border-indigo-500/35 dark:border-indigo-400/30 shadow-lg shadow-indigo-500/5 dark:shadow-black/40 hover:border-indigo-400 dark:hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/10 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 cursor-default will-change-transform">
              <div className="flex items-center justify-between mb-3">
                <BrandLogo variant="esyus" size="lg" className="group-hover:scale-105 transition-transform" />
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 font-semibold border border-indigo-500/30 shadow-xs">
                  ESYUS CORE
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                Cloud Systems & APIs
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed mb-3">
                High-throughput Go & Node backends, PostgreSQL, and scalable microservices.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-medium pt-1 border-t border-indigo-500/15 dark:border-white/5">
                <Zap className="w-3 h-3 text-indigo-500 animate-pulse" />
                <span>&lt;20ms p99 Latency</span>
              </div>
            </div>

            {/* Card 3: Mobile Apps */}
            <div className="relative group p-5 rounded-2xl bg-gradient-to-br from-white/98 via-cyan-50/60 to-white/95 dark:from-[#0E1C2E]/98 dark:via-[#091524]/95 dark:to-[#050811]/98 border border-cyan-500/35 dark:border-cyan-400/30 shadow-lg shadow-cyan-500/5 dark:shadow-black/40 hover:border-cyan-400 dark:hover:border-cyan-300 hover:shadow-md hover:shadow-cyan-500/10 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 cursor-default will-change-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 font-semibold border border-cyan-500/30 shadow-xs">
                  MOBILE
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                Native iOS & Android
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed mb-3">
                Cross-platform mobile applications, biometric auth, and live push notifications.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-medium pt-1 border-t border-cyan-500/15 dark:border-white/5">
                <Zap className="w-3 h-3 text-cyan-500 animate-pulse" />
                <span>Instant Offline Sync</span>
              </div>
            </div>

            {/* Card 4: Unified Guarantee */}
            <div className="relative group p-5 rounded-2xl bg-gradient-to-br from-white/98 via-emerald-50/60 to-white/95 dark:from-[#0B1E22]/98 dark:via-[#071519]/95 dark:to-[#050811]/98 border border-emerald-500/35 dark:border-emerald-400/30 shadow-lg shadow-emerald-500/5 dark:shadow-black/40 hover:border-emerald-400 dark:hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/10 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 cursor-default will-change-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-semibold border border-emerald-500/30 shadow-xs">
                  GUARANTEED
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                Zero-Friction Handoff
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed mb-3">
                Designers and backend engineers work in sync. No separate agency overhead.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium pt-1 border-t border-emerald-500/15 dark:border-white/5">
                <Zap className="w-3 h-3 text-emerald-500 animate-pulse" />
                <span>99.98% SLA Availability</span>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
