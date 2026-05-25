import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Material' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Consultation' }
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-charcoal/80 text-white backdrop-blur-xl transition-all duration-300">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Primary">
        <Link to="/" className="group font-display text-sm font-bold uppercase tracking-[0.28em] transition hover:text-brass">
          Atelier <span className="text-brass group-hover:text-white transition-colors duration-300">Microcrete</span>
        </Link>
        <button
          className="rounded-full border border-white/20 p-2 transition hover:border-brass focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass md:hidden"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <Menu aria-hidden="true" size={20} />
        </button>
        <div
          className={`absolute left-5 right-5 top-16 rounded-md border border-white/10 bg-charcoal p-4 shadow-lift md:static md:flex md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none transition-all duration-300 ${
            open ? 'block opacity-100 scale-100' : 'hidden md:flex'
          }`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block py-2 text-sm uppercase tracking-wider font-medium transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brass md:py-0 ${
                  isActive
                    ? 'text-brass font-semibold border-b-2 border-brass/40 pb-1 md:border-b-2'
                    : 'text-white/70 hover:text-white'
                }`
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

