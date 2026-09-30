import { BRAND } from '../../config/brand';
import Logo from '../Logo';
import { fitFont, type BannerModel } from '../banner/bannerModel';
import { ArchitecturePattern, BrandPillars, DotGrid } from '../banner/Decor';
import AutoFit from '../banner/AutoFit';
import PersonalDetails from '../banner/PersonalDetails';
import ProfilePhoto from '../banner/ProfilePhoto';

const { navy, navyDark, gold, gray } = BRAND.colors;
const GOLD_TEXT = '#A87908';
const PLACEHOLDER = '#A0AABB';

/** Template 1 — light, executive, portrait in a gold-arced circle, navy footer. */
export default function ExecutiveTemplate({ m }: { m: BannerModel }) {
  const hasBio = !!m.bio;
  const textWidth = 780;
  const nameSize = fitFont(m.name, 62, 40, textWidth, 0.6);
  const portrait = 560;
  const cx = 1190;
  const cy = 395;

  return (
    <div className="banner-root" style={{ position: 'relative', width: 1600, height: 900, background: '#FFFFFF', overflow: 'hidden' }}>
      {/* Background texture */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1600, height: 900, background: `linear-gradient(180deg, #FFFFFF 0%, ${gray} 100%)` }} />
      <ArchitecturePattern width={1000} color={navy} opacity={0.06} style={{ left: -40, bottom: 100 }} />
      <DotGrid cols={9} rows={6} gap={22} color={navy} opacity={0.12} style={{ right: 36, top: 36 }} />
      <DotGrid cols={6} rows={5} gap={22} color={gold} opacity={0.35} style={{ left: 690, top: 150 }} />

      {/* Portrait backdrop */}
      <div style={{ position: 'absolute', width: 820, height: 820, left: cx - 410, top: cy - 410, borderRadius: '50%', background: gray }} />
      <div style={{ position: 'absolute', width: 380, height: 380, right: -150, top: -170, borderRadius: '50%', background: navy }} />
      <div style={{ position: 'absolute', width: 380, height: 380, right: -150, top: -170, borderRadius: '50%', border: `3px solid ${gold}`, transform: 'translate(-26px, 26px)' }} />

      {/* Arcs around portrait */}
      <svg width={760} height={760} viewBox="0 0 760 760" aria-hidden="true" style={{ position: 'absolute', left: cx - 380, top: cy - 380 }}>
        <circle cx="380" cy="380" r="322" fill="none" stroke={navy} strokeWidth="16" strokeDasharray="1011 2023" strokeLinecap="round" transform="rotate(95 380 380)" />
        <circle cx="380" cy="380" r="352" fill="none" stroke={gold} strokeWidth="6" strokeDasharray="1290 2212" strokeLinecap="round" transform="rotate(-100 380 380)" />
        <circle cx="380" cy="380" r="370" fill="none" stroke={gold} strokeWidth="1.5" strokeDasharray="4 10" opacity="0.7" />
        <circle cx={380 + 352 * Math.cos((-100 * Math.PI) / 180)} cy={380 + 352 * Math.sin((-100 * Math.PI) / 180)} r="10" fill={gold} />
      </svg>

      <ProfilePhoto
        photo={m.photo}
        width={portrait}
        height={portrait}
        shape="circle"
        alt={`Portrait of ${m.name}`}
        style={{ left: cx - portrait / 2, top: cy - portrait / 2, border: '10px solid #FFFFFF', boxShadow: '0 30px 60px rgba(7, 26, 54, 0.22)', boxSizing: 'content-box', transform: 'translate(-10px, -10px)' }}
      />

      {/* Left column */}
      <AutoFit width={textWidth} height={718} style={{ left: 96, top: 56 }}>
        <Logo height={82} />

        <div className="display" style={{ marginTop: 30, fontSize: 80, fontWeight: 800, lineHeight: 0.98, letterSpacing: '-0.015em', textTransform: 'uppercase' }}>
          <div style={{ color: navy }}>Introduce</div>
          <div style={{ color: gold }}>Yourself</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22 }}>
          <span style={{ width: 90, height: 5, background: gold }} />
          <span style={{ width: 18, height: 5, background: navy }} />
        </div>

        {m.empty ? (
          <EmptyState />
        ) : (
          <>
            <div className="display" style={{ marginTop: 30, fontSize: nameSize, fontWeight: 800, lineHeight: 1.08, color: m.namePlaceholder ? PLACEHOLDER : navyDark, letterSpacing: '-0.01em' }}>
              {m.name}
            </div>
            <div style={{ marginTop: 12, fontSize: m.titleLines.join(' ').length > 60 ? 22 : 25, fontWeight: 600, lineHeight: 1.32, color: m.titlePlaceholder ? PLACEHOLDER : '#2B4064' }}>
              {m.titleLines.map((l) => (
                <div key={l} className="clamp-2">{l}</div>
              ))}
            </div>
            <div className="display" style={{ marginTop: 8, fontSize: 24, fontWeight: 700, color: m.companyPlaceholder ? PLACEHOLDER : GOLD_TEXT, letterSpacing: '0.01em' }}>
              {m.company}
            </div>

            {hasBio && (
              <p className="clamp-3" style={{ margin: '18px 0 0', paddingLeft: 18, borderLeft: `3px solid ${gold}`, fontSize: 18, lineHeight: 1.5, fontStyle: 'italic', color: '#3C4F6E', maxWidth: 740 }}>
                {m.bio}
              </p>
            )}

            <PersonalDetails items={m.details} variant="executive" width={textWidth - 20} fontSize={hasBio ? 17 : 19} rowGap={hasBio ? 12 : 16} style={{ marginTop: 'auto', paddingTop: 26 }} />
          </>
        )}
      </AutoFit>

      {/* Footer */}
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: 1600, height: 96, background: navy, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 96px', boxSizing: 'border-box' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1600, height: 5, background: gold }} />
        <BrandPillars color="#FFFFFF" size={20} />
        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)' }}>{BRAND.name}</span>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ marginTop: 40 }}>
      <p className="display" style={{ margin: 0, fontSize: 34, fontWeight: 700, lineHeight: 1.25, color: navy, maxWidth: 640 }}>
        Your personalized alumni introduction will appear here.
      </p>
      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, width: 640 }}>
        {[260, 220, 300, 180].map((w, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', background: '#E4E9F0' }} />
            <span style={{ width: w * 0.8, height: 14, borderRadius: 7, background: '#E4E9F0' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
