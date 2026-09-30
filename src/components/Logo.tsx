import { LOGO_ALT, LOGO_SRC } from '../config/brand';

interface LogoProps {
  height: number;
  /** Sit the logo on a white plate — used on navy backgrounds so any official logo artwork stays legible. */
  plate?: boolean;
  className?: string;
  decorative?: boolean;
}

export default function Logo({ height, plate = false, className = '', decorative = false }: LogoProps) {
  const img = (
    <img
      src={LOGO_SRC}
      alt={decorative ? '' : LOGO_ALT}
      style={{ height, width: 'auto', display: 'block', alignSelf: 'flex-start', flex: 'none' }}
      draggable={false}
      className={plate ? '' : className}
    />
  );
  if (!plate) return img;
  return (
    <div
      className={className}
      style={{
        background: '#FFFFFF',
        padding: `${Math.round(height * 0.16)}px ${Math.round(height * 0.26)}px`,
        borderRadius: 6,
        display: 'inline-block',
        alignSelf: 'flex-start',
        boxShadow: '0 10px 30px rgba(3, 12, 28, 0.25)',
      }}
    >
      {img}
    </div>
  );
}
