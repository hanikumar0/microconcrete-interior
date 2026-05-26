import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Flame, Compass, HelpCircle } from 'lucide-react';
import { revealUp, staggerChildren } from '../animations/reveal.js';

const layers = [
  {
    num: '01',
    name: 'Substrate Layer',
    tech: 'Prepared screed, cement board, or existing tiles',
    desc: 'The essential foundation. We level and grind existing substrates to ensure a perfectly flat, movement-free surface, avoiding structural cracking.',
    icon: Compass,
    color: 'border-zinc-500'
  },
  {
    num: '02',
    name: 'Mineral Quartz Primer',
    tech: 'Grip primer with mineral aggregate suspensions',
    desc: 'Bridges the old substrate to the new coating. Embedded quartz sand gives the base layer high mechanical adhesion.',
    icon: HelpCircle,
    color: 'border-brass/40'
  },
  {
    num: '03',
    name: 'Base Coat (Structural)',
    tech: 'Coarse microconcrete reinforced with fiberglass mesh',
    desc: 'Provides structural resilience and tension relief. Troweled over flexible mesh to bridge minor slab movements and withstand load forces.',
    icon: Layers,
    color: 'border-brass'
  },
  {
    num: '04',
    name: 'Fine Coat (Aesthetic)',
    tech: 'Extra-fine mineral paste with custom pigments',
    desc: 'The architectural signature. Applied by master artisans in thin semi-translucent passes to reveal hand-troweled mineral shading and natural depth.',
    icon: Flame,
    color: 'border-sienna'
  },
  {
    num: '05',
    name: 'Dual Polyurethane Sealer',
    tech: 'Two-part aliphatic non-yellowing satin sealer',
    desc: 'The armor. Completely seals the pores, providing commercial-grade scratch resistance, waterproof barrier, and UV-stability.',
    icon: ShieldCheck,
    color: 'border-emerald-600'
  }
];

const technicalSpecs = [
  { label: 'Total System Thickness', value: '2.5 mm – 3.5 mm' },
  { label: 'Flexural Strength', value: '11.5 MPa (EN 196-1)' },
  { label: 'Compressive Strength', value: '45.0 MPa (EN 196-1)' },
  { label: 'Adhesion to Concrete', value: '1.8 MPa (EN 1542)' },
  { label: 'Shore D Hardness', value: '82 (ASTM D2240)' },
  { label: 'VOC Content', value: 'Ultra-low (<15 g/L)' }
];

export default function About() {
  return (
    <div className="pt-24 min-h-screen bg-concrete text-ink pb-20">
      {/* Intro Hero Section */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center"
        >
          <motion.div variants={revealUp} className="flex flex-col gap-6">
            <span className="eyebrow">Material & Engineering</span>
            <h1 className="text-shine font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Microconcrete with quiet depth.
            </h1>
            <p className="text-xl leading-relaxed text-ink/80 font-body">
              Atelier Microcrete is a study in material restraint. Far from standard industrial concrete, our microconcrete is a highly refined mineral coating that balances the monolithic integrity of stone with the adaptability of contemporary craft.
            </p>
            <p className="text-lg leading-relaxed text-ink/70">
              Through careful aggregate selection, chemical engineering, and master hand-troweling, we create continuous, joint-free planes that connect walls, floors, ceilings, and built-in fixtures into single architectural envelopes.
            </p>
          </motion.div>
          <motion.figure variants={revealUp} className="relative overflow-hidden rounded-xl bg-charcoal shadow-lift">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85"
              srcSet="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=520&q=70 520w, https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=85 1200w"
              sizes="(min-width: 1024px) 45vw, 100vw"
              alt="Artisan hand troweling fresh microconcrete texture on a wall surface"
              className="h-full min-h-[460px] w-full object-cover transition duration-700 hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 rounded bg-charcoal/90 px-3 py-1 text-xs text-brass tracking-widest uppercase">
              Handcrafted Detail
            </div>
          </motion.figure>
        </motion.div>
      </section>

      {/* Layer Breakdown Section */}
      <section className="bg-charcoal text-white py-20 px-5 lg:px-8 mt-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-16">
            <span className="eyebrow text-brass">The Anatomy of a Surface</span>
            <h2 className="font-display text-3xl font-bold md:text-5xl text-white mt-4">
              The 5-Layer Monolithic System
            </h2>
            <p className="mt-4 text-white/60 text-lg">
              Each surface is built systematically layer-by-layer to form a highly durable, flexible composite that will not delaminate or crack over time.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {layers.map((layer, idx) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.num}
                  className={`dark-premium-card rounded-xl p-6 flex flex-col justify-between min-h-[320px] border-t-4 ${layer.color}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display text-3xl font-bold text-white/20">{layer.num}</span>
                      <Icon className="text-brass" size={20} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{layer.name}</h3>
                    <p className="text-xs text-brass font-medium uppercase tracking-wider mb-3">{layer.tech}</p>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed font-body">{layer.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <span className="eyebrow">Rigorous Science</span>
            <h2 className="font-display text-3xl font-bold md:text-5xl mt-4">
              Engineered for High-Performance
            </h2>
            <p className="mt-4 text-ink/70 text-lg leading-relaxed">
              We subject our mineral formulas to extreme resistance tests to ensure they exceed standards for residential wear, high-traffic commercial spaces, and kitchen stain protection.
            </p>
            <div className="mt-8 p-6 bg-brass/10 border border-brass/20 rounded-xl">
              <h4 className="font-display text-lg font-bold text-sienna mb-2">Sustainable Attributes</h4>
              <p className="text-sm text-ink/80 leading-relaxed">
                By bonding directly to existing substrates, our system avoids the massive demolition waste and energy expenditure associated with ripping out old tiles or concrete screeds. Low VOC profiles guarantee interior air quality immediately after sealing.
              </p>
            </div>
          </div>

          <div className="bg-white/80 border border-charcoal/10 rounded-xl p-8 shadow-sm">
            <h3 className="font-display text-2xl font-bold mb-6 text-charcoal">Engineering Performance Data</h3>
            <div className="divide-y divide-charcoal/10">
              {technicalSpecs.map((spec) => (
                <div key={spec.label} className="py-4 flex justify-between items-center">
                  <span className="font-body text-sm font-medium text-ink/70">{spec.label}</span>
                  <span className="font-display text-lg font-bold text-charcoal">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
