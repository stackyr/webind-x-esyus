import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import confetti from 'canvas-confetti'
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  Plus,
  Trash2,
  Sparkles,
  Store,
  MessageSquare,
  Mail,
  RotateCcw,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useOrderModal } from '../../context/useOrderModal'
import { BRAND_CONFIG } from '../../data/siteData'
import { PRESETS } from '../../data/orderPresets'

const NICHE_OPTIONS = [
  { icon: '🧁', title: 'Sweet Shop / Bakery' },
  { icon: '🔧', title: 'Plumber / Emergency Services' },
  { icon: '💇', title: 'Salon / Beauty / Spa' },
  { icon: '🍽️', title: 'Restaurant / Cafe / Bar' },
  { icon: '🧵', title: 'Tailor / Boutique / Fashion' },
  { icon: '🩺', title: 'Doctor / Clinic / Healthcare' },
  { icon: '🛒', title: 'Grocery / Retail / Mart' },
  { icon: '💼', title: 'Professional / Agency / SaaS' },
]

const COLOR_VIBE_OPTIONS = [
  {
    id: 'warm-festive',
    title: 'Warm & Festive',
    desc: 'Deep saffron, ivory, royal amber glow',
    swatches: ['#F59E0B', '#FDE68A', '#78350F'],
  },
  {
    id: 'clean-industrial',
    title: 'Clean & Industrial',
    desc: 'Navy blue, safety orange, crisp white',
    swatches: ['#0284C7', '#F97316', '#0F172A'],
  },
  {
    id: 'luxury-minimal',
    title: 'Luxury & Minimal',
    desc: 'Matte obsidian, champagne gold, platinum',
    swatches: ['#D97706', '#E2E8F0', '#090D16'],
  },
  {
    id: 'organic-earthy',
    title: 'Organic & Earthy',
    desc: 'Forest sage, terracotta, warm linen',
    swatches: ['#059669', '#EA580C', '#FEF3C7'],
  },
  {
    id: 'modern-digital',
    title: 'Modern & Digital',
    desc: 'Electric sky, neon cyan, dark slate',
    swatches: ['#38BDF8', '#818CF8', '#030712'],
  },
]

const TOTAL_QUESTIONS = 11

function BusinessOrderModalContent({ closeOrderModal, initialData }) {
  // Current question index: 0 to 10 (11 questions total), 11 = Final Summary Screen
  const [currentQuestion, setCurrentQuestion] = useState(0)

  // 18-Point Form Data initialized directly
  const [formData, setFormData] = useState(() => ({
    businessName: initialData?.businessName || '',
    tagline: initialData?.tagline || '',
    niche: initialData?.niche || '',
    location: initialData?.location || '',
    yearsInBusiness: initialData?.yearsInBusiness || '',
    ownerName: initialData?.ownerName || '',
    phone: initialData?.phone || '',
    whatsappNumber: initialData?.whatsappNumber || initialData?.phone || '',
    email: initialData?.email || '',
    fullAddress: initialData?.fullAddress || '',
    hours: initialData?.hours || '',
    items:
      initialData?.items && initialData.items.length > 0
        ? initialData.items.map((i) =>
            typeof i === 'string'
              ? { name: i.split(' - ')[0] || i, price: i.split(' - ')[1] || '' }
              : i
          )
        : [
            { name: '', price: '' },
            { name: '', price: '' },
          ],
    distinctiveFact: initialData?.distinctiveFact || '',
    colorVibe: initialData?.colorVibe || '',
    instagramHandle: initialData?.instagramHandle || '',
    heroImageUrl: initialData?.heroImageUrl || '',
    otherImageUrls: initialData?.otherImageUrls || '',
    otherNotes: initialData?.otherNotes || '',
  }))

  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')
  const [copied, setCopied] = useState(false)
  const [showSummaryBrief, setShowSummaryBrief] = useState(false)
  const [validationError, setValidationError] = useState('')

  const inputRef = useRef(null)

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (validationError) setValidationError('')
  }

  const loadPreset = (preset) => {
    setFormData({
      ...preset.data,
      items: [...preset.data.items],
    })
    setValidationError('')
  }

  // Items Builder
  const handleAddItem = (e) => {
    if (e) e.preventDefault()
    if (!newItemName.trim()) return

    setFormData((prev) => ({
      ...prev,
      items: [...prev.items.filter((i) => i.name.trim() !== ''), { name: newItemName.trim(), price: newItemPrice.trim() }],
    }))
    setNewItemName('')
    setNewItemPrice('')
  }

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, idx) => idx !== index),
    }))
  }

  const handleNext = useCallback(() => {
    // Quick soft validations for essential first two questions
    if (currentQuestion === 0 && !formData.businessName.trim()) {
      setValidationError('Please enter your business or shop name to continue.')
      return
    }
    if (currentQuestion === 1 && !formData.niche.trim()) {
      setValidationError('Please select or enter the type of your business.')
      return
    }

    setValidationError('')

    if (currentQuestion < TOTAL_QUESTIONS) {
      setCurrentQuestion((prev) => prev + 1)
      if (currentQuestion === TOTAL_QUESTIONS - 1) {
        // Just reached the review step! Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#38BDF8', '#818CF8', '#34D399', '#FBBF24'],
        })
      }
    }
  }, [currentQuestion, formData.businessName, formData.niche])

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setValidationError('')
    }
  }, [currentQuestion])

  // Focus input automatically whenever question changes
  useEffect(() => {
    if (inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentQuestion])

  // Keyboard navigation: Enter to continue, Esc to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeOrderModal()
      } else if (e.key === 'Enter' && !e.shiftKey) {
        // If inside a textarea, allow shift+enter for new lines
        if (e.target.tagName.toLowerCase() === 'textarea') return

        // If inside item price or name input, don't advance the entire question, let it add the item
        if (e.target.dataset.itemInput) return

        e.preventDefault()
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closeOrderModal, handleNext])

  // Lock body scroll while modal is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Format the 18 items into exact user requested specification
  const formattedItemsText = formData.items
    .filter((i) => i.name && i.name.trim() !== '')
    .map((i) => `- ${i.name.trim()}${i.price.trim() ? ` (${i.price.trim()})` : ''}`)
    .join('\n')

  const finalBriefOutput = `BUSINESS_NAME: ${formData.businessName || 'FILL IN'}
TAGLINE: ${formData.tagline || 'FILL IN'}
NICHE: ${formData.niche || 'FILL IN'}
LOCATION: ${formData.location || 'FILL IN'}
YEARS_IN_BUSINESS: ${formData.yearsInBusiness || 'FILL IN'}
OWNER_NAME: ${formData.ownerName || 'FILL IN'}
PHONE: ${formData.phone || 'FILL IN'}
WHATSAPP_NUMBER: ${formData.whatsappNumber || formData.phone || 'FILL IN'}
EMAIL: ${formData.email || ''}
FULL_ADDRESS: ${formData.fullAddress || 'FILL IN'}
HOURS: ${formData.hours || 'FILL IN'}
SERVICES_OR_PRODUCTS:
${formattedItemsText || '- item 1 (price if visible)\n- item 2 (price if visible)'}
DISTINCTIVE_FACT: ${formData.distinctiveFact || 'FILL IN'}
COLOR_VIBE: ${formData.colorVibe || 'FILL IN'}
INSTAGRAM_HANDLE: ${formData.instagramHandle || ''}
HERO_IMAGE_URL: ${formData.heroImageUrl || ''}
OTHER_IMAGE_URL: ${formData.otherImageUrls || ''}
OTHER_NOTES: ${formData.otherNotes || ''}`

  const copyBriefToClipboard = () => {
    navigator.clipboard.writeText(finalBriefOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const sendWhatsAppOrder = () => {
    const text = encodeURIComponent(`*NEW BUSINESS WEBSITE ORDER — WEBIND × ESYUS*\n\n${finalBriefOutput}`)
    window.open(`https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${text}`, '_blank')
  }

  const sendEmailOrder = () => {
    const subject = encodeURIComponent(`Business Website Order: ${formData.businessName || 'New Client'}`)
    const body = encodeURIComponent(finalBriefOutput)
    window.location.href = `mailto:${BRAND_CONFIG.contact.email}?subject=${subject}&body=${body}`
  }

  const progressPercent = Math.min(100, Math.round(((currentQuestion + 1) / (TOTAL_QUESTIONS + 1)) * 100))

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-white dark:from-[#060A16] dark:via-[#090F24] dark:to-[#04060E] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      
      {/* Background Ambient Lighting & Liquid Orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-sky-500/15 via-indigo-500/15 to-transparent blur-3xl rounded-full -z-10 animate-fluid-pulse" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[450px] h-[350px] bg-gradient-to-bl from-cyan-400/10 via-sky-500/10 to-transparent blur-3xl rounded-full -z-10 animate-fluid-pulse-delayed" />

      {/* Top Progress Line */}
      <div className="w-full bg-slate-100 dark:bg-white/5 h-1">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(56,189,248,0.7)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Header Bar */}
      <header className="px-4 sm:px-8 py-3.5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between shrink-0 bg-white/70 dark:bg-[#070B16]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 shrink-0">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-sky-600 dark:text-sky-400 uppercase">
                {currentQuestion < TOTAL_QUESTIONS ? `Question ${currentQuestion + 1} of ${TOTAL_QUESTIONS}` : 'Order Ready'}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-300 font-semibold border border-sky-200/50 dark:border-sky-500/20">
                {progressPercent}% Done
              </span>
            </div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-white truncate">
              {formData.businessName || 'Business Website Onboarding'}
            </h2>
          </div>
        </div>

        {/* Quick Sample Fill Pill Menu */}
        <div className="flex items-center gap-2">
          {currentQuestion < TOTAL_QUESTIONS && (
            <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-xs">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 px-2 flex items-center gap-1">
                <Sliders className="w-3 h-3 text-sky-500" />
                Fill sample:
              </span>
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => loadPreset(p)}
                  className="px-2.5 py-1 rounded-lg text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-colors font-medium text-[11px] cursor-pointer"
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          )}

          {/* Close / Exit Button */}
          <button
            type="button"
            onClick={closeOrderModal}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
            aria-label="Exit wizard"
          >
            <span className="hidden sm:inline">Esc</span>
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Focus Area: Single Question at a Time */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 flex flex-col justify-center max-w-2xl mx-auto w-full">
        
        <AnimatePresence mode="wait">
          
          {/* QUESTION 1: Business Name */}
          {currentQuestion === 0 && (
            <motion.div
              key="q1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  01 → Business Identity
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  What is your business or shop name?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                  Write the name exactly as it appears on your storefront signboard, visiting card, or banner.
                </p>
              </div>

              <div className="space-y-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => updateField('businessName', e.target.value)}
                  placeholder="e.g. Royal Bengal Sweets / Apex Plumbing / Studio Luxe"
                  className="w-full text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white bg-transparent border-b-2 border-slate-300 dark:border-white/20 focus:border-sky-500 dark:focus:border-sky-400 py-3.5 px-1 outline-none transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-700"
                />
                {validationError && (
                  <p className="text-xs font-medium text-rose-500 mt-2 font-mono flex items-center gap-1">
                    <span>⚠</span> {validationError}
                  </p>
                )}
              </div>

              {/* Sample Shortcuts for 1-tap test */}
              <div className="pt-2">
                <p className="text-xs text-slate-400 font-mono mb-2">Or click an example to auto-fill:</p>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => loadPreset(preset)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-white/5 hover:bg-sky-50 dark:hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-300 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10 transition-colors cursor-pointer"
                    >
                      <span>{preset.icon}</span>
                      <span>{preset.data.businessName}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* QUESTION 2: Niche / Category */}
          {currentQuestion === 1 && (
            <motion.div
              key="q2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  02 → Industry & Sector
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  What type of business is it?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                  Select your primary industry category or write a custom description below.
                </p>
              </div>

              {/* Visual Selection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {NICHE_OPTIONS.map((cat) => {
                  const isSelected = formData.niche === cat.title
                  return (
                    <button
                      key={cat.title}
                      type="button"
                      onClick={() => {
                        updateField('niche', cat.title)
                        // If they select an option, auto advance smoothly
                        setTimeout(handleNext, 180)
                      }}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer select-none active:scale-95 flex flex-col justify-between h-24 ${
                        isSelected
                          ? 'border-sky-500 dark:border-sky-400 bg-sky-500/10 dark:bg-sky-500/20 shadow-md ring-2 ring-sky-500/40 text-sky-700 dark:text-white'
                          : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.03] hover:border-sky-400 dark:hover:border-sky-500 hover:bg-slate-100/60 dark:hover:bg-white/[0.06] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-xs font-semibold leading-tight">{cat.title}</span>
                    </button>
                  )
                })}
              </div>

              <div className="pt-2">
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                  Or type custom niche:
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={formData.niche}
                  onChange={(e) => updateField('niche', e.target.value)}
                  placeholder="e.g. Handmade Leather Bags / Pet Grooming Boutique"
                  className="w-full text-base sm:text-lg font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2 outline-none"
                />
                {validationError && (
                  <p className="text-xs font-medium text-rose-500 mt-2 font-mono">
                    ⚠ {validationError}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* QUESTION 3: Tagline & Motto */}
          {currentQuestion === 2 && (
            <motion.div
              key="q3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  03 → Value Proposition
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  What is your tagline or motto?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                  5 to 10 words describing what makes your shop or service special and why customers choose you.
                </p>
              </div>

              <div>
                <input
                  ref={inputRef}
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  placeholder="e.g. Authentic pure ghee sweets & heritage desserts since 1982"
                  className="w-full text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white bg-transparent border-b-2 border-slate-300 dark:border-white/20 focus:border-sky-500 dark:focus:border-sky-400 py-3.5 px-1 outline-none transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-700"
                />
              </div>

              <div className="space-y-2 pt-2">
                <p className="text-xs text-slate-400 font-mono">Click to use an example formula:</p>
                <div className="flex flex-col gap-2">
                  {[
                    'Authentic pure ghee sweets & heritage desserts since 1982',
                    '24/7 emergency leak repair & licensed master plumbing',
                    'Editorial hair artistry, organic scalp care & bridal suites',
                  ].map((sug) => (
                    <button
                      key={sug}
                      type="button"
                      onClick={() => updateField('tagline', sug)}
                      className="text-left text-xs text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300 p-2 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 hover:border-sky-400 transition-colors"
                    >
                      "{sug}"
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* QUESTION 4: Location & Operating Hours */}
          {currentQuestion === 3 && (
            <motion.div
              key="q4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  04 → Location & Availability
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Where are you located and what are your hours?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                  Helps nearby customers find you on Google Maps and know when your doors are open.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Neighborhood / City / Service Area *
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="e.g. Salt Lake Sector 1, Kolkata / Central London / Austin TX"
                    className="w-full text-lg sm:text-xl font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2.5 px-1 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Operating Hours *
                  </label>
                  <input
                    type="text"
                    value={formData.hours}
                    onChange={(e) => updateField('hours', e.target.value)}
                    placeholder="e.g. Mon–Sun: 7:30 AM – 10:00 PM / 24 Hours Emergency"
                    className="w-full text-lg sm:text-xl font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2.5 px-1 outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* QUESTION 5: Years in Business & Owner Name */}
          {currentQuestion === 4 && (
            <motion.div
              key="q5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  05 → Heritage & Leadership
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  How long have you been in business?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                  Years of experience and founder names build immediate consumer trust and conversion credibility.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-2">
                    Years in Business (Select or Type):
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {['New Business', '2+ Years', '5+ Years', '15+ Years', '40+ Years (Heritage)'].map((y) => (
                      <button
                        key={y}
                        type="button"
                        onClick={() => updateField('yearsInBusiness', y)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                          formData.yearsInBusiness === y
                            ? 'bg-sky-500 text-white border-sky-500'
                            : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-sky-400'
                        }`}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                  <input
                    ref={inputRef}
                    type="text"
                    value={formData.yearsInBusiness}
                    onChange={(e) => updateField('yearsInBusiness', e.target.value)}
                    placeholder="e.g. 42 Years (Est. 1982) / 15 Years of Experience"
                    className="w-full text-lg sm:text-xl font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2.5 px-1 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Owner or Founder Name (Optional):
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => updateField('ownerName', e.target.value)}
                    placeholder="e.g. Subhasish Ghosh / David Miller / Visible on storefront"
                    className="w-full text-base sm:text-lg font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2 px-1 outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* QUESTION 6: Phone, WhatsApp & Email */}
          {currentQuestion === 5 && (
            <motion.div
              key="q6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  06 → Customer Ordering Channels
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  How should customers contact you?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                  We integrate 1-click WhatsApp order buttons and click-to-call phone buttons with these numbers.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Phone Calling Number *
                  </label>
                  <input
                    ref={inputRef}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      updateField('phone', e.target.value)
                      if (!formData.whatsappNumber) {
                        updateField('whatsappNumber', e.target.value)
                      }
                    }}
                    placeholder="e.g. +91 98301 23456 / +1 (555) 019-2834"
                    className="w-full text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2 px-1 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    WhatsApp Ordering Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => updateField('whatsappNumber', e.target.value)}
                    placeholder="e.g. +91 98301 23456 (Leave blank if same as phone)"
                    className="w-full text-lg sm:text-xl font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2 px-1 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Official Business Email (Optional):
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="e.g. contact@royalbengalsweets.in"
                    className="w-full text-base sm:text-lg font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2 px-1 outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* QUESTION 7: Full Physical Address */}
          {currentQuestion === 6 && (
            <motion.div
              key="q7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  07 → Storefront Address
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  What is your full street address?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                  This will be placed on your website footer and linked directly to Google Maps navigation for your visitors.
                </p>
              </div>

              <div>
                <textarea
                  ref={inputRef}
                  rows={3}
                  value={formData.fullAddress}
                  onChange={(e) => updateField('fullAddress', e.target.value)}
                  placeholder="e.g. Block CF-18, Near CA Island, Sector 1, Salt Lake, Kolkata 700064"
                  className="w-full text-lg sm:text-xl font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 focus:border-sky-500 rounded-2xl p-4 outline-none transition-colors"
                />
              </div>
            </motion.div>
          )}

          {/* QUESTION 8: Products, Dishes, or Services with Pricing */}
          {currentQuestion === 7 && (
            <motion.div
              key="q8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  08 → Menu & Catalog
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  What are your top products or services?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                  Add your signature dishes, packages, or services with their price if shown.
                </p>
              </div>

              {/* Inline Item Adder */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3">
                <div className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  Add Item / Service:
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    ref={inputRef}
                    data-item-input="true"
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Item name (e.g. Baked Rasgulla 10pcs)"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-sm outline-none focus:border-sky-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddItem()
                      }
                    }}
                  />
                  <input
                    data-item-input="true"
                    type="text"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="Price (e.g. ₹220 / $120)"
                    className="w-full sm:w-36 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-sm outline-none focus:border-sky-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddItem()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {formData.items.filter((i) => i.name.trim() !== '').length === 0 ? (
                  <p className="text-xs text-slate-400 font-mono italic text-center py-4">
                    No items added yet. Type an item name and price above, or click below:
                  </p>
                ) : (
                  formData.items
                    .filter((i) => i.name.trim() !== '')
                    .map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 shadow-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span className="text-sm font-bold text-slate-800 dark:text-white">
                            {item.name}
                          </span>
                          {item.price && (
                            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-300 border border-sky-200/60 dark:border-sky-500/20">
                              {item.price}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                )}
              </div>
            </motion.div>
          )}

          {/* QUESTION 9: Distinctive Fact / Special Quality */}
          {currentQuestion === 8 && (
            <motion.div
              key="q9"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  09 → Distinctive Advantage
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  What makes your business famous or unique?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                  Third-generation heritage, special technique, family recipe, 100% organic sourcing, or 45-min arrival guarantee.
                </p>
              </div>

              <div>
                <textarea
                  ref={inputRef}
                  rows={3}
                  value={formData.distinctiveFact}
                  onChange={(e) => updateField('distinctiveFact', e.target.value)}
                  placeholder="e.g. Third-generation confectioners using 100% pure cow milk sourced directly from local dairy farms."
                  className="w-full text-lg sm:text-xl font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 focus:border-sky-500 rounded-2xl p-4 outline-none transition-colors"
                />
              </div>

              <div className="pt-1">
                <p className="text-xs text-slate-400 font-mono mb-2">Example formulas:</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    'Third-generation traditional confectioners with 100% cow milk sourcing.',
                    'Guaranteed 45-minute emergency response time with $0 dispatch fee if late.',
                    'Certified cruelty-free European vegan dyes and private VIP hair suites.',
                  ].map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => updateField('distinctiveFact', ex)}
                      className="text-left text-xs text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300 p-2 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 hover:border-sky-400 transition-colors"
                    >
                      "{ex}"
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* QUESTION 10: Color Vibe & Aesthetics */}
          {currentQuestion === 9 && (
            <motion.div
              key="q10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  10 → Branding & Color Vibe
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  What color feel fits your brand?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                  We customize the typography, buttons, and ambient backgrounds to match your chosen aesthetic.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COLOR_VIBE_OPTIONS.map((vibe) => {
                  const isSelected = formData.colorVibe.includes(vibe.title)
                  return (
                    <button
                      key={vibe.id}
                      type="button"
                      onClick={() => updateField('colorVibe', `${vibe.title} (${vibe.desc})`)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-sky-500 dark:border-sky-400 bg-sky-500/10 dark:bg-sky-500/20 shadow-md ring-2 ring-sky-500/30'
                          : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.03] hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          {vibe.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {vibe.desc}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 ml-3">
                        {vibe.swatches.map((color, cIdx) => (
                          <span
                            key={cIdx}
                            className="w-4 h-4 rounded-full border border-black/10 dark:border-white/20 shadow-xs"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="pt-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={formData.colorVibe}
                  onChange={(e) => updateField('colorVibe', e.target.value)}
                  placeholder="Or custom: e.g. Warm saffron & ivory / Deep forest green & gold"
                  className="w-full text-base sm:text-lg font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2 outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* QUESTION 11: Instagram, Photos & Special Notes (Optional) */}
          {currentQuestion === 10 && (
            <motion.div
              key="q11"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  11 → Media & Special Requirements
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Any Instagram handle, photo links, or special notes?
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                  Leave any of these blank if you don't have them yet—we can add them anytime later.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Instagram Handle (Optional):
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    value={formData.instagramHandle}
                    onChange={(e) => updateField('instagramHandle', e.target.value)}
                    placeholder="e.g. @royalbengalsweets"
                    className="w-full text-base sm:text-lg font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Storefront / Signboard Photo URL (Optional):
                  </label>
                  <input
                    type="url"
                    value={formData.heroImageUrl}
                    onChange={(e) => updateField('heroImageUrl', e.target.value)}
                    placeholder="e.g. https://... or leave blank"
                    className="w-full text-base sm:text-lg font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Other Special Features or Notes:
                  </label>
                  <input
                    type="text"
                    value={formData.otherNotes}
                    onChange={(e) => updateField('otherNotes', e.target.value)}
                    placeholder="e.g. Needs WhatsApp floating order button and Google Maps directions."
                    className="w-full text-base sm:text-lg font-medium text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-white/20 focus:border-sky-500 py-2 outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* FINAL SCREEN: Order Brief Ready & One-Click Dispatch */}
          {currentQuestion === TOTAL_QUESTIONS && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>18-POINT SPECIFICATION COMPILED</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Your Website Brief is Ready!
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal max-w-lg mx-auto">
                  Click below to dispatch your order directly to our team via WhatsApp or Email. We build and deliver your storefront in 48 hours.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={sendWhatsAppOrder}
                  className="flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-500/25 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>Send Order via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={copyBriefToClipboard}
                  className="flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/15 text-white font-bold text-sm sm:text-base border border-slate-800 dark:border-white/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 text-sky-400" />
                      <span>Copy Formatted Brief</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={sendEmailOrder}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email instead</span>
                </button>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <button
                  type="button"
                  onClick={() => setShowSummaryBrief(!showSummaryBrief)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <span>{showSummaryBrief ? 'Hide brief text' : 'View formatted text'}</span>
                  {showSummaryBrief ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Collapsible raw 18-point brief text block */}
              {showSummaryBrief && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-2xl bg-slate-950 dark:bg-[#03060E] border border-slate-800 dark:border-sky-500/20 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-60 leading-relaxed shadow-inner"
                >
                  <pre className="whitespace-pre-wrap">{finalBriefOutput}</pre>
                </motion.div>
              )}

              {/* Edit Question Jumper */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Want to modify any answer?
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentQuestion(0)}
                  className="inline-flex items-center gap-1 font-bold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Review from Question 1</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Bottom Sticky Action Bar */}
      <footer className="px-4 sm:px-8 py-3.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between shrink-0 bg-white/70 dark:bg-[#070B16]/80 backdrop-blur-xl pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:pb-3.5">
        
        {/* Back Button */}
        <div>
          {currentQuestion > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              Step-by-step storefront onboarding
            </span>
          )}
        </div>

        {/* Step Dots indicator */}
        <div className="flex items-center gap-1 hidden sm:flex">
          {Array.from({ length: TOTAL_QUESTIONS }).map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentQuestion
                  ? 'w-6 bg-sky-500'
                  : idx < currentQuestion
                  ? 'w-2 bg-emerald-500/80'
                  : 'w-1.5 bg-slate-300 dark:bg-white/15'
              }`}
            />
          ))}
        </div>

        {/* Forward Action Button */}
        <div>
          {currentQuestion < TOTAL_QUESTIONS ? (
            <div className="flex items-center gap-2">
              {/* Optional questions can be skipped */}
              {currentQuestion >= 2 && currentQuestion <= 10 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  Skip
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all cursor-pointer min-h-[44px]"
              >
                <span>Continue</span>
                <span className="hidden sm:inline font-mono text-[10px] opacity-75 font-normal">↵</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={closeOrderModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-white/10 dark:hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Done / Close</span>
            </button>
          )}
        </div>

      </footer>
    </div>
  )
}

export function BusinessOrderModal() {
  const { isOpen, closeOrderModal, initialData } = useOrderModal()

  if (!isOpen) return null

  return (
    <BusinessOrderModalContent
      key={initialData?.businessName || 'new-brief'}
      closeOrderModal={closeOrderModal}
      initialData={initialData}
    />
  )
}
