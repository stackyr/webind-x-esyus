"use client";

import React, { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, Check, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProject?: string;
}

interface OrderFormData {
  projectType: string;
  businessName: string;
  websiteUrl: string;
  industry: string;
  features: string[];
  integrations: string[];
  budget: number;
  paymentMethod: string;
  timeline: string;
  additionalNotes: string;
  name: string;
  email: string;
  phone: string;
}

const STORAGE_KEY = "webind_order_saved_draft";

const STEPS = [
  { id: 1, title: "Choose project type", subtitle: "What kind of project is planned?" },
  { id: 2, title: "Business info", subtitle: "Provide a few more details" },
  { id: 3, title: "Websites features", subtitle: "What functionality do you want?" },
  { id: 4, title: "Automations & Integrations", subtitle: "Specify your desired setup" },
  { id: 5, title: "Budget & payment", subtitle: "What kind of project is planned?" },
  { id: 6, title: "Additional info", subtitle: "What kind of project is planned?" },
  { id: 7, title: "Contact details", subtitle: "What kind of project is planned?" },
];

const DEFAULT_DATA: OrderFormData = {
  projectType: "Flagship Web & Mobile App (Webind × Esyus)",
  businessName: "",
  websiteUrl: "",
  industry: "SaaS & Technology",
  features: ["Interactive 3D / WebGL Animation", "Sub-15ms Speed & Edge Caching"],
  integrations: ["Stripe / Payment Gateway", "Custom API & Webhooks"],
  budget: 105,
  paymentMethod: "Bank transfer",
  timeline: "Standard (1 - 2 months)",
  additionalNotes: "",
  name: "",
  email: "",
  phone: "",
};

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  initialProject,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<OrderFormData>(DEFAULT_DATA);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>("");

  // Load saved draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, []);

  // Set initial project if provided
  useEffect(() => {
    if (initialProject) {
      setFormData((prev) => ({
        ...prev,
        projectType: initialProject,
        additionalNotes: prev.additionalNotes || `Inquiry for ${initialProject}`,
      }));
    }
  }, [initialProject]);

  // Save changes to localStorage
  const updateFormData = (updates: Partial<OrderFormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final submit
      const generatedOrder = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleFeature = (feat: string) => {
    const list = formData.features.includes(feat)
      ? formData.features.filter((f) => f !== feat)
      : [...formData.features, feat];
    updateFormData({ features: list });
  };

  const toggleIntegration = (item: string) => {
    const list = formData.integrations.includes(item)
      ? formData.integrations.filter((i) => i !== item)
      : [...formData.integrations, item];
    updateFormData({ integrations: list });
  };

  const handleCloseAndReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#070A0F]/96 backdrop-blur-2xl text-[#F5F7FA] selection:bg-[#0070FF] selection:text-white flex flex-col justify-between"
    >
      {/* SOFT BLUE AMBIENT GLOW ON THE RIGHT SIDE (Matching the screenshot) */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 85% 25%, rgba(0, 112, 255, 0.16) 0%, rgba(0, 80, 200, 0.08) 35%, transparent 65%)",
        }}
      />

      {/* TOP HEADER: Webind × Esyus Branding & Close Button */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-6 sm:pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Webind <span className="text-[#0070FF] font-light">×</span> Esyus
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#0070FF]/15 border border-[#0070FF]/30 text-[#38BDF8] text-[11px] font-mono">
            Project Order Portal
          </span>
        </div>

        <button
          onClick={handleCloseAndReset}
          className="p-2.5 rounded-full bg-[#121622] hover:bg-[#1A2234] border border-[#20293D] hover:border-white/30 text-[#94A3B8] hover:text-white active:scale-95 transition-all cursor-pointer"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* MOBILE STEP PROGRESS BAR (Shown only on screens < lg) */}
      <div className="relative z-10 w-full px-6 lg:hidden mb-4">
        <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-2 font-mono">
          <span className="text-[#0070FF] font-semibold">
            Step {currentStep} of {STEPS.length}
          </span>
          <span>{STEPS[currentStep - 1].title}</span>
        </div>
        <div className="w-full h-1.5 bg-[#141A26] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0070FF] transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* MAIN CONTENT AREA: 2 COLUMNS ON DESKTOP */}
      <main className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-6 sm:px-12 py-4 sm:py-8">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* ========================================================
              LEFT COLUMN: FORM QUESTIONS & INTERACTIVE CONTROLS
             ======================================================== */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {isSubmitted ? (
              /* ORDER SUCCESS / RECEIPT VIEW */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 sm:p-10 rounded-2xl bg-[#0D121C] border border-[#1E2638] shadow-2xl max-w-2xl"
              >
                <div className="w-14 h-14 rounded-full bg-[#0070FF]/15 text-[#0070FF] border border-[#0070FF]/40 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#0070FF] font-medium">
                  Order Successfully Saved & Queued
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1 mb-3">
                  Thank You, {formData.name || "Partner"}
                </h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                  Your project order specification has been securely saved under tracking ID:{" "}
                  <strong className="text-white font-mono">{orderNumber}</strong>. Our lead architectural team will review the parameters and reach out within 24 hours.
                </p>

                {/* Summary Card */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#070A0F] border border-[#1A2234] space-y-2.5 text-xs text-[#CBD5E1] mb-6">
                  <div className="flex justify-between border-b border-[#141A26] pb-2">
                    <span className="text-[#64748B]">Project Type:</span>
                    <span className="font-medium text-white">{formData.projectType}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#141A26] pb-2">
                    <span className="text-[#64748B]">Budget Range:</span>
                    <span className="font-medium text-[#0070FF]">${formData.budget}k USD</span>
                  </div>
                  <div className="flex justify-between border-b border-[#141A26] pb-2">
                    <span className="text-[#64748B]">Payment Structure:</span>
                    <span className="font-medium text-white">{formData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Contact Email:</span>
                    <span className="font-medium text-white">{formData.email || "Submitted"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCloseAndReset}
                    className="px-8 py-3 rounded-xl bg-[#0070FF] hover:bg-[#0062E0] text-white font-medium text-sm transition-all active:scale-95 shadow-[0_0_20px_rgba(0,112,255,0.4)] cursor-pointer"
                  >
                    Done / Return to Website
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ACTIVE STEP QUESTIONS */
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-2xl"
                >
                  {/* STEP 1: CHOOSE PROJECT TYPE */}
                  {currentStep === 1 && (
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
                        Choose project type
                      </h1>
                      <p className="text-sm text-[#94A3B8] mb-8 leading-relaxed">
                        What kind of digital platform, software, or web architecture is planned?
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {[
                          "Custom Website / Web Experience",
                          "Flagship Web & Mobile App (Webind × Esyus)",
                          "Headless E-Commerce Store",
                          "Interactive 3D WebGL Platform",
                          "Institutional Trading Terminal",
                          "Brand Identity & Design System",
                        ].map((type) => {
                          const isSelected = formData.projectType === type;
                          return (
                            <div
                              key={type}
                              onClick={() => updateFormData({ projectType: type })}
                              className={`p-4 rounded-xl border flex items-center gap-3.5 transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#121722] border-white/50 text-white shadow-lg shadow-[#0070FF]/10 ring-1 ring-white/20"
                                  : "bg-[#0E131E] border-[#20293D] text-[#94A3B8] hover:border-white/20 hover:text-white"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                                  isSelected
                                    ? "bg-[#0070FF] border-[#0070FF] text-white"
                                    : "border-[#3A455E] bg-[#0A0E17]"
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span className="text-xs sm:text-sm font-medium tracking-tight">
                                {type}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: BUSINESS INFO */}
                  {currentStep === 2 && (
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
                        Business info
                      </h1>
                      <p className="text-sm text-[#94A3B8] mb-8 leading-relaxed">
                        Provide a few more details about your brand, domain, and operating sector.
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                            Company or Brand Name
                          </label>
                          <input
                            type="text"
                            value={formData.businessName}
                            onChange={(e) => updateFormData({ businessName: e.target.value })}
                            placeholder="e.g. Apex Global Labs"
                            className="w-full px-4 py-3 rounded-xl bg-[#0E131E] border border-[#20293D] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#0070FF] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                            Current Website / Link (Optional)
                          </label>
                          <input
                            type="url"
                            value={formData.websiteUrl}
                            onChange={(e) => updateFormData({ websiteUrl: e.target.value })}
                            placeholder="https://yourbrand.com"
                            className="w-full px-4 py-3 rounded-xl bg-[#0E131E] border border-[#20293D] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#0070FF] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#CBD5E1] mb-2">
                            Industry / Sector
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {[
                              "SaaS & Technology",
                              "Fintech & Crypto",
                              "E-Commerce & Luxury",
                              "Healthcare & MedTech",
                              "Creative & Media",
                              "Mobility & Hardware",
                            ].map((ind) => (
                              <button
                                type="button"
                                key={ind}
                                onClick={() => updateFormData({ industry: ind })}
                                className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                                  formData.industry === ind
                                    ? "bg-[#121722] border-white/40 text-white"
                                    : "bg-[#0E131E] border-[#20293D] text-[#8E98A8] hover:border-white/20"
                                }`}
                              >
                                {ind}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: WEBSITE FEATURES */}
                  {currentStep === 3 && (
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
                        Websites features
                      </h1>
                      <p className="text-sm text-[#94A3B8] mb-8 leading-relaxed">
                        What functionality, architectural layers, and experiences do you want?
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {[
                          "Interactive 3D / WebGL Animation",
                          "Custom CMS & Admin Portal",
                          "Sub-15ms Speed & Edge Caching",
                          "User Accounts & Auth Protocol",
                          "Multi-Language Localization",
                          "Dark & Light Mode Switcher",
                          "Real-Time Data Streaming",
                          "Custom Design Token System",
                        ].map((feat) => {
                          const isSelected = formData.features.includes(feat);
                          return (
                            <div
                              key={feat}
                              onClick={() => toggleFeature(feat)}
                              className={`p-4 rounded-xl border flex items-center gap-3.5 transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#121722] border-white/50 text-white shadow-lg shadow-[#0070FF]/10 ring-1 ring-white/20"
                                  : "bg-[#0E131E] border-[#20293D] text-[#94A3B8] hover:border-white/20 hover:text-white"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                                  isSelected
                                    ? "bg-[#0070FF] border-[#0070FF] text-white"
                                    : "border-[#3A455E] bg-[#0A0E17]"
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span className="text-xs sm:text-sm font-medium tracking-tight">
                                {feat}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: AUTOMATIONS & INTEGRATIONS */}
                  {currentStep === 4 && (
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
                        Automations & Integrations
                      </h1>
                      <p className="text-sm text-[#94A3B8] mb-8 leading-relaxed">
                        Specify your desired integrations, third-party pipelines, and cloud APIs.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {[
                          "Stripe / Payment Gateway",
                          "CRM (HubSpot / Salesforce)",
                          "Email Marketing & Automations",
                          "Custom API & Webhooks",
                          "Cloud Storage & CDN (AWS / Vercel)",
                          "ERP / Inventory Sync",
                        ].map((item) => {
                          const isSelected = formData.integrations.includes(item);
                          return (
                            <div
                              key={item}
                              onClick={() => toggleIntegration(item)}
                              className={`p-4 rounded-xl border flex items-center gap-3.5 transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#121722] border-white/50 text-white shadow-lg shadow-[#0070FF]/10 ring-1 ring-white/20"
                                  : "bg-[#0E131E] border-[#20293D] text-[#94A3B8] hover:border-white/20 hover:text-white"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                                  isSelected
                                    ? "bg-[#0070FF] border-[#0070FF] text-white"
                                    : "border-[#3A455E] bg-[#0A0E17]"
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span className="text-xs sm:text-sm font-medium tracking-tight">
                                {item}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 5: BUDGET AND PAYMENT (EXACT REPLICA OF THE SCREENSHOT) */}
                  {currentStep === 5 && (
                    <div>
                      {/* Main Heading */}
                      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
                        Budget and payment
                      </h1>
                      {/* Subtitle */}
                      <p className="text-sm text-[#94A3B8] mb-8 leading-relaxed">
                        Specify your project budget range and preferred payment structure for our services.
                      </p>

                      {/* Select Project Budget Section */}
                      <div className="mb-8">
                        <label className="block text-xs font-normal text-[#E2E8F0] mb-3">
                          Select project budget
                        </label>

                        {/* Interactive Custom Range Slider Matching the Image */}
                        <div className="relative w-full max-w-lg flex items-center">
                          <input
                            type="range"
                            min="15"
                            max="250"
                            step="5"
                            value={formData.budget}
                            onChange={(e) =>
                              updateFormData({ budget: parseInt(e.target.value, 10) })
                            }
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none"
                            style={{
                              background: `linear-gradient(to right, #0070FF 0%, #0070FF ${
                                ((formData.budget - 15) / (250 - 15)) * 100
                              }%, #2A3245 ${
                                ((formData.budget - 15) / (250 - 15)) * 100
                              }%, #2A3245 100%)`,
                            }}
                          />
                        </div>

                        {/* Budget Value Display (Matching '$ 105k' in screenshot) */}
                        <div className="mt-3 text-sm font-normal text-white tracking-wide">
                          $ {formData.budget}k
                        </div>
                      </div>

                      {/* Preferred Payment Method Section */}
                      <div className="mb-10">
                        <label className="block text-xs font-normal text-[#E2E8F0] mb-3">
                          Preferred payment method
                        </label>

                        {/* 3 Horizontal Pill Cards matching the image */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg">
                          {[
                            { id: "Credit card", label: "Credit card" },
                            { id: "Bank transfer", label: "Bank transfer" },
                            { id: "Bitcoin", label: "Bitcoin" },
                          ].map((method) => {
                            const isSelected = formData.paymentMethod === method.id;
                            return (
                              <div
                                key={method.id}
                                onClick={() => updateFormData({ paymentMethod: method.id })}
                                className={`px-4 py-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#121722] border-white/40 text-white shadow-md shadow-[#0070FF]/15"
                                    : "bg-[#0E131E] border-[#20293D] text-[#8E98A8] hover:border-white/20"
                                }`}
                              >
                                {/* Circle Check Indicator */}
                                <div
                                  className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                                    isSelected
                                      ? "bg-[#0070FF] border-[#0070FF] text-white"
                                      : "border-[#3A455E] bg-[#0A0E17]"
                                  }`}
                                >
                                  {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                                <span className="text-xs sm:text-sm font-normal">
                                  {method.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 6: ADDITIONAL INFO */}
                  {currentStep === 6 && (
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
                        Additional info
                      </h1>
                      <p className="text-sm text-[#94A3B8] mb-8 leading-relaxed">
                        Specify target launch timeline and any special benchmarks or creative direction.
                      </p>

                      <div className="space-y-5 max-w-lg">
                        <div>
                          <label className="block text-xs font-medium text-[#CBD5E1] mb-2">
                            Target Launch Timeline
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {[
                              "Urgent (< 3 weeks)",
                              "Standard (1 - 2 months)",
                              "Flexible (3+ months)",
                            ].map((time) => (
                              <button
                                type="button"
                                key={time}
                                onClick={() => updateFormData({ timeline: time })}
                                className={`px-3 py-3 rounded-xl text-xs font-medium border text-center transition-all ${
                                  formData.timeline === time
                                    ? "bg-[#121722] border-white/40 text-white"
                                    : "bg-[#0E131E] border-[#20293D] text-[#8E98A8] hover:border-white/20"
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                            Project Expectations & References (Optional)
                          </label>
                          <textarea
                            rows={4}
                            value={formData.additionalNotes}
                            onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
                            placeholder="Share links to benchmark websites, branding guidelines, or technical requirements..."
                            className="w-full px-4 py-3 rounded-xl bg-[#0E131E] border border-[#20293D] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#0070FF] transition-all resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 7: CONTACT DETAILS */}
                  {currentStep === 7 && (
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
                        Contact details
                      </h1>
                      <p className="text-sm text-[#94A3B8] mb-8 leading-relaxed">
                        Where should we dispatch the executive proposal and technical architecture scope?
                      </p>

                      <div className="space-y-4 max-w-lg">
                        <div>
                          <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => updateFormData({ name: e.target.value })}
                            placeholder="e.g. Elena Vance"
                            className="w-full px-4 py-3 rounded-xl bg-[#0E131E] border border-[#20293D] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#0070FF] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => updateFormData({ email: e.target.value })}
                            placeholder="elena@company.com"
                            className="w-full px-4 py-3 rounded-xl bg-[#0E131E] border border-[#20293D] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#0070FF] transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                            Phone / WhatsApp (Optional)
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateFormData({ phone: e.target.value })}
                            placeholder="+1 (555) 019-2834"
                            className="w-full px-4 py-3 rounded-xl bg-[#0E131E] border border-[#20293D] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#0070FF] transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NAVIGATION BUTTONS (Matching `[ ← ]` and `[ Next step ]` from the image!) */}
                  <div className="flex items-center gap-3 pt-6 sm:pt-8">
                    {/* Back Arrow Button (hidden on step 1) */}
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="h-11 w-14 rounded-xl bg-[#141A24] border border-[#20293D] hover:border-white/30 text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
                        aria-label="Previous step"
                      >
                        <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
                      </button>
                    )}

                    {/* Primary Next / Submit Button */}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="h-11 px-7 rounded-xl bg-[#0070FF] hover:bg-[#0062E0] text-white text-sm font-medium tracking-tight shadow-[0_0_20px_rgba(0,112,255,0.4)] hover:shadow-[0_0_28px_rgba(0,112,255,0.65)] active:scale-95 transition-all duration-150 cursor-pointer flex items-center gap-2"
                    >
                      <span>{currentStep === 7 ? "Submit order" : "Next step"}</span>
                      {currentStep === 7 && <ArrowRight className="w-4 h-4 stroke-[2.2]" />}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* ========================================================
              RIGHT COLUMN: VERTICAL STEP PROGRESSION (EXACT TO IMAGE)
             ======================================================== */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-start pl-6 lg:pl-10">
            <div className="relative flex flex-col space-y-6">
              {/* Continuous Vertical Track Line */}
              <div className="absolute top-4 bottom-4 left-4 w-[2px] bg-[#141A26] -translate-x-1/2 z-0" />
              
              {/* Active Blue Connecting Track through completed steps */}
              <div
                className="absolute top-4 left-4 w-[2px] bg-[#0070FF] -translate-x-1/2 z-0 transition-all duration-300"
                style={{
                  height: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
                }}
              />

              {/* 7 Vertical Step Nodes */}
              {STEPS.map((step) => {
                const isCurrent = step.id === currentStep;
                const isPast = step.id < currentStep;

                return (
                  <div
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className="relative z-10 flex items-start gap-3.5 group cursor-pointer"
                  >
                    {/* Number Circle */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs font-semibold shrink-0 transition-all duration-200 ${
                        isCurrent
                          ? "bg-[#0070FF] text-white shadow-[0_0_15px_rgba(0,112,255,0.8)] ring-4 ring-[#0070FF]/25"
                          : isPast
                          ? "bg-[#0070FF] text-white"
                          : "bg-[#0E131E] border border-[#20293D] text-[#64748B] group-hover:border-white/30 group-hover:text-white"
                      }`}
                    >
                      {step.id}
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="flex flex-col pt-0.5">
                      <span
                        className={`text-sm font-medium tracking-tight transition-colors ${
                          isCurrent
                            ? "text-white font-semibold"
                            : isPast
                            ? "text-[#E2E8F0]"
                            : "text-[#64748B] group-hover:text-[#94A3B8]"
                        }`}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`text-xs mt-0.5 transition-colors ${
                          isCurrent
                            ? "text-[#94A3B8]"
                            : isPast
                            ? "text-[#64748B]"
                            : "text-[#475569]"
                        }`}
                      >
                        {step.subtitle}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER BAR: Autosave Status indicator */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 py-4 flex items-center justify-between text-xs text-[#64748B] border-t border-[#121622]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Form progress is auto-saved locally in real-time</span>
        </div>
        <div>
          <span>Webind × Esyus Engine // 2026</span>
        </div>
      </footer>
    </div>
  );
};
