import React, { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

const EMAIL = 'wiraphat.kany@gmail.com'

const socials = [
  {
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: (
      <path d="M2 4h20v16H2V4zm2 2v.01L12 13l8-6.99V6H4zm16 2.24-7.4 6.47a1 1 0 0 1-1.2 0L4 8.24V18h16V8.24z" />
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/wiraphat-kany',
    href: 'https://github.com/wiraphat-kany',
    icon: (
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-1.95c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.42-2.68 5.4-5.24 5.69.41.35.77 1.03.77 2.07v3.07c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    ),
  },
]

function Contact() {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  // เก็บ timer ไว้ใน ref แล้วเคลียร์ทั้งตอนกดซ้ำและตอน unmount
  // ไม่งั้นกดรัว ๆ timer จะซ้อนกันแล้วข้อความ "คัดลอกแล้ว" หายเร็วกว่าที่ควร
  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard ใช้ไม่ได้ (http หรือเบราว์เซอร์ไม่รองรับ) — ไม่ต้องทำอะไร
    }
  }

  return (
    <section id="contact" className="relative py-20 md:py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-alt)' }}>
      <div className="section-glow" />

      <div className="max-w-3xl mx-auto relative text-center">
        <Reveal>
          <p className="section-eyebrow">Get In Touch</p>
          <h2 className="section-heading">Let's Work Together</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.label === 'Email' ? undefined : '_blank'}
                rel="noreferrer"
                className="uv-card flex items-center gap-3 px-5 py-3 rounded-xl w-full sm:w-auto"
                style={{ backgroundColor: '#1a1535', border: '1px solid #3b1f6b' }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--accent-pink)" className="shrink-0">
                  {s.icon}
                </svg>
                <span className="text-sm text-gray-200">{s.value}</span>
              </a>
            ))}
          </div>

          <button
            onClick={handleCopy}
            type="button"
            className="btn btn-ghost btn-sm"
            style={copied ? { color: '#4FC97E', borderColor: 'rgba(79,201,126,0.5)' } : undefined}
          >
            {copied ? '✓ คัดลอกอีเมลแล้ว' : 'คัดลอกอีเมล'}
          </button>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
