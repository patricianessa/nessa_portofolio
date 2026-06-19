import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Building2 } from "lucide-react";
import { staggerItem } from "../lib/motion";

interface TimelineItemProps {
  role: string;
  organization: string;
  period: string;
  highlight?: string;
  index: number;
  isLast: boolean;
}

const accentBorders = [
  "border-l-violet-400",
  "border-l-sky-400",
  "border-l-amber-400",
  "border-l-emerald-400",
  "border-l-rose-400",
];

const dotGradients = [
  { from: "#8b5cf6", to: "#7c3aed", shadow: "rgba(139, 92, 246, 0.30)" },
  { from: "#0ea5e9", to: "#2563eb", shadow: "rgba(14, 165, 233, 0.25)" },
  { from: "#f59e0b", to: "#ea580c", shadow: "rgba(245, 158, 11, 0.25)" },
  { from: "#10b981", to: "#059669", shadow: "rgba(16, 185, 129, 0.25)" },
  { from: "#f43f5e", to: "#e11d48", shadow: "rgba(244, 63, 94, 0.25)" },
];

const glowColors = [
  "rgba(139, 92, 246, 0.08)",
  "rgba(14, 165, 233, 0.07)",
  "rgba(245, 158, 11, 0.07)",
  "rgba(16, 185, 129, 0.07)",
  "rgba(244, 63, 94, 0.07)",
];

export const TimelineItem: React.FC<TimelineItemProps> = ({
  role,
  organization,
  period,
  highlight,
  index,
  isLast,
}) => {
  const borderClass = accentBorders[index % accentBorders.length];
  const dot = dotGradients[index % dotGradients.length];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      className="relative flex gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Timeline dot column */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <motion.div
          animate={{
            boxShadow: hovered
              ? `0 0 20px ${dot.shadow}, 0 0 8px ${dot.shadow}`
              : `0 0 10px ${dot.shadow}`,
            scale: hovered ? 1.15 : 1,
          }}
          transition={{ type: "spring", damping: 18, stiffness: 300 }}
          className="w-4 h-4 rounded-full border-[2.5px] border-white shadow-md z-10"
          style={{
            background: `linear-gradient(135deg, ${dot.from}, ${dot.to})`,
          }}
        />
        {!isLast && (
          <motion.div
            className="w-0.5 flex-1 rounded-full mt-1"
            style={{
              background: `linear-gradient(to bottom, ${dot.from}25, transparent)`,
            }}
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-5">
        <motion.div
          animate={{
            boxShadow: hovered
              ? `0 8px 30px ${glowColors[index % glowColors.length]}, 0 2px 8px rgba(0,0,0,0.04)`
              : undefined,
          }}
          className={`premium-card border-l-4 ${borderClass} relative overflow-hidden`}
        >
          <div className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-200/60 flex items-center justify-center shrink-0">
                  <Building2 size={14} className="text-zinc-500" />
                </div>
                <div>
                  <h3 className="font-extrabold text-zinc-800 text-sm leading-tight">{role}</h3>
                  <p className="text-xs font-semibold text-violet-600 mt-0.5">{organization}</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-zinc-400 bg-white/80 flex items-center gap-1 px-2.5 py-1 rounded-full border border-zinc-200/50 whitespace-nowrap">
                <Calendar size={9} className="text-zinc-300" />
                {period}
              </span>
            </div>

            {highlight && (
              <div className="mt-2 p-2.5 rounded-lg bg-zinc-50/80 border border-zinc-100/60">
                <p className="text-xs text-zinc-600 leading-relaxed">{highlight}</p>
              </div>
            )}
          </div>

          {/* Animated pulse ring on hover */}
          {hovered && (
            <motion.div
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 0, scale: 1.4 }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full pointer-events-none"
              style={{ background: dot.shadow }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
