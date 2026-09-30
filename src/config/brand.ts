/**
 * Single source of truth for LBSAA branding.
 *
 * To use the official logo, drop the file into `public/brand/` and point
 * LOGO_FILE at it (e.g. 'brand/lbsaa-logo.png'). The header, landing page,
 * every banner template and the exported PNG all read from here.
 */
const LOGO_FILE = 'brand/lbsaa-logo.svg';

export const LOGO_SRC = `${import.meta.env.BASE_URL}${LOGO_FILE}`;
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
