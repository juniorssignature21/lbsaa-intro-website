import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_VISIBILITY, EMPTY_PROFILE } from '../data/sampleData';
import type { BannerState, PhotoData, ProfileData, TemplateId, Visibility } from '../types';

const FORM_KEY = 'lbsaa-intro:form:v1';
// The photo lives in sessionStorage: it survives a refresh but is discarded
// when the tab closes, and it never leaves the browser.
const PHOTO_KEY = 'lbsaa-intro:photo:v1';

const TEMPLATES: TemplateId[] = ['executive', 'modern', 'minimal'];

function load(): BannerState {
  const state: BannerState = {
    profile: { ...EMPTY_PROFILE },
    visibility: { ...DEFAULT_VISIBILITY },
    template: 'executive',
    photo: null,
  };
  try {
    const raw = localStorage.getItem(FORM_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<BannerState>;
      for (const k of Object.keys(EMPTY_PROFILE) as (keyof ProfileData)[]) {
        const v = saved.profile?.[k];
        if (typeof v === 'string') state.profile[k] = v;
      }
      for (const k of Object.keys(DEFAULT_VISIBILITY) as (keyof Visibility)[]) {
        const v = saved.visibility?.[k];
        if (typeof v === 'boolean') state.visibility[k] = v;
      }
      if (saved.template && TEMPLATES.includes(saved.template)) state.template = saved.template;
    }
  } catch {
    /* storage unavailable or corrupted — start fresh */
  }
  try {
    const rawPhoto = sessionStorage.getItem(PHOTO_KEY);
    if (rawPhoto) {
      const p = JSON.parse(rawPhoto) as PhotoData;
      if (typeof p.src === 'string' && p.src.startsWith('data:image/')) state.photo = { src: p.src, focusY: Number(p.focusY) || 30 };
    }
  } catch {
    /* ignore */
  }
  return state;
}

export function useBannerState() {
  const [state, setState] = useState<BannerState>(load);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const { profile, visibility, template } = state;
        localStorage.setItem(FORM_KEY, JSON.stringify({ profile, visibility, template }));
      } catch {
        /* quota / private mode — persistence is best-effort */
      }
    }, 250);
    return () => window.clearTimeout(id);
  }, [state]);

  useEffect(() => {
    try {
      if (state.photo) sessionStorage.setItem(PHOTO_KEY, JSON.stringify(state.photo));
      else sessionStorage.removeItem(PHOTO_KEY);
    } catch {
      /* photo too large for storage — it simply won't survive a refresh */
    }
  }, [state.photo]);

  const setField = useCallback(<K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    setState((s) => ({ ...s, profile: { ...s.profile, [key]: value } }));
  }, []);

  const setVisibility = useCallback((key: keyof Visibility, value: boolean) => {
    setState((s) => ({ ...s, visibility: { ...s.visibility, [key]: value } }));
  }, []);

  const setTemplate = useCallback((template: TemplateId) => setState((s) => ({ ...s, template })), []);
  const setPhoto = useCallback((photo: PhotoData | null) => setState((s) => ({ ...s, photo })), []);

  const reset = useCallback(() => {
    setState({ profile: { ...EMPTY_PROFILE }, visibility: { ...DEFAULT_VISIBILITY }, template: 'executive', photo: null });
    try {
      localStorage.removeItem(FORM_KEY);
      sessionStorage.removeItem(PHOTO_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return { state, setField, setVisibility, setTemplate, setPhoto, reset };
}
