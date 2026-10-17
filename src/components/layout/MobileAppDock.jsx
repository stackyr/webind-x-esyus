import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Home,
  Layers,
  Store,
  Briefcase,
  LayoutGrid,
  X,
  Sun,
  Moon,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Cpu,
  Mail,
  Flame,
} from 'lucide-react'
import { useTheme } from '../../context/useTheme'
import { useOrderModal } from '../../context/useOrderModal'
import { useMobileMenu } from '../../context/useMobileMenu'
import { BrandLogo } from '../ui/BrandLogo'
import { BRAND_CONFIG } from '../../data/siteData'

export function MobileAppDock() {
  const { theme, toggleTheme } = useTheme()
  const { isOpen: isOrderModalOpen, openOrderModal } = useOrderModal()
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu()
  const [activeTab, setActiveTab] = useState('hero')
  const [visible, setVisible] = useState(true)
  const lastScrollYRef = useRef(0)

  // Auto detect active section in viewport & smart auto-tuck visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Smart dock auto-tuck when scrolling down, instant reveal when scrolling up
      if (currentScrollY > lastScrollYRef.current + 12 && currentScrollY > 350) {
        setVisible(false)
      } else if (currentScrollY < lastScrollYRef.current - 8 || currentScrollY <= 200) {
        setVisible(true)
      }
      lastScrollYRef.current = currentScrollY

      const sections = [
        'contact',
        'business-order',
        'work',
        'process',
        'partnership',
        'services',
        'hero',
      ]
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 260) {
            setActiveTab(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll using Lenis
  const scrollTo = (id) => {
    closeMobileMenu()
    setActiveTab(id)
    const el = document.getElementById(id)
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, {
          offset: -85,
          duration: 1.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
        })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Interactive Dock Menu items inside the modern drawer
  const menuCards = [
    {
      id: 'hero',
      title: 'Home',
      subtitle: 'Hero showcase & intro',
      icon: Home,
      iconBg: 'from-sky-500/20 to-blue-500/20 text-sky-500',
    },
    {
      id: 'services',
      title: 'Services',
      subtitle: 'Web Apps, UI/UX, SaaS',
      icon: Layers,
      iconBg: 'from-cyan-500/20 to-sky-500/20 text-cyan-500',
    },
    {
      id: 'business-order',
      title: 'Order Configurator',
      subtitle: 'Instant business quote',
      icon: Store,
      iconBg: 'from-amber-500/20 to-orange-500/20 text-amber-500',
      badge: 'HOT',
    },
    {
      id: 'partnership',
      title: 'Partnership',
      subtitle: 'Webind × Esyus syndicate',
      icon: Sparkles,
      iconBg: 'from-purple-500/20 to-indigo-500/20 text-purple-400',
    },
    {
      id: 'process',
      title: 'Process',
      subtitle: '3-step delivery sprints',
      icon: Cpu,
      iconBg: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
    },
    {
      id: 'work',
      title: 'Portfolio & Work',
      subtitle: 'Real client deployments',
      icon: Briefcase,
      iconBg: 'from-indigo-500/20 to-violet-500/20 text-indigo-400',
    },
    {
      id: 'contact',
      title: 'Contact & Inquiry',
      subtitle: 'Direct studio consultation',
      icon: MessageSquare,
      iconBg: 'from-sky-500/20 to-indigo-500/20 text-sky-400',
    },
  ]

  // If Business Order modal is active, hide dock so it doesn't obstruct form or buttons
  if (isOrderModalOpen) {
    return null
  }

  return (
    <>
      {/* =========================================================================
          1. ULTRA-MODERN FLOATING DOCK (Apple iOS 18 Glassmorphic Dynamic Island)
         ========================================================================= */}
      <aside
        aria-label="Mobile Navigation Dock"
        className={`fixed bottom-[calc(0.85rem+env(safe-area-inset-bottom,0px))] inset-x-0 mx-auto w-fit z-40 lg:hidden px-3 transition-all duration-300 pointer-events-none ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <div className="relative pointer-events-auto">
          {/* Ambient Chroma Glow Aura behind dock */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500/30 via-cyan-400/20 to-indigo-500/30 rounded-full blur-md opacity-80 dark:opacity-60 pointer-events-none -z-10" />

          {/* Main Glassmorphic Dock Pill */}
          <div className="relative flex items-center justify-between gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-white/85 dark:bg-[#070B19]/90 backdrop-blur-3xl border border-white/60 dark:border-white/15 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.22)] dark:shadow-[0_18px_50px_-8px_rgba(0,0,0,0.85)] ring-1 ring-black/5 dark:ring-white/5">
            {/* 1. Home Tab */}
            <button
              type="button"
              onClick={() => scrollTo('hero')}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all active:scale-90 cursor-pointer ${
                activeTab === 'hero'
                  ? 'text-sky-600 dark:text-sky-300 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-label="Scroll to Home"
            >
              {activeTab === 'hero' && (
                <motion.span
                  layoutId="dockActiveTabIndicator"
                  className="absolute inset-0 rounded-full bg-sky-500/15 dark:bg-sky-400/20 border border-sky-400/30 dark:border-sky-400/40 -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <Home className="w-4 h-4" />
              <span className="text-[9px] tracking-tight mt-0.5">Home</span>
            </button>

            {/* 2. Services Tab */}
            <button
              type="button"
              onClick={() => scrollTo('services')}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all active:scale-90 cursor-pointer ${
                activeTab === 'services'
                  ? 'text-sky-600 dark:text-sky-300 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-label="Scroll to Services"
            >
              {activeTab === 'services' && (
                <motion.span
                  layoutId="dockActiveTabIndicator"
                  className="absolute inset-0 rounded-full bg-sky-500/15 dark:bg-sky-400/20 border border-sky-400/30 dark:border-sky-400/40 -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <Layers className="w-4 h-4" />
              <span className="text-[9px] tracking-tight mt-0.5">Services</span>
            </button>

            {/* 3. Centerpiece Elevated Jewel Button (Order Website) */}
            <div className="relative -mt-5 px-1">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => openOrderModal()}
                className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 via-cyan-400 to-indigo-600 text-white shadow-[0_8px_25px_-2px_rgba(14,165,233,0.55)] ring-[3.5px] ring-white dark:ring-[#070B19] flex flex-col items-center justify-center cursor-pointer overflow-hidden group"
                aria-label="Order Custom Website"
              >
                {/* Specular light sheen */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Store className="w-5 h-5 text-white drop-shadow-sm" />
                <span className="text-[7.5px] font-mono font-bold tracking-tight uppercase leading-none mt-0.5">
                  Order
                </span>

                {/* Micro Pulsing Starburst Indicator */}
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,1)] animate-ping" />
              </motion.button>
            </div>

            {/* 4. Work Tab */}
            <button
              type="button"
              onClick={() => scrollTo('work')}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all active:scale-90 cursor-pointer ${
                activeTab === 'work'
                  ? 'text-sky-600 dark:text-sky-300 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-label="Scroll to Portfolio"
            >
              {activeTab === 'work' && (
                <motion.span
                  layoutId="dockActiveTabIndicator"
                  className="absolute inset-0 rounded-full bg-sky-500/15 dark:bg-sky-400/20 border border-sky-400/30 dark:border-sky-400/40 -z-10 shadow-xs"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <Briefcase className="w-4 h-4" />
              <span className="text-[9px] tracking-tight mt-0.5">Work</span>
            </button>

            {/* 5. Menu Tab (Toggles Modern Dock Menu Sheet) */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all active:scale-90 cursor-pointer ${
                isMobileMenuOpen
                  ? 'text-sky-600 dark:text-sky-300 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? (
                <>
                  <motion.span
                    layoutId="dockActiveTabIndicator"
                    className="absolute inset-0 rounded-full bg-sky-500/15 dark:bg-sky-400/20 border border-sky-400/30 dark:border-sky-400/40 -z-10 shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                  <X className="w-4 h-4 text-sky-500 rotate-90 transition-transform" />
                </>
              ) : (
                <LayoutGrid className="w-4 h-4" />
              )}
              <span className="text-[9px] tracking-tight mt-0.5">Menu</span>
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          2. ULTRA-MODERN DOCK MENU (Liquid Glass Bottom Sheet / Quick Launcher)
         ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden bg-black/65 backdrop-blur-md flex flex-col justify-end"
            onClick={closeMobileMenu}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="w-full bg-white/95 dark:bg-[#070B19]/95 border-t border-white/40 dark:border-white/12 rounded-t-[32px] p-5 sm:p-6 max-h-[88vh] overflow-y-auto shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.65)] backdrop-blur-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sheet Drag Handle */}
              <div className="w-12 h-1.5 bg-slate-300 dark:bg-white/20 rounded-full mx-auto mb-4" />

              {/* Header: Studio Identity + Quick Utilities */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <BrandLogo size="sm" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white tracking-tight leading-none">
                      WEBIND × ESYUS
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                        Studio Online · Ready
                      </span>
                    </div>
                  </div>
                </div>

                {/* Theme Switcher & Close Sheet Button */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer border border-slate-200/50 dark:border-white/10"
                    aria-label="Toggle dark mode"
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Moon className="w-4 h-4 text-slate-700" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={closeMobileMenu}
                    className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer border border-slate-200/50 dark:border-white/10"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Navigation Grid (Touch-Friendly Cards) */}
              <div className="py-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1 font-semibold">
                  Quick Navigation
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {menuCards.map((item) => {
                    const isActive = activeTab === item.id
                    const IconComponent = item.icon

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => scrollTo(item.id)}
                        className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left cursor-pointer active:scale-[0.98] ${
                          isActive
                            ? 'bg-sky-50/90 dark:bg-sky-500/15 border-sky-400/40 dark:border-sky-400/30 text-sky-950 dark:text-white shadow-xs'
                            : 'bg-slate-50/80 dark:bg-white/5 border-slate-200/60 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${item.iconBg} flex items-center justify-center shrink-0 border border-current/10`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                              {item.title}
                              {item.badge && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[8.5px] font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                  <Flame className="w-2.5 h-2.5" />
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        {isActive ? (
                          <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,1)]" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Fast Connect & Contact Deck */}
              <div className="pt-2 pb-4 border-t border-slate-200/70 dark:border-white/10 space-y-2.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1 font-semibold">
                  Fast Connect
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                      BRAND_CONFIG.contact.whatsappPrefill
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition-all active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${BRAND_CONFIG.contact.email}?subject=${encodeURIComponent(
                      BRAND_CONFIG.contact.emailSubject
                    )}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 dark:text-sky-400 border border-sky-500/20 text-xs font-semibold transition-all active:scale-[0.98]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Studio</span>
                  </a>
                </div>

                {/* Primary Launch Action */}
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu()
                    openOrderModal()
                  }}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-500 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  <span>Start a Project / Instant Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
