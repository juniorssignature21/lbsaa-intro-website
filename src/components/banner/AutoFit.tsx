import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface Props {
  /** Height of the slot on the artboard. */
  height: number;
  width: number;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Lays children out in a flex column that fills `height` (so `marginTop: auto`
 * anchors content to the bottom). If the content is taller than the slot —
 * long titles, a full bio, every contact shown — the whole block is scaled down
 * uniformly so nothing overlaps or gets clipped.
 */
export default function AutoFit({ height, width, style, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const natural = el.offsetHeight;
      setScale(natural > height ? height / natural : 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [height]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        width,
        minHeight: height,
        display: 'flex',
        flexDirection: 'column',
        transform: scale < 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top left',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
