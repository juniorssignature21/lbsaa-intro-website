/**
 * Single source of truth for branding.
 *
 * The Lagos Business School and LBSAA logos are shown side by side. Each comes
 * as a transparent PNG in the logo's own colour (light backgrounds) and in
 * white (navy backgrounds). The header, landing page, every banner template and
 * the exported PNG read from here.
 */
const asset = (f: string) => `${import.meta.env.BASE_URL}brand/${f}`;

export const LOGOS = {
  lbs: {
    navy: asset('lbs-logo-color.png'),
    white: asset('lbs-logo-white.png'),
    /** width ÷ height of the artwork */
    ratio: 1582 / 622,
  },
  lbsaa: {
    navy: asset('lbsaa-logo-color.png'),
    white: asset('lbsaa-logo-white.png'),
    ratio: 1380 / 780,
  },
} as const;

export const LOGO_ALT = {
  lbs: 'Lagos Business School, Pan-Atlantic University logo',
  lbsaa: 'Lagos Business School Alumni Association (LBSAA) logo',
} as const;

export const BRAND = {
  name: 'Lagos Business School Alumni Association',
  short: 'LBSAA',
  tag: 'Introduce Yourself',
  pillars: ['Connect', 'Support', 'Grow'] as const,
  /** Attribution line shown at the foot of every banner. */
  initiative: 'An initiative of LBSAA SS/SE Zone',
  colors: {
    navy: '#0B2348',
    navyDark: '#071A36',
    gold: '#D9A21B',
    white: '#FFFFFF',
    gray: '#F4F6F8',
  },
} as const;
