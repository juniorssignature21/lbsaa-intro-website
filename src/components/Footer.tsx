import { BRAND } from '../config/brand';
import type { Route } from '../hooks/useHashRoute';
import Logo from './Logo';

export default function Footer({ navigate }: { navigate: (to: Route) => void }) {
  return (
    <footer className="mt-auto bg-navy-dark text-white">
      <div className="h-1 bg-gold" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-4">
            <Logo height={60} tone="white" decorative />
            <p className="font-display text-sm leading-snug font-bold tracking-wide uppercase">
              Lagos Business School
              <br />
              Alumni Association
            </p>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
            A simple tool for members of the {BRAND.name} to introduce themselves to the alumni community — professionally, in seconds.
          </p>
        </div>
        <div className="md:text-right">
          <p className="font-display text-sm font-bold tracking-[0.25em] uppercase">
            Connect <span className="text-gold">|</span> Support <span className="text-gold">|</span> Grow
          </p>
          <p className="mt-2 text-lg text-gold italic">{BRAND.motto}</p>
          <nav aria-label="Footer" className="mt-5 flex gap-5 text-sm text-white/70 md:justify-end">
            <a href="#/" onClick={(e) => { e.preventDefault(); navigate('home'); }} className="hover:text-white">
              Home
            </a>
            <a href="#/create" onClick={(e) => { e.preventDefault(); navigate('create'); }} className="hover:text-white">
              Create Introduction
            </a>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {BRAND.name}. Your details and photo stay in your browser — nothing is uploaded or stored on a server.
        </p>
      </div>
    </footer>
  );
}
