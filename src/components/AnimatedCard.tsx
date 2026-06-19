import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerItem, cardHover, cardTap } from "../lib/motion";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: "violet" | "sky" | "emerald" | "amber" | "rose" | "zinc";
  spotlight?: boolean;
  delay?: number;
  noPadding?: boolean;
  innerGlow?: boolean;
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
  spotlight = true,
  delay = 0,
  noPadding = false,
  innerGlow = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || reduced) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      initial="hidden"
      animate="visible"
      whileHover={reduced ? undefined : cardHover}
      whileTap={reduced ? undefined : cardTap}
      custom={delay}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`premium-card ${accentMap[accent] || accentMap.violet} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient border layer */}
      <div className="premium-card-border" aria-hidden="true" />

      {/* Spotlight glow */}
      {spotlight && !reduced && (
        <div
          className="card-spotlight"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.18), transparent 40%)`,
          }}
        />
      )}

      {/* Inner glow */}
      {innerGlow && <div className="premium-card-glow" aria-hidden="true" />}

      {/* Noise texture overlay */}
      <div className="premium-card-noise" aria-hidden="true" />

      {/* Shimmer on hover */}
      <div
        className="shine-hover"
        style={{ opacity: hovered && !reduced ? 0.6 : 0 }}
        aria-hidden="true"
      />

      <div className={`relative z-10 ${noPadding ? "" : "p-5"}`}>{children}</div>
    </motion.div>
  );
};
