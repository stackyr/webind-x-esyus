import React, { useState } from 'react'
import { motion } from 'motion/react'
import {
  Store,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  FileText,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { useOrderModal } from '../../context/useOrderModal'
import { PRESETS } from '../../data/orderPresets'

export function BusinessOrderSection() {
  const { openOrderModal } = useOrderModal()
  const [activeSampleIdx, setActiveSampleIdx] = useState(0)
  const [copied, setCopied] = useState(false)

  const activePreset = PRESETS[activeSampleIdx] || PRESETS[0]
  const d = activePreset.data

  const sampleBriefOutput = `BUSINESS_NAME: ${d.businessName}
TAGLINE: ${d.tagline}
NICHE: ${d.niche}
LOCATION: ${d.location}
YEARS_IN_BUSINESS: ${d.yearsInBusiness}
OWNER_NAME: ${d.ownerName}
PHONE: ${d.phone}
WHATSAPP_NUMBER: ${d.whatsappNumber}
EMAIL: ${d.email}
FULL_ADDRESS: ${d.fullAddress}
HOURS: ${d.hours}
SERVICES_OR_PRODUCTS:
${d.items.map((i) => `- ${i.name} (${i.price})`).join('\n')}
DISTINCTIVE_FACT: ${d.distinctiveFact}
COLOR_VIBE: ${d.colorVibe}
INSTAGRAM_HANDLE: ${d.instagramHandle}
HERO_IMAGE_URL: ${d.heroImageUrl || 'FILL IN'}
OTHER_IMAGE_URL: ${d.otherImageUrls || 'FILL IN'}
OTHER_NOTES: ${d.otherNotes}`

  const copySample = () => {
    navigator.clipboard.writeText(sampleBriefOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="business-order" className="py-24 sm:py-32 relative overflow-hidden bg-slate-50/50 dark:bg-[#070B16]/80 border-t border-slate-200/80 dark:border-white/10">
      {/* Dynamic Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-transparent blur-3xl rounded-full -z-10 animate-fluid-pulse" />

      <Container size="wide">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Instant Storefront Onboarding"
          title="Order your business website."
          highlight="Live in 48 hours."
          description="Have a local shop, restaurant, salon, sweet shop, clinic, or service business? Provide your signboard details, menu items, and timings. Our rapid brief pipeline turns it into a high-converting website."
        />

        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          
          {/* Left Column: Why This Works & Order Triggers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/10 border border-sky-200/60 dark:border-sky-500/30">
              <Sparkles className="w-3.5 h-3.5 text-sky-500" />
              <span>STEP-BY-STEP CLIENT ONBOARDING</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Everything we need to build your site in one structured brief.
            </h3>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              No confusing design jargon or endless meetings. Simply fill out our 5-step rapid order form with your business name, operating hours, service catalog, and contact details.
            </p>

            {/* Benefit Checkpoints */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Direct WhatsApp & Phone Ordering Built-In
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Your customers can tap once to call or order items directly into your WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Menu & Service Catalog with Clear Pricing
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Transparent list of your signature dishes, packages, or services with prices.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Google Maps, Timings & Local SEO
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Rank on local searches when nearby customers look for businesses like yours.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 pt-4">
              <button
                type="button"
                onClick={() => openOrderModal()}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/25 active:scale-[0.98] transition-all cursor-pointer w-full sm:w-auto min-h-[48px]"
              >
                <Store className="w-4 h-4" />
                <span>Start Business Website Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => openOrderModal(activePreset.data)}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-colors cursor-pointer w-full sm:w-auto min-h-[48px]"
              >
                <FileText className="w-4 h-4 text-sky-500" />
                <span>Load Sample & Test Wizard</span>
              </button>
            </div>

          </motion.div>

          {/* Right Column: Live Form Format Simulator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="liquid-card p-5 sm:p-7 rounded-3xl border border-sky-500/35 dark:border-sky-400/30 hover:border-sky-400 dark:hover:border-sky-300 shadow-2xl space-y-4 group">
              
              {/* Simulator Header & Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                    Format Specification Preview
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={copySample}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Format</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Sample Switcher Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {PRESETS.map((preset, idx) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setActiveSampleIdx(idx)}
                    className={`py-2 px-2 sm:px-2.5 rounded-xl text-left transition-all text-xs cursor-pointer ${
                      activeSampleIdx === idx
                        ? 'bg-sky-500 text-white font-semibold shadow-xs'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="truncate text-[11px] sm:text-xs font-semibold">{preset.icon} {preset.label}</div>
                    <div className="text-[9px] opacity-80 truncate">{preset.badge}</div>
                  </button>
                ))}
              </div>

              {/* Exact Text Code Block */}
              <div className="rounded-2xl bg-slate-950 dark:bg-[#03060E] border border-slate-800 dark:border-sky-500/20 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[300px] leading-relaxed shadow-inner">
                <pre className="whitespace-pre-wrap">{sampleBriefOutput}</pre>
              </div>

              {/* Card Footer Action */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Ready to fill for your business?
                </span>
                <button
                  type="button"
                  onClick={() => openOrderModal()}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <span>Launch Step-by-Step Wizard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </motion.div>

        </div>

      </Container>
    </section>
  )
}
