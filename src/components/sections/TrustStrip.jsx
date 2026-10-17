import React from 'react'
import { Globe, Server, Smartphone, GitMerge } from 'lucide-react'
import { Container } from '../ui/Container'
import { TRUST_CAPABILITIES } from '../../data/siteData'

export function TrustStrip() {
  const iconMap = [Globe, Server, Smartphone, GitMerge]

  return (
    <section className="py-10 sm:py-12 border-y border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-[#070B14]/80">
      <Container size="wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_CAPABILITIES.map((item, index) => {
            const Icon = iconMap[index % iconMap.length]
            return (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4.5 rounded-2xl transition-all duration-200 hover:bg-white/80 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 border border-transparent dark:border-white/5 dark:hover:border-sky-500/30 shadow-xs dark:shadow-lg dark:shadow-black/20"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#0E1528] flex items-center justify-center shrink-0 text-slate-800 dark:text-sky-400 border border-slate-200/60 dark:border-white/10 shadow-inner">
                  <Icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-300">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
