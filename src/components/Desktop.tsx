import React, { useState, useCallback, useEffect, useRef } from "react";
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
  const getSectionFromHash = useCallback((): WindowId | null => {
    const id = window.location.hash.slice(1);
    return dockItems.some((item) => item.id === id) ? (id as WindowId) : null;
  }, []);
  const [activeSection, setActiveSection] = useState<WindowId | null>(getSectionFromHash);
  const [focusReturnTarget, setFocusReturnTarget] = useState<HTMLElement | null>(null);
  const sectionHistoryDepth = useRef<number>(window.history.state?.portfolioDepth ?? 0);

  const handleOpenSection = useCallback((id: WindowId) => {
    if (activeSection === id) return;
    setActiveSection(id);
    sectionHistoryDepth.current = (activeSection ? sectionHistoryDepth.current : 0) + 1;
    window.history.pushState({ section: id, portfolioDepth: sectionHistoryDepth.current }, "", `#${id}`);
  }, [activeSection]);

  const handleCloseSection = useCallback(() => {
    setActiveSection(null);
    if (sectionHistoryDepth.current > 0) {
      window.history.go(-sectionHistoryDepth.current);
      sectionHistoryDepth.current = 0;
    } else if (window.location.hash) {
      window.history.replaceState({}, "", window.location.pathname + window.location.search);
    }
    requestAnimationFrame(() => focusReturnTarget?.focus());
  }, [focusReturnTarget]);

  const handleOpenFromHero = useCallback(() => {
    setFocusReturnTarget(document.activeElement instanceof HTMLElement ? document.activeElement : null);
    handleOpenSection("projects");
  }, [handleOpenSection]);

  useEffect(() => {
    const handleLocationChange = () => {
      sectionHistoryDepth.current = window.history.state?.portfolioDepth ?? 0;
      setActiveSection(getSectionFromHash());
    };
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, [getSectionFromHash]);

  // ───── Keyboard Shortcuts ─────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close overlay
      if (e.key === "Escape" && activeSection) {
        handleCloseSection();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, handleCloseSection]);

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
            <HeroWidget onOpenPortfolio={handleOpenFromHero} />
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
      <Dock items={dockItems} activeSection={activeSection} onOpenSection={(id) => {
        if (!activeSection) setFocusReturnTarget(document.activeElement instanceof HTMLElement ? document.activeElement : null);
        handleOpenSection(id);
      }} />
    </div>
  );
};
