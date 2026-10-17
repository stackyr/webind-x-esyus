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
} from 'lucide-react'

const PRIMARY_TECH = [
  { name: 'React 19', tag: 'Frontend Core', icon: Code2, color: 'text-sky-400' },
  { name: 'TypeScript', tag: 'Strict Typing', icon: Cpu, color: 'text-blue-400' },
  { name: 'Next.js & Vite', tag: 'Ultra-Fast SSR', icon: Globe2, color: 'text-slate-200' },
  { name: 'Node.js & Go', tag: 'Backend Engine', icon: Terminal, color: 'text-emerald-400' },
  { name: 'PostgreSQL', tag: 'ACID Database', icon: Database, color: 'text-indigo-400' },
  { name: 'Redis', tag: 'In-Memory Cache', icon: Zap, color: 'text-rose-400' },
  { name: 'Docker & K8s', tag: 'Containerization', icon: Server, color: 'text-cyan-400' },
  { name: 'AWS & Vercel', tag: 'Cloud Edge', icon: Cloud, color: 'text-amber-400' },
  { name: 'GraphQL & REST', tag: 'High-Throughput APIs', icon: Workflow, color: 'text-pink-400' },
  { name: 'Tailwind CSS', tag: 'Liquid UI System', icon: Layers, color: 'text-teal-400' },
]

const CAPABILITIES = [
  { name: 'Zero-Latency Edge Caching', tag: 'Performance', icon: Zap, color: 'text-amber-400' },
  { name: 'End-to-End Enterprise Auth', tag: 'Security', icon: Lock, color: 'text-emerald-400' },
  { name: 'Native iOS & Android Apps', tag: 'Mobile', icon: Smartphone, color: 'text-cyan-400' },
  { name: 'Real-Time WebSocket Streams', tag: 'High Concurrency', icon: Activity, color: 'text-sky-400' },
  { name: 'Microservices & Event Queues', tag: 'Architecture', icon: Server, color: 'text-indigo-400' },
  { name: 'Automated CI/CD Pipelines', tag: 'DevOps', icon: Workflow, color: 'text-violet-400' },
  { name: '99.98% High Availability SLA', tag: 'Reliability', icon: ShieldCheck, color: 'text-teal-400' },
  { name: 'Headless E-Commerce Engines', tag: 'Commerce', icon: Globe2, color: 'text-rose-400' },
]

export function TechMarquee() {
  return (
    <section
      aria-label="Technology Stack and Core Capabilities"
      className="relative py-14 sm:py-18 overflow-hidden bg-slate-900/5 dark:bg-[#070B16]/80 border-y border-slate-200/60 dark:border-white/10"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-indigo-500/5 to-transparent pointer-events-none" />

      {/* Container header badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xs backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span>PRODUCTION-PROVEN ARCHITECTURE & TECH STACK</span>
        </div>
      </div>

      {/* Marquee Wrapper with edge fade masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-[#F8FAFC] dark:from-[#060911] to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-[#F8FAFC] dark:from-[#060911] to-transparent pointer-events-none" />

        {/* Row 1: Primary Tech Stack (Scrolling Left) */}
        <div className="flex animate-marquee gap-3 sm:gap-4 py-2">
          {[...PRIMARY_TECH, ...PRIMARY_TECH].map((tech, idx) => {
            const Icon = tech.icon
            return (
              <div
                key={`row1-${tech.name}-${idx}`}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-[#0D1426]/90 border border-slate-200/80 dark:border-white/12 shadow-sm hover:shadow-md dark:shadow-black/40 hover:border-sky-500/40 dark:hover:border-sky-400/50 transition-all backdrop-blur-md shrink-0 cursor-default group"
              >
                <div className={`p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 ${tech.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white tracking-tight">
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {tech.tag}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Row 2: Engineering Capabilities (Scrolling Right) */}
        <div className="flex animate-marquee-reverse gap-3 sm:gap-4 py-2 mt-2">
          {[...CAPABILITIES, ...CAPABILITIES].map((cap, idx) => {
            const Icon = cap.icon
            return (
              <div
                key={`row2-${cap.name}-${idx}`}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-[#0A0F1E]/85 border border-slate-200/70 dark:border-white/10 shadow-sm hover:shadow-md dark:shadow-black/40 hover:border-indigo-500/40 dark:hover:border-indigo-400/50 transition-all backdrop-blur-md shrink-0 cursor-default group"
              >
                <div className={`p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 ${cap.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
                    {cap.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {cap.tag}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
