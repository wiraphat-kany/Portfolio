import React from 'react'
import './Lpphoto.css'
import Reveal from './Reveal'

// ── ผลงานที่คัดมาว่าโดดเด่นที่สุดจาก public/images/lp-banner-photo/pc ──
// ภาพต้นฉบับเป็นแบนเนอร์โฆษณาแนวนอน สัดส่วนจริงอยู่ราว 1.6-2.3:1 (เฉลี่ย ~1.9:1)
// การ์ดในกริดจึงตั้งสัดส่วนใกล้เคียงค่าเฉลี่ยนี้ ให้ crop น้อยที่สุดและดูเนียนตา
const hero = { src: '/images/lp-banner-photo/pc/28.webp', label: 'Pageant Stage' }

const gridItems = [
  { src: '/images/lp-banner-photo/pc/24.webp', label: 'Campaign Banner' },
  { src: '/images/lp-banner-photo/pc/76.webp', label: 'Tarot Reading' },
  { src: '/images/lp-banner-photo/pc/84.webp', label: 'Luxury Masterclass' },
  { src: '/images/lp-banner-photo/pc/78.webp', label: 'Voice Coaching' },
  { src: '/images/lp-banner-photo/pc/30.webp', label: 'Pageant Fest 2024' },
  { src: '/images/lp-banner-photo/pc/23.webp', label: 'Chakra Colors' },
]

const IconLayers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const IconLayout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="9" x2="9" y2="21" />
  </svg>
)


const stats = [
  { value: '100+', label: 'Designs Created', icon: <IconLayers /> },
  { value: '2', label: 'Formats · PC & SP', icon: <IconLayout /> },
]

function BentoImg({ item }) {
  return (
    <div className="lp-bento-card">
      <img src={item.src} alt={item.label} loading="lazy" />
    </div>
  )
}

function Lpphoto({ onNavigation }) {
  return (
    <section className="lp-root">
      <div className="lp-texture" style={{ backgroundImage: "url('/images/lp-bg-texture.jpg')" }} />
      <div className="lp-texture-overlay" />
      <div className="lp-accent-line" />

      {/* ── กรอบเนื้อหากลาง max-width เหมือน section อื่นๆ ในเว็บ
          กันไม่ให้ข้อความ/ภาพชิดขอบจอเกินไปบนจอกว้าง ── */}
      <div className="lp-inner">
        {/* ── Left ── */}
        <div className="lp-left">
          <Reveal>
            <div className="lp-eyebrow">
              <div className="lp-eyebrow-line" />
              <span className="lp-eyebrow-text">Creative Works</span>
            </div>
            <div className="lp-title">
              Commercial
              <br />
              <span className="lp-title-accent">Graphic Design</span>
            </div>
            <p className="lp-desc">
              A collection of visual works — branding, UI, posters, and marketing
              banners crafted for clients worldwide.
            </p>

            <div className="lp-stats">
              {stats.map((s) => (
                <div className="lp-stat" key={s.label}>
                  <span className="lp-stat-icon">{s.icon}</span>
                  <span className="lp-stat-value">{s.value}</span>
                  <span className="lp-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onNavigation?.('photobanner')}
            >
              View All 100+ Designs
              <span className="btn-arrow" />
            </button>
          </Reveal>
        </div>

        {/* ── Right — hero + กริดสม่ำเสมอของผลงานที่โดดเด่นที่สุด ── */}
        <div className="lp-right">
          <Reveal delay={80} className="lp-bento">
            <div className="lp-bento-card lp-bento-hero">
              <img src={hero.src} alt={hero.label} loading="lazy" />
            </div>
            <div className="lp-bento-grid">
              {gridItems.map((item) => (
                <BentoImg key={item.src} item={item} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Lpphoto
