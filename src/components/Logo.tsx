import type { CSSProperties } from 'react';
import { LOGO_ALT, LOGOS } from '../config/brand';

interface LogoProps {
  /** Height of each logo in px. */
  height: number;
  /** navy for light backgrounds, white for navy backgrounds. */
  tone?: 'navy' | 'white';
  /**
   * Optional Tailwind classes that set `--logo-h` responsively, e.g.
   * "[--logo-h:30px] sm:[--logo-h:40px]". Overrides `height` when given.
   */
  heightClass?: string;
  className?: string;
  decorative?: boolean;
}

/** Lagos Business School and LBSAA logos, side by side with a hairline divider. */
export default function Logo({ height, tone = 'navy', heightClass, className = '', decorative = false }: LogoProps) {
  const h = 'var(--logo-h)';
  const style = { ...(heightClass ? {} : { '--logo-h': `${height}px` }), display: 'flex', alignItems: 'center', gap: `calc(${h} * 0.24)`, alignSelf: 'flex-start', flex: 'none' } as CSSProperties;
  const img = (key: 'lbs' | 'lbsaa') => (
    <img
      src={LOGOS[key][tone]}
      alt={decorative ? '' : LOGO_ALT[key]}
      draggable={false}
      style={{ height: h, width: `calc(${h} * ${LOGOS[key].ratio.toFixed(4)})`, display: 'block', flex: 'none' }}
    />
  );
  return (
    <div className={`${heightClass ?? ''} ${className}`} style={style}>
      {img('lbs')}
      <span aria-hidden="true" style={{ width: 1.5, height: `calc(${h} * 0.82)`, background: tone === 'white' ? 'rgba(255,255,255,0.4)' : '#C9D1DD', flex: 'none' }} />
      {img('lbsaa')}
    </div>
  );
}
