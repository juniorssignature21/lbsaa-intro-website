/**
 * Single source of truth for LBSAA branding.
 *
 * The official LBSAA emblem (wordmark cropped off), as transparent PNGs:
 * navy for light backgrounds, white for navy backgrounds. The header,
 * landing page, every banner template and the exported PNG read from here.
 */
export const LOGO_SRC = {
  navy: `${import.meta.env.BASE_URL}brand/lbsaa-emblem-navy.png`,
  white: `${import.meta.env.BASE_URL}brand/lbsaa-emblem-white.png`,
} as const;
export const LOGO_ALT = 'Lagos Business School Alumni Association (LBSAA) logo';

export const BRAND = {
  name: 'Lagos Business School Alumni Association',
  short: 'LBSAA',
  tag: 'Introduce Yourself',
  pillars: ['Connect', 'Support', 'Grow'] as const,
  motto: 'Once a LBS, Always a LBS',
  colors: {
    navy: '#0B2348',
    navyDark: '#071A36',
    gold: '#D9A21B',
    white: '#FFFFFF',
    gray: '#F4F6F8',
  },
} as const;
