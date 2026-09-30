import type { BannerState, ProfileData, Visibility } from '../types';

export const EMPTY_PROFILE: ProfileData = {
  fullName: '',
  jobTitle: '',
  company: '',
  bio: '',
  programme: '',
  classYear: '',
  location: '',
  email: '',
  phone: '',
  linkedin: '',
  website: '',
};

export const DEFAULT_VISIBILITY: Visibility = {
  email: true,
  phone: true,
  linkedin: true,
  website: true,
  bio: true,
};

export const SAMPLE_PROFILE: ProfileData = {
  fullName: 'Adebola Akinwale',
  jobTitle: 'Executive Director | Strategic Growth & Innovation',
  company: 'Fortune Global Services',
  bio: 'I help organisations across West Africa build resilient growth strategies, scale high-performing teams and turn bold ideas into lasting enterprise value.',
  programme: 'LBS Alumni',
  classYear: '2018',
  location: 'Lagos, Nigeria',
  email: 'adebola.akinwale@fortune-global.com',
  phone: '',
  linkedin: '',
  website: '',
};

export const SAMPLE_PORTRAIT = `${import.meta.env.BASE_URL}brand/sample-portrait.svg`;

export const SAMPLE_STATE: BannerState = {
  profile: SAMPLE_PROFILE,
  visibility: DEFAULT_VISIBILITY,
  template: 'executive',
  photo: { src: SAMPLE_PORTRAIT, focusY: 30 },
};

/** Common LBS programmes — offered as suggestions, free text still allowed. */
export const PROGRAMMES = [
  'LBS Alumni',
  'Full-Time MBA',
  'Executive MBA (EMBA)',
  'Modular Executive MBA (MEMBA)',
  'Global Executive MBA',
  'Chief Executive Programme (CEP)',
  'Advanced Management Programme (AMP)',
  'Senior Management Programme (SMP)',
  'Owner Manager Programme (OMP)',
  'Management Development Programme (MDP)',
];
