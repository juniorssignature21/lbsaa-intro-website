import { Eye, MoveHorizontal } from 'lucide-react';
import type { BannerState } from '../types';
import BannerCanvas from './BannerCanvas';

const NAMES = { executive: 'Executive', modern: 'Modern', minimal: 'Minimal' } as const;

interface Props {
  state: BannerState;
  completed: number;
  total: number;
}

/** Live preview panel shown beside (desktop) or above (mobile) the form. */
export default function BannerPreview({ state, completed, total }: Props) {
  const pct = Math.round((completed / total) * 100);
  return (
    <section id="preview" aria-labelledby="preview-title" className="scroll-mt-24 rounded-md border border-line bg-white p-3 shadow-[0_24px_50px_-30px_rgba(7,26,54,0.35)] sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <h2 id="preview-title" className="flex items-center gap-2 font-display text-sm font-bold text-navy">
          <Eye className="size-4 text-gold-dark" aria-hidden="true" /> Live preview
        </h2>
        <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-slate">{NAMES[state.template]} style</span>
      </div>
      <div className="overflow-hidden rounded-sm ring-1 ring-navy/10">
        <BannerCanvas state={state} minWidth={560} />
      </div>
      <p className="mt-2 flex items-center gap-1.5 px-1 text-xs text-slate sm:hidden">
        <MoveHorizontal className="size-3.5" aria-hidden="true" /> Swipe to see the full banner
      </p>
      <div className="mt-4 px-1">
        <div className="flex items-center justify-between text-xs font-semibold text-slate">
          <span>{completed === total ? 'All required details complete' : 'Required details'}</span>
          <span className="tabular-nums">
            {completed} / {total}
          </span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mist" role="progressbar" aria-label="Required details complete" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-gold transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </section>
  );
}
