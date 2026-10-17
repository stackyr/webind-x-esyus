import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'motion/react'
import { Sun, Moon, ArrowRight, Menu, X, Sparkles, MessageSquare, Store } from 'lucide-react'
import { useTheme } from '../../context/useTheme'
import { useOrderModal } from '../../context/useOrderModal'
import { BRAND_CONFIG } from '../../data/siteData'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const { openOrderModal } = useOrderModal()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const { scrollYProgress } = useScroll()

  const navLinks = [
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Order Website', href: '#business-order', id: 'business-order' },
    { label: 'Partnership', href: '#partnership', id: 'partnership' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ]

  // Track active section on scroll with viewport band detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // If at very bottom of document, lock onto contact
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60

      if (isAtBottom) {
        setActiveSection('contact')
        return
      }

      // Ordered exactly as they appear in the page layout from top to bottom
      const sections = [
        'hero',
        'services',
        'business-order',
        'partnership',
        'process',
        'work',
        'contact',
      ]

      const threshold = 180
      let currentSection = ''

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= threshold && rect.bottom > threshold) {
            currentSection = sectionId
            break
          }
        }
      }

      if (currentSection) {
        setActiveSection(currentSection)
      } else if (window.scrollY < 200) {
        setActiveSection('hero')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleLinkClick = (e, href) => {
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      if (window.__lenis) {
        window.__lenis.scrollTo(target, {
          offset: -85,
          duration: 1.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
        })
      } else {
        const navHeight = 85
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        })
      }
      const sectionId = href.replace('#', '')
      setActiveSection(sectionId)
    }
  }

  return (
    <>
      {/* Scroll Reading Progress Bar at the Top */}
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 z-[60] shadow-[0_0_12px_rgba(56,189,248,0.9)] pointer-events-none"
      />

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2 sm:py-3.5' : 'py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
          <nav
            aria-label="Main Navigation"
            className={`mx-auto flex items-center justify-between transition-all duration-300 rounded-2xl px-3 sm:px-6 py-2 sm:py-3 ${
              scrolled
                ? 'bg-white/80 dark:bg-[#070C18]/90 shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/80 border border-slate-200/90 dark:border-white/15 backdrop-blur-2xl'
                : 'bg-white/70 dark:bg-[#070B16]/80 backdrop-blur-xl border border-slate-200/60 dark:border-white/10'
            }`}
          >
            {/* Brand Identity Lockup */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="flex items-center gap-1.5 sm:gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-0.5 sm:p-1 shrink-0"
              aria-label="WEBIND and ESYUS Technology Homepage"
            >
              {/* Dual Brand Icon Graphic */}
              <div className="flex items-center -space-x-1 shrink-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-sm shadow-sky-500/30 group-hover:scale-105 transition-transform">
                  <span className="font-bold text-xs sm:text-sm font-mono tracking-tighter">W</span>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/30 group-hover:scale-105 transition-transform ring-2 ring-white dark:ring-[#070B14]">
                  <span className="font-bold text-xs sm:text-sm font-mono tracking-tighter">E</span>
                </div>
              </div>

              {/* Brand Typography */}
              <div className="flex items-baseline gap-1 sm:gap-1.5 text-xs sm:text-base tracking-tight font-bold text-slate-900 dark:text-white shrink-0">
                <span className="tracking-wide">WEBIND</span>
                <span className="text-slate-400 dark:text-slate-500 font-light text-[10px] sm:text-sm">×</span>
                <span className="text-slate-800 dark:text-slate-100 font-semibold tracking-wide">
                  ESYUS
                </span>
                <span className="hidden md:inline-block text-[10px] tracking-widest font-mono uppercase text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-200/60 dark:border-sky-500/30 font-semibold">
                  STUDIO
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links with Active Pill & Smooth Hover */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 relative">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative px-3.5 py-1.5 text-sm font-medium rounded-xl transition-all cursor-pointer select-none ${
                      isActive
                        ? 'text-sky-600 dark:text-sky-300 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/10'
                    }`}
                  >
                    {/* Glowing Active Pill Tracker */}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-gradient-to-r from-sky-500/15 via-cyan-500/10 to-indigo-500/15 dark:from-sky-500/25 dark:via-cyan-500/20 dark:to-indigo-500/25 rounded-xl border border-sky-400/35 dark:border-sky-400/40 shadow-xs shadow-sky-500/20 -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    <span className="flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,1)]" />
                      )}
                      {link.label}
                    </span>
                  </a>
                )
              })}
            </div>

            {/* Right Action Cluster: Theme Toggle + Desktop Primary CTA + Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Theme Toggle Button (Desktop/Tablet; On mobile, accessible via bottom dock and slide-up drawer) */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10 shrink-0"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
                )}
              </button>

              {/* Single Primary CTA: Start a Project (Hidden on mobile per user request, visible on tablet & laptop) */}
              <button
                type="button"
                onClick={() => openOrderModal()}
                className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0 group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer border border-slate-200/60 dark:border-white/10 active:scale-95 shrink-0"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer / App Navigation Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-md flex flex-col justify-end"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-full bg-white dark:bg-[#0A0F1F] border-t border-slate-200 dark:border-white/12 rounded-t-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sheet Drag Handle */}
              <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-4" />

              {/* Sheet Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xs font-mono font-bold">
                    W×E
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    WEBIND × ESYUS
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col py-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`flex items-center justify-between py-3.5 px-3.5 rounded-xl text-base font-semibold transition-colors ${
                        isActive
                          ? 'bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-200/50 dark:border-sky-500/20'
                          : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isActive && <span className="w-2 h-2 rounded-full bg-sky-500" />}
                        {link.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </a>
                  )
                })}
              </div>

              {/* Mobile Actions: Single Primary CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    openOrderModal()
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  <span>Start a Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <a
                    href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                      BRAND_CONFIG.contact.whatsappPrefill
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 active:scale-98 transition-transform"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${BRAND_CONFIG.contact.email}?subject=${encodeURIComponent(
                      BRAND_CONFIG.contact.emailSubject
                    )}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 active:scale-98 transition-transform"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                    <span>Quick Email</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
