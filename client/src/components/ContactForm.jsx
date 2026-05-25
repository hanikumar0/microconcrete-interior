import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
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

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { status, serverErrors, sendLead, resetLeadState } = useLead();

  const errors = useMemo(() => validateLead(values), [values]);
  const visibleErrors = Object.fromEntries(Object.entries(errors).filter(([field]) => touched[field] || submitted));
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
      await sendLead(values);
      setValues(initialValues);
      setTouched({});
      setSubmitted(false);
    } catch {
      // Server errors are rendered without clearing the form.
    }
  };

  return (
    <motion.form
      className="glass-card"
      onSubmit={handleSubmit}
      noValidate
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div>
        <p className="eyebrow">Private consultation</p>
        <h2 className="font-display text-3xl font-bold text-white md:text-4xl">Start with scope, timing, and surface ambition.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" value={values.name} onChange={updateField} onBlur={() => setTouched((t) => ({ ...t, name: true }))} error={visibleErrors.name} />
        <Field label="Email" name="email" type="email" value={values.email} onChange={updateField} onBlur={() => setTouched((t) => ({ ...t, email: true }))} error={visibleErrors.email} />
        <Field label="Phone Number" name="phone" type="tel" value={values.phone} onChange={updateField} onBlur={() => setTouched((t) => ({ ...t, phone: true }))} error={visibleErrors.phone} />
        <Select label="Project Scope" name="projectScope" value={values.projectScope} options={scopes} onChange={updateField} onBlur={() => setTouched((t) => ({ ...t, projectScope: true }))} error={visibleErrors.projectScope} />
        <Select label="Timeline" name="timeline" value={values.timeline} options={timelines} onChange={updateField} onBlur={() => setTouched((t) => ({ ...t, timeline: true }))} error={visibleErrors.timeline} />
        <Select label="Budget Range" name="budgetRange" value={values.budgetRange} options={budgets} onChange={updateField} onBlur={() => setTouched((t) => ({ ...t, budgetRange: true }))} error={visibleErrors.budgetRange} />
      </div>
      <label className="field-label">
        <span>Notes</span>
        <textarea
          name="message"
          value={values.message}
          onChange={updateField}
          rows="4"
          className="field-input resize-none"
          placeholder="Rooms, surfaces, site constraints, preferred finish..."
        />
      </label>
      {serverErrors.length > 0 && (
        <div className="rounded-md border border-red-300/50 bg-red-500/10 p-4 text-sm text-red-100" role="alert">
          {serverErrors.map((error) => (
            <p key={`${error.field}-${error.message}`}>{error.message}</p>
          ))}
        </div>
      )}
      {status === 'success' && (
        <motion.p className="rounded-md border border-brass/40 bg-brass/15 p-4 text-sm text-white" role="status" initial={{ scale: 0.98 }} animate={{ scale: 1 }}>
          Consultation request received. A material specialist will review your project fit.
        </motion.p>
      )}
      <button className="button-primary w-full justify-center md:w-auto" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <Send aria-hidden="true" size={18} />}
        Submit Request
      </button>
    </motion.form>
  );
}

function Field({ label, name, value, onChange, onBlur, error, type = 'text' }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <input className="field-input" name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />
      {error && <small id={`${name}-error`} className="field-error">{error}</small>}
    </label>
  );
}

function Select({ label, name, value, options, onChange, onBlur, error }) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <select className="field-input" name={name} value={value} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <small id={`${name}-error`} className="field-error">{error}</small>}
    </label>
  );
}
