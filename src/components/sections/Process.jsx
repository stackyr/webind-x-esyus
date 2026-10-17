import React from 'react'
import { CheckCircle2, Calendar, Target, Code, Rocket, ShieldCheck } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { GlassCard } from '../ui/GlassCard'
import { PROCESS_TIMELINE } from '../../data/siteData'

export function Process() {
  const stepIcons = [Target, Calendar, Code, Rocket]

  return (
    <section id="process" className="py-24 sm:py-32 relative overflow-hidden">
      <Container size="wide">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Predictable Delivery"
          title="From discovery to production."
          highlight="No surprises."
          description="Every project follows our structured 4-phase agile engineering methodology. Clear milestones, transparent bi-weekly reviews, and strict budget adherence."
        />

        {/* 4-Column Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {PROCESS_TIMELINE.map((item, index) => {
            const Icon = stepIcons[index % stepIcons.length]
            return (
              <GlassCard
                key={item.step}
                elevation="md"
                interactive
                className="flex flex-col justify-between p-6 sm:p-7 border border-slate-200/80 dark:border-white/12 dark:bg-gradient-to-b dark:from-[#0B101E] dark:to-[#050811] dark:shadow-xl dark:shadow-black/40 hover:dark:border-sky-400/40"
              >
                <div className="space-y-4">
                  
                  {/* Step Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                    <span className="font-mono text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400 tracking-tighter">
                      {item.step}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 px-2.5 py-0.5 rounded border border-slate-200/50 dark:border-white/10">
                      {item.duration}
                    </span>
                  </div>

                  {/* Title & Focus */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-xs font-medium text-sky-600 dark:text-sky-400">
                      {item.focus}
                    </p>
                  </div>

                  {/* Key Tasks List */}
                  <div className="space-y-2 pt-2">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 dark:text-sky-500/80 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Card Footer Status */}
                <div className="pt-4 mt-4 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>Sign-off required</span>
                  <span className="text-emerald-500 dark:text-emerald-400 font-semibold">Milestone gated</span>
                </div>
              </GlassCard>
            )
          })}

        </div>

        {/* Process Guarantee Note */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl glass-surface border border-slate-200/80 dark:border-white/12 dark:bg-[#0B101E]/90 dark:shadow-xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Full Codebase Handover & 30-Day Post-Launch Warranty
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300">
                You receive 100% intellectual property ownership, repository access, and post-launch bug support.
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold shrink-0">
            Guaranteed Quality
          </span>
        </div>

      </Container>
    </section>
  )
}
