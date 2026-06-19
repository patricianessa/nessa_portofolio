import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, ChevronRight } from "lucide-react";
import type { WindowId } from "../types/window";
import { SectionContent } from "./SectionContent";

interface FullScreenOverlayProps {
  sectionId: WindowId;
  title: string;
  onClose: () => void;
}

const accentColors: Record<WindowId, string> = {
  about: "rgba(139, 92, 246, 0.06)",
  experience: "rgba(245, 158, 11, 0.06)",
  projects: "rgba(14, 165, 233, 0.06)",
  skills: "rgba(113, 113, 122, 0.06)",
  education: "rgba(16, 185, 129, 0.06)",
  certifications: "rgba(244, 63, 94, 0.06)",
  leadership: "rgba(245, 158, 11, 0.06)",
  contact: "rgba(14, 165, 233, 0.06)",
};

export const FullScreenOverlay: React.FC<FullScreenOverlayProps> = ({
  sectionId,
  title,
  onClose,
}) => {
  const accentBg = accentColors[sectionId] || "rgba(139, 92, 246, 0.06)";

  // Focus trap for accessibility
  useEffect(() => {
    const overlay = document.getElementById("overlay-content");
    if (overlay) {
      overlay.focus();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
      transition={{ type: "spring", damping: 28, stiffness: 300, mass: 0.85 }}
      className="fixed inset-0 z-50 h-screen w-screen overflow-hidden flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      id="overlay-content"
      style={{
        background: `
          radial-gradient(circle at 50% 30%, ${accentBg}, transparent 55%),
          radial-gradient(circle at 15% 80%, ${accentBg}, transparent 40%),
          linear-gradient(160deg, #f3efff 0%, #ede8fe 30%, #e2dcfb 55%, #dcedfd 80%, #e6f2ff 100%)
        `,
      }}
    >
      {/* Ambient floating orbs */}
      <div className="section-ambient" aria-hidden="true">
        <div
          className="orb float-slow"
          style={{
            width: "380px",
            height: "380px",
            background: "rgba(168,85,247,0.10)",
            top: "-10%",
            left: "-5%",
            animationDelay: "0s",
            animationDuration: "12s",
          }}
        />
        <div
          className="orb float-slow"
          style={{
            width: "300px",
            height: "300px",
            background: "rgba(14,165,233,0.08)",
            top: "30%",
            right: "-8%",
            animationDelay: "2s",
            animationDuration: "14s",
          }}
        />
        <div
          className="orb float-slow"
          style={{
            width: "260px",
            height: "260px",
            background: "rgba(196,130,255,0.09)",
            bottom: "5%",
            left: "25%",
            animationDelay: "4s",
            animationDuration: "16s",
          }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] premium-grid"
        aria-hidden="true"
      />

      {/* Soft noise layer */}
      <div className="absolute inset-0 pointer-events-none soft-noise opacity-[0.025]" aria-hidden="true" />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-16 fade-top z-[5] pointer-events-none" aria-hidden="true" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 fade-bottom z-[5] pointer-events-none" aria-hidden="true" />

      {/* Header with breadcrumbs */}
      <motion.div
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, type: "spring", damping: 26 }}
        className="relative z-10 h-[52px] md:h-[56px] shrink-0 flex items-center justify-between px-4 md:px-6 border-b border-white/50 bg-white/45 backdrop-blur-xl"
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 border border-white/60 text-zinc-700 text-sm font-semibold hover:bg-white hover:text-zinc-900 hover:border-zinc-200 transition-all duration-200 shadow-sm focus-ring"
          aria-label="Back to home"
        >
          <ArrowLeft size={14} />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Breadcrumbs */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1.5 text-[11px] font-medium text-zinc-400">
          <Home size={11} className="text-zinc-400" />
          <ChevronRight size={11} className="text-zinc-300" />
          <span className="text-zinc-700 font-bold tracking-tight uppercase">{title}</span>
        </div>

        {/* Close hint */}
        <div className="w-[80px] hidden md:flex items-center justify-end">
          <kbd className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/50 border border-white/60 text-[10px] font-mono text-zinc-400">
            <span>ESC</span>
          </kbd>
        </div>
      </motion.div>

      {/* Body */}
      <div className="relative z-10 flex-1 overflow-y-auto px-3 md:px-6 py-4 md:py-5 scroll-smooth">
        <div className="max-w-[1100px] mx-auto w-full pb-28 md:pb-24">
          <SectionContent windowId={sectionId} />
        </div>
      </div>
    </motion.div>
  );
};
