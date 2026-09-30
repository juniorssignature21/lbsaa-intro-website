import { CircleAlert, ImageUp, LoaderCircle, MoveVertical, RefreshCw, Trash2 } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import type { PhotoData } from '../types';
import { ACCEPT_ATTR, MAX_UPLOAD_MB, PhotoError, processPhoto } from '../utils/image';

interface Props {
  photo: PhotoData | null;
  onChange: (photo: PhotoData | null) => void;
  error?: string;
}

export default function PhotoUploader({ photo, onChange, error }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState('');
  const [dragging, setDragging] = useState(false);
  const id = useId();
  const inputId = `photo-${id}`;
  const shownError = localError || error;

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setLocalError('');
    try {
      const src = await processPhoto(file);
      onChange({ src, focusY: 30 });
    } catch (e) {
      setLocalError(e instanceof PhotoError && e.message.length > 12 ? e.message : 'We couldn’t use that image. Please try another photo.');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="sm:col-span-2">
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={ACCEPT_ATTR}
        className="sr-only"
        tabIndex={-1}
        aria-describedby={`${inputId}-help${shownError ? ` ${inputId}-error` : ''}`}
        aria-invalid={!!shownError}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {photo ? (
        <div className="flex flex-col gap-5 rounded-md border border-line bg-mist/60 p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="relative mx-auto size-32 flex-none sm:mx-0">
            <div className="absolute -inset-1.5 rounded-full border-2 border-gold" aria-hidden="true" />
            <img src={photo.src} alt="Your uploaded profile photo" className="size-32 rounded-full object-cover ring-4 ring-white" style={{ objectPosition: `50% ${photo.focusY}%` }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-navy">Looking good. Your photo is framed automatically.</p>
            <label htmlFor={`${inputId}-focus`} className="mt-3 flex items-center gap-2 text-[13px] font-medium text-slate">
              <MoveVertical className="size-4" aria-hidden="true" /> Adjust vertical framing
            </label>
            <input
              id={`${inputId}-focus`}
              type="range"
              min={0}
              max={100}
              value={photo.focusY}
              onChange={(e) => onChange({ ...photo, focusY: Number(e.target.value) })}
              className="mt-2 w-full accent-navy"
              aria-valuetext={`${photo.focusY}% from top`}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <label htmlFor={inputId} className="btn-secondary cursor-pointer !px-3.5 !py-2 text-[13px]" tabIndex={0} role="button" onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), inputRef.current?.click())}>
                <RefreshCw className="size-4" aria-hidden="true" /> Change photo
              </label>
              <button type="button" className="btn-ghost !px-3.5 !py-2 text-[13px] text-red-700 hover:bg-red-50" onClick={() => { setLocalError(''); onChange(null); }}>
                <Trash2 className="size-4" aria-hidden="true" /> Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          tabIndex={0}
          role="button"
          aria-label="Upload professional photo"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), inputRef.current?.click())}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); }}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-6 py-9 text-center transition-colors ${
            dragging ? 'border-gold bg-gold-soft/50' : shownError ? 'border-red-400 bg-red-50/40' : 'border-line bg-mist/50 hover:border-navy/40 hover:bg-mist'
          }`}
        >
          {busy ? (
            <LoaderCircle className="size-9 animate-spin text-navy" aria-hidden="true" />
          ) : (
            <span className="flex size-14 items-center justify-center rounded-full bg-navy text-gold">
              <ImageUp className="size-6" aria-hidden="true" />
            </span>
          )}
          <span className="mt-4 font-display text-base font-bold text-navy">{busy ? 'Preparing your photo…' : 'Upload Professional Photo'}</span>
          <span className="mt-1 text-sm text-slate">Drag & drop or click to browse</span>
        </label>
      )}

      <p id={`${inputId}-help`} className="mt-2 text-[13px] text-slate/90">
        JPG, PNG or WEBP · up to {MAX_UPLOAD_MB} MB · a well-lit head-and-shoulders shot works best.
      </p>
      {shownError && (
        <p id={`${inputId}-error`} className="mt-1.5 flex items-start gap-1.5 text-[13px] text-red-700" role="alert">
          <CircleAlert className="mt-px size-4 flex-none" aria-hidden="true" /> {shownError}
        </p>
      )}
    </div>
  );
}
