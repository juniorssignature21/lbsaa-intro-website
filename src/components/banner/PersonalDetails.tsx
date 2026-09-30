import type { CSSProperties } from 'react';
import { BRAND } from '../../config/brand';
import type { DetailItem } from './bannerModel';
import { DetailIcon } from './icons';

export type DetailVariant = 'executive' | 'modern' | 'minimal';

interface Props {
  items: DetailItem[];
  variant: DetailVariant;
  columns?: 1 | 2;
  width: number;
  fontSize?: number;
  rowGap?: number;
  style?: CSSProperties;
}

const { navy, gold } = BRAND.colors;

/** Icon + value list (location, programme, contact) shared by all templates. */
export default function PersonalDetails({
  items,
  variant,
  columns = 2,
  width,
  fontSize = 19,
  rowGap = 18,
  style,
}: Props) {
  const colGap = 28;
  const colWidth = columns === 2 ? (width - colGap) / 2 : width;
  // Wide values (long emails/URLs) take a full row so nothing is truncated.
  const charsPerCol = Math.floor((colWidth - (variant === 'minimal' ? 0 : fontSize * 2.05 + 14)) / (fontSize * 0.54));

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns === 2 ? '1fr 1fr' : '1fr',
        columnGap: colGap,
        gridAutoFlow: 'row dense',
        rowGap,
        width,
        ...style,
      }}
    >
      {items.map((item) => {
        const wide = columns === 2 && item.value.length > charsPerCol;
        return (
          <div
            key={item.key}
            style={{
              gridColumn: wide ? '1 / -1' : undefined,
              display: 'flex',
              alignItems: variant === 'minimal' ? 'flex-start' : 'center',
              gap: 14,
              minWidth: 0,
            }}
          >
            {variant === 'minimal' ? <MinimalItem item={item} fontSize={fontSize} /> : <IconItem item={item} variant={variant} fontSize={fontSize} />}
          </div>
        );
      })}
    </div>
  );
}

function IconItem({ item, variant, fontSize }: { item: DetailItem; variant: DetailVariant; fontSize: number }) {
  const dark = variant === 'modern';
  const badge = Math.round(fontSize * 2.05);
  return (
    <>
      <span
        style={{
          width: badge,
          height: badge,
          flex: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: dark ? 6 : '50%',
          background: dark ? 'rgba(217,162,27,0.12)' : navy,
          border: dark ? '1.5px solid rgba(217,162,27,0.55)' : 'none',
        }}
      >
        <DetailIcon k={item.key} size={Math.round(fontSize * 1.05)} color={gold} />
      </span>
      <span
        style={{
          fontSize,
          fontWeight: 500,
          lineHeight: 1.3,
          color: item.placeholder ? (dark ? 'rgba(255,255,255,0.4)' : '#A0AABB') : dark ? '#E9EEF6' : navy,
          overflowWrap: 'anywhere',
          minWidth: 0,
        }}
      >
        {item.value}
      </span>
    </>
  );
}

function MinimalItem({ item, fontSize }: { item: DetailItem; fontSize: number }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div
        className="display"
        style={{
          fontSize: Math.round(fontSize * 0.62),
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#A87908',
          marginBottom: 6,
        }}
      >
        {item.label}
      </div>
      <div
        style={{
          fontSize,
          fontWeight: 500,
          lineHeight: 1.3,
          color: item.placeholder ? '#A0AABB' : navy,
          overflowWrap: 'anywhere',
        }}
      >
        {item.value}
      </div>
    </div>
  );
}
