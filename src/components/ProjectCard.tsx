import React from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  fullDescription: string;
  techStack: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  fullDescription,
  techStack,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="w-full bg-white/50 backdrop-blur-md border border-white/70 rounded-xl p-5 hover:shadow-xl hover:shadow-violet-200/40 transition-all duration-300 group"
    >
      <h3 className="font-semibold text-zinc-800 mb-2 group-hover:text-violet-700 transition-colors">{title}</h3>
      <p className="text-sm text-zinc-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech, idx) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + idx * 0.05 }}
            className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-medium"
          >
            {tech}
          </motion.span>
        ))}
      </div>
      <p className="text-xs text-zinc-500 line-clamp-2">{fullDescription}</p>
    </motion.div>
  );
};
