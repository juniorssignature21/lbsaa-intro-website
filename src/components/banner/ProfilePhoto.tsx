import type { CSSProperties } from 'react';
import type { PhotoData } from '../../types';

interface ProfilePhotoProps {
  photo: PhotoData | null;
  width: number;
  height: number;
  shape: 'circle' | 'arch';
  alt: string;
  style?: CSSProperties;
  placeholderTone?: 'navy' | 'light';
}

/** Portrait masked into a circle or arch. Never distorts: object-fit: cover with an adjustable focal point. */
export default function ProfilePhoto({ photo, width, height, shape, alt, style, placeholderTone = 'navy' }: ProfilePhotoProps) {
  const radius = shape === 'circle' ? '50%' : `${width / 2}px ${width / 2}px 0 0`;
  const base: CSSProperties = {
    width,
    height,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'absolute',
    ...style,
  };

  if (!photo) {
    const dark = placeholderTone === 'navy';
    return (
      <div
        role="img"
        aria-label="Profile photo placeholder"
        style={{
          ...base,
          background: dark
            ? 'radial-gradient(circle at 50% 35%, #1C3A6B 0%, #0B2348 55%, #071A36 100%)'
            : 'radial-gradient(circle at 50% 35%, #FFFFFF 0%, #EEF1F5 60%, #DFE4EB 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <svg viewBox="0 0 200 200" width={Math.min(width, height) * 0.78} aria-hidden="true">
          <circle cx="100" cy="72" r="38" fill={dark ? '#2A4A7D' : '#C9D2DE'} />
          <path d="M22 200c4-52 38-80 78-80s74 28 78 80Z" fill={dark ? '#2A4A7D' : '#C9D2DE'} />
          <path d="M92 124h16l-3 60h-10Z" fill="#D9A21B" opacity="0.85" />
        </svg>
      </div>
    );
  }

  return (
    <div style={base}>
      <img
        src={photo.src}
        alt={alt}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: `50% ${photo.focusY}%`,
          display: 'block',
        }}
      />
    </div>
  );
}
