import { ArrowRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { SAMPLE_STATE } from '../data/sampleData';
import BannerCanvas from './BannerCanvas';
import Logo from './Logo';

interface HeroProps {
  onCreate: () => void;
  onExample: () => void;
}

export default function Hero({ onCreate, onExample }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-mist" aria-labelledby="hero-title">
      <HeroBackdrop />
      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex animate-fade-up justify-center">
            <Logo height={72} className="h-14 w-auto sm:h-[72px]" />
          </div>
          <p className="eyebrow mt-8 animate-fade-up">Lagos Business School Alumni Association</p>
          <h1 id="hero-title" className="mt-3 animate-fade-up font-display text-5xl font-extrabold tracking-tight text-navy uppercase sm:text-6xl lg:text-7xl">
            Introduce <span className="text-gold">Yourself</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl animate-fade-up text-lg font-semibold text-navy sm:text-xl">
            Create your professional LBS Alumni introduction banner in seconds.
          </p>
          <p className="mx-auto mt-3 max-w-xl animate-fade-up text-base leading-relaxed text-slate">
            Share who you are, what you do, and your LBS journey with the alumni community.
          </p>
          <div className="mt-8 flex animate-fade-up flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={onCreate} className="btn-primary px-7 py-3.5 text-base">
              Create My Introduction <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={onExample} className="btn-secondary px-7 py-3.5 text-base">
              See Example
            </button>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate">
            <li className="flex items-center gap-2"><Zap className="size-4 text-gold-dark" aria-hidden="true" /> Ready in under a minute</li>
            <li className="flex items-center gap-2"><Sparkles className="size-4 text-gold-dark" aria-hidden="true" /> No design skills needed</li>
            <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-gold-dark" aria-hidden="true" /> No sign-up · stays in your browser</li>
          </ul>
        </div>

        <figure className="relative mx-auto mt-12 max-w-6xl sm:mt-16">
          <div className="absolute -inset-2 translate-x-3 translate-y-3 rounded-sm border-2 border-gold/60 sm:-inset-3 sm:translate-x-5 sm:translate-y-5" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-sm bg-white shadow-[0_40px_80px_-30px_rgba(7,26,54,0.45)] ring-1 ring-navy/10">
            <BannerCanvas state={SAMPLE_STATE} label="Sample LBS Alumni introduction banner for Adebola Akinwale, Executive Director at Fortune Global Services" />
          </div>
          <figcaption className="mt-8 text-center text-sm text-slate">Sample introduction · Executive template · exported at 1600 × 900 px</figcaption>
        </figure>
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
      <defs>
        <pattern id="hero-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="#0B2348" opacity="0.10" />
        </pattern>
      </defs>
      <rect width="1440" height="900" fill="url(#hero-dots)" />
      <circle cx="1440" cy="0" r="340" fill="#0B2348" opacity="0.05" />
      <circle cx="1440" cy="0" r="420" fill="none" stroke="#D9A21B" strokeOpacity="0.35" strokeWidth="2" />
      <circle cx="0" cy="760" r="300" fill="none" stroke="#0B2348" strokeOpacity="0.08" strokeWidth="2" />
      <path d="M0 520 A 260 260 0 0 1 260 780" fill="none" stroke="#D9A21B" strokeOpacity="0.35" strokeWidth="2" />
    </svg>
  );
}
