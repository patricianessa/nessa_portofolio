import { motion, useReducedMotion } from "framer-motion";
import { Home, FolderOpen, Briefcase, User, Mail } from "lucide-react";

const items = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

export type SectionId = typeof items[number]["id"];

export function Dock({ activeSection }: { activeSection: SectionId }) {
  const reduced = useReducedMotion();
  return (
    <nav className="dock-shell glass" aria-label="Portfolio sections">
      {items.map(({ id, label, icon: Icon }) => (
        <a key={id} href={`#${id}`} className={`dock-item ${activeSection === id ? "is-active" : ""}`} aria-current={activeSection === id ? "location" : undefined}>
          {activeSection === id && <motion.span className="dock-active" layoutId="dock-active" transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }} />}
          <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
