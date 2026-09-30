import { Check } from 'lucide-react';
import type { BannerState, TemplateId } from '../types';
import BannerCanvas from './BannerCanvas';

const OPTIONS: { id: TemplateId; name: string; text: string }[] = [
  { id: 'executive', name: 'Executive', text: 'Light & authoritative' },
  { id: 'modern', name: 'Modern', text: 'Bold navy geometry' },
  { id: 'minimal', name: 'Minimal', text: 'Clean & refined' },
];

export default function TemplateSelector({ state, onSelect }: { state: BannerState; onSelect: (t: TemplateId) => void }) {
  const move = (dir: 1 | -1) => {
    const i = OPTIONS.findIndex((o) => o.id === state.template);
    const next = OPTIONS[(i + dir + OPTIONS.length) % OPTIONS.length];
    onSelect(next.id);
    requestAnimationFrame(() => document.getElementById(`tpl-${next.id}`)?.focus());
  };

  return (
    <div className="sm:col-span-2">
      <p id="tpl-label" className="mb-2 text-sm font-semibold text-navy">
        Banner style
      </p>
      <div role="radiogroup" aria-labelledby="tpl-label" className="grid grid-cols-3 gap-2 sm:gap-3">
        {OPTIONS.map((o) => {
          const selected = state.template === o.id;
          return (
            <button
              key={o.id}
              id={`tpl-${o.id}`}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(o.id)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); move(1); }
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
              }}
              className={`group relative min-w-0 rounded-md border p-1.5 text-left transition-all ${selected ? 'border-navy bg-white ring-2 ring-gold' : 'border-line bg-white hover:border-navy/40'}`}
            >
              <div className="pointer-events-none overflow-hidden rounded-sm ring-1 ring-navy/5">
                <BannerCanvas state={{ ...state, template: o.id }} label={`${o.name} style preview`} />
              </div>
              <div className="px-1 pt-2 pb-1">
                <span className="block text-[13px] font-bold text-navy">{o.name}</span>
                <span className="hidden text-xs text-slate sm:block">{o.text}</span>
              </div>
              {selected && (
                <span className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-gold text-navy-dark shadow" aria-hidden="true">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
