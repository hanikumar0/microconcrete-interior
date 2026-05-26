import { motion } from 'framer-motion';
import SectionShell from './SectionShell.jsx';
import { revealUp, staggerChildren } from '../animations/reveal.js';

const details = [
  'A thin mineral coating that bonds to existing substrates for seamless architectural surfaces.',
  'High abrasion resistance, waterproof sealing options, and low-profile application for renovations.',
  'Lower demolition waste, long life cycles, and refined tactile depth across floors, walls, and joinery.'
];

export default function About() {
  return (
    <SectionShell id="about" eyebrow="Material science" title="Microconcrete with the restraint of stone and the adaptability of craft.">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <motion.div variants={staggerChildren} className="grid gap-4">
          {details.map((detail) => (
            <motion.article key={detail} variants={revealUp} className="border-t border-charcoal/14 py-6">
              <p className="text-xl leading-8 text-charcoal/78">{detail}</p>
            </motion.article>
          ))}
        </motion.div>
        <motion.figure variants={revealUp} className="overflow-hidden rounded-md bg-charcoal shadow-lift">
          <img
            src="/images/material-process.webp"
            srcSet="/images/material-process-thumb.webp 520w, /images/material-process.webp 1200w"
            sizes="(min-width: 1024px) 45vw, 100vw"
            alt="Close view of hand-troweled microconcrete texture in warm grey"
            className="h-full min-h-[420px] w-full object-cover transition duration-700 hover:scale-[1.03]"
            loading="lazy"
          />
        </motion.figure>
      </div>
    </SectionShell>
  );
}
