import { BRAND } from '../../config/brand';
import Logo from '../Logo';
import { fitFont, type BannerModel } from '../banner/bannerModel';
import { BrandPillars } from '../banner/Decor';
import AutoFit from '../banner/AutoFit';
import PersonalDetails from '../banner/PersonalDetails';
import ProfilePhoto from '../banner/ProfilePhoto';

const { navy, navyDark, gold } = BRAND.colors;
const GOLD_TEXT = '#A87908';
const PLACEHOLDER = '#A0AABB';

/** Template 3 — mostly white, hairline gold frame, tall arched portrait, refined type. */
export default function MinimalTemplate({ m }: { m: BannerModel }) {
  const hasBio = !!m.bio;
  const textWidth = 760;
  const nameSize = fitFont(m.name, 74, 42, textWidth, 0.6);
  const archW = 480;
  const archH = 660;
  const archX = 1016;
  const archY = 118;

  return (
    <div className="banner-root" style={{ position: 'relative', width: 1600, height: 900, background: '#FFFFFF', overflow: 'hidden' }}>
      {/* Hairline frame */}
      <div style={{ position: 'absolute', inset: 36, border: `1px solid ${gold}`, opacity: 0.55 }} />
      <div style={{ position: 'absolute', left: 36, top: 36, width: 60, height: 60, borderLeft: `4px solid ${gold}`, borderTop: `4px solid ${gold}` }} />
      <div style={{ position: 'absolute', right: 36, bottom: 36, width: 60, height: 60, borderRight: `4px solid ${navy}`, borderBottom: `4px solid ${navy}` }} />

      {/* Portrait */}
      <div
        style={{
          position: 'absolute',
          left: archX - 20,
          top: archY - 20,
          width: archW + 40,
          height: archH + 20,
          borderRadius: `${archW / 2 + 20}px ${archW / 2 + 20}px 0 0`,
          border: `1.5px solid ${gold}`,
          borderBottom: 'none',
          boxSizing: 'border-box',
        }}
      />
      <ProfilePhoto photo={m.photo} width={archW} height={archH} shape="arch" alt={`Portrait of ${m.name}`} style={{ left: archX, top: archY }} placeholderTone="light" />
      <div style={{ position: 'absolute', left: archX - 60, top: archY + archH, width: archW + 120, height: 3, background: navy }} />
      <div style={{ position: 'absolute', left: archX + archW / 2 - 7, top: archY - 34, width: 14, height: 14, background: gold, transform: 'rotate(45deg)' }} />

      {/* Left column */}
      <AutoFit width={textWidth} height={680} style={{ left: 116, top: 84 }}>
        <Logo height={76} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 44 }}>
          <span style={{ width: 56, height: 2, background: gold }} />
          <span className="display" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.38em', color: GOLD_TEXT, textTransform: 'uppercase' }}>
            Introduce Yourself
          </span>
        </div>

        {m.empty ? (
          <div style={{ marginTop: 34 }}>
            <p className="display" style={{ margin: 0, fontSize: 44, fontWeight: 600, lineHeight: 1.2, color: navy, maxWidth: 680, letterSpacing: '-0.01em' }}>
              Your personalized alumni introduction will appear here.
            </p>
            <div style={{ marginTop: 44, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, width: 600 }}>
              {[200, 240, 260, 160].map((w, i) => (
                <div key={i}>
                  <span style={{ display: 'block', width: 70, height: 8, borderRadius: 4, background: '#EFE3C4' }} />
                  <span style={{ display: 'block', marginTop: 10, width: w, height: 14, borderRadius: 7, background: '#E9EDF2' }} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="display" style={{ marginTop: 26, fontSize: nameSize, fontWeight: 700, lineHeight: 1.06, letterSpacing: '-0.025em', color: m.namePlaceholder ? PLACEHOLDER : navyDark }}>
              {m.name}
            </div>
            <div style={{ marginTop: 14, fontSize: m.titleLines.join(' ').length > 60 ? 21 : 24, fontWeight: 400, lineHeight: 1.35, color: m.titlePlaceholder ? PLACEHOLDER : '#3C4F6E' }}>
              {m.titleLines.map((l) => (
                <div key={l} className="clamp-2">{l}</div>
              ))}
            </div>
            <div className="display" style={{ marginTop: 12, fontSize: 18, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: m.companyPlaceholder ? PLACEHOLDER : navy }}>
              {m.company}
            </div>

            <div style={{ marginTop: 22, width: 64, height: 1.5, background: gold }} />

            {hasBio && (
              <p className="clamp-3" style={{ margin: '20px 0 0', fontSize: 18, lineHeight: 1.55, color: '#4A5B78', maxWidth: 720 }}>
                {m.bio}
              </p>
            )}

            <PersonalDetails items={m.details} variant="minimal" width={textWidth - 40} fontSize={hasBio ? 17 : 19} rowGap={hasBio ? 14 : 20} style={{ marginTop: 'auto', paddingTop: 26 }} />
          </>
        )}
      </AutoFit>

      {/* Footer line */}
      <div style={{ position: 'absolute', left: 116, right: 116, bottom: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BrandPillars color={navy} size={15} tracking="0.3em" />
        <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: '0.03em', color: GOLD_TEXT }}>{BRAND.initiative}</div>
      </div>
    </div>
  );
}
