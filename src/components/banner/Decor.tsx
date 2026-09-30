import type { CSSProperties } from 'react';
import { BRAND } from '../../config/brand';

/** Abstract Lagos skyline + campus arcade line art. Purely decorative. */
export function ArchitecturePattern({
  width,
  color,
  opacity,
  style,
}: {
  width: number;
  color: string;
  opacity: number;
  style?: CSSProperties;
}) {
  const towers: [number, number, number][] = [
    [40, 150, 60],
    [110, 90, 58],
    [178, 170, 46],
    [690, 110, 72],
    [772, 160, 48],
    [830, 40, 70],
    [912, 140, 84],
    [1006, 100, 56],
    [1072, 180, 96],
  ];
  const base = 290;
  return (
    <svg
      viewBox="0 0 1200 300"
      width={width}
      height={(width * 300) / 1200}
      aria-hidden="true"
      style={{ position: 'absolute', opacity, ...style }}
      fill="none"
      stroke={color}
      strokeWidth={2}
    >
      <line x1="0" y1={base} x2="1200" y2={base} />
      {towers.map(([x, y, w]) => (
        <g key={x}>
          <rect x={x} y={y} width={w} height={base - y} />
          {Array.from({ length: Math.floor((base - y - 20) / 22) }, (_, i) => (
            <line key={i} x1={x + 8} x2={x + w - 8} y1={y + 18 + i * 22} y2={y + 18 + i * 22} strokeWidth={1} />
          ))}
        </g>
      ))}
      {/* stepped crown on the tallest tower */}
      <path d="M842 40 V22 H888 V40 M858 22 V4" />
      {/* campus arcade with pediment */}
      <path d="M260 190 L420 140 L580 190" />
      <rect x="270" y="190" width="300" height={base - 190} />
      {Array.from({ length: 7 }, (_, i) => {
        const x = 284 + i * 40;
        return <path key={i} d={`M${x} ${base} V238 a14 14 0 0 1 28 0 V${base}`} />;
      })}
      <line x1="270" y1="214" x2="570" y2="214" strokeWidth={1} />
      {/* bridge */}
      <path d="M580 270 Q 635 236 690 270" />
      <path d="M600 262 V290 M635 252 V290 M670 262 V290" strokeWidth={1} />
    </svg>
  );
}

/** Soft dotted grid used as a background texture. */
export function DotGrid({
  cols,
  rows,
  gap,
  color,
  opacity,
  r = 2.2,
  style,
}: {
  cols: number;
  rows: number;
  gap: number;
  color: string;
  opacity: number;
  r?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={cols * gap}
      height={rows * gap}
      aria-hidden="true"
      style={{ position: 'absolute', opacity, ...style }}
    >
      {Array.from({ length: rows }, (_, y) =>
        Array.from({ length: cols }, (_, x) => (
          <circle key={`${x}-${y}`} cx={x * gap + gap / 2} cy={y * gap + gap / 2} r={r} fill={color} />
        )),
      )}
    </svg>
  );
}

/** "Connect | Support | Grow" with gold separators. */
export function BrandPillars({
  color,
  separator = BRAND.colors.gold,
  size = 20,
  tracking = '0.22em',
}: {
  color: string;
  separator?: string;
  size?: number;
  tracking?: string;
}) {
  return (
    <div
      className="display"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: size * 0.8,
        color,
        fontSize: size,
        fontWeight: 700,
        letterSpacing: tracking,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {BRAND.pillars.map((p, i) => (
        <span key={p} style={{ display: 'flex', alignItems: 'center', gap: size * 0.8 }}>
          {i > 0 && <span style={{ width: 2, height: size * 0.9, background: separator, display: 'inline-block' }} />}
          {p}
        </span>
      ))}
    </div>
  );
}
