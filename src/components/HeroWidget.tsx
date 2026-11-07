import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Terminal, Code2 as Github, Link2 as Linkedin } from "lucide-react";
import { profile } from "../data/profile";
import portrait from "../assets/nessa.png";

export function HeroWidget() {
  const reduced = useReducedMotion();
  return (
    <section id="home" className="hero" aria-labelledby="home-title">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: reduced ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <h1 id="home-title" tabIndex={-1}>
          <span className="hero-greeting">Hi, I’m Nessa.</span>
          <span className="hero-role">DevOps &amp; Data <span className="hero-practice">Engineer.
            <motion.svg className="hero-underline" viewBox="0 0 240 16" fill="none" aria-hidden="true"><motion.path d="M3 10C53 2 150 2 236 8M35 14C98 7 174 8 214 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: reduced ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }} /></motion.svg>
          </span></span>
        </h1>
        <p className="hero-lead">Building reliable workflows.<br />Connecting data and infrastructure.</p>
        <p className="hero-description">I’m Patricia Nessa Mae, an Information Systems student and DevOps Intern at <strong>Adira Finance</strong>, based in Jakarta.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">Explore Projects <ArrowDown size={17} aria-hidden="true" /></a>
          <a className="button button-glass" href="/CV_Nessa.pdf" download>Download CV <Download size={17} aria-hidden="true" /></a>
        </div>
        <div className="hero-socials">
          <a href="https://github.com/patricianessa" target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
          <a href="https://linkedin.com/in/patricianessa" target="_blank" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" /> LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </motion.div>
      <motion.div className="hero-visual" initial={{ opacity: 0, y: reduced ? 0 : 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
        <div className="hero-portrait-depth">
          <div className="portrait-surface">
            <img src={portrait} alt={profile.name} fetchPriority="high" />
          </div>
          <motion.div className="hero-code-chip glass" aria-hidden="true" initial={{ opacity: 0, y: reduced ? 0 : 15, rotate: reduced ? 0 : 4 }} animate={{ opacity: 1, y: 0, rotate: reduced ? 0 : -5 }} transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}><Terminal size={16} /><span>build. ship. learn.</span></motion.div>
        </div>
        <a href="#contact" className="portrait-caption glass"><span className="availability-dot" /><span>{profile.availabilityStatus}</span><ArrowUpRight size={16} aria-hidden="true" /></a>
        <div className="portrait-note"><span>Currently at Adira Finance</span><strong>DevOps Intern</strong></div>
      </motion.div>
      <div className="hero-bottom"><span>DevOps first. Data-minded, always.</span><a href="#projects">Take a look around <ArrowDown size={15} aria-hidden="true" /></a></div>
    </section>
  );
}
