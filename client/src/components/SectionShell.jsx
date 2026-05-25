import { motion } from 'framer-motion';
import { revealUp } from '../animations/reveal.js';

export default function SectionShell({ eyebrow, title, children, id, className = '' }) {
  return (
    <section id={id} className={`section-shell ${className}`}>
      <motion.div
        className="mx-auto max-w-7xl px-5 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={revealUp}
      >
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">{title}</h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
}
