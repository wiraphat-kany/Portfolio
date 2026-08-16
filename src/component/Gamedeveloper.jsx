import React, { useState } from 'react'
import Reveal from './Reveal'

const projects = [
  {
    title: "Project : Domu",
    period: "September 2023 - December 2023",
    subject: "Subject : Industrial Innovation Projects",
    videoUrl: "/video/Domu.mp4",
    platform: "Mobile Android",
    keyRoles: "Developer",
    details: [
      "Game development.",
      "Integrated Firebase for application data.",
      "Integrated the OpenAI DALL-E API.",
      "Wrote C# scripts for login, image uploads, and the gallery.",
    ],
    accent: "#7C6FF7",
  },
  {
    title: "Project : Running Away",
    period: "August 2022 - November 2022",
    subject: "Subject : Artificial Intelligence for Games",
    videoUrl: "/video/Gameplay.mp4",
    platform: "PC",
    keyRoles: "Project Leader, Object Designer, and Developer",
    details: [
      "Created 2D artwork for objects and environments.",
      "Designed the game levels.",
    ],
    accent: "#7C6FF7",
  },
  {
    title: "Project : Knight Adventure",
    period: "March 2022 - May 2022",
    subject: "Subject : Game Programming",
    videoUrl: "/video/KnightAdventure.mp4",
    platform: "PC",
    keyRoles: "Project Leader, Planner, Coordinator, Tester, and GDD Writer",
    details: [
      "Created 2D artwork, the game layout, and UX/UI.",
      "Wrote C# scripts for the menu, health bar, scenes, traps, and respawn system.",
      "Selected background music and sound effects.",
    ],
    accent: "#7C6FF7",
  },
  {
    title: "Project : Milky Way",
    period: "March 2022",
    subject: "Subject : Object-Oriented Programming",
    videoUrl: "/video/MilkyWay.mp4",
    platform: "PC",
    keyRoles: "Project Leader, Planner, Coordinator, and Tester",
    details: [
      "Designed the game.",
      "Wrote C# scripts for the menu, score, scenes, and respawn system.",
    ],
    accent: "#7C6FF7",
  },
  {
    title: "Project : Little Duck",
    period: "January 2022 - February 2022",
    subject: "Subject : Object-Oriented Programming",
    videoUrl: "/video/LittleDuck.mp4",
    platform: "PC",
    keyRoles: "Project Leader, Planner, Coordinator, and Tester",
    details: [
      "Designed the game.",
      "Designed the game levels.",
    ],
    accent: "#7C6FF7",
  },
]

function ProjectCard({ project, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className="uv-card flex flex-col rounded-2xl overflow-hidden h-full"
        style={{ backgroundColor: '#1a1535', border: `1px solid ${project.accent}33`, transform: 'none' }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${project.accent}88`)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${project.accent}33`)}
      >
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.accent}33)` }} />
        {/* A fixed media area keeps portrait and landscape videos aligned without cropping. */}
        <div className="relative w-full h-56 sm:h-64 md:h-72 bg-black flex items-center justify-center">
          <video
            className="w-full h-full object-contain"
            src={project.videoUrl}
            controls
            preload="metadata"
            playsInline
          />
          <span
            className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full pointer-events-none"
            style={{ background: `${project.accent}22`, color: project.accent, border: `1px solid ${project.accent}55` }}
          >
            {project.platform}
          </span>
        </div>

        <div className="p-6 flex flex-col gap-3 flex-1">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="text-xs text-gray-400 mt-1">{project.period}</p>
            <p className="text-xs text-gray-400">{project.subject}</p>
          </div>

          <div className="text-sm space-y-1 flex-1" style={{ color: 'var(--text-body)' }}>
            <p><span className="text-gray-400">Key Roles :</span> {project.keyRoles}</p>
            <ul className="list-disc list-inside text-gray-400 mt-1 space-y-1">
              {project.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function Gamedeveloper() {
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projects : projects.slice(0, 3)

  return (
    <section id="game-projects" className="relative py-20 md:py-24 overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="section-glow" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <Reveal>
          <p className="section-eyebrow">Game Development</p>
          <h2 className="section-heading">Game Development Projects</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleProjects.map((project, i) => (
            <div key={project.title} className={!showAll && i === 2 ? "hidden md:block" : ""}>
              <ProjectCard project={project} delay={i * 80} />
            </div>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => setShowAll((current) => !current)}
              className="btn btn-primary px-7 py-3"
              aria-expanded={showAll}
            >
              {showAll ? "Show Fewer Projects" : "View More Projects"}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gamedeveloper
