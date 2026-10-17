import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  GitMerge,
  CheckCircle2,
  Zap,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import { PARTNERSHIP_STEPS, BRAND_CONFIG } from '../../data/siteData'

export function PartnershipStory() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="partnership" className="py-24 sm:py-32 relative overflow-hidden bg-slate-50/30 dark:bg-[#050811]/40 border-t border-slate-200/80 dark:border-white/10">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/3 right-1/4 w-[450px] h-[350px] bg-sky-500/10 dark:bg-sky-500/5 blur-3xl rounded-full -z-10 animate-fluid-pulse" />

      <Container size="wide">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="The WEBIND × ESYUS Model"
          title="Two specialized teams."
          highlight="One seamless execution."
          description="Most companies hire one agency for marketing websites and another for complex software or mobile apps—creating communication bottlenecks, mismatched code, and inflated costs. Our partnership solves this completely."
        />

        {/* Dual Brand Identity & Role Matrix with Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* WEBIND Pillar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="liquid-card border border-sky-500/35 dark:border-sky-400/30 hover:border-sky-400 dark:hover:border-sky-300 relative p-6 sm:p-8 rounded-3xl group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-sky-500/30">
                  W
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {BRAND_CONFIG.webind.name}
                  </h3>
                  <p className="text-xs text-sky-600 dark:text-sky-300 font-medium">
                    {BRAND_CONFIG.webind.role}
                  </p>
                </div>
              </div>
              <Badge variant="webind">Digital Experience</Badge>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Leading the customer-facing digital layer. Crafting brand identities, responsive web presences, conversion-focused landing pages, and interactive UI systems that captivate audiences.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/10">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Core Specializations:
              </div>
              {BRAND_CONFIG.webind.scope.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ESYUS Technology Pillar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="liquid-card border border-indigo-500/35 dark:border-indigo-400/30 hover:border-indigo-400 dark:hover:border-indigo-300 relative p-6 sm:p-8 rounded-3xl group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md shadow-indigo-500/30">
                  E
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {BRAND_CONFIG.esyus.name}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-300 font-medium">
                    {BRAND_CONFIG.esyus.role}
                  </p>
                </div>
              </div>
              <Badge variant="esyus">Software & Mobile</Badge>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              Leading the backend architecture and application layer. Engineering custom business software, scalable cloud databases, API microservices, and native iOS & Android applications.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/10">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Core Specializations:
              </div>
              {BRAND_CONFIG.esyus.scope.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Connected Client Journey: 4 Coordinated Stages */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              The Synchronized Delivery Workflow
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Click through the stages to see how both teams collaborate on every engagement.
            </p>
          </div>

          {/* Interactive Step Switcher Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PARTNERSHIP_STEPS.map((step, idx) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl text-left transition-all border cursor-pointer select-none active:scale-[0.98] ${
                  activeStep === idx
                    ? 'liquid-card border-sky-500/50 dark:border-sky-400/80 bg-white dark:bg-sky-950/40 shadow-md ring-1 ring-sky-500/30'
                    : 'bg-white/40 dark:bg-[#080D1A]/60 border-slate-200/60 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 dark:hover:bg-[#0B1224]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                    STAGE {step.number}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400">
                    {step.owner}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {step.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Deep-Dive Panel with Smooth Transition */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="liquid-card p-6 sm:p-8 border border-sky-500/35 dark:border-sky-400/30 hover:border-sky-400 dark:hover:border-sky-300 rounded-3xl group shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-500/20 dark:border-sky-400/30">
                        PHASE {PARTNERSHIP_STEPS[activeStep].number}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        Lead: <strong className="text-slate-800 dark:text-slate-200">{PARTNERSHIP_STEPS[activeStep].owner}</strong>
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {PARTNERSHIP_STEPS[activeStep].title} — {PARTNERSHIP_STEPS[activeStep].phase}
                    </h4>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {PARTNERSHIP_STEPS[activeStep].description}
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#040712] border border-slate-200/60 dark:border-white/10 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5">
                      <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold text-slate-900 dark:text-white">Commercial Benefit: </strong>
                        {PARTNERSHIP_STEPS[activeStep].detail}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200/40 dark:from-[#090F20] dark:to-[#040712] border border-slate-200/80 dark:border-white/12 text-center space-y-3 shadow-md">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-sky-500/10 text-sky-500 dark:text-sky-400 flex items-center justify-center">
                      <GitMerge className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Client Advantage
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Single contract, consolidated communication channels, and unified engineering standards across web and mobile.
                    </p>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </Container>
    </section>
  )
}
