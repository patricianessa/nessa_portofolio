import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"apple" | "loading" | "complete">("apple");

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Show Apple logo briefly
    timers.push(
      setTimeout(() => setPhase("loading"), 800)
    );

    // Phase 2: Progress bar
    timers.push(
      setTimeout(() => {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setPhase("complete");
              return 100;
            }
            // Non-linear progress feels more realistic
            const increment = Math.max(1, Math.floor((100 - prev) / (10 + Math.random() * 5)));
            return Math.min(100, prev + increment);
          });
        }, 120);
        timers.push(interval as unknown as ReturnType<typeof setTimeout>);
      }, 200)
    );

    // Phase 3: Fade out
    timers.push(
      setTimeout(() => {
        onComplete();
      }, 3200)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[99999] bg-zinc-900 flex flex-col items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {phase !== "complete" && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-10"
          >
            {/* Custom apple silhouette using SVG */}
            <svg
              width="72"
              height="88"
              viewBox="0 0 170 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_40px_rgba(255,255,255,0.12)]"
            >
              <path
                d="M150.7 130.4c-4.9 0-9.4-1.5-13.4-4.4-3.6-2.6-7.8-4-12.1-4s-8.5 1.4-12.1 4c-4 2.9-8.5 4.4-13.4 4.4-4.7 0-9.1-1.4-13-4.2-3.6-2.6-7.7-4-11.9-4-4 0-7.8 1.3-11.2 3.8-3.7 2.6-8 4-12.4 4-4.9 0-9.4-1.5-13.4-4.4-3.6-2.6-7.7-4-12-4-3.5 0-6.8.9-9.8 2.7l-.2.1c-1.5.9-3.4.4-4.3-1.1-.9-1.5-.4-3.4 1.1-4.3l.2-.1c4-2.4 8.6-3.7 13.2-3.7 4.8 0 9.2 1.4 13 4.1 3.6 2.6 7.7 4 11.9 4 4 0 7.8-1.3 11.2-3.8 3.7-2.6 8-4 12.4-4 4.9 0 9.4 1.5 13.4 4.4 3.6 2.6 7.7 4 11.9 4 4 0 7.8-1.3 11.2-3.8 3.7-2.6 8-4 12.4-4 4.8 0 9.2 1.4 13 4.1 3.6 2.6 7.7 4 11.9 4 4.6 0 9-1.3 12.9-3.7l.2-.1c1.5-.9 3.4-.4 4.3 1.1.9 1.5.4 3.4-1.1 4.3l-.2.1c-3.8 2.2-8.1 3.4-12.5 3.4z"
                fill="white"
                fillOpacity="0.92"
              />
            </svg>

            {phase === "loading" && (
              <motion.div
                initial={{ opacity: 0, width: 140 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative h-[3px] w-[140px] rounded-full bg-zinc-700 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-white"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
