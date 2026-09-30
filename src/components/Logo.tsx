import { LOGO_ALT, LOGO_SRC } from '../config/brand';

interface LogoProps {
  height: number;
  /** navy for light backgrounds, white for navy backgrounds. */
  tone?: 'navy' | 'white';
  className?: string;
  decorative?: boolean;
}

/** The official LBSAA emblem. */
export default function Logo({ height, tone = 'navy', className = '', decorative = false }: LogoProps) {
  return (
    <img
      src={LOGO_SRC[tone]}
      alt={decorative ? '' : LOGO_ALT}
      style={{ height, width: 'auto', display: 'block', alignSelf: 'flex-start', flex: 'none' }}
      draggable={false}
      className={className}
    />
  );
}
