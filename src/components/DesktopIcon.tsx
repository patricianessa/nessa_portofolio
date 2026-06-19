import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface DesktopIconProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  onClick: () => void;
}

const iconGradients: Record<string, string> = {
  about: "from-violet-400 via-purple-500 to-violet-600",
  experience: "from-amber-400 via-orange-500 to-amber-600",
  projects: "from-sky-400 via-blue-500 to-cyan-600",
  skills: "from-zinc-500 via-slate-600 to-zinc-700",
  education: "from-emerald-400 via-teal-500 to-emerald-600",
  certifications: "from-rose-400 via-pink-500 to-rose-600",
  leadership: "from-yellow-400 via-amber-500 to-yellow-600",
  contact: "from-sky-300 via-blue-400 to-indigo-500",
};

const iconBadges: Record<string, string> = {
  about: ".app",
  experience: ".folder",
  projects: ".folder",
  skills: ".json",
  education: ".pdf",
  certifications: ".folder",
  leadership: ".folder",
  contact: ".app",
};

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  label,
  icon: Icon,
  isActive,
  onClick,
}) => {
  const gradient = iconGradients[id] || iconGradients.about;
  const badge = iconBadges[id] || ".app";

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      whileHover={{ scale: 1.08, y: -6 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-[6px] p-3 rounded-2xl transition-all duration-300 cursor-pointer focus:outline-none group ${
        isActive
          ? "bg-white/45 shadow-lg ring-2 ring-white/60 backdrop-blur-xl"
          : "hover:bg-white/25 hover:shadow-md hover:backdrop-blur-sm"
      }`}
      id={`icon-${id}`}
    >
      <div
        className={`relative w-[60px] h-[60px] rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 ${
          isActive
            ? `bg-gradient-to-br ${gradient} scale-110 shadow-violet-300/50`
            : `bg-gradient-to-br ${gradient}`
        }`}
      >
        <Icon size={26} className="text-white drop-shadow-md" />

        {/* File-type badge */}
        <span className="absolute -bottom-1 -right-1 text-[8px] font-bold text-white bg-zinc-800/70 backdrop-blur-sm px-1.5 py-0.5 rounded-md border border-white/20 leading-none shadow-sm">
          {badge}
        </span>
      </div>
      <span
        className={`text-[11px] font-semibold text-center max-w-[80px] break-words px-2 py-0.5 rounded-md transition-all duration-200 backdrop-blur-sm leading-[14px] ${
          isActive
            ? "bg-white/40 text-zinc-800 shadow-sm"
            : "bg-white/10 text-white/90 drop-shadow-md group-hover:bg-white/30 group-hover:text-white"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
};