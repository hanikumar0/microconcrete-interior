import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Award, CheckCircle, ArrowRight, Loader2, Send, Clock, Sliders } from 'lucide-react';
import { useLead } from '../context/LeadContext.jsx';
import { validateLead } from '../utils/validation.js';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  projectScope: '',
  timeline: '',
  budgetRange: '',
  message: ''
};

const scopes = ['Residential', 'Commercial', 'Furniture'];
const timelines = ['Immediately', '0-3 months', '3-6 months', '6+ months'];
const budgets = ['$10k-$25k', '$25k-$50k', '$50k-$100k', '$100k+'];

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [successData, setSuccessData] = useState(null);
  
  const { status, serverErrors, sendLead, resetLeadState } = useLead();
  const errors = useMemo(() => validateLead(values), [values]);
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([field]) => touched[field] || submitted)
  );
  const isInvalid = Object.keys(errors).length > 0;

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    resetLeadState();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (isInvalid) return;

    try {
      const response = await sendLead(values);
      if (response && response.success) {
        setSuccessData(response.data);
      } else {
        // Fallback score if backend response is structured differently
        setSuccessData({ leadScore: 65 });
      }
      setValues(initialValues);
      setTouched({});
      setSubmitted(false);
    } catch (err) {
      console.error('Lead submission caught exception', err);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-concrete text-ink pb-20">
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="max-w-4xl mb-12">
          <span className="eyebrow">Studio Bookings</span>
          <h1 className="text-shine font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Inquire for physical curation.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-ink/80 max-w-3xl font-body">
            Each project undergoes an automated fit evaluation based on timeline, budget, and scope. This allows our artisans to prioritize site audits and sample delivery.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] items-start mt-6">
          {/* Studio Details Column */}
          <div className="flex flex-col gap-10">
            <div className="p-8 rounded-xl bg-white/40 border border-charcoal/10 shadow-sm flex flex-col gap-6">
              <h3 className="font-display text-2xl font-bold text-charcoal">Atelier Information</h3>
              <div className="flex gap-4 items-start text-sm">
                <MapPin className="text-sienna shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="block text-charcoal mb-0.5">Physical Atelier</strong>
                  <span className="text-ink/70">8420 Arts District Plaza, Block C<br />Los Angeles, CA 90013</span>
                </div>
              </div>

              <div className="flex gap-4 items-start text-sm border-t border-charcoal/10 pt-4">
                <Mail className="text-sienna shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="block text-charcoal mb-0.5">Studio Inquiries</strong>
                  <span className="text-ink/70">commissions@atelier-microcrete.com</span>
                </div>
              </div>

              <div className="flex gap-4 items-start text-sm border-t border-charcoal/10 pt-4">
                <Phone className="text-sienna shrink-0 mt-0.5" size={18} />
                <div>
                  <strong className="block text-charcoal mb-0.5">Telephone</strong>
                  <span className="text-ink/70">+1 (213) 555-8941</span>
                </div>
              </div>
            </div>

            {/* Visual Process Timeline */}
            <div className="p-8 rounded-xl bg-charcoal text-white flex flex-col gap-6">
              <h3 className="font-display text-xl font-bold text-brass flex items-center gap-2">
                <Award size={18} /> Verification Pipeline
              </h3>
              <div className="space-y-6 text-sm">
                <div className="flex gap-4 items-start">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brass text-charcoal text-xs font-bold">1</div>
                  <div>
                    <strong className="block text-white mb-0.5">Brief Ingestion & Scoring</strong>
                    <span className="text-white/60 text-xs">Our system logs your substrate, budget, and timing.</span>
                  </div>
                </div>
                <div className="flex gap-4 items-start border-t border-white/10 pt-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brass text-charcoal text-xs font-bold">2</div>
                  <div>
                    <strong className="block text-white mb-0.5">Sample Curation</strong>
                    <span className="text-white/60 text-xs">High-fit briefs receive custom cured physical board samples sent via express courier.</span>
                  </div>
                </div>
                <div className="flex gap-4 items-start border-t border-white/10 pt-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brass text-charcoal text-xs font-bold">3</div>
                  <div>
                    <strong className="block text-white mb-0.5">Site Suitability Review</strong>
                    <span className="text-white/60 text-xs">Artisans visit your site to run moisture tests and verify subfloor hardness indices.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {successData ? (
                <motion.div
                  key="success-box"
                  className="glass-card rounded-xl bg-charcoal text-white p-8 border border-white/10 flex flex-col justify-between min-h-[500px]"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="text-center py-6">
                    <CheckCircle className="mx-auto text-brass mb-4 animate-bounce" size={48} />
                    <span className="eyebrow text-brass">Inquiry Registered</span>
                    <h2 className="font-display text-2xl font-bold md:text-3xl text-white mt-2">
                      Brief cataloged successfully.
                    </h2>
                    <p className="text-sm text-white/50 mt-2 max-w-md mx-auto font-body">
                      Your parameters have been logged in the studio database under ID: <code className="text-brass bg-white/5 px-2.5 py-0.5 rounded text-xs">{successData.id || 'Pending'}</code>
                    </p>
                  </div>

                  {/* Priority score display */}
                  <div className="my-8 p-6 bg-white/5 border border-white/10 rounded-xl max-w-xl mx-auto w-full text-center flex flex-col md:flex-row md:items-center md:text-left gap-6 justify-center">
                    <div className="relative shrink-0 mx-auto md:mx-0 flex items-center justify-center h-24 w-24 rounded-full border-4 border-brass bg-brass/5">
                      <div className="text-center">
                        <span className="block font-display text-2xl font-bold text-white">{successData.leadScore || 65}</span>
                        <span className="text-[10px] text-white/40 uppercase font-semibold">Fit Rating</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-white text-base mb-1.5 flex items-center gap-2">
                        <Clock size={16} className="text-brass" />
                        {successData.leadScore >= 75 ? 'High-Fit Priority Level' : 'Standard Suitability Review'}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed font-body">
                        {successData.leadScore >= 75
                          ? 'Excellent fit. Your parameters align with our core specialized residential and commercial systems. A lead artisan designer is curating concrete sample boards to mail to your address, and will call you within 24 hours.'
                          : 'Valid submission. An inquiry specialist is running validation on your timber/concrete preparation details and will contact you via email with our complete architectural specifications within 2-3 business days.'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSuccessData(null)}
                    className="button-primary w-full justify-center md:w-auto mt-4 self-center"
                  >
                    Submit Another Brief
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="glass-card rounded-xl bg-charcoal text-white p-8 border border-white/10 flex flex-col gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">Private Commission Brief</h3>
                    <p className="text-xs text-white/60 font-body">
                      Fill out all fields carefully. Project scope and timeline details will scale the estimated suitability calculations.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <label className="field-label">
                      <span>Name</span>
                      <input
                        className="field-input"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={updateField}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        placeholder="Johnathan Doe"
                        aria-invalid={Boolean(visibleErrors.name)}
                      />
                      {visibleErrors.name && <small className="field-error text-xs">{visibleErrors.name}</small>}
                    </label>

                    {/* Email */}
                    <label className="field-label">
                      <span>Email</span>
                      <input
                        className="field-input"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={updateField}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        placeholder="john@example.com"
                        aria-invalid={Boolean(visibleErrors.email)}
                      />
                      {visibleErrors.email && <small className="field-error text-xs">{visibleErrors.email}</small>}
                    </label>

                    {/* Phone */}
                    <label className="field-label">
                      <span>Phone Number</span>
                      <input
                        className="field-input"
                        name="phone"
                        type="tel"
                        value={values.phone}
                        onChange={updateField}
                        onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                        placeholder="213-555-8941"
                        aria-invalid={Boolean(visibleErrors.phone)}
                      />
                      {visibleErrors.phone && <small className="field-error text-xs">{visibleErrors.phone}</small>}
                    </label>

                    {/* Project Scope */}
                    <label className="field-label">
                      <span>Project Scope</span>
                      <select
                        className="field-input"
                        name="projectScope"
                        value={values.projectScope}
                        onChange={updateField}
                        onBlur={() => setTouched((t) => ({ ...t, projectScope: true }))}
                        aria-invalid={Boolean(visibleErrors.projectScope)}
                      >
                        <option value="">Select scope</option>
                        {scopes.map((scope) => (
                          <option key={scope} value={scope}>{scope}</option>
                        ))}
                      </select>
                      {visibleErrors.projectScope && <small className="field-error text-xs">{visibleErrors.projectScope}</small>}
                    </label>

                    {/* Timeline */}
                    <label className="field-label">
                      <span>Expected Timeline</span>
                      <select
                        className="field-input"
                        name="timeline"
                        value={values.timeline}
                        onChange={updateField}
                        onBlur={() => setTouched((t) => ({ ...t, timeline: true }))}
                        aria-invalid={Boolean(visibleErrors.timeline)}
                      >
                        <option value="">Select timing</option>
                        {timelines.map((timeline) => (
                          <option key={timeline} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                      {visibleErrors.timeline && <small className="field-error text-xs">{visibleErrors.timeline}</small>}
                    </label>

                    {/* Budget */}
                    <label className="field-label">
                      <span>Budget Range</span>
                      <select
                        className="field-input"
                        name="budgetRange"
                        value={values.budgetRange}
                        onChange={updateField}
                        onBlur={() => setTouched((t) => ({ ...t, budgetRange: true }))}
                        aria-invalid={Boolean(visibleErrors.budgetRange)}
                      >
                        <option value="">Select budget</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                      {visibleErrors.budgetRange && <small className="field-error text-xs">{visibleErrors.budgetRange}</small>}
                    </label>
                  </div>

                  {/* Notes */}
                  <label className="field-label">
                    <span>Specific Project Details</span>
                    <textarea
                      name="message"
                      value={values.message}
                      onChange={updateField}
                      rows="4"
                      className="field-input resize-none"
                      placeholder="Indicate your substrate type (screed, tile, timber) and preferred colors..."
                    />
                  </label>

                  {/* Server Validation Warnings */}
                  {serverErrors.length > 0 && (
                    <div className="rounded-md border border-red-300/50 bg-red-500/10 p-4 text-xs text-red-100" role="alert">
                      {serverErrors.map((error, idx) => (
                        <p key={idx}>{error.message || error}</p>
                      ))}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    className="button-primary w-full justify-center mt-2"
                    type="submit"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="animate-spin" size={16} /> Evaluating Fit...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Submit Commission Brief
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
