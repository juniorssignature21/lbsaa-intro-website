import { useCallback, useEffect, useState } from 'react';

export type Route = 'home' | 'create';

function parse(): Route {
  return window.location.hash.startsWith('#/create') ? 'create' : 'home';
}

/** Minimal hash router — works on any static host with no server config. */
export function useHashRoute() {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => {
      setRoute(parse());
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((to: Route, anchor?: string) => {
    const hash = to === 'create' ? '#/create' : '#/';
    if (window.location.hash !== hash) window.location.hash = hash;
    setRoute(to);
    requestAnimationFrame(() => {
      if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0 });
    });
  }, []);

  return { route, navigate };
}
