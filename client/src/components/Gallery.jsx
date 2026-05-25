import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import SectionShell from './SectionShell.jsx';
import { categories, galleryItems } from '../utils/galleryData.js';
import { revealUp, staggerChildren } from '../animations/reveal.js';

function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const filteredItems = useMemo(
    () => galleryItems.filter((item) => activeCategory === 'All' || item.category === activeCategory),
    [activeCategory]
  );

  return (
    <SectionShell id="gallery" eyebrow="Portfolio" title="Texture-rich spaces, filtered by use and finished for longevity.">
      <div className="mb-8 flex flex-wrap gap-3" role="tablist" aria-label="Gallery filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-button ${activeCategory === category ? 'is-active' : ''}`}
            role="tab"
            aria-selected={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <motion.div className="gallery-grid" variants={staggerChildren} initial="hidden" animate="visible">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.button
              layout
              key={item.id}
              className={`gallery-tile ${index % 3 === 0 ? 'md:row-span-2' : ''}`}
              variants={revealUp}
              exit={{ opacity: 0, scale: 0.98 }}
              type="button"
              onClick={() => setSelected(item)}
              aria-label={`Open ${item.title} gallery image`}
            >
              <img
                src={item.thumb}
                srcSet={`${item.thumb} 520w, ${item.image} 1200w`}
                sizes="(min-width: 768px) 33vw, 100vw"
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <span className="gallery-caption">
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.category}</small>
                </span>
                <Maximize2 aria-hidden="true" size={18} />
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="lightbox-panel"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Close image">
                <X aria-hidden="true" size={20} />
              </button>
              <img src={selected.image} alt={selected.alt} className="max-h-[78vh] w-full rounded-md object-contain" />
              <div className="mt-4">
                <p className="eyebrow">{selected.category}</p>
                <h3 className="font-display text-2xl font-bold text-white">{selected.title}</h3>
                <p className="mt-2 text-white/70">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}

export default memo(Gallery);
