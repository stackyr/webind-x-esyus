import React from 'react'
import { motion } from 'motion/react'
import {
  Globe,
  Server,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  TerminalSquare
} from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { SERVICES_DATA } from '../../data/siteData'
import { useOrderModal } from '../../context/useOrderModal'

export function Services() {
  const { openOrderModal } = useOrderModal()
  const webService = SERVICES_DATA.find((s) => s.id === 'web-development')
  const softwareService = SERVICES_DATA.find((s) => s.id === 'custom-software')
  const mobileService = SERVICES_DATA.find((s) => s.id === 'mobile-applications')

  const handleInquiryFor = () => {
    openOrderModal()
  }

  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 w-[500px] h-[400px] bg-sky-500/10 dark:bg-sky-500/5 blur-3xl rounded-full -z-10 animate-fluid-pulse" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl rounded-full -z-10 animate-fluid-pulse-delayed" />

      <Container size="wide">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Specialized Capabilities"
          title="Engineered for impact."
          highlight="No generic templates."
          description="We combine WEBIND's editorial frontend mastery with ESYUS Technology's deep backend and mobile systems engineering. Each discipline operates with razor-sharp specialization."
        />

        <div className="space-y-8">
          
          {/* 1. Large Featured Card: Web Development — WEBIND */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="liquid-card border border-sky-500/35 dark:border-sky-400/30 hover:border-sky-400 dark:hover:border-sky-300 p-6 sm:p-10 rounded-3xl group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
              
              {/* Left Column: Narrative, Outcomes, Deliverables */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="webind" dot dotColor="bg-sky-400">
                    WEBIND STUDIO LEAD
                  </Badge>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-300">
                    High-End Digital Experience
                  </span>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {webService.title}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-200 font-normal leading-relaxed">
                    {webService.headline}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {webService.description}
                  </p>
                </div>

                {/* Client Outcomes */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Commercial & Technical Outcomes:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {webService.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables Tags */}
                <div className="pt-2 flex flex-wrap gap-1.5 sm:gap-2">
                  {webService.deliverables.map((deliv) => (
                    <span
                      key={deliv}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/10 font-medium"
                    >
                      {deliv}
                    </span>
                  ))}
                </div>

                {/* Direct Action */}
                <div className="pt-2 sm:pt-3">
                  <Button
                    variant="primary"
                    size="md"
                    rightIcon={ArrowRight}
                    onClick={() => handleInquiryFor('website')}
                    className="w-full sm:w-auto justify-center min-h-[44px]"
                  >
                    Initiate Web Project
                  </Button>
                </div>
              </div>

              {/* Right Column: Interactive Visual Display for Web */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl p-5 bg-gradient-to-br from-slate-100 to-slate-200/50 dark:from-[#090E1C] dark:to-[#040712] border border-slate-200/80 dark:border-white/12 shadow-xl space-y-4">
                  
                  {/* Visual Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-sky-500" />
                      <span className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
                        WEBIND Interactive Spec
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>99.8% Perf Index</span>
                    </div>
                  </div>

                  {/* Dynamic Device Preview Box */}
                  <div className="p-4 rounded-xl bg-white dark:bg-[#0C1224] border border-slate-200 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span>Typography: Plus Jakarta Sans</span>
                      <span className="text-sky-500 dark:text-sky-400 font-semibold">Liquid Precision</span>
                    </div>

                    <div className="h-20 rounded-lg bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-transparent dark:from-sky-500/20 dark:via-indigo-500/15 dark:to-transparent border border-sky-500/20 dark:border-sky-500/30 p-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          Editorial Brand Flagship
                        </span>
                        <span className="text-[10px] bg-sky-500 text-white font-mono px-1.5 py-0.5 rounded">
                          0.4s FCP
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Zero layout shift · Fluid responsive grid · Glass specular depth
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50 dark:bg-[#070B16] border border-slate-200/50 dark:border-white/10">
                        <div className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-mono">SEO</div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">100%</div>
                      </div>
                      <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50 dark:bg-[#070B16] border border-slate-200/50 dark:border-white/10">
                        <div className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-mono">Best Practice</div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">100%</div>
                      </div>
                      <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50 dark:bg-[#070B16] border border-slate-200/50 dark:border-white/10">
                        <div className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-mono">Accessibility</div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">100%</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 text-center">
                    All web builds include full responsive regression testing across 7 viewports.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* 2 & 3. Dual Supporting Cards: Custom Software & Mobile Apps (ESYUS Technology) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Supporting Card 1: Custom Software — ESYUS Technology */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="liquid-card border border-indigo-500/35 dark:border-indigo-400/30 hover:border-indigo-400 dark:hover:border-indigo-300 flex flex-col justify-between p-6 sm:p-8 rounded-3xl group"
            >
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between">
                  <Badge variant="esyus" dot dotColor="bg-indigo-400">
                    ESYUS TECHNOLOGY LEAD
                  </Badge>
                  <Server className="w-5 h-5 text-indigo-500" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {softwareService.title}
                  </h3>
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
                    {softwareService.headline}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {softwareService.description}
                  </p>
                </div>

                {/* System Architecture Node Preview */}
                <div className="p-3.5 rounded-xl bg-slate-950 dark:bg-[#03060E] border border-slate-800 dark:border-white/10 text-slate-300 font-mono text-xs space-y-2 shadow-inner">
                  <div className="flex items-center justify-between text-[11px] text-indigo-400 pb-1.5 border-b border-slate-800 dark:border-white/10">
                    <span className="flex items-center gap-1.5">
                      <TerminalSquare className="w-3.5 h-3.5" />
                      ESYUS Architecture Node
                    </span>
                    <span className="text-emerald-400">SOC2 / Zero-Trust</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-400">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Core Services:</span>
                      <span className="text-slate-200">Async Event Queue, RBAC Auth</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Database:</span>
                      <span className="text-slate-200">Distributed Postgres + Redis</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Integrations:</span>
                      <span className="text-slate-200">Stripe, ERPs, Custom Webhooks</span>
                    </div>
                  </div>
                </div>

                {/* Outcomes list */}
                <div className="space-y-2 pt-1">
                  {softwareService.outcomes.slice(0, 3).map((out, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 sm:pt-6 border-t border-slate-200/60 dark:border-white/10 mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={ArrowRight}
                  onClick={() => handleInquiryFor('software')}
                  className="w-full sm:w-auto justify-center min-h-[44px]"
                >
                  Configure Custom Software
                </Button>
                <span className="text-xs font-mono text-slate-400 text-center sm:text-right">Full Source Handover</span>
              </div>
            </motion.div>

            {/* Supporting Card 2: Mobile Applications — ESYUS Technology */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="liquid-card border border-cyan-500/35 dark:border-cyan-400/30 hover:border-cyan-400 dark:hover:border-cyan-300 flex flex-col justify-between p-6 sm:p-8 rounded-3xl group"
            >
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between">
                  <Badge variant="esyus" dot dotColor="bg-cyan-400">
                    ESYUS TECHNOLOGY LEAD
                  </Badge>
                  <Smartphone className="w-5 h-5 text-cyan-500" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {mobileService.title}
                  </h3>
                  <p className="text-sm font-medium text-cyan-600 dark:text-cyan-300">
                    {mobileService.headline}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {mobileService.description}
                  </p>
                </div>

                {/* Mobile Preview Visual */}
                <div className="p-3.5 rounded-xl bg-slate-950 dark:bg-[#03060E] border border-slate-800 dark:border-white/10 text-slate-300 font-mono text-xs space-y-2 shadow-inner">
                  <div className="flex items-center justify-between text-[11px] text-cyan-400 pb-1.5 border-b border-slate-800 dark:border-white/10">
                    <span className="flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      iOS & Android Engine
                    </span>
                    <span className="text-emerald-400">60 FPS Native Touch</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-400">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Framework:</span>
                      <span className="text-slate-200">React Native / Native Bridges</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Offline Sync:</span>
                      <span className="text-slate-200">Local SQLite + Delta Sync</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Deployment:</span>
                      <span className="text-slate-200">Fastlane App Store & Play Store</span>
                    </div>
                  </div>
                </div>

                {/* Outcomes list */}
                <div className="space-y-2 pt-1">
                  {mobileService.outcomes.slice(0, 3).map((out, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 sm:pt-6 border-t border-slate-200/60 dark:border-white/10 mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={ArrowRight}
                  onClick={() => handleInquiryFor('mobile')}
                  className="w-full sm:w-auto justify-center min-h-[44px]"
                >
                  Build Mobile Application
                </Button>
                <span className="text-xs font-mono text-slate-400 text-center sm:text-right">iOS + Android Parity</span>
              </div>
            </motion.div>

          </div>

        </div>
      </Container>
    </section>
  )
}
