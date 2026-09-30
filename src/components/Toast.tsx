import { CheckCircle2, CircleAlert, Info, X } from 'lucide-react';
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

type Tone = 'success' | 'error' | 'info';
interface ToastAction {
  label: string;
  onClick: () => void;
}
interface ToastItem {
  id: number;
  message: string;
  tone: Tone;
  action?: ToastAction;
}

type Notify = (message: string, tone?: Tone, action?: ToastAction) => void;
const ToastContext = createContext<Notify>(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setItems((all) => all.filter((t) => t.id !== id)), []);

  const notify = useCallback<Notify>(
    (message, tone = 'info', action) => {
      const id = nextId.current++;
      setItems((all) => [...all.slice(-2), { id, message, tone, action }]);
      window.setTimeout(() => dismiss(id), action ? 8000 : 4200);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 px-4 sm:bottom-6" aria-live="polite" role="status">
        {items.map((t) => {
          const Icon = t.tone === 'success' ? CheckCircle2 : t.tone === 'error' ? CircleAlert : Info;
          return (
            <div key={t.id} className="pointer-events-auto flex w-full max-w-md animate-fade-up items-start gap-3 rounded-lg border border-white/10 bg-navy-dark px-4 py-3 text-sm text-white shadow-2xl">
              <Icon className={`mt-0.5 size-5 flex-none ${t.tone === 'error' ? 'text-red-300' : 'text-gold'}`} aria-hidden="true" />
              <div className="flex-1">
                <p className="leading-snug">{t.message}</p>
                {t.action && (
                  <button
                    type="button"
                    className="mt-2 text-sm font-semibold text-gold underline-offset-4 hover:underline"
                    onClick={() => {
                      t.action?.onClick();
                      dismiss(t.id);
                    }}
                  >
                    {t.action.label}
                  </button>
                )}
              </div>
              <button type="button" onClick={() => dismiss(t.id)} className="-m-1 rounded p-1 text-white/60 hover:text-white" aria-label="Dismiss notification">
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
