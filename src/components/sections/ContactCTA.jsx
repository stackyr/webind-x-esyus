import React from 'react'
import { motion } from 'motion/react'
import {
  Mail,
  MessageSquare,
  ArrowRight,
  Clock,
  MapPin,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { BRAND_CONFIG } from '../../data/siteData'
import { useOrderModal } from '../../context/useOrderModal'

export function ContactCTA() {
  const { contact } = BRAND_CONFIG
  const { openOrderModal } = useOrderModal()

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden bg-ambient-mesh border-t border-slate-200/80 dark:border-white/10">
      <Container size="default">
        
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          className="liquid-card border border-sky-500/35 dark:border-sky-400/30 hover:border-sky-400 dark:hover:border-sky-300 p-6 sm:p-12 text-center relative overflow-hidden rounded-3xl group shadow-2xl"
        >
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-transparent blur-3xl rounded-full -z-10 animate-fluid-pulse" />

          <div className="max-w-2xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800/90 text-sky-600 dark:text-sky-300 border border-slate-200 dark:border-white/10 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{contact.availability}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Ready to build your next digital product?
            </h2>

            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-200 font-normal leading-relaxed">
              Whether you need a high-converting web flagship, a bespoke cloud software system, or a native mobile application, we’re ready to scope your project.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => openOrderModal()}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-sky-500/25 active:scale-[0.98] transition-all cursor-pointer min-h-[48px] group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Button
                variant="glass"
                size="lg"
                href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                  contact.whatsappPrefill
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={MessageSquare}
                className="w-full sm:w-auto justify-center min-h-[48px] active:scale-[0.98] transition-transform"
              >
                Chat on WhatsApp
              </Button>
            </div>

            {/* Configurable Contact Grid */}
            <div className="pt-8 mt-8 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              
              <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#070B14] border border-slate-200/60 dark:border-white/10 space-y-1 shadow-xs dark:shadow-md hover:border-sky-500/40 transition-colors">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-sky-500" />
                  <span>DIRECT EMAIL</span>
                </div>
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`}
                  className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-sky-500 dark:hover:text-sky-400 transition-colors block truncate"
                >
                  {contact.email}
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#070B14] border border-slate-200/60 dark:border-white/10 space-y-1 shadow-xs dark:shadow-md hover:border-indigo-500/40 transition-colors">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>RESPONSE SLA</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                  {contact.responseSla}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#070B14] border border-slate-200/60 dark:border-white/10 space-y-1 shadow-xs dark:shadow-md hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                  <span>STUDIO MODEL</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {contact.location}
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </Container>
    </section>
  )
}
