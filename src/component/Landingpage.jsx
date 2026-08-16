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
      "แพลตฟอร์มช่วยคุณครูไทยสร้างสื่อการสอนด้วย AI ทั้งแผนการสอน ใบงาน แบบทดสอบ และอินโฟกราฟิก อ้างอิงหลักสูตรแกนกลางฯ พร้อมตัวชี้วัด",
    demo: "https://thai-teacher-ai.vercel.app/",
    actionLabel: "Visit Website",
    github: "https://github.com/wiraphat-kany/thai-teacher-ai",
    accent: "#7C6FF7",
    role: "Solo Developer — ออกแบบ UI, พัฒนา Frontend และเชื่อมต่อ AI API ทั้งหมด",
    status: "เปิดใช้งานแล้ว",
    overview:
      "ครูไทยใช้เวลาไปกับการเตรียมสื่อการสอนค่อนข้างมาก ThaiTeacher AI จึงถูกสร้างขึ้นเพื่อย่นขั้นตอนนั้น เพียงเลือกวิชา ระดับชั้น และหัวข้อ ระบบจะสร้างแผนการสอน ใบงาน แบบทดสอบ อินโฟกราฟิก และรูปประกอบให้ครบชุดในไม่กี่นาที โดยอ้างอิงหลักสูตรแกนกลางฯ และระบุตัวชี้วัดให้ในทุกแผน",
    highlights: [
      "สร้างสื่อครบชุดจากหัวข้อเดียว — แผนการสอน ใบงาน แบบทดสอบ อินโฟกราฟิก",
      "ครอบคลุม 8 กลุ่มสาระ ตั้งแต่ระดับ ป.1 ถึง ม.6",
      "อ้างอิงหลักสูตรแกนกลางฯ พร้อมระบุตัวชี้วัดในทุกแผน",
      "สร้างรูปภาพประกอบด้วย AI ให้เข้ากับเนื้อหาโดยอัตโนมัติ",
      "ใช้งานได้ฟรี ไม่ต้องผูกบัตรเครดิต",
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
      "เว็บสร้าง QR Code ฟรี ปรับแต่งสีและใส่โลโก้ได้ พร้อมดาวน์โหลดไฟล์ความละเอียดสูงสำหรับใช้งานจริง ออกแบบให้ใช้ง่ายทั้งบนมือถือและเดสก์ท็อป",
    demo: "https://sweet-qr.site/",
    actionLabel: "Visit Website",
    accent: "#E0567A",
    role: "Solo Developer — ออกแบบ UI/UX และพัฒนาทั้งระบบ",
    status: "เปิดใช้งานแล้ว",
    overview:
      "เครื่องมือสร้าง QR Code ส่วนใหญ่มักติดลายน้ำ จำกัดจำนวนครั้ง หรือให้ไฟล์ความละเอียดต่ำจนนำไปพิมพ์จริงไม่ได้ Sweet QR จึงทำให้ทุกอย่างฟรีตั้งแต่ต้น ปรับสี ใส่โลโก้ แล้วดาวน์โหลดไฟล์คุณภาพสูงไปใช้งานได้ทันที",
    highlights: [
      "สร้าง QR Code ได้ฟรี ไม่มีลายน้ำ",
      "ปรับสีและใส่โลโก้ตรงกลาง QR ได้",
      "ดาวน์โหลดไฟล์ความละเอียดสูง พร้อมนำไปพิมพ์จริง",
      "ใช้งานลื่นทั้งบนมือถือและเดสก์ท็อป",
    ],
    stack: [
      { group: "Frontend", items: ["React", "Tailwind CSS"] },
      { group: "Feature", items: ["QR Generation", "Logo Embedding"] },
    ],
  },
  {
    id: 3,
    image: "/images/projects/freenzyshoot.jpg",
    category: "2D Game",
    title: "FreenzyShoot",
    tags: ["Unity", "C#", "2D Physics"],
    description:
      "เกม 2D Action Platformer / Shooter ผู้เล่นวิ่ง กระโดด ปีนบันได เก็บอาวุธ ยิงศัตรู หลบกับดัก เพื่อไปให้ถึงประตูทางออกของแต่ละด่าน",
    demo: "https://github.com/wiraphat-kany/FreenzyShoot",
    github: "https://github.com/wiraphat-kany/FreenzyShoot",
    accent: "#4FC97E",
    role: "Game Developer — ออกแบบด่าน ระบบการเล่น และเขียนสคริปต์ทั้งหมด",
    status: "เสร็จสมบูรณ์",
    overview:
      "เกมแอ็กชันแพลตฟอร์มเมอร์ 2 มิติที่โฟกัสไปที่จังหวะการเคลื่อนที่และการยิง ผู้เล่นต้องอ่านการวางตำแหน่งของศัตรูและกับดัก เลือกใช้อาวุธให้เหมาะกับสถานการณ์ แล้วหาเส้นทางไปยังประตูทางออกของแต่ละด่าน",
    highlights: [
      "ระบบเคลื่อนที่ครบ — วิ่ง กระโดด ปีนบันได",
      "อาวุธหลายชนิดที่เก็บได้ระหว่างเล่น",
      "ศัตรูหลายรูปแบบพร้อมพฤติกรรมต่างกัน",
      "กับดักและการออกแบบด่านที่ต้องวางแผนเส้นทาง",
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
        aria-label={`ดูรายละเอียดโปรเจค ${project.title}`}
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
            คลิกเพื่อดูรายละเอียด
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
              ดูรายละเอียด
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
          <button type="button" className="btn-icon project-modal-close" onClick={onClose} aria-label="Close">
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
              {project.actionLabel || "Demo"}
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
