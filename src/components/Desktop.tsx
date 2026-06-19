import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  FolderOpen,
  Terminal,
  BookOpen,
  Award,
  Star,
  Mail,
} from "lucide-react";
import type { WindowId } from "../types/window";
import { TopBar } from "./TopBar";
import { Dock } from "./Dock";
import type { DockItem } from "./Dock";
import { HeroWidget } from "./HeroWidget";
import { FullScreenOverlay } from "./FullScreenOverlay";

const TITLES: Record<WindowId, string> = {
  about: "About Me",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills Terminal",
  education: "Education",
  certifications: "Certifications",
  leadership: "Leadership",
  contact: "Contact",
};

const dockItems: DockItem[] = [
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "skills", label: "Skills", icon: Terminal },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "certifications", label: "Certs", icon: Award },
  { id: "leadership", label: "Leadership", icon: Star },
  { id: "contact", label: "Contact", icon: Mail },
];

export const Desktop: React.FC = () => {
  const [activeSection, setActiveSection] = useState<WindowId | null>(null);

  const handleOpenSection = useCallback((id: WindowId) => {
    setActiveSection(id);
  }, []);

  const handleCloseSection = useCallback(() => {
    setActiveSection(null);
  }, []);

  // ───── Keyboard Shortcuts ─────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close overlay
      if (e.key === "Escape" && activeSection) {
        handleCloseSection();
      }
      // A shortcut to open About (aesthetic only)
      if (e.key.toLowerCase() === "a" && !activeSection && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (!["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
          handleOpenSection("about");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, handleCloseSection, handleOpenSection]);

  return (
    <div className="w-screen h-screen wallpaper-macos flex flex-col overflow-hidden select-none relative">
      {/* Cursor spotlight layer */}
      <div className="cursor-spotlight" aria-hidden="true" />

      <TopBar />

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden" id="desktop-area">
        {/* Home Screen: Only visible when no section is active */}
        {!activeSection && (
          <div className="h-full w-full">
            <HeroWidget onOpenPortfolio={() => handleOpenSection("about")} />
          </div>
        )}

        {/* Section Overlay */}
        <AnimatePresence>
          {activeSection && (
            <FullScreenOverlay
              sectionId={activeSection}
              title={TITLES[activeSection]}
              onClose={handleCloseSection}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Dock — persistent across all sections */}
      <Dock items={dockItems} activeSection={activeSection} onOpenSection={handleOpenSection} />
    </div>
  );
};
