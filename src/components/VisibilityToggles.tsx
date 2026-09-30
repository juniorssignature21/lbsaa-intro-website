import type { Visibility } from '../types';

const ITEMS: { key: keyof Visibility; label: string }[] = [
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone number' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'website', label: 'Website' },
  { key: 'bio', label: 'Personal introduction' },
];

export default function VisibilityToggles({ value, onChange }: { value: Visibility; onChange: (k: keyof Visibility, v: boolean) => void }) {
  return (
    <div className="sm:col-span-2">
      <p id="vis-label" className="mb-2 text-sm font-semibold text-navy">
        Show on banner
      </p>
      <ul aria-labelledby="vis-label" className="grid gap-2 sm:grid-cols-2">
        {ITEMS.map((item) => {
          const on = value[item.key];
          return (
            <li key={item.key}>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => onChange(item.key, !on)}
                className="flex w-full items-center justify-between gap-3 rounded-md border border-line bg-white px-3.5 py-2.5 text-left text-sm font-medium text-navy transition-colors hover:border-navy/30"
              >
                {item.label}
                <span className={`relative inline-flex h-6 w-10 flex-none items-center rounded-full transition-colors ${on ? 'bg-navy' : 'bg-line'}`} aria-hidden="true">
                  <span className={`inline-block size-4.5 rounded-full shadow transition-transform ${on ? 'translate-x-[19px] bg-gold' : 'translate-x-[3px] bg-white'}`} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-[13px] text-slate/90">Hidden details stay saved — they just won’t appear on the banner.</p>
    </div>
  );
}
