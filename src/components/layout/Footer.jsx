import React from 'react'
import { Container } from '../ui/Container'
import { BRAND_CONFIG } from '../../data/siteData'
import { useOrderModal } from '../../context/useOrderModal'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const currentYear = CURRENT_YEAR
  const { openOrderModal } = useOrderModal()

  const handleScrollTo = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-[#03060C] py-16 sm:py-20">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200/60 dark:border-white/10">
          
          {/* Brand & Summary Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center -space-x-1">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white font-mono font-bold text-xs">
                  W
                </div>
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-mono font-bold text-xs ring-2 ring-white dark:ring-slate-950">
                  E
                </div>
              </div>
              <div className="flex items-baseline gap-1.5 font-bold text-slate-900 dark:text-white tracking-tight">
                <span>WEBIND</span>
                <span className="text-slate-400 font-light text-xs">×</span>
                <span className="text-slate-800 dark:text-slate-200">ESYUS</span>
                <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-1.5 py-0.5 rounded border border-sky-200/60 dark:border-sky-800/40">
                  STUDIO
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              A specialized digital product alliance. WEBIND delivers premium website development and brand experiences. ESYUS Technology engineers custom software and mobile applications.
            </p>

            <div className="pt-2 text-xs font-mono text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Current Status: Accepting Select Engagements</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, '#services')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#partnership"
                  onClick={(e) => handleScrollTo(e, '#partnership')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Partnership Model
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleScrollTo(e, '#process')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Process & Timeline
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  onClick={(e) => handleScrollTo(e, '#work')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Work Showcase
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openOrderModal()}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Order Business Website
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Capabilities
            </div>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, '#services')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, '#services')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Headless E-Commerce
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, '#services')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Custom Software
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, '#services')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Mobile Applications
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, '#services')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Cloud Architecture
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Direct Channels */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Direct Channels
            </div>
            <div className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <p>
                <span className="text-xs text-slate-400 block font-mono">Inquiry Desk:</span>
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  className="font-medium text-slate-800 dark:text-slate-200 hover:text-sky-500 transition-colors"
                >
                  {BRAND_CONFIG.contact.email}
                </a>
              </p>
              <p>
                <span className="text-xs text-slate-400 block font-mono">WhatsApp Business:</span>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-800 dark:text-slate-200 hover:text-emerald-500 transition-colors"
                >
                  {BRAND_CONFIG.contact.phoneDisplay}
                </a>
              </p>
              <p className="text-xs font-mono text-slate-500 pt-1">
                Guaranteed response within 24 business hours.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Legal Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} WEBIND × ESYUS Technology. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Liquid Precision Design System</span>
            <span>·</span>
            <span>Zero Vendor Friction</span>
          </div>
        </div>

      </Container>
    </footer>
  )
}
