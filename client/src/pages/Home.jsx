import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Sliders, Layout, PenTool, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import { revealUp, staggerChildren } from '../animations/reveal.js';

const teaserServices = [
  {
    title: 'Residential Architecture',
    desc: 'Joint-free mineral floors, waterproof wetrooms, and raw plaster walls finished by master trowel hands.',
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=82',
    link: '/services'
  },
  {
    title: 'Commercial Venues',
    desc: 'High-traffic mineral envelopes certified for immense durability, slide ratings, and zero structural delamination.',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82',
    link: '/services'
  },
  {
    title: 'Bespoke Joinery & Furniture',
    desc: 'Cantilevered vanity sinks, concrete countertops, and lightweight core tables wrapped in microconcrete.',
    img: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=900&q=82',
    link: '/services'
  }
];

export default function Home() {
  return (
    <div className="bg-concrete text-ink min-h-screen">
      {/* Hero Header */}
      <Hero />

      {/* Brand Ethos & Narrative */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <motion.div
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerChildren}
        >
          <motion.div variants={revealUp} className="flex flex-col gap-6">
            <span className="eyebrow">The Studio Philosophy</span>
            <h2 className="font-display text-3xl font-bold md:text-5xl lg:text-6xl text-charcoal leading-tight">
              Quiet surfaces. Tactile depth.
            </h2>
            <p className="text-lg leading-relaxed text-ink/80 font-body">
              At Atelier Microcrete, we believe that luxury lies in restraint. We reject generic flat surfaces in favor of continuous hand-crafted planes that react dynamically to natural side-lighting.
            </p>
            <p className="text-sm leading-relaxed text-ink/75">
              Formulated in Italy and hand-troweled by local master craftsmen, our microconcrete systems bond seamlessly to any existing substrate, delivering high-performance durability with a profile of just three millimeters.
            </p>
            <div className="pt-2">
              <Link to="/about" className="button-primary">
                Explore Material Science
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={revealUp} className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-white/40 border border-charcoal/10 shadow-sm flex flex-col gap-3">
              <Layers className="text-sienna" size={24} />
              <h4 className="font-display font-bold text-base text-charcoal">Seamless Planes</h4>
              <p className="text-xs text-ink/70 leading-relaxed font-body">Complete elimination of joint lines across floors and walls.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/40 border border-charcoal/10 shadow-sm flex flex-col gap-3">
              <Sliders className="text-sienna" size={24} />
              <h4 className="font-display font-bold text-base text-charcoal">Light-Reactive</h4>
              <p className="text-xs text-ink/70 leading-relaxed font-body">Fine mineral aggregates catch shadows and side light organically.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/40 border border-charcoal/10 shadow-sm flex flex-col gap-3">
              <Layout className="text-sienna" size={24} />
              <h4 className="font-display font-bold text-base text-charcoal">3mm Profile</h4>
              <p className="text-xs text-ink/70 leading-relaxed font-body">Extremely thin application avoids height issues in renovations.</p>
            </div>
            <div className="p-6 rounded-xl bg-white/40 border border-charcoal/10 shadow-sm flex flex-col gap-3">
              <PenTool className="text-sienna" size={24} />
              <h4 className="font-display font-bold text-base text-charcoal">Artisan Hand</h4>
              <p className="text-xs text-ink/70 leading-relaxed font-body">Every pass is applied by hand, guaranteeing a unique signature.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Curated Service Tiers Teaser */}
      <section className="bg-charcoal text-white py-24 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <span className="eyebrow text-brass">Our Applications</span>
              <h2 className="font-display text-3xl font-bold md:text-5xl text-white mt-4">
                Designed for use. Finished for longevity.
              </h2>
            </div>
            <Link to="/services" className="button-primary hover:bg-brass bg-white/10 text-white hover:text-charcoal shrink-0">
              Calculate Prep & Suitability
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {teaserServices.map((service, idx) => (
              <motion.article
                key={service.title}
                className="dark-premium-card rounded-xl overflow-hidden flex flex-col bg-white/5 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="h-[200px] overflow-hidden bg-zinc-900 relative">
                  <img
                    src={service.img}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed font-body mb-6">{service.desc}</p>
                  </div>
                  <Link to={service.link} className="text-xs font-semibold text-brass hover:text-white flex items-center gap-1.5 transition">
                    System Details <ExternalLink size={12} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Highlight Teaser */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] items-center">
          <div>
            <span className="eyebrow">Visual Showroom</span>
            <h2 className="font-display text-3xl font-bold md:text-5xl mt-4 leading-tight">
              Spaces worth slowing down for.
            </h2>
            <p className="mt-4 text-ink/70 text-base font-body leading-relaxed mb-6">
              Our continuous surfaces form seamless architectural frames for private retreats, luxury restaurants, and high-end retail brands.
            </p>
            <Link to="/portfolio" className="button-primary">
              View Texture Portfolio
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-xl overflow-hidden h-[300px] bg-zinc-900 group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=82"
                alt="Raw sienna seamless kitchen island in microconcrete"
                loading="lazy"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent flex items-end p-4">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Kitchen Island</span>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-[300px] bg-zinc-900 group shadow-md mt-6">
              <img
                src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=82"
                alt="Muted brass custom furniture counter in microconcrete"
                loading="lazy"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent flex items-end p-4">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Custom Counter</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monolithic Footer CTA Section */}
      <section className="bg-charcoal text-white py-24 px-5 lg:px-8 text-center border-t border-white/10">
        <div className="mx-auto max-w-4xl flex flex-col gap-6 items-center">
          <span className="eyebrow text-brass">Private Curation</span>
          <h2 className="font-display text-4xl font-bold md:text-6xl text-white leading-tight">
            Bring a surface brief to life.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed font-body max-w-xl">
            Register your project constraints and existing substrates to catalog your consultation and schedule high-end material sample delivery.
          </p>
          <div className="pt-4">
            <Link to="/contact" className="button-primary bg-brass hover:bg-white text-charcoal font-bold px-8 py-4 transition duration-300">
              Start Project Inquiry
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
