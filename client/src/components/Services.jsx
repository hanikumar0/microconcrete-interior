import { Building2, Home, SquareStack } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionShell from './SectionShell.jsx';
import { revealUp, staggerChildren } from '../animations/reveal.js';

const services = [
  {
    title: 'Residential',
    icon: Home,
    items: ['Floors', 'Bathrooms', 'Kitchens', 'Walls']
  },
  {
    title: 'Commercial',
    icon: Building2,
    items: ['Retail spaces', 'Offices', 'Hospitality interiors']
  },
  {
    title: 'Custom Furniture',
    icon: SquareStack,
    items: ['Tables', 'Countertops', 'Decorative installations']
  }
];

export default function Services() {
  return (
    <SectionShell id="services" eyebrow="Applications" title="Systems for surfaces that need to work hard and look resolved.">
      <motion.div className="grid gap-5 md:grid-cols-3" variants={staggerChildren}>
        {services.map(({ title, icon: Icon, items }) => (
          <motion.article key={title} variants={revealUp} className="service-card">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-charcoal text-brass">
              <Icon aria-hidden="true" size={23} />
            </div>
            <h3 className="font-display text-2xl font-bold">{title}</h3>
            <ul className="mt-6 grid gap-3 text-charcoal/68">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-px w-5 bg-sienna" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
