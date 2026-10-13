import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerItem, cardTap } from "../lib/motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: "violet" | "sky" | "emerald" | "amber" | "rose" | "zinc";
  delay?: number;
  noPadding?: boolean;
  innerGlow?: boolean;
  interactive?: boolean;
  onActivate?: () => void;
}

const accentMap: Record<string, string> = {
  violet: "bg-violet-500",
  sky: "bg-sky-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  zinc: "bg-zinc-500",
};

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = "",
  accent = "violet",
  delay = 0,
  noPadding = false,
  innerGlow = false,
  interactive = false,
  onActivate,
}) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      whileHover={reduced || !interactive ? undefined : { y: -2 }}
      whileTap={reduced || !interactive ? undefined : cardTap}
      custom={delay}
      onClick={onActivate}
      onKeyDown={interactive ? (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onActivate?.();
        }
      } : undefined}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`premium-card ${accentMap[accent] || accentMap.violet} ${interactive ? "cursor-pointer focus-ring" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient border layer */}
      <div className="premium-card-border" aria-hidden="true" />

      {/* Inner glow */}
      {innerGlow && <div className="premium-card-glow" aria-hidden="true" />}

      <div className={`relative z-10 ${noPadding ? "" : "p-5"}`}>{children}</div>
    </motion.div>
  );
};
