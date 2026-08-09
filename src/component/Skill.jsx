import React, { useState } from 'react'
import './Skill.css'
import Reveal from './Reveal'

const categories = [
  { id: 'frontend', label: 'Frontend', color: '#7C6FF7' },
  { id: 'backend', label: 'Backend', color: '#4FC97E' },
  { id: 'database', label: 'Database', color: '#F7A24F' },
  { id: 'tools', label: 'Tools', color: '#E96A8A' },
]

const skills = [
  { name: 'HTML5', cat: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', cat: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', cat: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React.js', cat: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Tailwind CSS', cat: 'frontend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', cat: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', cat: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
  { name: 'C# (OOP)', cat: 'backend', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'SQL', cat: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', cat: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Firebase', cat: 'database', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'GitHub', cat: 'tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
  { name: 'Figma', cat: 'tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Postman', cat: 'tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
  { name: 'Unity', cat: 'tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', invert: true },
  { name: 'Photoshop', cat: 'tools', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg'},
  { name: 'ClickFunnels', cat: 'tools', emoji: '🔧' },
  { name: 'Apps Script', cat: 'tools', emoji: '📋' },
]



function Skill() {
  const [active, setActive] = useState('frontend')

  const filtered = skills.filter(s => s.cat === active)
  const activeCat = categories.find(c => c.id === active)

  return (
    <section id="skills" className="skill-section">
      <div className="skill-glow" />

      <div className="skill-inner">
        <Reveal>
          <p className="skill-eyebrow">What I work with</p>
          <h2 className="skill-heading">Skills</h2>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={100}>
          <div className="skill-tabs">
            {categories.map(cat => {
              const isActive = active === cat.id
              return (
                <button type="button"
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className="skill-tab"
                  style={{
                    background: isActive ? `${cat.color}22` : 'transparent',
                    border: `1px solid ${isActive ? `${cat.color}99` : 'rgba(255,255,255,0.1)'}`,
                    color: isActive ? cat.color : '#7B7A9A',
                    boxShadow: isActive ? `0 0 12px ${cat.color}44` : 'none',
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="skill-grid">
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              className="skill-card"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <span
              />

              <div className="skill-icon-wrap">
                {skill.icon ? (
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    style={{ filter: skill.invert ? 'invert(1)' : 'none' }}
                  />
                ) : (
                  <span className="skill-emoji">{skill.emoji}</span>
                )}
              </div>

              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>

        <p className="skill-count">
          {filtered.length} skill{filtered.length !== 1 ? 's' : ''}
          {active !== 'all' && ` in ${activeCat?.label}`}
        </p>
      </div>
    </section>
  )
}

export default Skill
