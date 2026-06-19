import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { blurFadeHeader } from "../lib/motion";

interface SectionHeaderProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description?: string;
  gradient?: string;
  badge?: React.ReactNode;
  sectionNumber?: string;
}

const bgGradients: Record<string, string> = {
  default: "from-violet-500/8 to-fuchsia-400/6",
  experience: "from-amber-500/8 to-orange-400/6",
  projects: "from-sky-500/8 to-blue-400/6",
  skills: "from-zinc-500/8 to-slate-400/6",
  education: "from-emerald-500/8 to-teal-400/6",
  certifications: "from-rose-500/8 to-pink-400/6",
  leadership: "from-yellow-500/8 to-amber-400/6",
  contact: "from-sky-500/8 to-indigo-400/6",
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  gradient,
  badge,
  sectionNumber,
}) => {
  const bgGrad = gradient || bgGradients.default;

  return (
    <motion.div
      variants={blurFadeHeader}
      initial="hidden"
      animate="visible"
      className={`rounded-2xl border border-white/60 bg-gradient-to-br ${bgGrad} relative overflow-hidden`}
    >
      {/* Decorative noise */}
      <div className="absolute inset-0 soft-noise opacity-[0.03] pointer-events-none" aria-hidden="true" />

      <div className="relative flex items-center gap-3 py-3.5 px-4 md:px-5">
        {/* Glowing icon tile */}
        <div className="relative shrink-0">
          <div
            className="absolute inset-0 rounded-xl blur-md opacity-40"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(14,165,233,0.2))",
            }}
          />
          <div className="relative w-11 h-11 rounded-xl bg-white/80 border border-white/70 flex items-center justify-center shadow-sm">
            <Icon size={20} className="text-zinc-700" />
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              {eyebrow}
            </span>
            <div className="glow-line w-6 hidden sm:block" aria-hidden="true" />
            {badge && <div className="shrink-0">{badge}</div>}
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-zinc-800 tracking-tight leading-tight mt-0.5">
            {title}
          </h2>
          {description && (
            <p className="text-[12px] text-zinc-500 mt-0.5 leading-relaxed max-w-lg">
              {description}
            </p>
          )}
        </div>

        {/* Section number / status pill */}
        {sectionNumber && (
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-semibold text-zinc-400 bg-white/60 border border-white/60 px-2.5 py-1 rounded-full">
              {sectionNumber}
            </span>
          </div>
        )}
      </div>

      {/* Shimmer line */}
      <div className="shimmer-line" aria-hidden="true" />
    </motion.div>
  );
};
