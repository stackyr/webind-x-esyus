import React from 'react'
import {
  Code2,
  Cpu,
  Database,
  Cloud,
  Layers,
  Zap,
  ShieldCheck,
  Smartphone,
  Globe2,
  Terminal,
  Activity,
  Workflow,
  Server,
  Lock,
  Sparkles,
  Radio,
} from 'lucide-react'

const PRIMARY_TECH = [
  { name: 'React 19', category: 'FRONTEND', tag: 'Concurrent Mode', icon: Code2, glow: 'from-sky-500/20 to-cyan-500/10', color: 'text-sky-400' },
  { name: 'Next.js 15 & Vite', category: 'FULLSTACK', tag: 'Hybrid Edge SSR', icon: Globe2, glow: 'from-slate-500/20 to-white/10', color: 'text-slate-200' },
  { name: 'TypeScript', category: 'TYPE SYSTEM', tag: 'Strict Mode', icon: Cpu, glow: 'from-blue-500/20 to-indigo-500/10', color: 'text-blue-400' },
  { name: 'Go & Node.js', category: 'BACKEND', tag: 'High-Concurrency', icon: Terminal, glow: 'from-emerald-500/20 to-teal-500/10', color: 'text-emerald-400' },
  { name: 'PostgreSQL', category: 'DATABASE', tag: 'ACID Resilient', icon: Database, glow: 'from-indigo-500/20 to-blue-500/10', color: 'text-indigo-400' },
  { name: 'Redis Cache', category: 'IN-MEMORY', tag: 'Sub-Millisecond', icon: Zap, glow: 'from-rose-500/20 to-red-500/10', color: 'text-rose-400' },
  { name: 'Docker & Kubernetes', category: 'DEVOPS', tag: 'Auto-Scaling Pods', icon: Server, glow: 'from-cyan-500/20 to-sky-500/10', color: 'text-cyan-400' },
  { name: 'AWS & Vercel Edge', category: 'INFRASTRUCTURE', tag: 'Global CDNs', icon: Cloud, glow: 'from-amber-500/20 to-orange-500/10', color: 'text-amber-400' },
  { name: 'GraphQL & gRPC', category: 'APIS', tag: 'Type-Safe Protocols', icon: Workflow, glow: 'from-pink-500/20 to-purple-500/10', color: 'text-pink-400' },
  { name: 'Tailwind CSS', category: 'UI SYSTEM', tag: 'Liquid Design', icon: Layers, glow: 'from-teal-500/20 to-cyan-500/10', color: 'text-teal-400' },
]

const CAPABILITIES = [
  { name: 'Zero-Latency Edge Caching', category: 'PERF', tag: '< 25ms Global TTFB', icon: Zap, glow: 'from-amber-500/20 to-yellow-500/10', color: 'text-amber-400' },
  { name: 'Zero-Trust Enterprise Auth', category: 'SECURITY', tag: 'OAuth2 & Biometrics', icon: Lock, glow: 'from-emerald-500/20 to-green-500/10', color: 'text-emerald-400' },
  { name: 'Native iOS & Android Apps', category: 'MOBILE', tag: 'Cross-Platform Engine', icon: Smartphone, glow: 'from-cyan-500/20 to-sky-500/10', color: 'text-cyan-400' },
  { name: 'Bi-Directional WebSockets', category: 'REALTIME', tag: 'Real-Time Streaming', icon: Activity, glow: 'from-sky-500/20 to-blue-500/10', color: 'text-sky-400' },
  { name: 'Distributed Event Queues', category: 'SYSTEMS', tag: 'Kafka & RabbitMQ', icon: Server, glow: 'from-indigo-500/20 to-purple-500/10', color: 'text-indigo-400' },
  { name: 'Automated CI/CD Pipeline', category: 'WORKFLOW', tag: 'Zero-Downtime Deploys', icon: Workflow, glow: 'from-violet-500/20 to-indigo-500/10', color: 'text-violet-400' },
  { name: '99.98% High Availability SLA', category: 'RELIABILITY', tag: 'Multi-Region Failover', icon: ShieldCheck, glow: 'from-teal-500/20 to-emerald-500/10', color: 'text-teal-400' },
  { name: 'Headless E-Commerce Engines', category: 'COMMERCE', tag: 'Custom Checkout Flows', icon: Globe2, glow: 'from-rose-500/20 to-pink-500/10', color: 'text-rose-400' },
]

export function TechMarquee() {
  return (
    <section
      aria-label="Technology Stack and Core Capabilities"
      className="relative py-16 sm:py-20 overflow-hidden bg-slate-900/[0.02] dark:bg-[#070B16]/90 border-y border-slate-200/60 dark:border-white/10"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial-[at_top] from-sky-500/5 via-indigo-500/3 to-transparent pointer-events-none" />

      {/* Header section with modern editorial framing */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/12 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
          <span>PRODUCTION-GRADE TECHNOLOGY STACK</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Engineered With Modern Industry Standards
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          From cutting-edge frontend interfaces to resilient distributed backends and native mobile apps.
        </p>
      </div>

      {/* Marquee Wrapper with soft edge gradient mask */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {/* Row 1: Primary Tech Stack (Scrolling Left) */}
        <div className="flex animate-marquee gap-3 sm:gap-4 py-2 hover:[animation-play-state:paused]">
          {[...PRIMARY_TECH, ...PRIMARY_TECH].map((tech, idx) => {
            const Icon = tech.icon
            return (
              <div
                key={`tech-row1-${tech.name}-${idx}`}
                className="group relative flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl bg-white/70 dark:bg-[#0B1120]/80 border border-slate-200/80 dark:border-white/[0.08] shadow-sm hover:shadow-md dark:shadow-black/50 hover:border-sky-500/40 dark:hover:border-sky-400/40 transition-all backdrop-blur-xl shrink-0 cursor-default"
              >
                {/* Background glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${tech.glow} opacity-0 group-hover:opacity-100 transition-opacity -z-10`} />

                <div className={`p-2 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] ${tech.color} group-hover:scale-110 transition-transform shadow-inner`}>
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                      {tech.name}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-medium">
                      {tech.category}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    {tech.tag}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Row 2: Architecture & Capabilities (Scrolling Right) */}
        <div className="flex animate-marquee-reverse gap-3 sm:gap-4 py-2 mt-2 sm:mt-3 hover:[animation-play-state:paused]">
          {[...CAPABILITIES, ...CAPABILITIES].map((cap, idx) => {
            const Icon = cap.icon
            return (
              <div
                key={`cap-row2-${cap.name}-${idx}`}
                className="group relative flex items-center gap-3.5 px-4 sm:px-5 py-3 rounded-2xl bg-white/70 dark:bg-[#090F1C]/80 border border-slate-200/70 dark:border-white/[0.07] shadow-sm hover:shadow-md dark:shadow-black/50 hover:border-indigo-500/40 dark:hover:border-indigo-400/40 transition-all backdrop-blur-xl shrink-0 cursor-default"
              >
                {/* Background glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${cap.glow} opacity-0 group-hover:opacity-100 transition-opacity -z-10`} />

                <div className={`p-2 rounded-xl bg-slate-100/90 dark:bg-white/[0.06] ${cap.color} group-hover:scale-110 transition-transform shadow-inner`}>
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                      {cap.name}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 font-medium">
                      {cap.category}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    {cap.tag}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modern Live Architecture Status Micro-Strip */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
        <div className="p-3 sm:p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/70 dark:border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] text-slate-900 dark:text-white">LIVE ARCHITECTURE</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">Continuous Integration & Automated Production Pipeline</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Edge TTFB: 24ms</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span>Multi-Region Sync</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>Zero-Vendor Hand-Off</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
