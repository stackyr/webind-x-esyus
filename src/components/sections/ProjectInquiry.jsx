import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import confetti from 'canvas-confetti'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
  Mail,
  MessageSquare,
  AlertCircle,
  Send,
  RotateCcw,
} from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { INQUIRY_OPTIONS, BRAND_CONFIG } from '../../data/siteData'

export function ProjectInquiry({ preselectedService }) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5 // Step 1: Service, 2: Details, 3: Planning, 4: Contact, 5: Review & Submit
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  // Form State
  const [formData, setFormData] = useState({
    service: preselectedService || 'website',
    projectName: '',
    projectDescription: '',
    requiredFeatures: '',
    referenceUrl: '',
    budget: 'tier-2',
    timeline: 'standard',
    additionalRequirements: '',
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    contactMethod: 'email',
  })

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  // Validation logic per step
  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.service) {
        newErrors.service = 'Please select a primary service.'
      }
    } else if (step === 2) {
      if (!formData.projectName.trim()) {
        newErrors.projectName = 'Project or business name is required.'
      }
      if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 15) {
        newErrors.projectDescription = 'Please provide a short description (at least 15 characters).'
      }
    } else if (step === 3) {
      if (!formData.budget) {
        newErrors.budget = 'Please select an estimated budget range.'
      }
      if (!formData.timeline) {
        newErrors.timeline = 'Please select a preferred timeline.'
      }
    } else if (step === 4) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required.'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.'
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone or WhatsApp number is required for direct correspondence.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
      const inquiryEl = document.querySelector('#inquiry')
      if (inquiryEl) {
        if (window.__lenis) {
          window.__lenis.scrollTo(inquiryEl, {
            offset: -85,
            duration: 1.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
          })
        } else {
          window.scrollTo({
            top: inquiryEl.offsetTop - 85,
            behavior: 'smooth',
          })
        }
      }
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleFinalSubmit = (e) => {
    e.preventDefault()
    if (!validateStep(4)) {
      setCurrentStep(4)
      return
    }

    // Persist inquiry locally in browser storage
    try {
      const existing = JSON.parse(localStorage.getItem('webind_esyus_inquiries') || '[]')
      const payload = {
        id: `inq_${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...formData,
      }
      existing.push(payload)
      localStorage.setItem('webind_esyus_inquiries', JSON.stringify(existing))
    } catch {
      // storage fallback
    }

    setSubmitted(true)
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      })
    } catch {
      // confetti fallback
    }
  }

  // Pre-formatted messages for WhatsApp and Email
  const selectedServiceObj = INQUIRY_OPTIONS.services.find((s) => s.id === formData.service)
  const selectedBudgetObj = INQUIRY_OPTIONS.budgets.find((b) => b.id === formData.budget)
  const selectedTimelineObj = INQUIRY_OPTIONS.timelines.find((t) => t.id === formData.timeline)

  const summaryText = `*PROJECT INQUIRY — WEBIND × ESYUS*
• Client: ${formData.fullName} (${formData.businessName || 'N/A'})
• Contact: ${formData.email} | ${formData.phone}
• Preferred Method: ${formData.contactMethod}
• Service: ${selectedServiceObj?.label || formData.service}
• Project Name: ${formData.projectName}
• Description: ${formData.projectDescription}
• Required Features: ${formData.requiredFeatures || 'To be scoped during discovery'}
• Reference URL: ${formData.referenceUrl || 'None'}
• Budget: ${selectedBudgetObj?.label || formData.budget}
• Timeline: ${selectedTimelineObj?.label || formData.timeline}
• Additional Notes: ${formData.additionalRequirements || 'None'}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summaryText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const mailtoUrl = `mailto:${BRAND_CONFIG.contact.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${formData.projectName} (${selectedServiceObj?.label || 'Digital Project'})`
  )}&body=${encodeURIComponent(summaryText)}`

  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    summaryText
  )}`

  return (
    <section id="inquiry" className="py-24 sm:py-32 relative overflow-hidden">
      <Container size="default">
        
        {/* Section Header */}
        <SectionHeader
          eyebrow="Initiate Engagement"
          title="Start a project."
          highlight="Step-by-step clarity."
          description="Tell us about your objectives. We will review your scope and follow up with a concrete architecture proposal and milestone roadmap within 24 business hours."
        />

        {/* Main Wizard Card with Liquid Glass Styling and Scroll Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="liquid-card border border-slate-200/80 dark:border-white/12 dark:bg-[#0B101E]/95 dark:shadow-2xl dark:shadow-black/70 p-4 sm:p-10 rounded-3xl"
        >
          
          {/* Progress Bar & Step Indicators */}
          {!submitted && (
            <div className="mb-8 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">
                  STEP 0{currentStep} OF 0{totalSteps}
                </span>
                <span className="text-sky-600 dark:text-sky-400 font-medium">
                  {currentStep === 1 && 'Select Service'}
                  {currentStep === 2 && 'Project Scope & Features'}
                  {currentStep === 3 && 'Planning & Budget'}
                  {currentStep === 4 && 'Contact Information'}
                  {currentStep === 5 && 'Review & Dispatch'}
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out shadow-sm shadow-sky-500/30"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Content Steps */}
          {submitted ? (
            /* Truthful Submission State */
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 text-center space-y-6"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-500 flex items-center justify-center border border-emerald-500/20 dark:border-emerald-500/30 shadow-lg">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Inquiry Prepared & Saved Locally
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your project dossier for <strong className="text-slate-900 dark:text-white">{formData.projectName}</strong> is validated and stored in your browser session.
                </p>
                <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200/60 dark:border-sky-500/30 text-xs text-sky-800 dark:text-sky-200 text-left">
                  <strong className="font-semibold block mb-1">Direct Transmission:</strong>
                  Because this client interface operates without third-party email trackers, choose your preferred method below to dispatch your pre-formatted project scope instantly to our team.
                </div>
              </div>

              {/* Direct Dispatch Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>

                <a
                  href={mailtoUrl}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email</span>
                </a>

                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 dark:border-white/15 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied Scope!' : 'Copy Summary'}</span>
                </button>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setCurrentStep(1)
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start another inquiry</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div>
              <AnimatePresence mode="wait">
                
                {/* STEP 1: SERVICE SELECTION */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        What type of project are you planning?
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Select the primary offering that best fits your initial scope.
                      </p>
                    </div>

                    {errors.service && (
                      <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errors.service}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {INQUIRY_OPTIONS.services.map((srv) => (
                        <div
                          key={srv.id}
                          onClick={() => updateField('service', srv.id)}
                          className={`p-4.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            formData.service === srv.id
                              ? 'bg-sky-50/80 dark:bg-sky-950/50 border-sky-500 dark:border-sky-400 ring-2 ring-sky-500/30 dark:shadow-lg dark:shadow-sky-500/10'
                              : 'bg-white/50 dark:bg-[#070B14]/80 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 dark:hover:bg-[#0E1528]'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                              {srv.label}
                            </span>
                            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-white/5 font-semibold">
                              {srv.partner}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {srv.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: PROJECT DETAILS */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Tell us about the project
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Help us understand your core goals and requirements.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                          Project or Business Name *
                        </label>
                        <input
                          type="text"
                          value={formData.projectName}
                          onChange={(e) => updateField('projectName', e.target.value)}
                          placeholder="e.g. Acme Health Portal, Orion Brand Redesign"
                          className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-[#060A14] border text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                            errors.projectName ? 'border-rose-500' : 'border-slate-200/80 dark:border-white/12'
                          }`}
                        />
                        {errors.projectName && (
                          <p className="text-xs text-rose-500 mt-1">{errors.projectName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                          Short Project Description *
                        </label>
                        <textarea
                          rows={3}
                          value={formData.projectDescription}
                          onChange={(e) => updateField('projectDescription', e.target.value)}
                          placeholder="What problem does this solve, who are the target users, and what is your primary commercial goal?"
                          className={`w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-[#060A14] border text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                            errors.projectDescription ? 'border-rose-500' : 'border-slate-200/80 dark:border-white/12'
                          }`}
                        />
                        {errors.projectDescription && (
                          <p className="text-xs text-rose-500 mt-1">{errors.projectDescription}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Key Features (Optional)
                          </label>
                          <input
                            type="text"
                            value={formData.requiredFeatures}
                            onChange={(e) => updateField('requiredFeatures', e.target.value)}
                            placeholder="e.g. Stripe checkout, Auth0, iOS app"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/70 dark:bg-[#060A14] border border-slate-200/80 dark:border-white/12 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                            Reference or Current URL (Optional)
                          </label>
                          <input
                            type="text"
                            value={formData.referenceUrl}
                            onChange={(e) => updateField('referenceUrl', e.target.value)}
                            placeholder="https://yourcompany.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/70 dark:bg-[#060A14] border border-slate-200/80 dark:border-white/12 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PLANNING & BUDGET */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Budget & Preferred Timeline
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Helps us tailor an achievable milestone roadmap.
                      </p>
                    </div>

                    {/* Budget Tiers */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Estimated Budget Range *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {INQUIRY_OPTIONS.budgets.map((b) => (
                          <div
                            key={b.id}
                            onClick={() => updateField('budget', b.id)}
                            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                              formData.budget === b.id
                                ? 'bg-sky-50/80 dark:bg-sky-950/50 border-sky-500 dark:border-sky-400 ring-2 ring-sky-500/30'
                                : 'bg-white/50 dark:bg-[#070B14]/80 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 dark:hover:bg-[#0E1528]'
                            }`}
                          >
                            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                              {b.label}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {b.detail}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Options */}
                    <div className="space-y-2 pt-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Preferred Launch Horizon *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {INQUIRY_OPTIONS.timelines.map((t) => (
                          <div
                            key={t.id}
                            onClick={() => updateField('timeline', t.id)}
                            className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                              formData.timeline === t.id
                                ? 'bg-sky-50/80 dark:bg-sky-950/50 border-sky-500 dark:border-sky-400 ring-2 ring-sky-500/30'
                                : 'bg-white/50 dark:bg-[#070B14]/80 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 dark:hover:bg-[#0E1528]'
                            }`}
                          >
                            <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                              {t.label}
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              {t.badge}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Additional Requirements or Technical Constraints (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.additionalRequirements}
                        onChange={(e) => updateField('additionalRequirements', e.target.value)}
                        placeholder="e.g. Existing PostgreSQL database, AWS hosting required, strict launch date"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/70 dark:bg-[#060A14] border border-slate-200/80 dark:border-white/12 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: CONTACT INFORMATION */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Your Contact Information
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Where should we send the technical proposal and milestone estimate?
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          placeholder="Jane Doe"
                          className={`w-full px-4 py-2.5 rounded-xl bg-white/70 dark:bg-[#060A14] border text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                            errors.fullName ? 'border-rose-500' : 'border-slate-200/80 dark:border-white/12'
                          }`}
                        />
                        {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                          Business / Company Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => updateField('businessName', e.target.value)}
                          placeholder="Acme Innovations Inc."
                          className="w-full px-4 py-2.5 rounded-xl bg-white/70 dark:bg-[#060A14] border border-slate-200/80 dark:border-white/12 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="jane@company.com"
                          className={`w-full px-4 py-2.5 rounded-xl bg-white/70 dark:bg-[#060A14] border text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                            errors.email ? 'border-rose-500' : 'border-slate-200/80 dark:border-white/12'
                          }`}
                        />
                        {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                          Phone or WhatsApp *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="+1 (555) 019-2834"
                          className={`w-full px-4 py-2.5 rounded-xl bg-white/70 dark:bg-[#060A14] border text-slate-900 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
                            errors.phone ? 'border-rose-500' : 'border-slate-200/80 dark:border-white/12'
                          }`}
                        />
                        {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Preferred Contact Method
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {INQUIRY_OPTIONS.contactMethods.map((cm) => (
                          <div
                            key={cm.id}
                            onClick={() => updateField('contactMethod', cm.id)}
                            className={`p-2.5 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                              formData.contactMethod === cm.id
                                ? 'bg-sky-50/80 dark:bg-sky-950/50 border-sky-500 dark:border-sky-400 text-sky-700 dark:text-sky-300 font-semibold ring-1 ring-sky-500/30'
                                : 'bg-white/50 dark:bg-[#070B14]/80 border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:dark:bg-[#0E1528]'
                            }`}
                          >
                            {cm.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: REVIEW BEFORE DISPATCH */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Review Your Project Dossier
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Confirm your parameters before generating the inquiry package.
                      </p>
                    </div>

                    {/* Summary Card with edit shortcuts */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#060A14] border border-slate-200/80 dark:border-white/12 space-y-4 text-xs sm:text-sm">
                      
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/10">
                        <span className="font-semibold text-slate-900 dark:text-white">Service Selected</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sky-600 dark:text-sky-400 font-mono font-medium">
                            {selectedServiceObj?.label} ({selectedServiceObj?.partner})
                          </span>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white underline cursor-pointer text-xs"
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start justify-between pb-2 border-b border-slate-200/60 dark:border-white/10">
                        <span className="font-semibold text-slate-900 dark:text-white">Project Scope</span>
                        <div className="text-right space-y-0.5">
                          <div className="font-medium text-slate-800 dark:text-slate-200">
                            {formData.projectName}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 max-w-xs truncate">
                            {formData.projectDescription}
                          </div>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white underline cursor-pointer text-xs block ml-auto pt-0.5"
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/10">
                        <span className="font-semibold text-slate-900 dark:text-white">Planning Horizon</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-800 dark:text-slate-200 font-mono">
                            {selectedBudgetObj?.label} · {selectedTimelineObj?.label}
                          </span>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white underline cursor-pointer text-xs"
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-white">Contact Info</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-800 dark:text-slate-200">
                            {formData.fullName} ({formData.email})
                          </span>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(4)}
                            className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white underline cursor-pointer text-xs"
                          >
                            Edit
                          </button>
                        </div>
                      </div>

                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-[#070B14] border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300">
                      🔒 <strong className="text-slate-800 dark:text-slate-100">Zero Spam Guarantee:</strong> Your information is used strictly to prepare your technical scoping proposal.
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Navigation Controls: Back & Continue */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                {currentStep > 1 ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={ArrowLeft}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                ) : (
                  <span />
                )}

                {currentStep < totalSteps ? (
                  <Button
                    variant="primary"
                    size="md"
                    rightIcon={ArrowRight}
                    onClick={handleNext}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    variant="accent"
                    size="md"
                    rightIcon={Send}
                    onClick={handleFinalSubmit}
                  >
                    Confirm & Prepare Scope
                  </Button>
                )}
              </div>
            </div>
          )}

        </motion.div>

      </Container>
    </section>
  )
}
