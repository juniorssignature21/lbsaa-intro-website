export type TemplateId = 'executive' | 'modern' | 'minimal';

export interface ProfileData {
  fullName: string;
  jobTitle: string;
  company: string;
  bio: string;
  programme: string;
  classYear: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
}

export interface Visibility {
  email: boolean;
  phone: boolean;
  linkedin: boolean;
  website: boolean;
  bio: boolean;
}

export interface PhotoData {
  /** Downscaled JPEG data URL — kept in the browser only. */
  src: string;
  /** Vertical focal point for object-position, 0–100 (%). */
  focusY: number;
}

export interface BannerState {
  profile: ProfileData;
  visibility: Visibility;
  template: TemplateId;
  photo: PhotoData | null;
}
