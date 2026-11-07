import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Database, Layers, X } from "lucide-react";
import { projects } from "../data/projects";

const categories = ["All projects", ...new Set(projects.map((project) => project.category))];

export function FinderProjects() {
  const [category, setCategory] = useState("All projects");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const triggers = useRef(new Map<number, HTMLButtonElement>());
  const reduced = useReducedMotion();
  const filtered = category === "All projects" ? projects : projects.filter((project) => project.category === category);

  const close = (id: number) => {
    setSelectedId(null);
    triggers.current.get(id)?.focus({ preventScroll: true });
  };

  return (
    <div className="projects-browser">
      <div className="project-filters" role="group" aria-label="Filter projects">
        {categories.map((item) => <button key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setSelectedId(null); }}>{item}<span>{item === "All projects" ? projects.length : projects.filter((project) => project.category === item).length}</span></button>)}
      </div>
      <div className="project-list">
        {filtered.map((project) => {
          const selected = selectedId === project.id;
          const Icon = project.category === "Data" ? Database : Layers;
          return (
            <motion.article className={`project-row ${selected ? "is-open" : ""}`} key={project.id} onKeyDown={(event) => { if (selected && event.key === "Escape") close(project.id); }} initial={{ opacity: 0.65, y: reduced ? 0 : 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
              <div className="project-summary">
                <div className={`project-symbol ${project.category === "Data" ? "symbol-data" : "symbol-systems"}`} aria-hidden="true"><Icon size={30} strokeWidth={1.3} /><span>{project.category}</span></div>
                <div className="project-copy"><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
                <button className="project-toggle" ref={(element) => { if (element) triggers.current.set(project.id, element); else triggers.current.delete(project.id); }} aria-expanded={selected} aria-controls={`project-detail-${project.id}`} aria-label={`${selected ? "Close" : "Read"} details: ${project.title}`} onClick={() => setSelectedId(selected ? null : project.id)}>
                  <span>{selected ? "Close" : "Read project"}</span>{selected ? <ChevronDown size={20} /> : <ArrowUpRight size={20} />}
                </button>
              </div>
              <AnimatePresence initial={false}>
                {selected && <motion.div id={`project-detail-${project.id}`} className="project-detail" initial={{ height: reduced ? "auto" : 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: reduced ? "auto" : 0, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="project-detail-inner"><div><h4>About the project</h4><p>{project.fullDescription}</p></div><button className="detail-close" onClick={() => close(project.id)} aria-label="Close project details"><X size={18} /></button></div>
                </motion.div>}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
