import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowRight,
  Info,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { GlassCard } from '../ui/GlassCard'
import { Badge } from '../ui/Badge'
import { CONCEPT_PROJECTS } from '../../data/siteData'

export function WorkShowcase() {
  const [filter, setFilter] = useState('all') // 'all', 'web', 'software', 'mobile'

  const filteredProjects = CONCEPT_PROJECTS.filter((proj) => {
    if (filter === 'all') return true
    if (filter === 'web') return proj.tags.some((t) => t.toLowerCase().includes('web') || t.toLowerCase().includes('commerce'))
    if (filter === 'software') return proj.tags.some((t) => t.toLowerCase().includes('software') || t.toLowerCase().includes('portal') || t.toLowerCase().includes('erp'))
    if (filter === 'mobile') return proj.tags.some((t) => t.toLowerCase().includes('mobile') || t.toLowerCase().includes('tablet') || t.toLowerCase().includes('app'))
    return true
  })

  return (
    <section id="work" className="py-24 sm:py-32 relative overflow-hidden bg-slate-50/40 dark:bg-[#050811]/40 border-t border-slate-200/80 dark:border-white/10">
      <Container size="wide">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Architectural Showcase"
          title="Engineered concepts."
          highlight="Proven patterns."
          description="A curated preview of cross-discipline architectures designed to showcase how WEBIND's frontend mastery and ESYUS Technology's system engineering converge."
        />

        {/* Truthful Disclosure Banner */}
        <div className="mb-10 p-4 rounded-2xl glass-surface border border-slate-200/80 dark:border-white/10 dark:bg-[#0B101E]/80 max-w-4xl mx-auto flex items-start sm:items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
          <Info className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong className="text-slate-900 dark:text-white font-semibold">
              Verified Transparency Notice:{' '}
            </strong>
            The projects below are clearly designated illustrative architecture prototypes demonstrating our shared stack, component fidelity, and delivery scope. We never publish confidential client systems without consent.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {[
            { id: 'all', label: 'All Architectures' },
            { id: 'web', label: 'Web & E-Commerce' },
            { id: 'software', label: 'Custom Software' },
            { id: 'mobile', label: 'Mobile & Apps' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setFilter(btn.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                filter === btn.id
                  ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-white shadow-md font-semibold ring-2 ring-sky-500/20'
                  : 'bg-white/60 dark:bg-[#080D1A]/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0E1528] border border-slate-200/60 dark:border-white/10'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Asymmetric 2x2 Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard
                  elevation="lg"
                  interactive
                  className="h-full flex flex-col justify-between border border-slate-200/80 dark:border-white/12 dark:bg-gradient-to-br dark:from-[#0B101E] dark:via-[#090E1C] dark:to-[#050811] p-6 sm:p-8 group dark:shadow-xl dark:shadow-black/40 hover:dark:border-sky-400/40 transition-all"
                >
                  <div className="space-y-5">
                    
                    {/* Top Meta Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                          {project.clientLabel}
                        </span>
                      </div>
                      <Badge variant="subtle" className="text-[10px] font-mono dark:bg-slate-800/80 dark:text-slate-300 dark:border-white/10">
                        {project.scope}
                      </Badge>
                    </div>

                    {/* Title & Partnership Attribution */}
                    <div className="space-y-1.5">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="text-xs font-mono font-medium text-sky-600 dark:text-sky-400">
                        {project.type}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                        <strong className="text-slate-700 dark:text-slate-200">Collab:</strong> {project.collaboration}
                      </div>
                    </div>

                    {/* Rich Custom Interface Visual Canvas */}
                    <div className="rounded-xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-950 dark:bg-[#03060E] p-4 font-mono text-xs text-slate-300 shadow-inner space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800 dark:border-white/10">
                        <span className="text-sky-400 font-semibold">{project.title.toLowerCase()}.cloud/sys</span>
                        <span className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">Architecture Validated</span>
                      </div>

                      {/* Mockup Details based on project */}
                      <p className="text-xs text-slate-300 dark:text-slate-200 font-sans leading-relaxed">
                        {project.summary}
                      </p>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {project.metrics.map((metric, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-2 rounded-lg bg-slate-900 dark:bg-[#080D1A] border border-slate-800 dark:border-white/10 text-[11px] text-slate-300 dark:text-slate-200 flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                            <span className="truncate">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/10 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-6 border-t border-slate-200/60 dark:border-white/10 mt-6 flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Full Scope Architecture
                    </span>
                    <a
                      href="#inquiry"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors"
                    >
                      <span>Inquire About Similar Build</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>

        </div>

      </Container>
    </section>
  )
}
