import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";
import { staggerItem } from "../lib/motion";

interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  index: number;
}

const accentColors = [
  { top: "from-violet-500 to-fuchsia-500", glow: "rgba(139,92,246,0.12)", bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200/40", badge: "bg-violet-100/80 text-violet-600", ribbon: "rgba(139,92,246,0.25)" },
  { top: "from-sky-500 to-blue-500", glow: "rgba(14,165,233,0.10)", bg: "bg-sky-50", text: "text-sky-600", border: "border-sky-200/40", badge: "bg-sky-100/80 text-sky-600", ribbon: "rgba(14,165,233,0.25)" },
  { top: "from-emerald-500 to-teal-500", glow: "rgba(16,185,129,0.10)", bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200/40", badge: "bg-emerald-100/80 text-emerald-600", ribbon: "rgba(16,185,129,0.25)" },
  { top: "from-amber-500 to-orange-500", glow: "rgba(245,158,11,0.10)", bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200/40", badge: "bg-amber-100/80 text-amber-600", ribbon: "rgba(245,158,11,0.25)" },
];

export const CertificateCard: React.FC<CertificateCardProps> = ({
  title,
  issuer,
  date,
  index,
}) => {
  const colors = accentColors[index % accentColors.length];

  return (
    <motion.div
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ delay: index * 0.06, type: "spring", damping: 20, stiffness: 280 }}
      className="premium-card group cursor-default relative"
    >
      {/* Top gradient strip */}
      <div className={`h-1 bg-gradient-to-r ${colors.top}`} />

      {/* Corner ribbon */}
      <div className="ribbon-corner" aria-hidden="true">
        <div
          className="absolute top-0 right-0"
          style={{
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: "0 42px 42px 0",
            borderColor: `transparent ${colors.ribbon} transparent transparent`,
          }}
        />
      </div>

      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at 80% 0%, ${colors.glow}, transparent 55%)`,
        }}
      />

      <div className="relative z-10 p-4">
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg ${colors.badge} flex items-center justify-center shrink-0 shadow-sm`}>
            <Award size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-zinc-800 text-[13px] leading-snug group-hover:text-violet-700 transition-colors">
              {title}
            </h3>
            <p className={`text-[11px] ${colors.text} font-semibold mt-0.5`}>
              {issuer}
            </p>
          </div>
        </div>

        {/* Verification pill */}
        <div className="flex items-center gap-2 mt-3">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/40 px-2 py-0.5 rounded-full">
            <CheckCircle2 size={10} />
            Verified
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-zinc-100/60">
          <span className="text-[10px] text-zinc-400 font-medium">Certificate</span>
          <span className="text-[10px] font-semibold text-zinc-500 bg-white/80 px-2.5 py-0.5 rounded-full border border-zinc-200/50">
            {date}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
