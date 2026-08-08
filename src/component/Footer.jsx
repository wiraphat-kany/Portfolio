import React from 'react'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ backgroundColor: 'var(--bg-alt)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">
          © {year} Wiraphat Khanyos. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm">
          <a href="#home" className="text-gray-400 hover:text-[var(--accent-soft)] transition-colors">Home</a>
          <a href="#certificates" className="text-gray-400 hover:text-[var(--accent-soft)] transition-colors">Certificates</a>
          <a href="#contact" className="text-gray-400 hover:text-[var(--accent-soft)] transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
