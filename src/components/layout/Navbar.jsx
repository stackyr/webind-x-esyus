import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sun, Moon, ArrowRight, Menu, X, Sparkles, MessageSquare } from 'lucide-react'
import { useTheme } from '../../context/useTheme'
import { Button } from '../ui/Button'
import { BRAND_CONFIG } from '../../data/siteData'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
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

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Partnership', href: '#partnership' },
    { label: 'Process', href: '#process' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleLinkClick = (e, href) => {
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 sm:py-4' : 'py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Main Navigation"
              className={`mx-auto flex items-center justify-between transition-all duration-300 rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 ${
                scrolled
                  ? 'glass-surface shadow-lg shadow-black/5 dark:shadow-2xl dark:shadow-black/80 border border-slate-200/80 dark:border-white/15 dark:bg-[#090D18]/85 backdrop-blur-xl'
                  : 'bg-white/70 dark:bg-[#070B14]/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10'
              }`}
            >
              {/* Brand Identity Lockup */}
              <a
                href="#"
                className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1"
                aria-label="WEBIND and ESYUS Technology Homepage"
              >
                {/* Dual Brand Icon Graphic */}
                <div className="flex items-center -space-x-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-sm shadow-sky-500/30 group-hover:scale-105 transition-transform">
                    <span className="font-bold text-xs sm:text-sm font-mono tracking-tighter">W</span>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/30 group-hover:scale-105 transition-transform ring-2 ring-white dark:ring-[#070B14]">
                    <span className="font-bold text-xs sm:text-sm font-mono tracking-tighter">E</span>
                  </div>
                </div>

                {/* Brand Typography */}
                <div className="flex items-baseline gap-1.5 text-sm sm:text-base tracking-tight font-bold text-slate-900 dark:text-white">
                  <span className="tracking-wide">WEBIND</span>
                  <span className="text-slate-400 dark:text-slate-500 font-light text-xs sm:text-sm">×</span>
                  <span className="text-slate-800 dark:text-slate-100 font-semibold tracking-wide">
                    ESYUS
                  </span>
                  <span className="hidden md:inline-block text-[10px] tracking-widest font-mono uppercase text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-200/60 dark:border-sky-500/30 font-semibold">
                    STUDIO
                  </span>
                </div>
              </a>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-xl transition-all hover:bg-slate-100/70 dark:hover:bg-white/10 cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Right Action Cluster: Theme Toggle + Primary CTA */}
              <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-white/10"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
                )}
              </button>

              {/* Primary "Start a Project" Button */}
              <Button
                variant="primary"
                size="sm"
                href="#inquiry"
                onClick={(e) => handleLinkClick(e, '#inquiry')}
                rightIcon={ArrowRight}
                className="hidden sm:inline-flex"
              >
                Start a Project
              </Button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer border border-slate-200/60 dark:border-white/10"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer / Navigation Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-md flex flex-col justify-end"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 rounded-t-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sheet Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
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
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="flex items-center justify-between py-3.5 px-3 rounded-xl text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  href="#inquiry"
                  onClick={(e) => handleLinkClick(e, '#inquiry')}
                  rightIcon={ArrowRight}
                  className="w-full justify-center"
                >
                  Start a Project
                </Button>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <a
                    href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                      BRAND_CONFIG.contact.whatsappPrefill
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${BRAND_CONFIG.contact.email}?subject=${encodeURIComponent(
                      BRAND_CONFIG.contact.emailSubject
                    )}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
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
