import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Route } from '../hooks/useHashRoute';
import Logo from './Logo';

interface HeaderProps {
  route: Route;
  navigate: (to: Route, anchor?: string) => void;
}

export default function Header({ route, navigate }: HeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [route]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links: { to: Route; label: string }[] = [
    { to: 'home', label: 'Home' },
    { to: 'create', label: 'Create Introduction' },
  ];

  const go = (to: Route) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <a href="#/" onClick={go('home')} className="flex-none rounded" aria-label="LBSAA — Home">
          <Logo height={44} decorative className="h-9 w-auto sm:h-11" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to === 'home' ? '#/' : '#/create'}
              onClick={go(l.to)}
              aria-current={route === l.to ? 'page' : undefined}
              className={`relative rounded px-4 py-2 text-sm font-semibold transition-colors ${route === l.to ? 'text-navy' : 'text-slate hover:text-navy'}`}
            >
              {l.label}
              {route === l.to && <span className="absolute inset-x-4 -bottom-[3px] h-0.5 bg-gold" aria-hidden="true" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#/create" onClick={go('create')} className="btn-primary hidden !py-2.5 sm:inline-flex">
            Create My Introduction
          </a>
          <button
            type="button"
            className="btn-ghost !p-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="animate-fade-in border-t border-line bg-white px-4 pt-2 pb-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to === 'home' ? '#/' : '#/create'}
              onClick={go(l.to)}
              aria-current={route === l.to ? 'page' : undefined}
              className={`block rounded px-3 py-3 text-base font-semibold ${route === l.to ? 'bg-mist text-navy' : 'text-slate'}`}
            >
              {l.label}
            </a>
          ))}
          <a href="#/create" onClick={go('create')} className="btn-primary mt-2 w-full sm:hidden">
            Create My Introduction
          </a>
        </nav>
      )}
    </header>
  );
}
