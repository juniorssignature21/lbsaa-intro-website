import { ArrowRight, Download, ImageUp, PenLine } from 'lucide-react';
import { useState } from 'react';
import BannerCanvas from '../components/BannerCanvas';
import Hero from '../components/Hero';
import { BRAND } from '../config/brand';
import { SAMPLE_STATE } from '../data/sampleData';
import type { TemplateId } from '../types';

const STEPS = [
  { icon: PenLine, title: 'Enter your details', text: 'Your name, role, organisation and LBS journey — the essentials alumni want to know.' },
  { icon: ImageUp, title: 'Upload your photo', text: 'A professional headshot. We crop and frame it automatically — no editing required.' },
  { icon: Download, title: 'Download & share', text: 'Get a polished 1600 × 900 banner, ready for WhatsApp, LinkedIn and alumni groups.' },
];

const EXAMPLES: { id: TemplateId; name: string; text: string }[] = [
  { id: 'executive', name: 'Executive', text: 'Light and authoritative, with a gold-arced portrait and navy footer.' },
  { id: 'modern', name: 'Modern', text: 'Bold navy blocks, gold geometry and an arched portrait.' },
  { id: 'minimal', name: 'Minimal', text: 'Quiet, refined and mostly white — the typography does the talking.' },
];

export default function Home({ onCreate }: { onCreate: () => void }) {
  const [example, setExample] = useState<TemplateId>('modern');
  const active = EXAMPLES.find((e) => e.id === example)!;

  return (
    <>
      <Hero onCreate={onCreate} onExample={() => document.getElementById('examples')?.scrollIntoView({ behavior: 'smooth' })} />

      <section className="bg-white py-16 sm:py-24" aria-labelledby="how-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 id="how-title" className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              You bring the story. We handle the design.
            </h2>
          </div>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative bg-white p-7 sm:p-8">
                <span className="font-display text-5xl font-extrabold text-gold/25" aria-hidden="true">
                  0{i + 1}
                </span>
                <s.icon className="mt-4 size-7 text-navy" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="examples" className="scroll-mt-20 bg-mist py-16 sm:py-24" aria-labelledby="examples-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">See an example</p>
              <h2 id="examples-title" className="mt-3 font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                Three distinguished styles. One LBSAA identity.
              </h2>
              <p className="mt-3 text-slate">Every style is generated from the same details — switch at any time without retyping a thing.</p>
            </div>
            <div role="tablist" aria-label="Banner styles" className="inline-flex self-start rounded-md border border-line bg-white p-1 lg:self-auto">
              {EXAMPLES.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  role="tab"
                  id={`tab-${e.id}`}
                  aria-selected={example === e.id}
                  aria-controls="example-panel"
                  onClick={() => setExample(e.id)}
                  className={`rounded px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${example === e.id ? 'bg-navy text-white' : 'text-slate hover:text-navy'}`}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>

          <div id="example-panel" role="tabpanel" aria-labelledby={`tab-${example}`} className="mt-10">
            <div className="overflow-hidden rounded-sm bg-white shadow-[0_30px_60px_-30px_rgba(7,26,54,0.4)] ring-1 ring-navy/10">
              <BannerCanvas state={{ ...SAMPLE_STATE, template: example }} minWidth={560} label={`Sample banner in the ${active.name} style`} />
            </div>
            <p className="mt-4 text-sm text-slate">
              <span className="font-semibold text-navy">{active.name}.</span> {active.text}
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 text-white sm:py-24" aria-labelledby="cta-title">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-[linear-gradient(115deg,transparent_0_40%,rgba(217,162,27,0.9)_40%_42%,transparent_42%)] opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-display text-sm font-bold tracking-[0.3em] text-gold uppercase">{BRAND.pillars.join('  |  ')}</p>
          <h2 id="cta-title" className="mt-4 max-w-3xl font-display text-3xl leading-tight font-extrabold sm:text-5xl">
            Enter your information. Upload your photo. <span className="text-gold">We create the design for you.</span>
          </h2>
          <p className="mt-5 max-w-xl text-white/75">{BRAND.motto} — let the network know who you are and where you are now.</p>
          <button type="button" onClick={onCreate} className="btn-gold mt-8 px-7 py-3.5 text-base">
            Create My Introduction <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </>
  );
}
