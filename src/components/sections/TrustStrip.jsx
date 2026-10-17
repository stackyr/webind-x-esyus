import React from 'react'
import { motion } from 'motion/react'
import { Globe, Server, Smartphone, GitMerge } from 'lucide-react'
import { Container } from '../ui/Container'
import { TRUST_CAPABILITIES } from '../../data/siteData'

export function TrustStrip() {
  const iconMap = [Globe, Server, Smartphone, GitMerge]

  return (
    <section id="trust" className="py-8 sm:py-16 border-b border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-[#070B14]/80">
      <Container size="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {TRUST_CAPABILITIES.map((item, index) => {
            const Icon = iconMap[index % iconMap.length]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                className="liquid-card border border-sky-500/25 dark:border-sky-400/20 hover:border-sky-400 dark:hover:border-sky-300 p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-default group shadow-md hover:shadow-sky-500/20"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#0E1528] flex items-center justify-center shrink-0 text-slate-800 dark:text-sky-400 border border-slate-200/60 dark:border-white/10 shadow-inner group-hover:scale-105 group-hover:border-sky-500/40 transition-all">
                    <Icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-300">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight truncate sm:whitespace-normal">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
