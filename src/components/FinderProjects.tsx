import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FileCode, ChevronRight, ExternalLink, Database, Server, Cpu, Folders } from "lucide-react";
import { projects } from "../data/projects";
import { AnimatedCard } from "./AnimatedCard";
import { staggerItem } from "../lib/motion";

const categories = ["Featured", "Data", "DevOps", "Systems"];

const categoryMeta: Record<string, { icon: React.ReactNode; count: number; accent: "violet" | "sky" | "amber" | "emerald" }> = {
  Featured: { icon: <Folders size={14} />, count: projects.length, accent: "violet" },
  Data: { icon: <Database size={14} />, count: projects.filter((p) => p.category === "Data").length, accent: "sky" },
  DevOps: { icon: <Server size={14} />, count: projects.filter((p) => p.category === "DevOps").length, accent: "amber" },
  Systems: { icon: <Cpu size={14} />, count: projects.filter((p) => p.category === "Systems").length, accent: "emerald" },
};

export const FinderProjects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Featured");
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "Featured"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const categoryColors: Record<string, string> = {
    Data: "text-sky-500",
    DevOps: "text-amber-500",
    Systems: "text-emerald-500",
  };

  const categoryBg: Record<string, string> = {
    Data: "bg-sky-50 border-sky-200/50",
    DevOps: "bg-amber-50 border-amber-200/50",
    Systems: "bg-emerald-50 border-emerald-200/50",
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
      {/* Sidebar */}
      <div className="shrink-0">
        <AnimatedCard accent="violet" noPadding className="p-1.5">
          <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest px-2.5 py-1.5">
            Categories
          </div>
          {categories.map((cat) => {
            const meta = categoryMeta[cat];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedProjectId(null);
                }}
                className={`relative w-full text-left px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-violet-500/10 text-violet-700"
                    : "text-zinc-500 hover:bg-white/60 hover:text-zinc-700"
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-violet-500"
                    transition={{ type: "spring", damping: 24, stiffness: 300 }}
                  />
                )}
                <Folder
                  size={13}
                  className={isActive ? "text-violet-500" : "text-zinc-400"}
                />
                <span className="truncate">{cat}</span>
                <span
                  className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-violet-100 text-violet-600"
                      : "bg-zinc-100 text-zinc-400"
                  }`}
                >
                  {meta.count}
                </span>
                {isActive && (
                  <ChevronRight size={11} className="text-violet-400 shrink-0" />
                )}
              </button>
            );
          })}
        </AnimatedCard>
      </div>

      {/* Main Content Area: Cards + Preview */}
      <div className="min-w-0 space-y-4">
        {/* File Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {filteredProjects.length === 0 && (
              <div className="col-span-full flex items-center justify-center py-12 bg-white/50 border border-white/60 rounded-xl">
                <p className="text-sm text-zinc-400">No projects in this category yet.</p>
              </div>
            )}
            {filteredProjects.map((project, idx) => (
              <motion.button
                key={project.id}
                variants={staggerItem}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.04 }}
                onClick={() => setSelectedProjectId(project.id)}
                className={`text-left rounded-xl p-4 transition-all duration-200 group relative overflow-hidden ${
                  selectedProjectId === project.id
                    ? "bg-violet-50/80 border border-violet-300/40 shadow-md shadow-violet-200/20"
                    : "bg-white/60 backdrop-blur-sm border border-white/70 hover:border-violet-200/60 hover:bg-white hover:shadow-md hover:shadow-violet-100/20"
                }`}
              >
                {/* Gradient top strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                  style={{
                    background:
                      project.category === "Data"
                        ? "linear-gradient(90deg, #0ea5e9, #38bdf8)"
                        : project.category === "DevOps"
                        ? "linear-gradient(90deg, #f59e0b, #fb923c)"
                        : project.category === "Systems"
                        ? "linear-gradient(90deg, #10b981, #34d399)"
                        : "linear-gradient(90deg, #8b5cf6, #a78bfa)",
                  }}
                />

                <div className="flex items-start justify-between gap-3 mt-1">
                  <div className="flex min-w-0 items-start gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        selectedProjectId === project.id
                          ? "bg-violet-100 border border-violet-300/50"
                          : "bg-zinc-50 border border-zinc-200/60 group-hover:bg-violet-50 group-hover:border-violet-200/50"
                      }`}
                    >
                      {project.category === "Data" ? (
                        <Database size={16} className="text-sky-500" />
                      ) : project.category === "DevOps" ? (
                        <Server size={16} className="text-amber-500" />
                      ) : project.category === "Systems" ? (
                        <Cpu size={16} className="text-emerald-500" />
                      ) : (
                        <FileCode size={16} className="text-violet-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[13px] text-zinc-800 truncate group-hover:text-violet-700 transition-colors">
                        {project.filename}
                      </p>
                      <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      categoryBg[project.category] || "bg-violet-50 border-violet-200/50"
                    } ${categoryColors[project.category] || "text-violet-500"}`}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-2 mt-3">
                  <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-medium text-zinc-500 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100/80 whitespace-nowrap leading-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-300 group-hover:text-violet-400 transition-colors shrink-0">
                    Preview →
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Preview Panel (below cards, all screen sizes) */}
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="premium-card relative overflow-hidden"
            >
              {/* Background glow based on category */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl"
                style={{
                  background:
                    selectedProject.category === "Data"
                      ? "radial-gradient(circle at 50% 0%, #0ea5e9, transparent 60%)"
                      : selectedProject.category === "DevOps"
                      ? "radial-gradient(circle at 50% 0%, #f59e0b, transparent 60%)"
                      : selectedProject.category === "Systems"
                      ? "radial-gradient(circle at 50% 0%, #10b981, transparent 60%)"
                      : "radial-gradient(circle at 50% 0%, #8b5cf6, transparent 60%)",
                }}
              />

              <div className="relative z-10 p-4 sm:p-5">
                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Preview
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                      categoryBg[selectedProject.category] || "bg-violet-50 border-violet-200/50"
                    }`}
                  >
                    {selectedProject.category === "Data" ? (
                      <Database size={18} className="text-sky-500 sm:size-5" />
                    ) : selectedProject.category === "DevOps" ? (
                      <Server size={18} className="text-amber-500 sm:size-5" />
                    ) : selectedProject.category === "Systems" ? (
                      <Cpu size={18} className="text-emerald-500 sm:size-5" />
                    ) : (
                      <FileCode size={18} className="text-violet-500 sm:size-5" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-sm text-zinc-800">
                      {selectedProject.title}
                    </h3>
                    <p className="text-[11px] text-zinc-500 leading-relaxed mt-1 mb-3 break-words">
                      {selectedProject.fullDescription}
                    </p>

                    <div className="space-y-1.5">
                      <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                        Tech Stack
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {selectedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-medium text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded border border-violet-100/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="mt-3 sm:mt-4 flex items-center justify-center gap-2 h-[32px] sm:h-[36px] px-3 bg-gradient-to-r from-violet-500 to-violet-400 text-white text-[11px] sm:text-[12px] font-semibold rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all w-full sm:w-auto sm:inline-flex">
                      <ExternalLink size={11} />
                      View Project
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="premium-card flex items-center justify-center min-h-[80px]"
            >
              <div className="text-center p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center shrink-0">
                  <Folder size={14} className="text-zinc-300" />
                </div>
                <p className="text-xs text-zinc-400">Select a project to view details</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
