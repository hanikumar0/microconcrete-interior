import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Maximize2, X, Calendar, Settings, Shield, Compass } from 'lucide-react';
import { getProjects } from '../services/api.js';
import { revealUp, staggerChildren } from '../animations/reveal.js';

// Fallback data in case server is not running or DB is not populated
const localFallbackItems = [
  {
    _id: '1',
    title: 'Monolithic Ash Residence',
    description: 'Continuous ash grey floor and wall system for a private residence, creating seamless, light-reflecting envelopes.',
    category: 'residential',
    materialSpecifications: {
      finish: 'Hand-troweled matte ash',
      sealant: 'Two-part water resistant polyurethane',
      substrate: 'Prepared screed and cement board',
      thickness: '2-3mm'
    },
    images: {
      thumbnail: { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=720&q=74', alt: 'Monolithic Ash Residence thumbnail' },
      gallery: [{ url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=82', alt: 'Monolithic Ash Residence main image' }]
    },
    tags: ['floor', 'wall', 'interior'],
    completionDate: '2026-02-18'
  },
  {
    _id: '2',
    title: 'Charcoal Retail Gallery',
    description: 'Durable charcoal surface envelope for a high-traffic retail space, combining raw mineral textures with minimalist shelving.',
    category: 'commercial',
    materialSpecifications: {
      finish: 'Fine charcoal mineral texture',
      sealant: 'Commercial matte sealer',
      substrate: 'Prepared concrete and MDF plinths',
      thickness: '3mm'
    },
    images: {
      thumbnail: { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=720&q=74', alt: 'Charcoal Retail Gallery thumbnail' },
      gallery: [{ url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=82', alt: 'Charcoal Retail Gallery main image' }]
    },
    tags: ['retail', 'floor', 'furniture'],
    completionDate: '2026-01-11'
  },
  {
    _id: '3',
    title: 'Raw Sienna Kitchen',
    description: 'Seamless warm sienna kitchen island, splashback, and pantry cladding treated with a stain-proof matte sealer.',
    category: 'residential',
    materialSpecifications: {
      finish: 'Hand-troweled warm sienna',
      sealant: 'Food-safe stain resistant sealer',
      substrate: 'Water-resistant MDF core',
      thickness: '2.5mm'
    },
    images: {
      thumbnail: { url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=720&q=74', alt: 'Raw Sienna Kitchen thumbnail' },
      gallery: [{ url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=82', alt: 'Raw Sienna Kitchen main image' }]
    },
    tags: ['kitchen', 'residential', 'counters'],
    completionDate: '2025-12-14'
  },
  {
    _id: '4',
    title: 'Muted Brass Counter',
    description: 'Custom thin-profile reception counter casting microconcrete over a lightweight architectural shell.',
    category: 'furniture',
    materialSpecifications: {
      finish: 'Warm concrete beige with muted brass detailing',
      sealant: 'Food-safe satin sealer',
      substrate: 'Lightweight reinforced core',
      thickness: '4mm'
    },
    images: {
      thumbnail: { url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=720&q=74', alt: 'Muted Brass Counter thumbnail' },
      gallery: [{ url: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1600&q=82', alt: 'Muted Brass Counter main image' }]
    },
    tags: ['furniture', 'counter', 'brass'],
    completionDate: '2025-12-03'
  },
  {
    _id: '5',
    title: 'Hospitality Bath Suite',
    description: 'Continuous waterproof concrete coating for walls, walk-in shower tray, and seamless hand-crafted vanity sink.',
    category: 'commercial',
    materialSpecifications: {
      finish: 'Tactile ash grey waterproof seal',
      sealant: 'Wetroom-grade aliphatic polyurethane',
      substrate: 'Cement backer board',
      thickness: '3.0mm'
    },
    images: {
      thumbnail: { url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=720&q=74', alt: 'Hospitality Bath Suite thumbnail' },
      gallery: [{ url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=82', alt: 'Hospitality Bath Suite main image' }]
    },
    tags: ['bathroom', 'waterproof', 'vanity'],
    completionDate: '2025-11-28'
  },
  {
    _id: '6',
    title: 'Floating Concrete Table',
    description: 'Lightweight structural core dining table finished in highly characterful hand-worked concrete finish.',
    category: 'furniture',
    materialSpecifications: {
      finish: 'Artisan hand-worked natural grey',
      sealant: 'Food-safe heat resistant sealer',
      substrate: 'Lightweight honeycomb core',
      thickness: '4.0mm'
    },
    images: {
      thumbnail: { url: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=720&q=74', alt: 'Floating Concrete Table thumbnail' },
      gallery: [{ url: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=1600&q=82', alt: 'Floating Concrete Table main image' }]
    },
    tags: ['furniture', 'table', 'dining'],
    completionDate: '2025-11-10'
  },
  {
    _id: '7',
    title: 'Textured Feature Wall',
    description: 'Vertical microconcrete wall surface with mineral movement, subtle relief, and brass reveals.',
    category: 'wall',
    materialSpecifications: {
      finish: 'Layered matte mineral wall finish',
      sealant: 'Low-sheen protective wall sealer',
      substrate: 'Prepared plaster board',
      thickness: '2mm'
    },
    images: {
      thumbnail: { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=720&q=74', alt: 'Textured Feature Wall thumbnail' },
      gallery: [{ url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=82', alt: 'Textured Feature Wall main image' }]
    },
    tags: ['wall', 'feature wall', 'interior'],
    completionDate: '2025-11-22'
  },
  {
    _id: '8',
    title: 'Continuous Ceiling Plane',
    description: 'Pale microconcrete ceiling treatment for a seamless architectural envelope with custom lighting troughs.',
    category: 'ceiling',
    materialSpecifications: {
      finish: 'Soft ash ceiling finish',
      sealant: 'Breathable matte protection',
      substrate: 'Prepared gypsum board',
      thickness: '1.5-2mm'
    },
    images: {
      thumbnail: { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=720&q=74', alt: 'Continuous Ceiling Plane thumbnail' },
      gallery: [{ url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=82', alt: 'Continuous Ceiling Plane main image' }]
    },
    tags: ['ceiling', 'interior', 'monolithic'],
    completionDate: '2025-10-15'
  },
  {
    _id: '9',
    title: 'Open-Air Terrace Lounge',
    description: 'Weather-resistant sealed concrete coating for outdoor structural walls and lounge floor areas.',
    category: 'terrace',
    materialSpecifications: {
      finish: 'Exterior warm grey mineral finish',
      sealant: 'UV-stable exterior sealer',
      substrate: 'Prepared exterior screed',
      thickness: '3mm'
    },
    images: {
      thumbnail: { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=720&q=74', alt: 'Open-Air Terrace Lounge thumbnail' },
      gallery: [{ url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=82', alt: 'Open-Air Terrace Lounge main image' }]
    },
    tags: ['terrace', 'outdoor', 'floor'],
    completionDate: '2025-09-30'
  },
  {
    _id: '10',
    title: 'Private Bar Counter',
    description: 'Deep charcoal microconcrete counter finish with raw tactile edges and brass detailing in hospitality lounge.',
    category: 'bar',
    materialSpecifications: {
      finish: 'Charcoal satin counter finish',
      sealant: 'Food-safe stain resistant sealer',
      substrate: 'Reinforced counter core',
      thickness: '4mm'
    },
    images: {
      thumbnail: { url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=720&q=74', alt: 'Private Bar Counter thumbnail' },
      gallery: [{ url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=82', alt: 'Private Bar Counter main image' }]
    },
    tags: ['bar', 'counter', 'hospitality'],
    completionDate: '2025-08-19'
  }
];

const categories = ['All', 'Residential', 'Commercial', 'Furniture', 'Wall', 'Ceiling', 'Terrace', 'Bar'];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const response = await getProjects(activeCategory === 'All' ? null : activeCategory);
        if (response.data && response.data.data && response.data.data.length > 0) {
          setProjects(response.data.data);
        } else {
          setProjects(localFallbackItems);
        }
      } catch (err) {
        console.warn('API connection failed, loading local high-quality records');
        setProjects(localFallbackItems);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeCategory]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter (in case local items are used or client-side double check)
      const matchesCategory =
        activeCategory === 'All' ||
        project.category?.toLowerCase() === activeCategory.toLowerCase();

      // Search keyword filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        project.title?.toLowerCase().includes(searchLower) ||
        project.description?.toLowerCase().includes(searchLower) ||
        project.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        project.materialSpecifications?.finish?.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <div className="pt-24 min-h-screen bg-concrete text-ink pb-20">
      {/* Portfolio Header */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="max-w-4xl">
          <span className="eyebrow">Studio Portfolios</span>
          <h1 className="text-shine font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Selected hand-crafted spaces.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-ink/80 max-w-3xl font-body">
            Explore our architectural commissions. Every record is complete with actual material thickness, finishing notes, and surface substrate guidelines.
          </p>
        </div>
      </section>

      {/* Controls: Filters & Search */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 mb-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-charcoal/10 pb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Project classifications">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-button text-sm uppercase tracking-wider ${
                  activeCategory === category ? 'is-active' : ''
                }`}
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-sm w-full">
            <span className="absolute inset-y-0 left-3 flex items-center text-charcoal/40" aria-hidden="true">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search by finish, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-charcoal/15 bg-white/50 text-sm text-charcoal placeholder-charcoal/45 focus:outline-none focus:ring-1 focus:ring-brass focus:border-brass transition duration-300"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid Grid */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-charcoal/50">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-brass border-t-transparent" />
            <p className="font-display font-semibold uppercase tracking-wider text-sm">Retrieving tactile files...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-white/40 border border-dashed border-charcoal/10 rounded-xl">
            <SlidersHorizontal className="mx-auto text-charcoal/30 mb-4" size={32} />
            <h3 className="font-display text-lg font-bold text-charcoal">No projects fit your criteria</h3>
            <p className="text-sm text-charcoal/60 mt-1">Try resetting your filters or altering your keyword query.</p>
          </div>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const imgUrl = project.images?.thumbnail?.url || project.images?.gallery?.[0]?.url;
                return (
                  <motion.button
                    layout
                    key={project._id}
                    variants={revealUp}
                    exit={{ opacity: 0, scale: 0.95 }}
                    type="button"
                    className="gallery-tile flex flex-col overflow-hidden text-left bg-white/60 border border-charcoal/10 rounded-xl shadow-sm h-[380px]"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Show specifications for ${project.title}`}
                  >
                    <div className="relative overflow-hidden w-full h-[220px] bg-charcoal">
                      <img
                        src={imgUrl}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 bg-charcoal/90 text-brass text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-display text-xl font-bold text-charcoal leading-tight mb-2 truncate">
                          {project.title}
                        </h3>
                        <p className="text-xs text-ink/70 font-body leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex justify-between items-center border-t border-charcoal/10 pt-3 mt-3">
                        <span className="text-[10px] uppercase font-semibold text-brass tracking-wider">
                          Finish: {project.materialSpecifications?.finish || 'Artisan Trowel'}
                        </span>
                        <div className="rounded-full bg-charcoal/5 p-1.5 text-brass">
                          <Maximize2 size={12} />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Lightbox / Specification Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="lightbox-panel max-w-4xl w-full bg-charcoal border border-white/10 rounded-xl overflow-hidden shadow-2xl p-0 flex flex-col md:flex-row"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 28, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image side */}
              <div className="relative md:w-1/2 min-h-[300px] md:h-auto bg-black flex items-center justify-center">
                <img
                  src={selectedProject.images?.gallery?.[0]?.url || selectedProject.images?.thumbnail?.url}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover max-h-[500px] md:max-h-full"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-charcoal/90 text-white rounded-full p-2 border border-white/10 hover:border-brass transition duration-300 md:hidden"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Specifications details side */}
              <div className="p-8 md:w-1/2 flex flex-col justify-between text-white bg-charcoal/95">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                    <span className="text-[10px] font-bold text-brass uppercase tracking-widest">
                      {selectedProject.category} Specs
                    </span>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="hidden md:flex bg-white/5 text-white rounded-full p-2 border border-white/10 hover:border-brass transition duration-300"
                      aria-label="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <h3 className="font-display text-2xl font-bold mb-3 text-white leading-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-6 font-body">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-3.5 mb-6 text-sm">
                    <h4 className="font-display font-semibold text-brass text-xs uppercase tracking-wider mb-2">
                      Material System Parameters
                    </h4>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-white/40 flex items-center gap-2 text-xs">
                        <Settings size={14} className="text-brass" /> Texture Finish
                      </span>
                      <strong className="font-medium text-white/90">
                        {selectedProject.materialSpecifications?.finish || 'Satin Slate'}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-white/40 flex items-center gap-2 text-xs">
                        <Shield size={14} className="text-brass" /> Sealer Coating
                      </span>
                      <strong className="font-medium text-white/90">
                        {selectedProject.materialSpecifications?.sealant || 'Aliphatic Sealer'}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                      <span className="text-white/40 flex items-center gap-2 text-xs">
                        <Compass size={14} className="text-brass" /> Base Substrate
                      </span>
                      <strong className="font-medium text-white/90">
                        {selectedProject.materialSpecifications?.substrate || 'Prepared Screed'}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-white/40 flex items-center gap-2 text-xs">
                        <SlidersHorizontal size={14} className="text-brass" /> Coating Thickness
                      </span>
                      <strong className="font-medium text-white/90">
                        {selectedProject.materialSpecifications?.thickness || '3mm'}
                      </strong>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedProject.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/5 text-white/60 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/40 border-t border-white/10 pt-4">
                    <Calendar size={14} />
                    <span>Completed {new Date(selectedProject.completionDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
