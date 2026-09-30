import { PROGRAMMES } from '../data/sampleData';
import type { BannerState, PhotoData, ProfileData, TemplateId, Visibility } from '../types';
import { BIO_MAX_WORDS, BIO_MIN_WORDS, countWords, type Errors, type FieldKey } from '../utils/validation';
import Field, { FormSection } from './Field';
import PhotoUploader from './PhotoUploader';
import TemplateSelector from './TemplateSelector';
import VisibilityToggles from './VisibilityToggles';

interface Props {
  state: BannerState;
  errors: Errors;
  setField: <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => void;
  setPhoto: (p: PhotoData | null) => void;
  setTemplate: (t: TemplateId) => void;
  setVisibility: (k: keyof Visibility, v: boolean) => void;
  onTouch: (k: FieldKey) => void;
}

type TextKey = Exclude<keyof ProfileData, 'bio'>;

interface TextSpec {
  key: TextKey;
  label: string;
  required?: boolean;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  hint?: string;
  list?: string;
  full?: boolean;
  maxLength?: number;
}

export default function IntroductionForm({ state, errors, setField, setPhoto, setTemplate, setVisibility, onTouch }: Props) {
  const { profile } = state;
  const words = countWords(profile.bio);

  const text = (s: TextSpec) => (
    <Field key={s.key} id={`f-${s.key}`} label={s.label} required={s.required} hint={s.hint} error={errors[s.key]} className={s.full ? 'sm:col-span-2' : ''}>
      {(a11y) => (
        <input
          {...a11y}
          name={s.key}
          type={s.type ?? 'text'}
          value={profile[s.key]}
          placeholder={s.placeholder}
          autoComplete={s.autoComplete}
          inputMode={s.inputMode}
          list={s.list}
          maxLength={s.maxLength ?? 120}
          onChange={(e) => setField(s.key, e.target.value)}
          onBlur={() => onTouch(s.key)}
          className="field-input"
        />
      )}
    </Field>
  );

  const counterTone = words > BIO_MAX_WORDS ? 'text-red-700' : words >= BIO_MIN_WORDS ? 'text-emerald-700' : 'text-slate';

  return (
    <div className="space-y-8">
      <FormSection id="sec-personal" title="Personal Information">
        {text({ key: 'fullName', label: 'Full Name', required: true, placeholder: 'e.g. Adebola Akinwale', autoComplete: 'name', full: true, maxLength: 60 })}
        {text({ key: 'jobTitle', label: 'Job Title / Position', required: true, placeholder: 'e.g. Executive Director | Strategy', autoComplete: 'organization-title', full: true, hint: 'Tip: use “|” to split your title across two lines.', maxLength: 90 })}
        {text({ key: 'company', label: 'Company / Organization', required: true, placeholder: 'e.g. Fortune Global Services', autoComplete: 'organization', full: true, maxLength: 60 })}
        <Field
          id="f-bio"
          label="Personal Introduction"
          error={errors.bio}
          hint={`${BIO_MIN_WORDS}–${BIO_MAX_WORDS} words. A short line on what you do and what drives you.`}
          className="sm:col-span-2"
          aside={
            <span className={`text-xs font-semibold tabular-nums ${counterTone}`} aria-live="polite">
              {words} / {BIO_MAX_WORDS} words
            </span>
          }
        >
          {(a11y) => (
            <textarea
              {...a11y}
              name="bio"
              rows={3}
              value={profile.bio}
              placeholder="e.g. I help organisations across West Africa build resilient growth strategies and high-performing teams…"
              onChange={(e) => setField('bio', e.target.value)}
              onBlur={() => onTouch('bio')}
              maxLength={320}
              className="field-input resize-y leading-relaxed"
            />
          )}
        </Field>
      </FormSection>

      <FormSection id="sec-lbs" title="LBS Journey">
        {text({ key: 'programme', label: 'LBS Programme', required: true, placeholder: 'e.g. Executive MBA (EMBA)', list: 'programmes', hint: 'Pick a suggestion or type your own.', maxLength: 60 })}
        {text({ key: 'classYear', label: 'Class Year', required: true, placeholder: 'e.g. 2018', inputMode: 'numeric', maxLength: 4 })}
        {text({ key: 'location', label: 'Location', required: true, placeholder: 'e.g. Lagos, Nigeria', autoComplete: 'address-level2', full: true, maxLength: 60 })}
        <datalist id="programmes">
          {PROGRAMMES.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>
      </FormSection>

      <FormSection id="sec-contact" title="Contact">
        {text({ key: 'email', label: 'Professional Email', required: true, type: 'email', placeholder: 'you@company.com', autoComplete: 'email', inputMode: 'email', full: true, maxLength: 80 })}
        {text({ key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+234 803 123 4567', autoComplete: 'tel', inputMode: 'tel', maxLength: 22 })}
        {text({ key: 'linkedin', label: 'LinkedIn', type: 'url', placeholder: 'linkedin.com/in/yourname', autoComplete: 'url', inputMode: 'url' })}
        {text({ key: 'website', label: 'Website', type: 'url', placeholder: 'yourcompany.com', autoComplete: 'url', inputMode: 'url', full: true })}
      </FormSection>

      <FormSection id="sec-photo" title="Profile Photo">
        <PhotoUploader photo={state.photo} onChange={(p) => { setPhoto(p); onTouch('photo'); }} error={errors.photo} />
      </FormSection>

      <FormSection id="sec-customize" title="Customize" subtitle="Optional — your banner is designed for you. Pick a style and choose what to show.">
        <TemplateSelector state={state} onSelect={setTemplate} />
        <VisibilityToggles value={state.visibility} onChange={setVisibility} />
      </FormSection>
    </div>
  );
}
