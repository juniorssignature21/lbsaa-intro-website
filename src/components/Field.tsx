import { CircleAlert } from 'lucide-react';
import type { ReactNode } from 'react';

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  aside?: ReactNode;
  className?: string;
  children: (a11y: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string; 'aria-required'?: boolean }) => ReactNode;
}

/** Label + control + hint + friendly inline error, wired up for screen readers. */
export default function Field({ id, label, required, hint, error, aside, className = '', children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-error` : undefined;
  const describedBy = [errId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-navy">
          {label}
          {required ? (
            <span className="ml-0.5 text-gold-dark" aria-hidden="true">*</span>
          ) : (
            <span className="ml-1.5 text-xs font-normal text-slate/80">(optional)</span>
          )}
        </label>
        {aside}
      </div>
      {children({ id, 'aria-invalid': !!error, 'aria-describedby': describedBy, 'aria-required': required || undefined })}
      {error ? (
        <p id={errId} className="mt-1.5 flex items-start gap-1.5 text-[13px] text-red-700">
          <CircleAlert className="mt-px size-4 flex-none" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-[13px] text-slate/90">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function FormSection({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-7 first:border-t-0 first:pt-0" aria-labelledby={`${id}-legend`}>
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-center gap-3" aria-hidden="true">
        <span className="h-4 w-1 bg-gold" />
        <h2 id={`${id}-legend`} className="font-display text-xs font-extrabold tracking-[0.2em] text-navy uppercase">
          {title}
        </h2>
      </div>
      {subtitle && <p className="-mt-3 mb-5 text-sm text-slate">{subtitle}</p>}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
