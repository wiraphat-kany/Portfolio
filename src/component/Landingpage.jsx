import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./Reveal";

const projects = [
  {
    id: 1,
    image: "/images/projects/thai-teacher-ai.jpg",
    category: "AI Web Application",
    title: "ThaiTeacher AI",
    tags: ["React", "Vite", "AI API"],
    description:
      "เนเธเธฅเธ•เธเธญเธฃเนเธกเธเนเธงเธขเธเธธเธ“เธเธฃเธนเนเธ—เธขเธชเธฃเนเธฒเธเธชเธทเนเธญเธเธฒเธฃเธชเธญเธเธ”เนเธงเธข AI เธ—เธฑเนเธเนเธเธเธเธฒเธฃเธชเธญเธ เนเธเธเธฒเธ เนเธเธเธ—เธ”เธชเธญเธ เนเธฅเธฐเธญเธดเธเนเธเธเธฃเธฒเธเธดเธ เธญเนเธฒเธเธญเธดเธเธซเธฅเธฑเธเธชเธนเธ•เธฃเนเธเธเธเธฅเธฒเธเธฏ เธเธฃเนเธญเธกเธ•เธฑเธงเธเธตเนเธงเธฑเธ”",
    demo: "https://thai-teacher-ai.vercel.app/",
    github: "https://github.com/wiraphat-kany/thai-teacher-ai",
    accent: "#7C6FF7",
    role: "Solo Developer โ€” เธญเธญเธเนเธเธ UI, เธเธฑเธ’เธเธฒ Frontend เนเธฅเธฐเน€เธเธทเนเธญเธกเธ•เนเธญ AI API เธ—เธฑเนเธเธซเธกเธ”",
    status: "เน€เธเธดเธ”เนเธเนเธเธฒเธเนเธฅเนเธง",
    overview:
      "เธเธฃเธนเนเธ—เธขเนเธเนเน€เธงเธฅเธฒเนเธเธเธฑเธเธเธฒเธฃเน€เธ•เธฃเธตเธขเธกเธชเธทเนเธญเธเธฒเธฃเธชเธญเธเธเนเธญเธเธเนเธฒเธเธกเธฒเธ ThaiTeacher AI เธเธถเธเธ–เธนเธเธชเธฃเนเธฒเธเธเธถเนเธเน€เธเธทเนเธญเธขเนเธเธเธฑเนเธเธ•เธญเธเธเธฑเนเธ เน€เธเธตเธขเธเน€เธฅเธทเธญเธเธงเธดเธเธฒ เธฃเธฐเธ”เธฑเธเธเธฑเนเธ เนเธฅเธฐเธซเธฑเธงเธเนเธญ เธฃเธฐเธเธเธเธฐเธชเธฃเนเธฒเธเนเธเธเธเธฒเธฃเธชเธญเธ เนเธเธเธฒเธ เนเธเธเธ—เธ”เธชเธญเธ เธญเธดเธเนเธเธเธฃเธฒเธเธดเธ เนเธฅเธฐเธฃเธนเธเธเธฃเธฐเธเธญเธเนเธซเนเธเธฃเธเธเธธเธ”เนเธเนเธกเนเธเธตเนเธเธฒเธ—เธต เนเธ”เธขเธญเนเธฒเธเธญเธดเธเธซเธฅเธฑเธเธชเธนเธ•เธฃเนเธเธเธเธฅเธฒเธเธฏ เนเธฅเธฐเธฃเธฐเธเธธเธ•เธฑเธงเธเธตเนเธงเธฑเธ”เนเธซเนเนเธเธ—เธธเธเนเธเธ",
    highlights: [
      "เธชเธฃเนเธฒเธเธชเธทเนเธญเธเธฃเธเธเธธเธ”เธเธฒเธเธซเธฑเธงเธเนเธญเน€เธ”เธตเธขเธง โ€” เนเธเธเธเธฒเธฃเธชเธญเธ เนเธเธเธฒเธ เนเธเธเธ—เธ”เธชเธญเธ เธญเธดเธเนเธเธเธฃเธฒเธเธดเธ",
      "เธเธฃเธญเธเธเธฅเธธเธก 8 เธเธฅเธธเนเธกเธชเธฒเธฃเธฐ เธ•เธฑเนเธเนเธ•เนเธฃเธฐเธ”เธฑเธ เธ.1 เธ–เธถเธ เธก.6",
      "เธญเนเธฒเธเธญเธดเธเธซเธฅเธฑเธเธชเธนเธ•เธฃเนเธเธเธเธฅเธฒเธเธฏ เธเธฃเนเธญเธกเธฃเธฐเธเธธเธ•เธฑเธงเธเธตเนเธงเธฑเธ”เนเธเธ—เธธเธเนเธเธ",
      "เธชเธฃเนเธฒเธเธฃเธนเธเธ เธฒเธเธเธฃเธฐเธเธญเธเธ”เนเธงเธข AI เนเธซเนเน€เธเนเธฒเธเธฑเธเน€เธเธทเนเธญเธซเธฒเนเธ”เธขเธญเธฑเธ•เนเธเธกเธฑเธ•เธด",
      "เนเธเนเธเธฒเธเนเธ”เนเธเธฃเธต เนเธกเนเธ•เนเธญเธเธเธนเธเธเธฑเธ•เธฃเน€เธเธฃเธ”เธดเธ•",
    ],
    stack: [
      { group: "Frontend", items: ["React", "Vite"] },
      { group: "AI", items: ["AI Generation API"] },
      { group: "Deploy", items: ["Vercel"] },
    ],
  },
  {
    id: 2,
    image: "/images/projects/sweet-qr.jpg",
    category: "Web Application",
    title: "Sweet QR",
    tags: ["React", "Tailwind CSS", "QR Generator"],
    description:
      "เน€เธงเนเธเธชเธฃเนเธฒเธ QR Code เธเธฃเธต เธเธฃเธฑเธเนเธ•เนเธเธชเธตเนเธฅเธฐเนเธชเนเนเธฅเนเธเนเนเธ”เน เธเธฃเนเธญเธกเธ”เธฒเธงเธเนเนเธซเธฅเธ”เนเธเธฅเนเธเธงเธฒเธกเธฅเธฐเน€เธญเธตเธขเธ”เธชเธนเธเธชเธณเธซเธฃเธฑเธเนเธเนเธเธฒเธเธเธฃเธดเธ เธญเธญเธเนเธเธเนเธซเนเนเธเนเธเนเธฒเธขเธ—เธฑเนเธเธเธเธกเธทเธญเธ–เธทเธญเนเธฅเธฐเน€เธ”เธชเธเนเธ—เนเธญเธ",
    demo: "https://sweet-qr.site/",
    accent: "#E0567A",
    role: "Solo Developer โ€” เธญเธญเธเนเธเธ UI/UX เนเธฅเธฐเธเธฑเธ’เธเธฒเธ—เธฑเนเธเธฃเธฐเธเธ",
    status: "เน€เธเธดเธ”เนเธเนเธเธฒเธเนเธฅเนเธง",
    overview:
      "เน€เธเธฃเธทเนเธญเธเธกเธทเธญเธชเธฃเนเธฒเธ QR Code เธชเนเธงเธเนเธซเธเนเธกเธฑเธเธ•เธดเธ”เธฅเธฒเธขเธเนเธณ เธเธณเธเธฑเธ”เธเธณเธเธงเธเธเธฃเธฑเนเธ เธซเธฃเธทเธญเนเธซเนเนเธเธฅเนเธเธงเธฒเธกเธฅเธฐเน€เธญเธตเธขเธ”เธ•เนเธณเธเธเธเธณเนเธเธเธดเธกเธเนเธเธฃเธดเธเนเธกเนเนเธ”เน Sweet QR เธเธถเธเธ—เธณเนเธซเนเธ—เธธเธเธญเธขเนเธฒเธเธเธฃเธตเธ•เธฑเนเธเนเธ•เนเธ•เนเธ เธเธฃเธฑเธเธชเธต เนเธชเนเนเธฅเนเธเน เนเธฅเนเธงเธ”เธฒเธงเธเนเนเธซเธฅเธ”เนเธเธฅเนเธเธธเธ“เธ เธฒเธเธชเธนเธเนเธเนเธเนเธเธฒเธเนเธ”เนเธ—เธฑเธเธ—เธต",
    highlights: [
      "เธชเธฃเนเธฒเธ QR Code เนเธ”เนเธเธฃเธต เนเธกเนเธกเธตเธฅเธฒเธขเธเนเธณ",
      "เธเธฃเธฑเธเธชเธตเนเธฅเธฐเนเธชเนเนเธฅเนเธเนเธ•เธฃเธเธเธฅเธฒเธ QR เนเธ”เน",
      "เธ”เธฒเธงเธเนเนเธซเธฅเธ”เนเธเธฅเนเธเธงเธฒเธกเธฅเธฐเน€เธญเธตเธขเธ”เธชเธนเธ เธเธฃเนเธญเธกเธเธณเนเธเธเธดเธกเธเนเธเธฃเธดเธ",
      "เนเธเนเธเธฒเธเธฅเธทเนเธเธ—เธฑเนเธเธเธเธกเธทเธญเธ–เธทเธญเนเธฅเธฐเน€เธ”เธชเธเนเธ—เนเธญเธ",
    ],
    stack: [
      { group: "Frontend", items: ["React", "Tailwind CSS"] },
      { group: "Feature", items: ["QR Generation", "Logo Embedding"] },
    ],
    note: "เนเธเนเธ”เน€เธเนเธเน€เธเนเธ private repository เน€เธเธทเนเธญเธเธเธฒเธเธกเธตเธเนเธญเธกเธนเธฅเธเธฒเธฃเธ•เธฑเนเธเธเนเธฒเธ—เธตเนเนเธกเนเน€เธเธดเธ”เน€เธเธข",
  },
  {
    id: 3,
    image: "/images/projects/freenzyshoot.jpg",
    category: "2D Game",
    title: "FreenzyShoot",
    tags: ["Unity", "C#", "2D Physics"],
    description:
      "เน€เธเธก 2D Action Platformer / Shooter เธเธนเนเน€เธฅเนเธเธงเธดเนเธ เธเธฃเธฐเนเธ”เธ” เธเธตเธเธเธฑเธเนเธ” เน€เธเนเธเธญเธฒเธงเธธเธ เธขเธดเธเธจเธฑเธ•เธฃเธน เธซเธฅเธเธเธฑเธเธ”เธฑเธ เน€เธเธทเนเธญเนเธเนเธซเนเธ–เธถเธเธเธฃเธฐเธ•เธนเธ—เธฒเธเธญเธญเธเธเธญเธเนเธ•เนเธฅเธฐเธ”เนเธฒเธ",
    demo: "https://github.com/wiraphat-kany/FreenzyShoot",
    github: "https://github.com/wiraphat-kany/FreenzyShoot",
    accent: "#4FC97E",
    role: "Game Developer โ€” เธญเธญเธเนเธเธเธ”เนเธฒเธ เธฃเธฐเธเธเธเธฒเธฃเน€เธฅเนเธ เนเธฅเธฐเน€เธเธตเธขเธเธชเธเธฃเธดเธเธ•เนเธ—เธฑเนเธเธซเธกเธ”",
    status: "เน€เธชเธฃเนเธเธชเธกเธเธนเธฃเธ“เน",
    overview:
      "เน€เธเธกเนเธญเนเธเธเธฑเธเนเธเธฅเธ•เธเธญเธฃเนเธกเน€เธกเธญเธฃเน 2 เธกเธดเธ•เธดเธ—เธตเนเนเธเธเธฑเธชเนเธเธ—เธตเนเธเธฑเธเธซเธงเธฐเธเธฒเธฃเน€เธเธฅเธทเนเธญเธเธ—เธตเนเนเธฅเธฐเธเธฒเธฃเธขเธดเธ เธเธนเนเน€เธฅเนเธเธ•เนเธญเธเธญเนเธฒเธเธเธฒเธฃเธงเธฒเธเธ•เธณเนเธซเธเนเธเธเธญเธเธจเธฑเธ•เธฃเธนเนเธฅเธฐเธเธฑเธเธ”เธฑเธ เน€เธฅเธทเธญเธเนเธเนเธญเธฒเธงเธธเธเนเธซเนเน€เธซเธกเธฒเธฐเธเธฑเธเธชเธ–เธฒเธเธเธฒเธฃเธ“เน เนเธฅเนเธงเธซเธฒเน€เธชเนเธเธ—เธฒเธเนเธเธขเธฑเธเธเธฃเธฐเธ•เธนเธ—เธฒเธเธญเธญเธเธเธญเธเนเธ•เนเธฅเธฐเธ”เนเธฒเธ",
    highlights: [
      "เธฃเธฐเธเธเน€เธเธฅเธทเนเธญเธเธ—เธตเนเธเธฃเธ โ€” เธงเธดเนเธ เธเธฃเธฐเนเธ”เธ” เธเธตเธเธเธฑเธเนเธ”",
      "เธญเธฒเธงเธธเธเธซเธฅเธฒเธขเธเธเธดเธ”เธ—เธตเนเน€เธเนเธเนเธ”เนเธฃเธฐเธซเธงเนเธฒเธเน€เธฅเนเธ",
      "เธจเธฑเธ•เธฃเธนเธซเธฅเธฒเธขเธฃเธนเธเนเธเธเธเธฃเนเธญเธกเธเธคเธ•เธดเธเธฃเธฃเธกเธ•เนเธฒเธเธเธฑเธ",
      "เธเธฑเธเธ”เธฑเธเนเธฅเธฐเธเธฒเธฃเธญเธญเธเนเธเธเธ”เนเธฒเธเธ—เธตเนเธ•เนเธญเธเธงเธฒเธเนเธเธเน€เธชเนเธเธ—เธฒเธ",
    ],
    stack: [
      { group: "Engine", items: ["Unity"] },
      { group: "Language", items: ["C#"] },
      { group: "System", items: ["2D Physics", "Animation", "Level Design"] },
    ],
  },
];

const GitHubIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-1.95c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.78.11 3.07.74.81 1.19 1.84 1.19 3.1 0 4.42-2.68 5.4-5.24 5.69.41.35.77 1.03.77 2.07v3.07c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const Chip = ({ accent, children }) => (
  <span
    className="px-3 py-1 text-xs font-semibold rounded-full"
    style={{ backgroundColor: `${accent}1a`, color: accent, border: `1px solid ${accent}40` }}
  >
    {children}
  </span>
);

function ProjectCard({ project, delay, onOpen }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        role="button"
        tabIndex={0}
        aria-label={`เธ”เธนเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”เนเธเธฃเน€เธเธ ${project.title}`}
        onClick={() => onOpen(project)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(project);
          }
        }}
        className="uv-card project-card rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer"
        style={{ backgroundColor: "#1a1535", border: `1px solid ${project.accent}33` }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${project.accent}88`)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${project.accent}33`)}
      >
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.accent}33)` }} />

        <div className="aspect-[16/10] overflow-hidden relative">
          <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
          <span className="project-card-hint">
            เธเธฅเธดเธเน€เธเธทเนเธญเธ”เธนเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”
          </span>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <p className="text-sm mb-2 font-semibold" style={{ color: project.accent }}>
            {project.category}
          </p>

          <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">{project.title}</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Chip key={tag} accent={project.accent}>
                {tag}
              </Chip>
            ))}
          </div>

          <p style={{ color: "var(--text-body)" }} className="flex-1 text-sm leading-relaxed">
            {project.description}
          </p>

          <div className="mt-6 flex justify-between items-center">
            <span className="text-sm font-semibold" style={{ color: project.accent }}>
              เธ”เธนเธฃเธฒเธขเธฅเธฐเน€เธญเธตเธขเธ”
            </span>
            {project.github ? <GitHubIcon className="w-6 h-6" /> : <Chip accent={project.accent}>Private repo</Chip>}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const prevPad = document.body.style.paddingRight;
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    document.body.classList.add("modal-open");
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = prevPad;
    };
  }, [onClose]);

  if (!project) return null;
  const a = project.accent;
  const technologies = project.stack?.flatMap((group) => group.items) ?? project.tags;

  return createPortal(
    <div className="project-modal-backdrop" onClick={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        className="project-modal"
        style={{ borderColor: `${a}55` }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="project-modal-header">
          <div>
            <p className="project-modal-category" style={{ color: a }}>{project.category}</p>
            <h3 id="project-modal-title">{project.title}</h3>
          </div>
          <button type="button" className="btn-icon project-modal-close" onClick={onClose} aria-label="ปิด">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="project-modal-layout">
          <section className="project-modal-media" aria-label="Project media">
            <span className="project-modal-label">Project Media</span>
            <img src={project.image} alt={project.title} />
          </section>

          <div className="project-modal-content">
            <section>
              <span className="project-modal-label">Project Overview</span>
              <p className="project-modal-text">{project.overview || project.description}</p>
            </section>

            {project.role && (
              <section>
                <span className="project-modal-label">My Contribution</span>
                <p className="project-modal-text">{project.role}</p>
              </section>
            )}

            {project.highlights?.length > 0 && (
              <section>
                <span className="project-modal-label">Key Highlights</span>
                <ul className="project-modal-list">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>
                      <span className="bullet" style={{ backgroundColor: a }} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <span className="project-modal-label">Technologies Used</span>
              <div className="project-modal-tech">
                {project.status && <Chip accent={a}>{project.status}</Chip>}
                {technologies.map((technology) => <Chip key={technology} accent={a}>{technology}</Chip>)}
              </div>
            </section>

            {project.note && <p className="project-modal-note">{project.note}</p>}
          </div>
        </div>

        <footer className="project-modal-footer">
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ borderColor: `${a}66`, color: a }}>
              <GitHubIcon />
              Repository
            </a>
          ) : (
            <span className="btn is-disabled"><GitHubIcon /> Private repo</span>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ backgroundColor: a }}>
              Demo
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" />
              </svg>
            </a>
          )}
        </footer>
      </div>
    </div>,
    document.body
  );
}
function Landingpage() {
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="project" className="relative py-20 md:py-24 overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="section-glow" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <Reveal>
          <p className="section-eyebrow">Selected Work</p>
          <h2 className="section-heading">Projects</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 80} onOpen={setActive} />
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  );
}

export default Landingpage;
