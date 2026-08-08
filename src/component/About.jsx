import React from 'react'
import Reveal from './Reveal'

function About() {
  return (
    <div id="about" style={{ backgroundColor: 'var(--bg-alt)' }}>
      <div className="max-w-4xl mx-auto py-20 md:py-24 h-auto relative px-6">
        <Reveal>
          <p className="section-eyebrow">Get To Know Me</p>
          <h2 className="section-heading">About Me</h2>
          <div className="w-14 h-[3px] mx-auto mb-8 rounded-full" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-pink))' }} />
        </Reveal>
        <Reveal delay={100}>
          <p className="text-sm md:text-base leading-relaxed text-center" style={{ color: 'var(--text-body)' }}>
            My name is Wiraphat Khanyos, a Web Developer. With over 2 years of experience in designing and developing websites, specializing in landing pages and digital marketing websites. Proficient in modern front-end technologies including HTML, CSS, JavaScript, React.js, and Tailwind CSS. Experienced in building responsive websites optimized for both desktop and mobile devices, as well as integrating databases and data management systems through Google Apps Script and APIs. Creative, detail-oriented, and capable of collaborating effectively within teams while delivering efficient solutions to complex problems.
          </p>
        </Reveal>
      </div>
    </div>
  )
}

export default About
