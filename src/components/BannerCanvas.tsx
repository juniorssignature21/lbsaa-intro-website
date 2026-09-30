import { forwardRef, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { BannerState, TemplateId } from '../types';
import { buildModel, type BannerModel } from './banner/bannerModel';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import { BANNER_HEIGHT, BANNER_WIDTH } from '../utils/exportBanner';

const TEMPLATES: Record<TemplateId, (p: { m: BannerModel }) => React.JSX.Element> = {
  executive: ExecutiveTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
};

/** The raw 1600×900 artboard. This exact node is what gets exported. */
export const BannerArtboard = forwardRef<HTMLDivElement, { state: BannerState }>(function BannerArtboard({ state }, ref) {
  const model = useMemo(() => buildModel(state), [state]);
  const Template = TEMPLATES[state.template];
  return (
    <div ref={ref} style={{ width: BANNER_WIDTH, height: BANNER_HEIGHT, position: 'relative', overflow: 'hidden' }}>
      <Template m={model} />
    </div>
  );
});

interface BannerCanvasProps {
  state: BannerState;
  /** Minimum rendered width in CSS px; below this the canvas scrolls horizontally instead of shrinking. */
  minWidth?: number;
  className?: string;
  label?: string;
}

/**
 * Scales the artboard to fit its container while keeping the 16:9 composition
 * intact. Text stays live HTML, so it remains sharp at any size.
 */
export default function BannerCanvas({ state, minWidth = 0, className = '', label }: BannerCanvasProps) {
  const outer = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const renderWidth = Math.max(width, minWidth);
  const scale = renderWidth / BANNER_WIDTH;
  const scrolls = minWidth > 0 && width > 0 && width < minWidth;

  return (
    <div ref={outer} className={`w-full ${scrolls ? 'overflow-x-auto overscroll-x-contain' : 'overflow-hidden'} ${className}`} tabIndex={scrolls ? 0 : undefined} role="img" aria-label={label ?? `Introduction banner preview for ${state.profile.fullName || 'you'}`}>
      <div style={{ width: renderWidth, height: BANNER_HEIGHT * scale, position: 'relative' }} aria-hidden="true">
        {width > 0 && (
          <div style={{ width: BANNER_WIDTH, height: BANNER_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', left: 0, top: 0 }}>
            <BannerArtboard state={state} />
          </div>
        )}
      </div>
    </div>
  );
}
