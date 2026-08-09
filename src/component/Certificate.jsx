import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Reveal from './Reveal'

// matchMedia เนเธ—เธ resize listener โ€” เธขเธดเธเน€เธเธเธฒเธฐเธ•เธญเธเธเนเธฒเธกเน€เธเธฃเธเธเธญเธขเธ•เน เนเธกเนเนเธเนเธ—เธธเธเธเธดเธเน€เธเธฅเธ—เธตเนเธฅเธฒเธเธเธญ
const MOBILE_QUERY = '(max-width: 767px)'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MOBILE_QUERY).matches
  )
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

// โ”€โ”€ เธเนเธญเธกเธนเธฅเธ—เธฑเนเธเธซเธกเธ”เน€เธฃเธตเธขเธเธ•เธฒเธกเธฅเธณเธ”เธฑเธเธเธฒเธฃเน€เธฃเธตเธขเธ โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€
// เธฃเธนเธเธ เธฒเธ (ct/*.pdf เนเธเธฅเธเน€เธเนเธ .jpg) เนเธกเธเธ•เธฃเธเธเธฑเธเธซเธฑเธงเธเนเธญเนเธเธเธฃเธฐเธเธฒเธจเธเธตเธขเธเธฑเธ•เธฃเธเธฃเธดเธ
const allCerts = [
  { title: 'Udemy Course Certificate', desc: 'Certificate of completion from Udemy.', skill: 'Udemy', color: '#A435F0', img: '/images/certificates/udemy-course-certificate.jpg', pdf: '/ct/udemy-course-certificate.pdf' },
  { title: 'HTML Fundamentals',        desc: 'เน€เธฃเธดเนเธกเธ•เนเธเธชเธฃเนเธฒเธเนเธฅเธฐเนเธชเธ”เธเน€เธเธทเนเธญเธซเธฒเธเธญเธเน€เธงเนเธเนเธเธ•เนเธ”เนเธงเธข HTML',            skill: 'HTML',      color: '#7C6FF7', img: '/images/certificates/html.webp',            pdf: '/ct/Wiraphat-Html.pdf' },
  { title: 'CSS Styling',              desc: 'เธเธฃเธฑเธเนเธ•เนเธเนเธฅเธฐเธเธฑเธ”เธงเธฒเธเธชเนเธ•เธฅเนเธเธญเธเน€เธงเนเธเนเธเธ•เนเธ”เนเธงเธข CSS',                 skill: 'CSS',       color: '#7C6FF7', img: '/images/certificates/css.webp',             pdf: '/ct/Wiraphat-Css.pdf' },
  { title: 'JavaScript Basics',        desc: 'เน€เธเธดเนเธกเธฅเธนเธเน€เธฅเนเธเนเธซเนเธเธฑเธเน€เธงเนเธเนเธเธ•เนเธ”เนเธงเธข JavaScript',                skill: 'JS',        color: '#7C6FF7', img: '/images/certificates/js-basics.webp',       pdf: '/ct/Wiraphat-JS.pdf' },
  { title: 'JS for Frontend Dev',      desc: 'Basic Javascript for Frontend Developer',                    skill: 'JS',        color: '#7C6FF7', img: '/images/certificates/js-frontend.webp',     pdf: '/ct/Wiraphat-Jsfordev.pdf' },
  { title: 'UI Design with Figma',     desc: 'เธซเธฅเธฑเธเธเธฒเธฃเธญเธญเธเนเธเธ UI Design เธ”เนเธงเธขเนเธเธฃเนเธเธฃเธก Figma',                skill: 'Figma',     color: '#7C6FF7', img: '/images/certificates/ux-ui.webp',           pdf: '/ct/wiraphat-ux-ui.pdf' },
  { title: 'React 1 โ€” Components',     desc: 'เธเธงเธฒเธกเธฃเธนเนเธเธทเนเธเธเธฒเธเธชเธณเธซเธฃเธฑเธ Components เนเธฅเธฐ JSX',                   skill: 'React',     color: '#38BDF8', img: '/images/certificates/react-1.webp',         pdf: '/ct/Wiraphat-react-1.pdf' },
  { title: 'React 2 โ€” State & Events', desc: 'เธเธฒเธฃเธเธฑเธ”เธเธฒเธฃ State เนเธฅเธฐ Events เนเธ React',                       skill: 'React',     color: '#38BDF8', img: '/images/certificates/react-2.webp',         pdf: '/ct/Wiraphat-react-2.pdf' },
  { title: 'React 3 โ€” Dynamic Render', desc: 'เธเธฒเธฃเนเธชเธ”เธเธเธฅเธ•เธฒเธกเธเนเธญเธกเธนเธฅเธ—เธตเนเน€เธเธฅเธตเนเธขเธเนเธเธฅเธ',                        skill: 'React',     color: '#38BDF8', img: '/images/certificates/react-3.webp',         pdf: '/ct/Wiraphat-react-3.pdf' },
  { title: 'React 4 โ€” Hooks',          desc: 'เธเธฑเธเธเนเธเธฑเธ Hook เธเธทเนเธเธเธฒเธ (useState, useEffect)',               skill: 'React',     color: '#38BDF8', img: '/images/certificates/react-4.webp',         pdf: '/ct/Wiraphat-react-4.pdf' },
  { title: 'Node.js Backend',          desc: 'เธเนเธฒเธงเธชเธนเนเน€เธชเนเธเธ—เธฒเธ Back-end Developer เธ”เนเธงเธข Node.js',           skill: 'Node.js',   color: '#4FC97E', img: '/images/certificates/nodejs-backend.webp',  pdf: '/ct/Wiraphat-start-nodejs-backend.pdf' },
  { title: 'Express Framework',        desc: 'เน€เธฃเธดเนเธกเธ•เนเธเนเธเน Web Framework เธ”เนเธงเธข Express เนเธฅเธฐ REST API',      skill: 'Express',   color: '#4FC97E', img: '/images/certificates/express-restapi.webp', pdf: '/ct/Wiraphat-framework-restapi.pdf' },
  { title: 'API Integration',          desc: 'เน€เธเธทเนเธญเธกเธ•เนเธญเน€เธงเนเธเนเธเธ•เนเธเธฑเธเธเนเธญเธกเธนเธฅเธเธฒเธเนเธซเธฅเนเธเธญเธทเนเธเน เนเธ”เธขเนเธเน API',     skill: 'REST API',  color: '#4FC97E', img: '/images/certificates/api-web.webp',         pdf: '/ct/wiraphat-api-web.pdf' },
  { title: 'SQL Database',             desc: 'เธเธฑเธ”เธเธฒเธฃเธเธฒเธเธเนเธญเธกเธนเธฅเธญเธขเนเธฒเธเธกเธตเธเธฃเธฐเธชเธดเธ—เธเธดเธ เธฒเธเธเธฃเนเธญเธกเธงเธดเน€เธเธฃเธฒเธฐเธซเนเธ”เนเธงเธข SQL', skill: 'SQL',       color: '#F7A24F', img: '/images/certificates/sql.webp',             pdf: '/ct/wiraphat-sql-command.pdf' },
  { title: 'MongoDB & NoSQL',          desc: 'เธเธฑเธ”เธเธฒเธฃเธเธฑเธเธเธฒเธเธเนเธญเธกเธนเธฅเธ”เนเธงเธข NoSQL เนเธฅเธฐ MongoDB',                  skill: 'MongoDB',   color: '#F7A24F', img: '/images/certificates/mongodb.webp',         pdf: '/ct/wiraphat-nosql-mongodb.pdf' },
  { title: 'Workshop : Todo List',     desc: 'Workshop Todo List With MongoDB And Mongoose',               skill: 'Mongoose',  color: '#F7A24F', img: '/images/certificates/todolist-mongo.webp',  pdf: '/ct/Wiraphat-todolistmongofb.pdf' },
]

const DESKTOP_INITIAL_SHOW = 4
const MOBILE_INITIAL_SHOW = 3
const STEP = 4

function CertCard({ cert, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(cert)}
      style={s.card}
      className="uv-card"
      aria-haspopup="dialog"
    >
      <div style={s.thumbWrap}>
        <img src={cert.img} alt={cert.title} style={s.thumbImg} loading="lazy" />
        <div style={s.thumbFade} />
        <span style={{  background: `${cert.color}26`, color: cert.color, border: `1px solid ${cert.color}55` }}>
          {cert.skill}
        </span>
       
      </div>
      <div style={s.cardBody}>
        <p style={s.cardTitle}>{cert.title}</p>
        <span style={s.hint}>เธ”เธนเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ” โ’</span>
      </div>
    </button>
  )
}

function CertModal({ cert, onClose }) {
  useEffect(() => {
    // เน€เธกเธทเนเธญเธขเธฑเธเนเธกเนเธกเธตเนเธเน€เธเธญเธฃเนเธ—เธตเนเน€เธเธดเธ”เธญเธขเธนเน (cert เน€เธเนเธ null) เธ•เนเธญเธเนเธกเนเนเธ•เธฐ scroll เธเธญเธ body เน€เธฅเธข โ€”
    // เธเนเธญเธเธซเธเนเธฒเธเธตเน effect เธ—เธณเธเธฒเธเธ—เธฑเธเธ—เธตเธ•เธญเธ mount เธ—เธณเนเธซเนเธฅเนเธญเธเธชเธเธญเธฅเธ—เธฑเนเธเธซเธเนเธฒเธ•เธฑเนเธเนเธ•เนเนเธซเธฅเธ”เน€เธชเธฃเนเธ
    if (!cert) return undefined

    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)

    // เธ•เนเธญเธเนเธเน class .modal-open เน€เธ—เนเธฒเธเธฑเนเธ เธซเนเธฒเธกเน€เธเนเธ• body.style.overflow เธ•เธฃเธ เน เน€เธเธฃเธฒเธฐ
    // 1) เธกเธฑเธเธ—เธฑเธ overflow-x: clip เธ—เธตเน navbar sticky เธ•เนเธญเธเนเธเน
    // 2) เธเธญเธชเธเธญเธฅเธฅเนเธ–เธนเธเธฅเนเธญเธ animation-timeline: view() เธเธฐเนเธกเนเธกเธตเธฃเธฐเธขเธฐเนเธซเนเธเธณเธเธงเธ“
    //    เธ—เธธเธ .reveal เน€เธฅเธขเธฃเธตเน€เธเนเธ•เน€เธเนเธ opacity: 0 = เน€เธเธทเนเธญเธซเธฒเธซเธฒเธขเธ—เธฑเนเธเธซเธเนเธฒ
    const gap = window.innerWidth - document.documentElement.clientWidth
    const prevPad = document.body.style.paddingRight
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    document.body.classList.add('modal-open')

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
      document.body.style.paddingRight = prevPad
    }
  }, [cert, onClose])

  if (!cert) return null

  // เนเธเน Portal render เธ•เธฃเธเนเธเธ—เธตเน document.body โ€” เน€เธเธฃเธฒเธฐ App.js เธกเธต wrapper div เธ—เธตเนเนเธชเน
  // transition-transform (translate-x-0) เธเธถเนเธเธ—เธณเนเธซเน ancestor เธเธฅเธฒเธขเน€เธเนเธ containing block
  // เนเธซเธกเนเธเธญเธ position:fixed เธ—เธณเนเธซเน modal เน€เธ”เธดเธกเนเธกเนเธขเธถเธ”เธเธฑเธ viewport เนเธ•เนเธขเธถเธ”เธเธฑเธเธเธงเธฒเธกเธชเธนเธเธ—เธฑเนเธเธซเธกเธ”
  // เธเธญเธเธซเธเนเธฒ เธเธฅเธเธทเธญเธ–เนเธฒเน€เธฅเธทเนเธญเธเธชเธเธญเธฅเธฅเธเธกเธฒ modal เธเธฐเนเธเนเธเธฅเนเธเธญเธเธเธญ (เน€เธซเนเธเน€เธเนเธเธซเธเนเธฒเน€เธเธฅเนเธฒ)
  return createPortal(
    <div
      style={s.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
      onClick={onClose}
    >
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="btn-icon" style={s.closeBtn} aria-label="เธเธดเธ”">โ•</button>

        <div style={s.modalImgWrap}>
          <img src={cert.img} alt={cert.title} style={s.modalImg} />
        </div>

        <div style={s.modalBody}>
          <span style={{ ...s.skillTag, position: 'static', background: `${cert.color}26`, color: cert.color, border: `1px solid ${cert.color}55` }}>
            {cert.skill}
          </span>
          <h3 style={s.modalTitle}>{cert.title}</h3>
          <p style={s.modalDesc}>{cert.desc}</p>
          <div style={s.modalFooter}>
            <a
              href={cert.pdf}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
              style={{ color: cert.color, borderColor: `${cert.color}55` }}
            >
              เธ”เธนเนเธเน€เธเธญเธฃเนเธ•เธฑเธงเน€เธ•เนเธก โ—
            </a>
            <span style={{ ...s.backVerified, color: cert.color }}>โ“ Verified ยท FutureSkill 2026</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

function Certificate() {
  const isMobile = useIsMobile()
  // เธกเธทเธญเธ–เธทเธญเนเธเธงเนเนเธเน 3 เนเธเธเนเธญเธ เน€เธ”เธชเธเนเธ—เนเธญเธ 4 เนเธ
  const initialShow = isMobile ? MOBILE_INITIAL_SHOW : DESKTOP_INITIAL_SHOW
  const step = isMobile ? MOBILE_INITIAL_SHOW : STEP
  const [shown, setShown] = useState(initialShow)
  const [activeCert, setActiveCert] = useState(null)

  // useState เธเธณเธเนเธฒเนเธเนเธ•เธญเธ mount โ€” เธ–เนเธฒเนเธกเน sync เธ•เธฃเธเธเธตเน เธขเนเธญเธเธญเธเธฒเธเน€เธ”เธชเธเนเธ—เนเธญเธเธกเธฒเธกเธทเธญเธ–เธทเธญเธเธฐเธขเธฑเธเธเนเธฒเธเธ—เธตเน 4 เนเธ
  useEffect(() => {
    setShown(initialShow)
  }, [initialShow])
  const visible = allCerts.slice(0, shown)
  const hasMore = shown < allCerts.length
  const canCollapse = shown > initialShow

  return (
    <section id="certificates" style={s.section}>
      <div className="section-glow" />

      <div style={s.inner}>
        <Reveal>
          <p className="section-eyebrow">FutureSkill ยท Fullstack Developer Path</p>
          <h2 className="section-heading">Certificates</h2>
        </Reveal>

        {/* Grid */}
        <div style={s.grid}>
          {visible.map((cert, i) => (
            <Reveal key={cert.title} delay={(i % 4) * 60}>
              <CertCard cert={cert} onOpen={setActiveCert} />
            </Reveal>
          ))}
        </div>

        {/* Show more / Show less โ€” both available together so you're never "stuck" */}
        <div style={s.btnWrap}>
          {canCollapse && (
            <button
              type="button"
              className="btn btn-subtle"
              onClick={() => setShown(sVal => Math.max(sVal - step, initialShow))}
            >
              เนเธชเธ”เธเธเนเธญเธขเธฅเธ โ‘
            </button>
          )}
          {hasMore && (
            <button
              type="button"
              className="btn btn-subtle"
              onClick={() => setShown(sVal => Math.min(sVal + step, allCerts.length))}
            >
              เธ”เธนเน€เธเธดเนเธกเธญเธตเธ {Math.min(step, allCerts.length - shown)} เนเธ
              <span style={s.counter}>{shown} / {allCerts.length}</span>
            </button>
          )}
        </div>
      </div>

      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </section>
  )
}

const s = {
  section: {
    position: 'relative',
    padding: '80px 24px',
    background: 'var(--bg-alt)',
    overflow: 'hidden',
    fontFamily: "'Inter','Nunito',sans-serif",
  },
  inner: {
    position: 'relative',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '16px',
  },

  // Card (no 3D transforms โ€” flip caused mirror render bugs in some browsers)
  card: {
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    borderRadius: '14px',
    overflow: 'hidden',
    background: 'rgba(255,255,255,0.035)',
    border: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    fontFamily: 'inherit',
  },
  thumbWrap: {
    position: 'relative',
    width: '100%',
    height: '128px',
    flexShrink: 0,
    background: '#fff',
    overflow: 'hidden',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
    display: 'block',
  },
  thumbFade: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(17,14,32,0.9), transparent 55%)',
  },
  skillTag: {
    position: 'absolute',
    top: '10px', left: '10px',
    fontSize: '10px', fontWeight: 700,
    padding: '3px 9px', borderRadius: '999px',
    zIndex: 2,
  },
  check: {
    position: 'absolute', top: '10px', right: '10px',
    width: '22px', height: '22px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '11px', fontWeight: 800,
    zIndex: 2,
  },
  cardBody: {
    padding: '14px',
    display: 'flex', flexDirection: 'column', gap: '8px',
  },
  cardTitle: {
    fontSize: '0.85rem', fontWeight: 700,
    color: '#E8E6FF', lineHeight: 1.4,
    margin: 0,
  },
  hint: { fontSize: '11px', color: '#8B89AE', fontWeight: 600 },

  // Load more / less
  btnWrap: {
    display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '28px',
  },
  counter: {
    fontSize: '11px', color: '#8B89AE',
    fontFamily: 'monospace',
  },

  // โ”€โ”€ Modal โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€โ”€
  overlay: {
    position: 'fixed', inset: 0, zIndex: 100,
    background: 'rgba(6,5,14,0.78)',
    backdropFilter: 'blur(3px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '24px',
    animation: 'certFadeIn 0.2s ease both',
  },
  modal: {
    position: 'relative',
    width: '100%', maxWidth: '520px',
    maxHeight: '88vh',
    overflowY: 'auto',
    background: '#161129',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '18px',
    boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
    animation: 'certPopIn 0.25s cubic-bezier(0.2,0.9,0.3,1) both',
  },
  // เธซเธเนเธฒเธ•เธฒเธเธธเนเธกเธกเธฒเธเธฒเธ .btn-icon เธ—เธฑเนเธเธซเธกเธ” เธ•เธฃเธเธเธตเนเน€เธซเธฅเธทเธญเนเธเนเธเธฒเธฃเธงเธฒเธเธ•เธณเนเธซเธเนเธ
  closeBtn: {
    position: 'absolute', top: '12px', right: '12px', zIndex: 3, fontSize: '14px',
  },
  modalImgWrap: {
    width: '100%',
    background: '#fff',
  },
  modalImg: {
    width: '100%', display: 'block',
  },
  modalBody: {
    padding: '22px 24px 26px',
    display: 'flex', flexDirection: 'column', gap: '12px',
  },
  modalTitle: {
    fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0,
  },
  modalDesc: {
    fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0,
  },
  modalFooter: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: '10px', marginTop: '6px',
  },
  backVerified: {
    fontSize: '11px', fontWeight: 700,
  },
}

export default Certificate
