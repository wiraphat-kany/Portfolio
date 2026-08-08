import React, { useEffect, useState } from 'react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#project' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

const sectionIds = links.map((l) => l.href.slice(1))

// ต้องรอ transition สไลด์หน้า (duration-500) จบก่อน ไม่งั้น section ยังถูก transform
// อยู่ ทำให้คำนวณตำแหน่ง scroll ผิด
const PAGE_TRANSITION_MS = 520

function Navbar({ currentPage = 'index', onNavigation }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // passive listener + rAF throttle: อ่าน scrollY ครั้งเดียวต่อเฟรม ไม่บล็อกการเลื่อน
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ปิดเมนูมือถืออัตโนมัติเมื่อขยายจอเป็น desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Scroll-spy: ไฮไลต์เมนูตาม section ที่กำลังมองเห็นอยู่
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e, href) => {
    setOpen(false)
    if (currentPage === 'index') return

    // อยู่หน้า View All อยู่ — พากลับหน้าหลักก่อน แล้วค่อยเลื่อนไปยัง section
    e.preventDefault()
    const id = href.slice(1)
    setActiveSection(id)
    onNavigation?.('index')
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, PAGE_TRANSITION_MS)
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md shadow-lg shadow-black/20' : ''
      }`}
      style={{ backgroundColor: scrolled ? 'rgba(13,11,26,0.9)' : 'var(--bg-primary)' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-6 py-4">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-white text-xl sm:text-2xl font-bold tracking-tight"
        >
          Wiraphat<span style={{ color: 'var(--accent-soft)' }}>.dev</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = currentPage === 'index' && activeSection === l.href.slice(1)
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="relative text-sm font-medium transition-colors pb-1"
                  style={{ color: isActive ? 'var(--accent-soft)' : '#d1d5db' }}
                >
                  {l.label}
                  <span
                    className="absolute left-0 -bottom-0.5 h-[2px] rounded-full transition-all duration-300"
                    style={{
                      width: isActive ? '100%' : '0%',
                      background: 'linear-gradient(90deg, var(--accent), var(--accent-pink))',
                    }}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden relative w-11 h-11 flex flex-col items-center justify-center gap-[5px]"
        >
          <span className={`block h-[2px] w-6 bg-white rounded transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-[2px] w-6 bg-white rounded transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block h-[2px] w-6 bg-white rounded transition-transform duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-white/5 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {links.map((l) => {
            const isActive = currentPage === 'index' && activeSection === l.href.slice(1)
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="block py-3 text-base font-medium border-b border-white/5 last:border-none transition-colors"
                  style={{ color: isActive ? 'var(--accent-soft)' : '#e5e7eb' }}
                >
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
