import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { WindowId } from "../types/window";

export type DockItem = {
  id: WindowId;
  label: string;
  icon: LucideIcon;
};

interface DockProps {
  items: DockItem[];
  activeSection: WindowId | null;
  onOpenSection: (id: WindowId) => void;
}

const DOCK_ITEM_WIDTH = 40;
const DOCK_GAP = 6;
const MAX_MAGNIFY_DIST = 140;

export const Dock: React.FC<DockProps> = ({ items, activeSection, onOpenSection }) => {
  const dockRef = useRef<HTMLElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        setMouseX(e.clientX - rect.left);
      }
    };

    const handleMouseLeave = () => setMouseX(null);

    const dock = dockRef.current;
    if (dock) {
      dock.addEventListener("mousemove", handleMouseMove);
      dock.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (dock) {
        dock.removeEventListener("mousemove", handleMouseMove);
        dock.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const isActive = (id: WindowId) => id === activeSection;

  const getItemScale = useCallback(
    (index: number): number => {
      if (mouseX === null) return 1;

      const itemCenter = index * (DOCK_ITEM_WIDTH + DOCK_GAP) + DOCK_ITEM_WIDTH / 2;
      const distance = Math.abs(mouseX - itemCenter);

      if (distance < MAX_MAGNIFY_DIST) {
        const factor = 1 - distance / MAX_MAGNIFY_DIST;
        return 1 + factor * 0.45;
      }
      return 1;
    },
    [mouseX]
  );

  return (
    <motion.nav
      ref={dockRef}
      aria-label="Portfolio sections"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        damping: 22,
        stiffness: 200,
        delay: 0.3,
      }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] dock-shell"
    >
      <div
        className="dock-items flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-2xl"
        style={{
          background: "rgba(255, 255, 255, 0.62)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255, 255, 255, 0.65)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.45)",
        }}
      >
        {items.map((item, idx) => {
          const scale = getItemScale(idx);

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 260,
                delay: 0.45 + idx * 0.06,
              }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => onOpenSection(item.id)}
              className="relative group focus-ring rounded-xl dock-item"
              style={{
                transform: `scale(${scale})`,
                transition: "transform 0.15s ease-out",
              }}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive(item.id) ? "page" : undefined}
            >
              <div
                className={`w-[38px] h-[38px] rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive(item.id)
                    ? "bg-violet-100/80"
                    : "hover:bg-white/50"
                }`}
              >
                <item.icon
                  size={18}
                  className={`transition-colors duration-200 ${
                    isActive(item.id)
                      ? "text-violet-600"
                      : "text-zinc-400 group-hover:text-zinc-600"
                  }`}
                />
              </div>

              {isActive(item.id) && (
                <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-violet-500" />
              )}

              <div className="dock-label absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-800/90 text-white text-[11px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 whitespace-nowrap pointer-events-none backdrop-blur-sm z-10">
                {item.label}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};
