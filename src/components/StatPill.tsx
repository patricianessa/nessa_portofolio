import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Cpu, Award, Database } from "lucide-react";

interface StatPillProps {
  label: string;
  value: string;
  index?: number;
  icon?: React.ReactNode;
}

const iconMap: Record<string, React.ReactNode> = {
  GPA: <TrendingUp size={11} />,
  Role: <Cpu size={11} />,
  Certs: <Award size={11} />,
  Focus: <Database size={11} />,
};

export const StatPill: React.FC<StatPillProps> = ({ label, value, index = 0, icon }) => {
  const displayedIcon = icon || iconMap[label] || <Award size={10} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{ delay: 0.35 + index * 0.06, type: "spring", damping: 22, stiffness: 250 }}
      className="flex flex-col items-center justify-center gap-0.5 px-1.5 py-1.5 min-h-[48px] md:min-h-[52px] rounded-xl bg-white/60 border border-white/60 backdrop-blur-sm hover:bg-white/80 hover:border-violet-300/50 hover:shadow-md hover:shadow-violet-200/20 transition-all duration-300 cursor-default group"
    >
      <div className="w-4 h-4 rounded bg-violet-100/80 border border-violet-200/40 flex items-center justify-center mb-0.5 text-violet-500 group-hover:bg-violet-200/60 group-hover:text-violet-600 transition-colors">
        {displayedIcon}
      </div>
      <span className="text-[13px] md:text-[14px] font-bold text-zinc-800 leading-tight">{value}</span>
      <span className="text-[8px] font-semibold text-zinc-400 uppercase tracking-wider">{label}</span>
    </motion.div>
  );
};