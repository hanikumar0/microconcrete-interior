import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference.js';

import { Link } from 'react-router-dom';

export default function Hero() {
  const reduceMotion = useReducedMotionPreference();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], reduceMotion ? [0, 0] : [0, 120]);
  const opacity = useTransform(scrollY, [0, 520], [1, 0.35]);

  return (
    <section id="hero" className="relative flex min-h-[92vh] items-end overflow-hidden bg-charcoal text-white">
      <motion.img
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
        srcSet="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=640&q=70 640w, https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85 1600w"
        sizes="100vw"
        alt="Luxury microconcrete interior with warm side light and textured monolithic walls"
        className="absolute inset-0 h-[112%] w-full object-cover"
        loading="eager"
        fetchPriority="high"
        style={{ y }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/58 to-charcoal/12" />
      <motion.div
        className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-16 pt-40 lg:px-8 lg:pb-24"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity }}
      >
        <p className="max-w-md text-sm uppercase tracking-[0.34em] text-brass">Architectural microconcrete interiors</p>
        <h1 className="max-w-5xl font-display text-5xl font-bold leading-[0.96] md:text-7xl lg:text-8xl">
          Monolithic surfaces shaped with quiet precision.
        </h1>
        <div className="flex max-w-2xl flex-col gap-6 md:flex-row md:items-center">
          <p className="text-lg leading-8 text-white/76">
            Bespoke floors, walls, bathrooms, counters, and furniture finished by hand for luxury residential and
            commercial spaces.
          </p>
          <Link className="button-primary shrink-0" to="/contact">
            Book Consultation
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
