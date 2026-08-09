import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Reveal from './Reveal'

// matchMedia แทน resize listener — ยิงเฉพาะตอนข้ามเบรกพอยต์ ไม่ใช่ทุกพิกเซลที่ลากจอ
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

// ── ข้อมูลทั้งหมดเรียงตามลำดับการเรียน ─────────────────────
// รูปภาพ (ct/*.pdf แปลงเป็น .jpg) แมพตรงกับหัวข้อใบประกาศนียบัตรจริง
const allCerts = [
  { title: 'Udemy Course Certificate', desc: 'Certificate of completion from Udemy.', skill: 'Udemy', color: '#A435F0', img: '/images/certificates/udemy-course-certificate.jpg', pdf: '/ct/udemy-course-certificate.pdf' },
  { title: 'HTML Fundamentals',        desc: 'เริ่มต้นสร้างและแสดงเนื้อหาของเว็บไซต์ด้วย HTML',            skill: 'HTML',      color: '#7C6FF7', img: '/images/certificates/html.webp',            pdf: '/ct/Wiraphat-Html.pdf' },
  { title: 'CSS Styling',              desc: 'ปรับแต่งและจัดวางสไตล์ของเว็บไซต์ด้วย CSS',                 skill: 'CSS',       color: '#7C6FF7', img: '/images/certificates/css.webp',             pdf: '/ct/Wiraphat-Css.pdf' },
  { title: 'JavaScript Basics',        desc: 'เพิ่มลูกเล่นให้กับเว็บไซต์ด้วย JavaScript',                skill: 'JS',        color: '#7C6FF7', img: '/images/certificates/js-basics.webp',       pdf: '/ct/Wiraphat-JS.pdf' },
  { title: 'JS for Frontend Dev',      desc: 'Basic Javascript for Frontend Developer',                    skill: 'JS',        color: '#7C6FF7', img: '/images/certificates/js-frontend.webp',     pdf: '/ct/Wiraphat-Jsfordev.pdf' },
  { title: 'UI Design with Figma',     desc: 'หลักการออกแบบ UI Design ด้วยโปรแกรม Figma',                skill: 'Figma',     color: '#7C6FF7', img: '/images/certificates/ux-ui.webp',           pdf: '/ct/wiraphat-ux-ui.pdf' },
  { title: 'React 1 — Components',     desc: 'ความรู้พื้นฐานสำหรับ Components และ JSX',                   skill: 'React',     color: '#38BDF8', img: '/images/certificates/react-1.webp',         pdf: '/ct/Wiraphat-react-1.pdf' },
  { title: 'React 2 — State & Events', desc: 'การจัดการ State และ Events ใน React',                       skill: 'React',     color: '#38BDF8', img: '/images/certificates/react-2.webp',         pdf: '/ct/Wiraphat-react-2.pdf' },
  { title: 'React 3 — Dynamic Render', desc: 'การแสดงผลตามข้อมูลที่เปลี่ยนแปลง',                        skill: 'React',     color: '#38BDF8', img: '/images/certificates/react-3.webp',         pdf: '/ct/Wiraphat-react-3.pdf' },
  { title: 'React 4 — Hooks',          desc: 'ฟังก์ชัน Hook พื้นฐาน (useState, useEffect)',               skill: 'React',     color: '#38BDF8', img: '/images/certificates/react-4.webp',         pdf: '/ct/Wiraphat-react-4.pdf' },
  { title: 'Node.js Backend',          desc: 'ก้าวสู่เส้นทาง Back-end Developer ด้วย Node.js',           skill: 'Node.js',   color: '#4FC97E', img: '/images/certificates/nodejs-backend.webp',  pdf: '/ct/Wiraphat-start-nodejs-backend.pdf' },
  { title: 'Express Framework',        desc: 'เริ่มต้นใช้ Web Framework ด้วย Express และ REST API',      skill: 'Express',   color: '#4FC97E', img: '/images/certificates/express-restapi.webp', pdf: '/ct/Wiraphat-framework-restapi.pdf' },
  { title: 'API Integration',          desc: 'เชื่อมต่อเว็บไซต์กับข้อมูลจากแหล่งอื่นๆ โดยใช้ API',     skill: 'REST API',  color: '#4FC97E', img: '/images/certificates/api-web.webp',         pdf: '/ct/wiraphat-api-web.pdf' },
  { title: 'SQL Database',             desc: 'จัดการฐานข้อมูลอย่างมีประสิทธิภาพพร้อมวิเคราะห์ด้วย SQL', skill: 'SQL',       color: '#F7A24F', img: '/images/certificates/sql.webp',             pdf: '/ct/wiraphat-sql-command.pdf' },
  { title: 'MongoDB & NoSQL',          desc: 'จัดการกับฐานข้อมูลด้วย NoSQL และ MongoDB',                  skill: 'MongoDB',   color: '#F7A24F', img: '/images/certificates/mongodb.webp',         pdf: '/ct/wiraphat-nosql-mongodb.pdf' },
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
        <span style={s.hint}>ดูรายละเอียด →</span>
      </div>
    </button>
  )
}

function CertModal({ cert, onClose }) {
  useEffect(() => {
    // เมื่อยังไม่มีใบเซอร์ที่เปิดอยู่ (cert เป็น null) ต้องไม่แตะ scroll ของ body เลย —
    // ก่อนหน้านี้ effect ทำงานทันทีตอน mount ทำให้ล็อกสกอลทั้งหน้าตั้งแต่โหลดเสร็จ
    if (!cert) return undefined

    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)

    // ต้องใช้ class .modal-open เท่านั้น ห้ามเซ็ต body.style.overflow ตรง ๆ เพราะ
    // 1) มันทับ overflow-x: clip ที่ navbar sticky ต้องใช้
    // 2) พอสกอลล์ถูกล็อก animation-timeline: view() จะไม่มีระยะให้คำนวณ
    //    ทุก .reveal เลยรีเซ็ตเป็น opacity: 0 = เนื้อหาหายทั้งหน้า
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

  // ใช้ Portal render ตรงไปที่ document.body — เพราะ App.js มี wrapper div ที่ใส่
  // transition-transform (translate-x-0) ซึ่งทำให้ ancestor กลายเป็น containing block
  // ใหม่ของ position:fixed ทำให้ modal เดิมไม่ยึดกับ viewport แต่ยึดกับความสูงทั้งหมด
  // ของหน้า ผลคือถ้าเลื่อนสกอลลงมา modal จะไปโผล่นอกจอ (เห็นเป็นหน้าเปล่า)
  return createPortal(
    <div
      style={s.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
      onClick={onClose}
    >
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="btn-icon" style={s.closeBtn} aria-label="ปิด">✕</button>

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
              ดูใบเซอร์ตัวเต็ม ↗
            </a>
            <span style={{ ...s.backVerified, color: cert.color }}>✓ Verified · FutureSkill 2026</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

function Certificate() {
  const isMobile = useIsMobile()
  // มือถือโชว์แค่ 3 ใบก่อน เดสก์ท็อป 4 ใบ
  const initialShow = isMobile ? MOBILE_INITIAL_SHOW : DESKTOP_INITIAL_SHOW
  const step = isMobile ? MOBILE_INITIAL_SHOW : STEP
  const [shown, setShown] = useState(initialShow)
  const [activeCert, setActiveCert] = useState(null)

  // useState จำค่าแค่ตอน mount — ถ้าไม่ sync ตรงนี้ ย่อจอจากเดสก์ท็อปมามือถือจะยังค้างที่ 4 ใบ
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
          <p className="section-eyebrow">FutureSkill · Fullstack Developer Path</p>
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

        {/* Show more / Show less — both available together so you're never "stuck" */}
        <div style={s.btnWrap}>
          {canCollapse && (
            <button
              type="button"
              className="btn btn-subtle"
              onClick={() => setShown(sVal => Math.max(sVal - step, initialShow))}
            >
              แสดงน้อยลง ↑
            </button>
          )}
          {hasMore && (
            <button
              type="button"
              className="btn btn-subtle"
              onClick={() => setShown(sVal => Math.min(sVal + step, allCerts.length))}
            >
              ดูเพิ่มอีก {Math.min(step, allCerts.length - shown)} ใบ
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

  // Card (no 3D transforms — flip caused mirror render bugs in some browsers)
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

  // ── Modal ────────────────────────────────────────────────
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
  // หน้าตาปุ่มมาจาก .btn-icon ทั้งหมด ตรงนี้เหลือแค่การวางตำแหน่ง
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
