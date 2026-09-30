import { BRAND } from '../../config/brand';
import Logo from '../Logo';
import { fitFont, type BannerModel } from '../banner/bannerModel';
import { ArchitecturePattern, BrandPillars, DotGrid } from '../banner/Decor';
import AutoFit from '../banner/AutoFit';
import PersonalDetails from '../banner/PersonalDetails';
import ProfilePhoto from '../banner/ProfilePhoto';

const { navy, navyDark, gold, gray } = BRAND.colors;

/** Template 2 — geometric navy block, gold diagonals, portrait in an arch. */
export default function ModernTemplate({ m }: { m: BannerModel }) {
  const hasBio = !!m.bio;
  const textWidth = 760;
  const nameSize = fitFont(m.name, 60, 40, textWidth, 0.6);
  const archW = 500;
  const archH = 700;
  const archX = 1020;
  const archY = 200;

  return (
    <div className="banner-root" style={{ position: 'relative', width: 1600, height: 900, background: gray, overflow: 'hidden' }}>
      {/* Right side texture */}
      <DotGrid cols={12} rows={7} gap={24} color={navy} opacity={0.14} style={{ right: 20, top: 24 }} />

      {/* Navy block with diagonal edge + gold stripe */}
      <svg width={1600} height={900} aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0 }}>
        <polygon points="0,0 1010,0 890,900 0,900" fill={navy} />
        <polygon points="1010,0 1036,0 916,900 890,900" fill={gold} />
        <polygon points="1060,0 1068,0 948,900 940,900" fill={navy} opacity="0.18" />
        <circle cx="880" cy="40" r="210" fill="none" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="2" />
        <circle cx="880" cy="40" r="290" fill="none" stroke="#FFFFFF" strokeOpacity="0.05" strokeWidth="2" />
        <circle cx="880" cy="40" r="370" fill="none" stroke={gold} strokeOpacity="0.14" strokeWidth="2" />
        <polygon points="1600,0 1600,150 1450,0" fill={gold} />
        <polygon points="1600,150 1600,210 1390,0 1450,0" fill={navy} />
      </svg>
      <ArchitecturePattern width={880} color="#FFFFFF" opacity={0.06} style={{ left: 0, bottom: 96 }} />

      {/* Portrait arch with offset outline and navy block */}
      <div style={{ position: 'absolute', left: archX + 70, top: archY + 180, width: archW, height: archH, background: navyDark }} />
      <div
        style={{
          position: 'absolute',
          left: archX + 34,
          top: archY - 34,
          width: archW,
          height: archH,
          borderRadius: `${archW / 2}px ${archW / 2}px 0 0`,
          border: `4px solid ${gold}`,
          boxSizing: 'border-box',
        }}
      />
      <ProfilePhoto
        photo={m.photo}
        width={archW}
        height={archH}
        shape="arch"
        alt={`Portrait of ${m.name}`}
        style={{ left: archX, top: archY, boxShadow: '0 30px 70px rgba(7, 26, 54, 0.35)' }}
      />

      {/* Left content */}
      <AutoFit width={textWidth} height={720} style={{ left: 90, top: 50 }}>
        <Logo height={78} tone="white" />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 30 }}>
          <span style={{ width: 54, height: 4, background: gold }} />
          <span className="display" style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.34em', color: gold, textTransform: 'uppercase' }}>
            LBS Alumni
          </span>
        </div>
        <div className="display" style={{ marginTop: 12, fontSize: 84, fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.02em', color: '#FFFFFF', textTransform: 'uppercase' }}>
          Introduce <span style={{ color: gold }}>Yourself</span>
        </div>

        {m.empty ? (
          <div style={{ marginTop: 44 }}>
            <p className="display" style={{ margin: 0, fontSize: 34, fontWeight: 700, lineHeight: 1.25, color: '#FFFFFF', maxWidth: 640 }}>
              Your personalized alumni introduction will appear here.
            </p>
            <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, width: 620 }}>
              {[260, 220, 300, 180].map((w, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ width: 40, height: 40, borderRadius: 6, border: '1.5px solid rgba(217,162,27,0.5)' }} />
                  <span style={{ width: w * 0.8, height: 14, borderRadius: 7, background: 'rgba(255,255,255,0.12)' }} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="display" style={{ marginTop: 40, fontSize: nameSize, fontWeight: 800, lineHeight: 1.08, color: m.namePlaceholder ? 'rgba(255,255,255,0.45)' : '#FFFFFF', letterSpacing: '-0.01em' }}>
              {m.name}
            </div>
            <div style={{ marginTop: 12, fontSize: m.titleLines.join(' ').length > 60 ? 21 : 24, fontWeight: 500, lineHeight: 1.35, color: m.titlePlaceholder ? 'rgba(255,255,255,0.45)' : '#D3DCEA' }}>
              {m.titleLines.map((l) => (
                <div key={l} className="clamp-2">{l}</div>
              ))}
            </div>
            <div className="display" style={{ marginTop: 10, display: 'inline-flex', alignSelf: 'flex-start', padding: '7px 16px', background: gold, color: navyDark, fontSize: 20, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', opacity: m.companyPlaceholder ? 0.55 : 1, maxWidth: textWidth, boxSizing: 'border-box' }}>
              {m.company}
            </div>

            {hasBio && (
              <p className="clamp-3" style={{ margin: '20px 0 0', fontSize: 18, lineHeight: 1.5, color: '#BFCBDD', maxWidth: 720 }}>
                {m.bio}
              </p>
            )}

            <PersonalDetails items={m.details} variant="modern" width={textWidth - 40} fontSize={hasBio ? 17 : 18} rowGap={hasBio ? 12 : 16} style={{ marginTop: 'auto', paddingTop: 26 }} />
          </>
        )}
      </AutoFit>

      {/* Bottom brand strip within navy block */}
      <div style={{ position: 'absolute', left: 90, bottom: 28, width: 780 }}>
        <BrandPillars color="#FFFFFF" size={16} />
        <div style={{ marginTop: 10, fontSize: 13.5, fontWeight: 500, lineHeight: 1.4, color: gold }}>{BRAND.initiative}</div>
      </div>
      <div style={{ position: 'absolute', left: 90, bottom: 96, width: 760, height: 1, background: 'rgba(255,255,255,0.18)' }} />
    </div>
  );
}
