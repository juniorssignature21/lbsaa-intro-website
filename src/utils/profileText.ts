import type { ProfileData, Visibility } from '../types';
import { prettyUrl } from './validation';

/** Plain-text version of the profile for the "Copy Profile" button. */
export function profileToText(p: ProfileData, vis: Visibility): string {
  const lines = [
    p.fullName,
    p.jobTitle,
    p.company,
    p.location,
    [p.programme, p.classYear && `Class of ${p.classYear}`].filter(Boolean).join(' — '),
    vis.email && p.email,
    vis.phone && p.phone,
    vis.linkedin && p.linkedin && prettyUrl(p.linkedin),
    vis.website && p.website && prettyUrl(p.website),
  ];
  let text = lines.filter((l) => l && String(l).trim()).join('\n');
  if (vis.bio && p.bio.trim()) text += `\n\n${p.bio.trim()}`;
  return `${text}\n\nLagos Business School Alumni Association — Connect | Support | Grow`;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function fileSlug(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return slug || 'lbs-alumni';
}
