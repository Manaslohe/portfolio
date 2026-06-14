import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import SectionHeading from '../UI/SectionHeading';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { personalInfo } from '../../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, isVisible] = useScrollAnimation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Required';
    if (!formData.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.message.trim()) e.message = 'Required';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }, 4000);
  };

  const inputClass = (field) =>
    `w-full bg-transparent border-b ${errors[field] ? 'border-error' : 'border-white/[0.08]'} text-white text-sm pb-4 pt-2 focus:outline-none focus:border-neon/40 transition-colors duration-300 placeholder:text-muted font-mono`;

  return (
    <section id="contact" className="relative py-28 md:py-36 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — Heading + info */}
          <div>
            <SectionHeading tag="CONTACT" title="Let's work together." subtitle="Have a project in mind? Drop me a message and I'll get back to you." />

            <motion.div
              className="mt-10 space-y-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {[
                { label: 'EMAIL', value: personalInfo.email },
                { label: 'LOCATION', value: personalInfo.locations.join(' / ') },
                { label: 'STATUS', value: 'Exploring new opportunities', neon: true },
              ].map((info) => (
                <div key={info.label} className="flex items-center gap-3">
                  <span className="font-mono text-[9px] tracking-[0.15em] text-muted uppercase w-20">{info.label}</span>
                  <span className={`text-sm ${info.neon ? 'text-neon' : 'text-dim'}`}>{info.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.form
            ref={ref}
            onSubmit={handleSubmit}
            className="relative"
            autoComplete="off"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Success overlay */}
            {isSubmitted && (
              <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-dark-900/90 rounded-lg border border-neon/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-10 h-10 rounded-full border border-neon flex items-center justify-center">
                  <Check size={18} className="text-neon" />
                </div>
                <p className="font-mono text-sm text-neon">Message sent successfully</p>
              </motion.div>
            )}

            <div className="space-y-6">
              <div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name *" className={inputClass('name')} />
                {errors.name && <p className="text-error text-[10px] font-mono mt-1">{errors.name}</p>}
              </div>
              <div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email *" className={inputClass('email')} />
                {errors.email && <p className="text-error text-[10px] font-mono mt-1">{errors.email}</p>}
              </div>
              <div>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className={inputClass('phone')} />
              </div>
              <div>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message *" rows={3} className={`${inputClass('message')} resize-none`} />
                {errors.message && <p className="text-error text-[10px] font-mono mt-1">{errors.message}</p>}
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-white/10 font-mono text-xs tracking-wider uppercase text-white hover:border-neon/30 hover:text-neon transition-all duration-300 disabled:opacity-40"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <ArrowRight size={12} />
                </button>
                <p className="font-mono text-[9px] text-muted">* Required</p>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
