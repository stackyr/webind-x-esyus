"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, Mail, User, MessageSquare, Phone, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

const TOPICS = [
  "New Web Flagship",
  "Mobile App System",
  "Brand Identity",
  "Partnership & JV",
  "Technical Consultation",
  "Other Inquiry",
];

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultSubject,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(defaultSubject || "New Web Flagship");
  const [message, setMessage] = useState("");
  const [preferredMethod, setPreferredMethod] = useState<"Email" | "WhatsApp" | "Call">("Email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  // Update default subject if provided
  useEffect(() => {
    if (defaultSubject) {
      setSubject(defaultSubject);
    }
  }, [defaultSubject]);

  // Lock scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
        document.body.style.overflowX = "clip";
        if ((window as any).lenis) {
          (window as any).lenis.start();
        }
      };
    } else {
      document.body.style.overflow = "";
      document.body.style.overflowX = "clip";
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant secure submission
    setTimeout(() => {
      const generatedTicket = `WB-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedTicket);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleCloseAndReset = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-2xl selection:bg-[#FF384C] selection:text-white"
        style={{ overflowX: "clip" }}
      >
        {/* Soft Ambient Depth Background Glows */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[550px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(255,56,76,0.18)_0%,transparent_70%)] blur-[80px]" />
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[85vw] max-w-[500px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(0,112,255,0.12)_0%,transparent_70%)] blur-[90px]" />
        </div>

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl bg-[#090D15]/95 border border-[#1F2739] rounded-2xl sm:rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(255,56,76,0.12)] overflow-hidden my-auto"
        >
          {/* Top Decorative Horizon Laser Accent Line */}
          <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF384C]/80 via-40% to-transparent pointer-events-none" />

          {/* Modal Header */}
          <div className="relative px-5 sm:px-8 pt-6 sm:pt-7 pb-4 flex items-start justify-between border-b border-[#161D2C]">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span>Webind</span>
                  <span className="text-[#FF384C] font-light">×</span>
                  <span>Esyus</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF384C]/15 border border-[#FF384C]/35 text-[#FFA3AE] text-[10px] font-mono uppercase tracking-wider">
                  <Sparkles className="w-2.5 h-2.5 text-[#FF384C]" />
                  Direct Dialogue
                </span>
              </div>
              <h2
                id="contact-modal-title"
                className="text-xl sm:text-2xl font-light text-white tracking-tight"
              >
                Let’s build something <span className="text-white font-medium">extraordinary</span>.
              </h2>
            </div>

            {/* Circular Close Button */}
            <button
              onClick={handleCloseAndReset}
              className="p-2 sm:p-2.5 rounded-full bg-[#121722] hover:bg-[#1A2234] border border-[#20293D] hover:border-white/30 text-[#94A3B8] hover:text-white active:scale-95 transition-all cursor-pointer shadow-md"
              aria-label="Close contact modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="px-5 sm:px-8 py-5 sm:py-6">
            {isSubmitted ? (
              /* Success / Message Dispatched View */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 sm:py-8 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#FF384C]/15 border border-[#FF384C]/40 text-[#FF384C] flex items-center justify-center mb-5 shadow-[0_0_24px_rgba(255,56,76,0.35)]">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF384C] font-semibold">
                  Transmission Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1 mb-2">
                  Message Dispatched, {name || "Partner"}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md leading-relaxed mb-6">
                  Your inquiry has been assigned tracking ID:{" "}
                  <strong className="text-white font-mono">{ticketId}</strong>. A partner engineer will review your requirements and respond via {preferredMethod.toLowerCase()} within 2 hours.
                </p>

                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#FF384C] to-[#E01E37] text-white font-medium text-sm transition-all active:scale-95 shadow-[0_0_22px_rgba(255,56,76,0.5)] cursor-pointer"
                >
                  Return to Website
                </button>
              </motion.div>
            ) : (
              /* Active Contact Form */
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Topic Selector Pills */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                    Select Topic
                  </label>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {TOPICS.map((t) => {
                      const isSelected = subject === t;
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setSubject(t)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#FF384C] text-white shadow-[0_0_14px_rgba(255,56,76,0.55)] border border-[#FF384C]"
                              : "bg-[#0E131E] border border-[#20293D] text-[#8E98A8] hover:text-white hover:border-white/20"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email (2 Columns on tablet/desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                      Your Name <span className="text-[#FF384C]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3.5 w-4 h-4 text-[#64748B] pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Vance"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#0C1019] border border-[#1E273A] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#FF384C] focus:ring-1 focus:ring-[#FF384C]/40 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                      Work Email <span className="text-[#FF384C]">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3.5 w-4 h-4 text-[#64748B] pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#0C1019] border border-[#1E273A] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#FF384C] focus:ring-1 focus:ring-[#FF384C]/40 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                    How can we help? <span className="text-[#FF384C]">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your project vision, target timeline, key integrations, or architectural goals..."
                      className="w-full px-4 py-3 rounded-xl bg-[#0C1019] border border-[#1E273A] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#FF384C] focus:ring-1 focus:ring-[#FF384C]/40 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Preferred Contact Method & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-end">
                  {/* Preferred Method Radio Pills */}
                  <div>
                    <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                      Preferred Channel
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["Email", "WhatsApp", "Call"] as const).map((method) => {
                        const isSelected = preferredMethod === method;
                        return (
                          <button
                            type="button"
                            key={method}
                            onClick={() => setPreferredMethod(method)}
                            className={`py-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#141C2B] border-[#FF384C] text-white shadow-[0_0_10px_rgba(255,56,76,0.3)]"
                                : "bg-[#0C1019] border-[#1E273A] text-[#8E98A8] hover:border-white/20"
                            }`}
                          >
                            {method}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Phone / WhatsApp (Optional) */}
                  <div>
                    <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3.5 w-4 h-4 text-[#64748B] pointer-events-none" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 019-2834"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0C1019] border border-[#1E273A] text-sm text-white placeholder-[#475569] focus:outline-none focus:border-[#FF384C] focus:ring-1 focus:ring-[#FF384C]/40 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Submit Button */}
                <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#161D2C]">
                  <div className="flex items-center gap-2 text-xs text-[#64748B]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Average reply time: under 2 hours</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#FF384C] via-[#FF1E38] to-[#E01E37] hover:brightness-110 text-white font-semibold text-sm tracking-tight shadow-[0_0_22px_rgba(255,56,76,0.55)] active:scale-95 transition-all duration-150 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? "Dispatching..." : "Send Message"}</span>
                    <Send className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
