import React, { useState, useEffect } from "react";
import { Battery } from "lucide-react";

// Battery API types
interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void;
}
interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

export const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Live battery API
  useEffect(() => {
    const nav = navigator as NavigatorWithBattery;
    if (!nav.getBattery) return;

    let bat: BatteryManager;
    nav.getBattery().then((b) => {
      bat = b;
      setBatteryLevel(Math.round(b.level * 100));
      const update = () => setBatteryLevel(Math.round(b.level * 100));
      b.addEventListener("levelchange", update);
    });

    return () => {
      if (bat) {
        bat.removeEventListener("levelchange", () => {});
      }
    };
  }, []);

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="h-6 bg-white/50 backdrop-blur-2xl border-b border-white/40 flex items-center justify-between px-3 text-[11px] text-zinc-700 font-medium shrink-0 z-[9999] relative select-none">
      {/* Left - App name */}
      <div className="flex items-center gap-2.5">
        <span className="text-zinc-800 font-semibold">Patricia Nessa</span>
        <span className="text-zinc-400">|</span>
        <span className="text-zinc-500 hover:text-zinc-700 transition-colors cursor-default">Portfolio</span>
      </div>

      {/* Center - Date */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <span className="text-zinc-500">{formattedDate}</span>
      </div>

      {/* Right - Battery + Time */}
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/25 transition-colors cursor-default">
          <Battery size={11} className="text-zinc-500" />
          <span className="text-[9px] text-zinc-500 tabular-nums">
            {batteryLevel !== null ? `${batteryLevel}%` : "82%"}
          </span>
        </div>
        <div className="px-1.5 py-0.5 rounded hover:bg-white/25 transition-colors cursor-default font-semibold text-zinc-700 tabular-nums">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};
