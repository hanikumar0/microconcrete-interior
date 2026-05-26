import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, Table, HelpCircle, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const serviceTiers = [
  {
    icon: Home,
    title: 'Residential Surfaces',
    desc: 'Bespoke continuous planes for modern homes, bringing light distribution and pure geometry to everyday life.',
    applications: ['Seamless high-wear flooring', 'Waterproof walk-in wetrooms & vanities', 'Feature fire breast walls', 'Monolithic kitchen splashbacks'],
    prepNote: 'Applicable over subfloor heating systems.'
  },
  {
    icon: Building2,
    title: 'Commercial & Retail',
    desc: 'High-performance mineral formulas designed to withstand constant mechanical wear and intense foot traffic.',
    applications: ['Boutique retail floors & plinths', 'Hotel lobbies & reception backdrops', 'Restaurant service bars', 'High-traffic office circulation routes'],
    prepNote: 'Slip resistance levels certified up to R11.'
  },
  {
    icon: Table,
    title: 'Collectible Furniture',
    desc: 'Fine-troweled microconcrete wrapped around custom-built lightweight cores, creating unique statement joinery.',
    applications: ['Sculptural dining tables', 'Cantilevered vanity pieces', 'Custom reception desks', 'Outdoor architectural firepits'],
    prepNote: 'Sealed with food-safe aliphatic coatings.'
  }
];

const substrates = {
  concrete: {
    name: 'Raw Concrete / Cement Screed',
    score: 100,
    prepCost: 0,
    thickness: '2.5 mm',
    status: 'optimal',
    advice: 'Optimal substrate. Requires light grinding and standard acrylic primer before coating.'
  },
  tiles: {
    name: 'Existing Ceramic / Porcelain Tiles',
    score: 90,
    prepCost: 2.50,
    thickness: '3.0 mm',
    status: 'optimal',
    advice: 'Highly suitable. Saves demolition waste. Requires filling grout lines and sand-grit bridge primer.'
  },
  drywall: {
    name: 'Gypsum Board / Drywall (Walls)',
    score: 85,
    prepCost: 1.00,
    thickness: '2.0 mm',
    status: 'optimal',
    advice: 'Very suitable for walls. Joints must be taped and fiberglass mesh embedded in the base coat.'
  },
  wood: {
    name: 'Plywood or Timber Subfloor',
    score: 60,
    prepCost: 5.50,
    thickness: '3.5 mm',
    status: 'warning',
    advice: 'Challenging due to timber expansion. Requires high-elasticity polymer base coat and structural mesh.'
  },
  plaster: {
    name: 'Gypsum Plaster (Walls)',
    score: 90,
    prepCost: 1.00,
    thickness: '2.0 mm',
    status: 'optimal',
    advice: 'Excellent for walls. Must be fully cured and sealed with acrylic deep-penetration primers.'
  }
};

const finishes = {
  matte: { name: 'Premium Tactile Matte', rate: 18.00, desc: 'Pure raw mineral texture, absolute minimal light reflection.' },
  satin: { name: 'Satin Protective Sheen', rate: 19.50, desc: 'Soft glow finish, highly wipeable and ideal for wet areas.' },
  polished: { name: 'Artisan Polished Slate', rate: 22.00, desc: 'High-character trowel highlights, luxurious smooth finish.' }
};

export default function Services() {
  const [substrate, setSubstrate] = useState('concrete');
  const [area, setArea] = useState(250);
  const [finish, setFinish] = useState('satin');

  const estimation = useMemo(() => {
    const selectedSubstrate = substrates[substrate];
    const selectedFinish = finishes[finish];

    const baseSqFtCost = selectedFinish.rate;
    const prepSqFtCost = selectedSubstrate.prepCost;
    const totalSqFt = baseSqFtCost + prepSqFtCost;

    const baseTotal = totalSqFt * area;
    const lowEstimate = Math.round(baseTotal * 0.95);
    const highEstimate = Math.round(baseTotal * 1.08);

    return {
      totalSqFt,
      lowEstimate,
      highEstimate,
      thickness: selectedSubstrate.thickness,
      score: selectedSubstrate.score,
      status: selectedSubstrate.status,
      advice: selectedSubstrate.advice
    };
  }, [substrate, area, finish]);

  return (
    <div className="pt-24 min-h-screen bg-concrete text-ink pb-20">
      {/* Services Header */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="max-w-4xl">
          <span className="eyebrow">Architectural Tiers</span>
          <h1 className="text-shine font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Custom systems for modern envelopes.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-ink/80 max-w-3xl font-body">
            We deliver handcrafted surfaces scaled to your project. From light-filled residences to high-impact corporate galleries, our teams deliver seamless, durable finishes customized by thickness and slip resistance.
          </p>
        </div>
      </section>

      {/* Services Tiers Grids */}
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {serviceTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <article key={tier.title} className="premium-card rounded-xl p-8 bg-white/40 border border-charcoal/10 flex flex-col justify-between">
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-charcoal text-brass">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-charcoal mb-4">{tier.title}</h3>
                  <p className="text-sm text-ink/70 leading-relaxed mb-6 font-body">{tier.desc}</p>
                  <ul className="grid gap-3 text-sm text-ink/80 mb-6">
                    {tier.applications.map((app) => (
                      <li key={app} className="flex items-center gap-2">
                        <CheckCircle className="text-sienna" size={14} />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-charcoal/10 pt-4 text-xs text-sienna font-semibold uppercase tracking-wider">
                  Prep Specs: {tier.prepNote}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Interactive Substrate & Area Calculator */}
      <section className="bg-charcoal text-white py-20 px-5 lg:px-8 mt-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <span className="eyebrow text-brass">Interactive Estimation</span>
            <h2 className="font-display text-3xl font-bold md:text-5xl text-white mt-4">
              Substrate Fit & Area Calculator
            </h2>
            <p className="mt-4 text-white/60 text-lg">
              Input your existing subfloor material and estimated area size to see the preparation suitability, material thickness, and guide budget.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
            {/* Form Controls */}
            <div className="glass-card rounded-xl p-8 bg-white/5 border border-white/10 flex flex-col gap-8">
              {/* 1. Substrate Selection */}
              <div>
                <label className="field-label text-white/90 mb-3">1. Select Existing Substrate</label>
                <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                  {Object.entries(substrates).map(([key, sub]) => (
                    <button
                      key={key}
                      type="button"
                      className={`text-left p-4 rounded-lg border text-sm transition duration-300 ${
                        substrate === key
                          ? 'border-brass bg-brass/10 text-white font-semibold shadow-md'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                      onClick={() => setSubstrate(key)}
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Area Size */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="field-label text-white/90">2. Project Area (sq ft)</label>
                  <span className="font-display font-bold text-brass text-lg">{area} sq ft</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="25"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brass"
                />
                <div className="flex justify-between text-xs text-white/40 mt-2">
                  <span>50 sq ft</span>
                  <span>1,500 sq ft</span>
                  <span>3,000 sq ft</span>
                </div>
              </div>

              {/* 3. Texture Finish */}
              <div>
                <label className="field-label text-white/90 mb-3">3. Preferred Texture Finish</label>
                <div className="grid gap-4 md:grid-cols-3">
                  {Object.entries(finishes).map(([key, val]) => (
                    <button
                      key={key}
                      type="button"
                      className={`text-left p-4 rounded-lg border text-xs transition duration-300 flex flex-col justify-between min-h-[100px] ${
                        finish === key
                          ? 'border-brass bg-brass/10 text-white font-semibold shadow-md'
                          : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                      onClick={() => setFinish(key)}
                    >
                      <div>
                        <strong className="block mb-1 text-sm">{val.name}</strong>
                        <p className="text-white/50 scale-95 leading-normal">{val.desc}</p>
                      </div>
                      <span className="mt-2 text-brass font-bold">${val.rate}/sq ft</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="flex flex-col gap-6">
              <div className="rounded-xl bg-white text-ink p-8 shadow-xl flex flex-col justify-between min-h-[440px]">
                <div>
                  <div className="flex justify-between items-center pb-6 border-b border-charcoal/10">
                    <span className="text-sm font-semibold uppercase tracking-wider text-ink/60">Guide Estimate</span>
                    <span className="font-display font-bold text-xs text-sienna px-2.5 py-1 bg-sienna/10 rounded-full">
                      MERN Studio Tier
                    </span>
                  </div>

                  <div className="py-8 text-center">
                    <p className="text-sm text-ink/50 mb-1">Estimated Budget Range</p>
                    <h3 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
                      ${estimation.lowEstimate.toLocaleString()} - ${estimation.highEstimate.toLocaleString()}
                    </h3>
                    <p className="text-xs text-ink/40 mt-2">
                      Based on ${estimation.totalSqFt.toFixed(2)}/sq ft (materials + artisan application)
                    </p>
                  </div>

                  {/* Suitability Index */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-charcoal/10 text-sm">
                    <div>
                      <span className="block text-xs text-ink/40 mb-1">Substrate Fit Score</span>
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${estimation.score >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <strong className="font-display text-base text-charcoal">{estimation.score}% Fit</strong>
                      </div>
                    </div>
                    <div>
                      <span className="block text-xs text-ink/40 mb-1">Thickness Added</span>
                      <strong className="font-display text-base text-charcoal">{estimation.thickness}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-4 items-start p-4 bg-concrete/40 rounded-lg">
                  {estimation.status === 'warning' ? (
                    <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                  ) : (
                    <CheckCircle className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                  )}
                  <p className="text-xs text-ink/80 leading-relaxed font-body">
                    <strong>Artisan Advice:</strong> {estimation.advice}
                  </p>
                </div>
              </div>

              {/* Call to action */}
              <div className="border border-white/10 rounded-xl p-6 bg-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-white mb-1">Have custom specifications?</h4>
                  <p className="text-xs text-white/50 font-body">Submit your layout details for studio-level review.</p>
                </div>
                <Link to="/contact" className="button-primary shrink-0">
                  Submit Brief
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
