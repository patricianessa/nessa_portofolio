import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TopBar } from "./TopBar";
import { Dock, type SectionId } from "./Dock";
import { HeroWidget } from "./HeroWidget";
import { SectionContent } from "./SectionContent";

const sections = [
  { id: "projects", title: "Projects", description: "A closer look at the systems, data, and ideas I’ve worked on." },
  { id: "experience", title: "Experience", description: "Learning by building. Growing through hands-on work." },
  { id: "about", title: "A little more about me", description: "The background, people, and experiences behind the work." },
  { id: "contact", title: "Let’s connect.", description: "Open to early-career DevOps opportunities and thoughtful collaboration." },
] as const;

export function Desktop() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const reduced = useReducedMotion();
  const portfolioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const surface = portfolioRef.current;
    if (!surface) return;

    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animateLight = () => {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;
      const settled = Math.abs(targetX - currentX) + Math.abs(targetY - currentY) < 0.001;
      if (settled) {
        currentX = targetX;
        currentY = targetY;
      }
      surface.style.setProperty("--pointer-x", currentX.toFixed(4));
      surface.style.setProperty("--pointer-y", currentY.toFixed(4));
      frame = settled ? 0 : requestAnimationFrame(animateLight);
    };
    const reset = () => {
      targetX = 0;
      targetY = 0;
      if (!frame && preference.matches) frame = requestAnimationFrame(animateLight);
    };
    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType !== "mouse") return;
      targetX = Math.max(-1, Math.min(1, event.clientX / window.innerWidth * 2 - 1));
      targetY = Math.max(-1, Math.min(1, event.clientY / window.innerHeight * 2 - 1));
      if (!frame) frame = requestAnimationFrame(animateLight);
    };
    const updatePreference = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      targetX = targetY = currentX = currentY = 0;
      surface.style.removeProperty("--pointer-x");
      surface.style.removeProperty("--pointer-y");
    };

    surface.addEventListener("pointermove", move, { passive: true });
    surface.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    preference.addEventListener("change", updatePreference);
    return () => {
      cancelAnimationFrame(frame);
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      preference.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateSection = () => {
      frame = 0;
      const marker = window.innerHeight * 0.35;
      let active: SectionId = "home";
      for (const { id } of sections) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= marker) active = id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) active = "contact";
      setActiveSection(active);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateSection); };
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    };
    scrollToHash();
    updateSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="portfolio" ref={portfolioRef}>
      <div className="ambient-light" aria-hidden="true"><div className="ambient-lilac" /><div className="ambient-blue" /><div className="ambient-peach" /></div>
      <a className="skip-link" href="#main">Skip to content</a>
      <TopBar />
      <main id="main" className="page-shell">
        <HeroWidget />
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="page-section" aria-labelledby={`${section.id}-title`}>
            <motion.div className="section-intro" initial={{ opacity: 0.7, y: reduced ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
              <h2 id={`${section.id}-title`} tabIndex={-1}>{section.title}</h2>
              <p>{section.description}</p>
            </motion.div>
            <SectionContent windowId={section.id} />
          </section>
        ))}
        <footer className="page-footer"><span>Patricia Nessa Mae</span><span>Made with care, built to keep learning.</span><a href="#home">Back to top ↑</a></footer>
      </main>
      <Dock activeSection={activeSection} />
    </div>
  );
}
