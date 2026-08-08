import React, { useEffect, useState } from 'react'
import Reveal from './Reveal'

// ── ลูกเล่นเล็กๆ ให้ดูเป็นสาย dev: กล่องเทอร์มินัลจำลอง พิมพ์โค้ดวนไปเรื่อยๆ ──
const codeLines = [
  "const developer = 'Wiraphat';",
  "npm run dev",
  "console.log('Hello, World! 👋');",
  "git commit -m 'first commit'",
]

function TerminalTyper() {
  const [lineIndex, setLineIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mql.matches)
  }, [])

  useEffect(() => {
    if (reduceMotion) { setText(codeLines[0]); return undefined }

    const current = codeLines[lineIndex]
    let timeout

    if (paused) {
      timeout = setTimeout(() => { setPaused(false); setDeleting(true) }, 1400)
    } else if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 45)
    } else if (!deleting && text.length === current.length) {
      setPaused(true)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), 22)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setLineIndex((i) => (i + 1) % codeLines.length)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, paused, lineIndex, reduceMotion])

  return (
    <div className="terminal-chip" aria-hidden="true">
      <div className="terminal-dots">
        <span style={{ background: '#ff5f57' }} />
        <span style={{ background: '#febc2e' }} />
        <span style={{ background: '#28c840' }} />
      </div>
      <code className="terminal-text">
        {text}<span className="terminal-cursor">▍</span>
      </code>
    </div>
  )
}

function Banner() {
  return (
    <div
      id="home"
      className="relative w-full min-h-[88vh] flex items-center overflow-hidden px-6"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Ambient glow / decorative background (no external image dependency) */}
      <div
        className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,111,247,0.25) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 70%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto relative z-10 py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-10 items-center">
        <Reveal>
          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Hello, I'm
          </p>
          <h1 className="font-extrabold text-white leading-[1.05]" style={{ fontSize: 'clamp(2.4rem, 8vw, 5.5rem)' }}>
            Wiraphat Khanyos
          </h1>
          <h2
            className="font-semibold mt-3 mb-6"
            style={{ color: 'var(--accent-pink)', fontSize: 'clamp(1.1rem, 3.5vw, 1.9rem)' }}
          >
            Full Stack Developer | Frontend
          </h2>
          <p className="max-w-xl text-sm sm:text-base leading-relaxed mb-6" style={{ color: 'var(--text-body)' }}>
            Architecting scalable web applications, engineering seamless user experiences, and driving continuous improvement through hands-on projects.
          </p>

          <TerminalTyper />

          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#contact" className="btn btn-primary btn-lg">
              Contact Me
              <span className="btn-arrow" />
            </a>

            <a
              href="#certificates"
              className="btn btn-ghost btn-lg"
            >
              View Resume
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="hero-photo">
            <div className="hero-photo-disc">
              <img src="/images/profile.webp" alt="Wiraphat Khanyos" loading="eager" />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default Banner
