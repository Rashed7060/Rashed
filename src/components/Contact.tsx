import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check, Copy, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';
import { CONTACT_DATA } from '../data/portfolioData';

const PROJECT_OPTIONS = [
  'WordPress Website Development',
  'WooCommerce Ecommerce Store',
  'SEO & Search Engine Optimization',
  'Website Speed & Core Web Vitals',
  'AI Integration & Automation',
  'Custom Web Development & Redesign',
  'Other Consultation',
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: PROJECT_OPTIONS[0],
    budget: 'To be discussed',
    message: '',
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanPhone = CONTACT_DATA.phone.replace(/[^0-9]/g, '');

    const whatsappMessage = 
`*New Project Inquiry from Portfolio* 🚀

👤 *Name:* ${formData.name.trim()}
📧 *Email:* ${formData.email.trim()}
💼 *Service Needed:* ${formData.service}
💰 *Estimated Budget:* ${formData.budget}

📝 *Project Overview / Message:*
${formData.message.trim()}

------------------------------
Sent to Md Rashidul Islam (${CONTACT_DATA.phone})`;

    const encodedText = encodeURIComponent(whatsappMessage);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    setWhatsappLink(waUrl);

    // Automatically open WhatsApp in a new tab or WhatsApp app
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.log('Popup blocked or redirected');
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      // Keep state clear after some time, but keep link ready
    }, 400);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--primary-color)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#171923] dark:text-white">
            Let's <span className="text-[#FF8500]">Work Together</span>
          </h2>
          <p className="text-base sm:text-lg text-[#606575] dark:text-[#9EA3B0]">
            Have a project in mind or need assistance with SEO, AI website development, or digital solutions? Send a message and let's bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            
            <div className="bg-white dark:bg-[#1A1D27] rounded-3xl p-6 sm:p-7 border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm space-y-6">
              <h3 className="font-heading text-xl font-bold text-[#171923] dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#FF8500]" />
                <span>Contact Details</span>
              </h3>

              {/* Email Card */}
              <div className="flex items-start justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-[#E8EAF0] dark:border-[#2D3748]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF8500] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#606575] dark:text-[#9EA3B0]">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${CONTACT_DATA.email}`}
                      className="block text-sm font-semibold text-[#171923] dark:text-white hover:text-[#FF8500] transition-colors break-all"
                    >
                      {CONTACT_DATA.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(CONTACT_DATA.email, 'email')}
                  className="p-2 rounded-lg text-slate-400 hover:text-[#FF8500] hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="flex items-start justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-[#E8EAF0] dark:border-[#2D3748]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF8500] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-[#606575] dark:text-[#9EA3B0]">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${CONTACT_DATA.phone}`}
                      className="block text-sm font-semibold text-[#171923] dark:text-white hover:text-[#FF8500] transition-colors"
                    >
                      {CONTACT_DATA.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(CONTACT_DATA.phone, 'phone')}
                  className="p-2 rounded-lg text-slate-400 hover:text-[#FF8500] hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Copy phone number"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-[#E8EAF0] dark:border-[#2D3748]">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF8500] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#606575] dark:text-[#9EA3B0]">Location</span>
                  <p className="text-sm font-semibold text-[#171923] dark:text-white">
                    {CONTACT_DATA.location}
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-[#E8EAF0] dark:border-[#2D3748]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#606575] dark:text-[#9EA3B0]">Working Status</span>
                  <p className="text-sm font-semibold text-[#171923] dark:text-white">
                    {CONTACT_DATA.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* Micro reassurance note */}
            <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-orange-950/25 border border-orange-200/60 dark:border-orange-500/20 text-xs text-[#606575] dark:text-[#9EA3B0]">
              💡 <strong>Quick Response Guarantee:</strong> Typical response time is under 12 hours. We can also schedule a free 15-minute video consultation to discuss your project requirements.
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#1A1D27] rounded-3xl p-6 sm:p-8 border border-[#E8EAF0] dark:border-[#2D3748] shadow-sm">
              
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#171923] dark:text-white">
                  Send a Project Message
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  WhatsApp Connected
                </span>
              </div>
              <p className="text-sm text-[#606575] dark:text-[#9EA3B0] mb-6">
                Fill in your project overview below. When you send, it directly opens WhatsApp to <strong>{CONTACT_DATA.phone}</strong> with your message pre-formatted.
              </p>

              {submitted && (
                <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-100 text-sm space-y-3 animate-fade-in shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-base text-emerald-800 dark:text-emerald-200">
                        WhatsApp Message Prepared!
                      </div>
                      <div className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 mt-0.5">
                        Your project inquiry has been formatted for <strong>Md Rashidul Islam ({CONTACT_DATA.phone})</strong>. If WhatsApp did not open automatically, click below:
                      </div>
                    </div>
                  </div>
                  {whatsappLink && (
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20BD5A] shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open Chat in WhatsApp Directly</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Interested In */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                      Service Needed
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent transition-all"
                    >
                      {PROJECT_OPTIONS.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent transition-all"
                    >
                      <option value="To be discussed">To be discussed</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#171923] dark:text-white">
                    Project Overview / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, goals, and any specific deadlines..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[#E8EAF0] dark:border-[#2D3748] text-sm text-[#171923] dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF8500] focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit Button & WhatsApp Quick Link */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#25D366] via-emerald-600 to-[#128C7E] hover:from-[#20BD5A] hover:to-[#0E7A6E] shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/35 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4" />
                        <span>Send Project Message via WhatsApp</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#606575] dark:text-[#9EA3B0]">
                    <span>Or direct WhatsApp SMS:</span>
                    <a
                      href={`https://wa.me/${CONTACT_DATA.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>{CONTACT_DATA.phone}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
