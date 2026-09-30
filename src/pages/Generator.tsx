import { ArrowLeft, CircleAlert, Eye, Pencil, RotateCcw, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BannerCanvas, { BannerArtboard } from '../components/BannerCanvas';
import BannerPreview from '../components/BannerPreview';
import ConfirmDialog from '../components/ConfirmDialog';
import ExportControls from '../components/ExportControls';
import GeneratingOverlay, { GENERATION_STEPS } from '../components/GeneratingOverlay';
import IntroductionForm from '../components/IntroductionForm';
import { useToast } from '../components/Toast';
import type { useBannerState } from '../hooks/useBannerState';
import type { BannerState } from '../types';
import { renderBannerPng } from '../utils/exportBanner';
import { FIELD_LABELS, FIELD_ORDER, validate, type FieldKey } from '../utils/validation';

const REQUIRED: FieldKey[] = ['fullName', 'jobTitle', 'company', 'programme', 'classYear', 'location', 'email', 'photo'];
const STEP_MS = 850;

type Banner = ReturnType<typeof useBannerState>;

function stateKey(s: BannerState): string {
  const photo = s.photo ? `${s.photo.src.length}:${s.photo.src.slice(-48)}:${s.photo.focusY}` : '';
  return JSON.stringify([s.profile, s.visibility, s.template, photo]);
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Generator({ banner }: { banner: Banner }) {
  const { state, setField, setPhoto, setTemplate, setVisibility, reset } = banner;
  const notify = useToast();

  const [view, setView] = useState<'form' | 'result'>('form');
  const [step, setStep] = useState(-1);
  const [touched, setTouched] = useState<Set<FieldKey>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const exportRef = useRef<HTMLDivElement>(null);
  const cache = useRef<{ key: string; blob: Blob } | null>(null);
  const key = useMemo(() => stateKey(state), [state]);

  const errors = useMemo(() => validate(state.profile, state.photo), [state.profile, state.photo]);
  const shownErrors = useMemo(() => {
    if (submitted) return errors;
    return Object.fromEntries(Object.entries(errors).filter(([k]) => touched.has(k as FieldKey)));
  }, [errors, touched, submitted]);
  const invalid = FIELD_ORDER.filter((k) => errors[k]);
  const completed = REQUIRED.filter((k) => !errors[k]).length;
  const isValid = invalid.length === 0;

  const onTouch = useCallback((k: FieldKey) => setTouched((t) => (t.has(k) ? t : new Set(t).add(k))), []);

  const peekBlob = useCallback(() => (cache.current?.key === key ? cache.current.blob : null), [key]);
  const getBlob = useCallback(async () => {
    const hit = peekBlob();
    if (hit) return hit;
    const node = exportRef.current;
    if (!node) throw new Error('not-ready');
    const blob = await renderBannerPng(node);
    cache.current = { key, blob };
    return blob;
  }, [key, peekBlob]);

  // Leaving the result screen for the form must not lose scroll context.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  function focusFirstError() {
    const first = invalid[0];
    if (!first) return;
    const el = document.getElementById(first === 'photo' ? 'sec-photo-legend' : `f-${first}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (first !== 'photo') window.setTimeout(() => (el as HTMLElement | null)?.focus({ preventScroll: true }), 350);
  }

  async function generate() {
    if (!isValid) {
      setSubmitted(true);
      notify(`Almost there — please complete: ${invalid.map((k) => FIELD_LABELS[k]).join(', ')}.`, 'error');
      focusFirstError();
      return;
    }
    setStep(0);
    const render = getBlob().catch(() => null); // pre-render so Download/Share are instant
    for (let i = 1; i < GENERATION_STEPS.length; i++) {
      await wait(STEP_MS);
      setStep(i);
    }
    await Promise.all([wait(STEP_MS), render]);
    setStep(GENERATION_STEPS.length);
    await wait(700);
    setStep(-1);
    setView('result');
  }

  function createAnother() {
    reset();
    cache.current = null;
    setTouched(new Set());
    setSubmitted(false);
    setConfirmReset(false);
    setView('form');
    notify('Fresh start — enter the new details below.', 'info');
  }

  return (
    <div className="bg-mist">
      {/* Off-screen, full-size artboard used for PNG export. Never visible. */}
      <div aria-hidden="true" style={{ position: 'fixed', left: -20000, top: 0, pointerEvents: 'none' }}>
        <BannerArtboard ref={exportRef} state={state} />
      </div>

      {view === 'result' ? (
        <ResultView
          state={state}
          getBlob={getBlob}
          peekBlob={peekBlob}
          onEdit={() => setView('form')}
          onCreateAnother={() => setConfirmReset(true)}
        />
      ) : (
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-28 sm:px-6 sm:pt-12 lg:px-8 lg:pb-16">
          <header className="max-w-3xl">
            <p className="eyebrow">Introduce Yourself</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">LBS Alumni Personal Introduction</h1>
            <p className="mt-2 text-base text-slate sm:text-lg">Tell us about yourself and we’ll create your introduction.</p>
          </header>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-10">
            <div className="order-2 min-w-0 lg:order-1">
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  generate();
                }}
                className="rounded-md border border-line bg-white p-5 shadow-sm sm:p-8"
                aria-label="Your introduction details"
              >
                <IntroductionForm
                  state={state}
                  errors={shownErrors}
                  setField={setField}
                  setPhoto={setPhoto}
                  setTemplate={setTemplate}
                  setVisibility={setVisibility}
                  onTouch={onTouch}
                />

                <div className="mt-8 border-t border-line pt-7">
                  <button type="submit" className="btn-primary w-full py-4 text-base" aria-disabled={!isValid} aria-describedby="generate-status">
                    <Sparkles className="size-5 text-gold" aria-hidden="true" /> Generate Introduction
                  </button>
                  <GenerateStatus id="generate-status" invalid={invalid} />
                </div>
              </form>
            </div>

            <div className="order-1 min-w-0 lg:order-2">
              <div className="lg:sticky lg:top-28">
                <BannerPreview state={state} completed={completed} total={REQUIRED.length} />
                <p className="mt-4 hidden text-sm leading-relaxed text-slate lg:block">
                  Your banner updates as you type. When you’re ready, press <strong className="text-navy">Generate Introduction</strong> to finalise a
                  high-resolution 1600 × 900 PNG.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'form' && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-2xl gap-2">
            <button type="button" className="btn-secondary flex-none !px-4" onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}>
              <Eye className="size-4" aria-hidden="true" /> Preview
            </button>
            <button type="button" className="btn-primary flex-1" onClick={generate} aria-disabled={!isValid}>
              <Sparkles className="size-4 text-gold" aria-hidden="true" /> Generate
              <span className="ml-1 rounded-full bg-white/15 px-2 py-0.5 text-xs tabular-nums">
                {completed}/{REQUIRED.length}
              </span>
            </button>
          </div>
        </div>
      )}

      {step >= 0 && <GeneratingOverlay step={step} />}

      <ConfirmDialog
        open={confirmReset}
        title="Create another introduction?"
        message="This clears the current details and photo so you can start fresh. Download your banner first if you haven’t already."
        confirmLabel="Clear & start again"
        onConfirm={createAnother}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}

function GenerateStatus({ id, invalid }: { id: string; invalid: FieldKey[] }) {
  if (!invalid.length)
    return (
      <p id={id} className="mt-3 text-center text-sm text-emerald-700">
        Everything looks great — you’re ready to generate.
      </p>
    );
  return (
    <p id={id} className="mt-3 flex items-start justify-center gap-1.5 text-center text-sm text-slate">
      <CircleAlert className="mt-0.5 size-4 flex-none text-gold-dark" aria-hidden="true" />
      <span>
        To generate, please complete: <span className="font-medium text-navy">{invalid.map((k) => FIELD_LABELS[k]).join(', ')}</span>
      </span>
    </p>
  );
}

interface ResultProps {
  state: BannerState;
  getBlob: () => Promise<Blob>;
  peekBlob: () => Blob | null;
  onEdit: () => void;
  onCreateAnother: () => void;
}

function ResultView({ state, getBlob, peekBlob, onEdit, onCreateAnother }: ResultProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-navy" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_-10%,rgba(217,162,27,0.28),transparent_45%)]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14 lg:px-8">
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 rounded text-sm font-semibold text-white/80 hover:text-white">
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to details
        </button>
        <div className="mt-6 animate-fade-up text-center">
          <p className="font-display text-xs font-bold tracking-[0.3em] text-gold uppercase">Connect | Support | Grow</p>
          <h1 ref={headingRef} tabIndex={-1} className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white outline-none sm:text-5xl">
            Your LBS Alumni Introduction is Ready
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/75">Download it, share it with your network, or fine-tune your details at any time.</p>
        </div>

        <figure className="mt-10 animate-fade-up">
          <div className="overflow-hidden rounded-sm bg-white shadow-[0_40px_90px_-30px_rgba(3,12,28,0.6)] ring-1 ring-black/5">
            <BannerCanvas state={state} minWidth={560} label={`Your generated introduction banner, ${state.profile.fullName}`} />
          </div>
          <figcaption className="mt-3 text-center text-xs text-slate">1600 × 900 px PNG · 16:9 · optimised for WhatsApp, LinkedIn and email</figcaption>
        </figure>

        <div className="mt-8 flex flex-col items-stretch gap-4 rounded-md border border-line bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <ExportControls state={state} getBlob={getBlob} peekBlob={peekBlob} />
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <button type="button" className="btn-ghost border border-transparent" onClick={onEdit}>
              <Pencil className="size-4" aria-hidden="true" /> Edit Details
            </button>
            <button type="button" className="btn-ghost border border-transparent" onClick={onCreateAnother}>
              <RotateCcw className="size-4" aria-hidden="true" /> Create Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
