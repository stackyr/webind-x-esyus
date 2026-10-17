import React, { useState, useEffect } from 'react'
import { Home, Layers, Briefcase, Store, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/useTheme'
import { useOrderModal } from '../../context/useOrderModal'

export function MobileAppDock() {
  const { theme, toggleTheme } = useTheme()
  const { isOpen, openOrderModal } = useOrderModal()
  const [activeTab, setActiveTab] = useState('hero')
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Auto detect active section and handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setVisible(true) // Keep it visible or gently tucked
      } else {
        setVisible(true)
      }
      setLastScrollY(currentScrollY)

      const sections = ['contact', 'business-order', 'work', 'process', 'partnership', 'services', 'hero']
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 250) {
            setActiveTab(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollTo = (id) => {
    setActiveTab(id)
    const el = document.getElementById(id)
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, {
          offset: -80,
          duration: 1.8,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
        })
      } else {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // If modal is active, hide dock so it doesn't obstruct form or buttons
  if (isOpen) {
    return null
  }

  return (
    <div
      className={`fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] inset-x-3 z-40 lg:hidden transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <div className="mx-auto max-w-sm rounded-full bg-white/90 dark:bg-[#090E1C]/92 border border-slate-200/90 dark:border-white/15 px-3 py-1.5 shadow-2xl shadow-black/20 dark:shadow-black/80 backdrop-blur-2xl flex items-center justify-between">
        {/* Home */}
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-all active:scale-90 ${
            activeTab === 'hero'
              ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10'
              : 'text-slate-500 dark:text-slate-400'
          }`}
          aria-label="Scroll to top"
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-medium tracking-tight mt-0.5">Home</span>
        </button>

        {/* Services */}
        <button
          type="button"
          onClick={() => scrollTo('services')}
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-all active:scale-90 ${
            activeTab === 'services'
              ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10'
              : 'text-slate-500 dark:text-slate-400'
          }`}
          aria-label="Scroll to Services"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[9px] font-medium tracking-tight mt-0.5">Services</span>
        </button>

        {/* Center Prominent CTA: Order Website */}
        <button
          type="button"
          onClick={() => openOrderModal()}
          className="relative -mt-4 p-3 rounded-full bg-gradient-to-tr from-sky-500 via-cyan-500 to-indigo-600 text-white shadow-lg shadow-sky-500/35 ring-4 ring-white dark:ring-[#070B16] flex flex-col items-center justify-center transition-transform active:scale-95 cursor-pointer"
          aria-label="Order Website"
        >
          <Store className="w-4 h-4" />
          <span className="text-[8px] font-mono font-bold tracking-tight uppercase mt-0.5">Order</span>
        </button>

        {/* Work */}
        <button
          type="button"
          onClick={() => scrollTo('work')}
          className={`flex flex-col items-center justify-center p-2 rounded-full transition-all active:scale-90 ${
            activeTab === 'work'
              ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10'
              : 'text-slate-500 dark:text-slate-400'
          }`}
          aria-label="Scroll to Work Showcase"
        >
          <Briefcase className="w-4 h-4" />
          <span className="text-[9px] font-medium tracking-tight mt-0.5">Work</span>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center p-2 rounded-full text-slate-500 dark:text-slate-400 transition-all active:scale-90"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
          <span className="text-[9px] font-medium tracking-tight mt-0.5">Theme</span>
        </button>
      </div>
    </div>
  )
}
