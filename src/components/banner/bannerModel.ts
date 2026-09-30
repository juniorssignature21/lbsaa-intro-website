import type { BannerState, PhotoData } from '../../types';
import { prettyUrl } from '../../utils/validation';

export type DetailKey = 'location' | 'programme' | 'email' | 'phone' | 'linkedin' | 'website';

export interface DetailItem {
  key: DetailKey;
  label: string;
  value: string;
  placeholder: boolean;
}

export interface BannerModel {
  /** Nothing entered yet — templates show the welcome placeholder. */
  empty: boolean;
  name: string;
  namePlaceholder: boolean;
  titleLines: string[];
  titlePlaceholder: boolean;
  company: string;
  companyPlaceholder: boolean;
  bio: string;
  details: DetailItem[];
  photo: PhotoData | null;
}

const t = (s: string) => s.trim();

export function buildModel({ profile: p, visibility: vis, photo }: BannerState): BannerModel {
  const empty = !t(p.fullName) && !t(p.jobTitle) && !t(p.company) && !t(p.programme) && !t(p.email) && !photo;

  const title = t(p.jobTitle);
  const titleLines = title
    ? title
        .split(/\s*\|\s*/)
        .filter(Boolean)
        .slice(0, 2)
    : ['Your Position'];

  const programme = t(p.programme);
  const year = t(p.classYear);
  const programmeValue = [programme, year && `Class of ${year}`].filter(Boolean).join('  ·  ');

  const details: DetailItem[] = [
    {
      key: 'location',
      label: 'Location',
      value: t(p.location) || 'Your location',
      placeholder: !t(p.location),
    },
    {
      key: 'programme',
      label: 'LBS Journey',
      value: programmeValue || 'LBS Programme  ·  Class of 20XX',
      placeholder: !programmeValue,
    },
  ];
  if (vis.email)
    details.push({ key: 'email', label: 'Email', value: t(p.email) || 'you@company.com', placeholder: !t(p.email) });
  if (vis.phone && t(p.phone)) details.push({ key: 'phone', label: 'Phone', value: t(p.phone), placeholder: false });
  if (vis.linkedin && t(p.linkedin))
    details.push({ key: 'linkedin', label: 'LinkedIn', value: prettyUrl(p.linkedin), placeholder: false });
  if (vis.website && t(p.website))
    details.push({ key: 'website', label: 'Website', value: prettyUrl(p.website), placeholder: false });

  return {
    empty,
    name: t(p.fullName) || 'Your Name',
    namePlaceholder: !t(p.fullName),
    titleLines,
    titlePlaceholder: !title,
    company: t(p.company) || 'Your Organisation',
    companyPlaceholder: !t(p.company),
    bio: vis.bio ? t(p.bio) : '',
    details,
    photo,
  };
}

/**
 * Estimates a font size that keeps `text` on one line within `maxWidth`.
 * `ratio` is the average glyph width in em for the font/weight used.
 */
export function fitFont(text: string, max: number, min: number, maxWidth: number, ratio = 0.58): number {
  const est = maxWidth / Math.max(1, text.length * ratio);
  return Math.round(Math.max(min, Math.min(max, est)));
}
