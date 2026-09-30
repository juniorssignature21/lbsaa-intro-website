import { Check } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Logo from './Logo';

export const GENERATION_STEPS = [
  'Creating your LBS Alumni introduction...',
  'Designing your profile...',
  'Finalizing your introduction...',
];

/** Short, premium progress sequence shown while the banner is finalised and rendered. */
export default function GeneratingOverlay({ step }: { step: number }) {
  const done = step >= GENERATION_STEPS.length;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const pct = Math.min(100, ((step + (done ? 0 : 0.5)) / GENERATION_STEPS.length) * 100);

  return (
    <div className="fixed inset-0 z-[60] flex animate-fade-in items-center justify-center bg-navy-dark/90 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Generating your introduction">
      <div ref={ref} tabIndex={-1} className="w-full max-w-md rounded-md bg-white p-8 text-center shadow-2xl outline-none sm:p-10">
        <div className="flex justify-center">
          <Logo height={52} decorative />
        </div>
        <div className="relative mx-auto mt-8 size-24">
          <svg viewBox="0 0 100 100" className="size-24 -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#EEF1F5" strokeWidth="6" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="#D9A21B" strokeWidth="6" strokeLinecap="round" strokeDasharray={276.5} strokeDashoffset={276.5 * (1 - pct / 100)} style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {done ? (
              <span className="flex size-12 animate-fade-in items-center justify-center rounded-full bg-navy text-gold">
                <Check className="size-6" strokeWidth={3} aria-hidden="true" />
              </span>
            ) : (
              <span className="font-display text-lg font-extrabold text-navy tabular-nums">{Math.round(pct)}%</span>
            )}
          </div>
        </div>
        <p key={step} className="mt-6 animate-fade-up font-display text-lg font-bold text-navy" aria-live="assertive">
          {done ? 'Your introduction is ready.' : GENERATION_STEPS[step]}
        </p>
        <ol className="mt-5 space-y-2 text-left text-sm">
          {GENERATION_STEPS.map((s, i) => (
            <li key={s} className={`flex items-center gap-2.5 transition-colors ${i < step ? 'text-navy' : i === step ? 'text-navy font-medium' : 'text-slate/50'}`}>
              <span className={`flex size-5 flex-none items-center justify-center rounded-full border ${i < step ? 'border-gold bg-gold text-navy-dark' : 'border-line'}`} aria-hidden="true">
                {i < step && <Check className="size-3" strokeWidth={3} />}
              </span>
              {s.replace('...', '')}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
