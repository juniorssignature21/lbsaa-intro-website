import type { PhotoData, ProfileData } from '../types';

export type FieldKey = keyof ProfileData | 'photo';
export type Errors = Partial<Record<FieldKey, string>>;

export const BIO_MIN_WORDS = 20;
export const BIO_MAX_WORDS = 30;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

export const FIELD_LABELS: Record<FieldKey, string> = {
  fullName: 'Full name',
  jobTitle: 'Job title',
  company: 'Company',
  bio: 'Personal introduction',
  programme: 'LBS programme',
  classYear: 'Class year',
  location: 'Location',
  email: 'Professional email',
  phone: 'Phone number',
  linkedin: 'LinkedIn',
  website: 'Website',
  photo: 'Profile photo',
};

/** Order used to find the first invalid field when the user tries to generate. */
export const FIELD_ORDER: FieldKey[] = [
  'fullName',
  'jobTitle',
  'company',
  'bio',
  'programme',
  'classYear',
  'location',
  'email',
  'phone',
  'linkedin',
  'website',
  'photo',
];

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function validate(profile: ProfileData, photo: PhotoData | null): Errors {
  const e: Errors = {};
  const v = (s: string) => s.trim();

  if (!v(profile.fullName)) e.fullName = 'Please enter your full name.';
  else if (v(profile.fullName).length < 3) e.fullName = 'Your name looks a little short.';

  if (!v(profile.jobTitle)) e.jobTitle = 'Please add your job title or position.';
  if (!v(profile.company)) e.company = 'Please add your company or organisation.';
  if (!v(profile.programme)) e.programme = 'Please tell us your LBS programme.';
  if (!v(profile.location)) e.location = 'Please add your location, e.g. Lagos, Nigeria.';

  const year = v(profile.classYear);
  const maxYear = new Date().getFullYear() + 1;
  if (!year) e.classYear = 'Please add your class or graduation year.';
  else if (!/^\d{4}$/.test(year) || +year < 1991 || +year > maxYear)
    e.classYear = `Enter a year between 1991 and ${maxYear}.`;

  if (!v(profile.email)) e.email = 'Please add your professional email.';
  else if (!EMAIL_RE.test(v(profile.email))) e.email = 'That email address doesn’t look quite right.';

  if (v(profile.phone) && !PHONE_RE.test(v(profile.phone)))
    e.phone = 'Use digits only, e.g. +234 803 123 4567.';
  if (v(profile.linkedin) && !URL_RE.test(v(profile.linkedin)))
    e.linkedin = 'Paste your LinkedIn profile link, e.g. linkedin.com/in/yourname.';
  if (v(profile.website) && !URL_RE.test(v(profile.website)))
    e.website = 'Enter a valid web address, e.g. yourcompany.com.';

  const words = countWords(profile.bio);
  if (words > BIO_MAX_WORDS)
    e.bio = `Please keep your introduction to ${BIO_MAX_WORDS} words or fewer (${words} now).`;
  else if (words > 0 && words < BIO_MIN_WORDS)
    e.bio = `Aim for ${BIO_MIN_WORDS}–${BIO_MAX_WORDS} words — add a little more (${words} so far).`;

  if (!photo) e.photo = 'Please upload a professional photo.';

  return e;
}

/** Strip protocol / trailing slash so links read cleanly on the banner. */
export function prettyUrl(url: string): string {
  return url
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/$/, '');
}
