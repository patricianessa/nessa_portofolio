import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Link2, Mail, Download, Terminal, Cloud, Database, Server } from "lucide-react";
import { profile } from "../data/profile";
import heroImage from "../assets/nessa.png";

interface HeroWidgetProps {
  onOpenPortfolio: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring" as const, damping: 24, stiffness: 220 },
  },
};

const techStack = [
  { label: "Docker", icon: Server },
  { label: "CI/CD", icon: Terminal },
  { label: "Linux", icon: Database },
  { label: "Cloud", icon: Cloud },
  { label: "Python", icon: Code2 },
  { label: "SQL", icon: Database },
];

const terminalLines = [
  "> deploying reliable systems...",
  "> automating workflows...",
  "> scaling infrastructure...",
];

const socials = [
  { href: "https://github.com/patricianessa", icon: Code2, label: "GitHub" },
  { href: "https://linkedin.com/in/patricianessa", icon: Link2, label: "LinkedIn" },
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
];

const stats = [
  { value: "3.76", label: "GPA" },
  { value: "DevOps", label: "Role" },
  { value: "4", label: "Certs" },
];

export function HeroWidget({ onOpenPortfolio }: HeroWidgetProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % terminalLines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReduced) return;

    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let rafId = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.05);
      currentY = lerp(currentY, targetY, 0.05);
      el.style.setProperty("--blob-x", `${currentX}%`);
      el.style.setProperty("--blob-y", `${currentY}%`);

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = 10 + ((e.clientX - rect.left) / rect.width) * 80;
      targetY = 10 + ((e.clientY - rect.top) / rect.height) * 80;
      if (!rafId) tick();
    };

    const onLeave = () => {
      targetX = 50;
      targetY = 50;
      if (!rafId) tick();
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <motion.div
      ref={heroRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-full relative flex flex-col md:overflow-hidden"
    >
      {/* Full-hero cursor-following ambient glow */}
      <div
        className="absolute pointer-events-none z-0 rounded-full"
        style={{
          width: "950px",
          height: "950px",
          left: "var(--blob-x, 50%)",
          top: "var(--blob-y, 50%)",
          transform: "translate3d(-50%, -50%, 0)",
          opacity: 0.85,
          filter: "blur(56px)",
          background:
            "radial-gradient(circle, rgba(147,51,234,0.36) 0%, rgba(14,165,233,0.24) 38%, rgba(255,255,255,0) 76%)",
          willChange: "left, top",
        }}
      />
      {/* Second smaller highlight inside the blob */}
      <div
        className="absolute pointer-events-none z-0 rounded-full"
        style={{
          width: "480px",
          height: "480px",
          left: "var(--blob-x, 50%)",
          top: "var(--blob-y, 50%)",
          transform: "translate3d(-50%, -50%, 0)",
          opacity: 0.45,
          filter: "blur(44px)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.32) 0%, rgba(168,85,247,0.18) 45%, rgba(255,255,255,0) 75%)",
          willChange: "left, top",
        }}
      />

      {/* Layered ambient glow behind portrait — stronger halo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[2%] w-[680px] h-[680px] md:w-[900px] md:h-[900px] lg:w-[1100px] lg:h-[1100px] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.28) 0%, rgba(14,165,233,0.13) 35%, rgba(255,255,255,0) 65%)",
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[5%] w-[420px] h-[420px] md:w-[540px] md:h-[540px] lg:w-[640px] lg:h-[640px] rounded-full translate-x-[12%]"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(196,130,255,0.22) 0%, rgba(125,211,252,0.10) 45%, rgba(255,255,255,0) 65%)",
          }}
        />
        {/* Core soft halo directly behind head/shoulders */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[12%] w-[240px] h-[240px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(196,160,255,0.35) 0%, rgba(125,211,252,0.14) 50%, rgba(255,255,255,0) 72%)",
            filter: "blur(14px)",
          }}
        />
      </div>

      {/* Edge vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(124,58,237,0.045) 100%)",
        }}
      />

      {/* Top Navigation */}
      <motion.nav
        variants={itemVariants}
        className="flex justify-between items-center px-6 md:px-12 lg:px-20 py-5 md:py-7 z-50"
      >
        <div className="flex items-center gap-2">
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-zinc-500 hover:text-violet-600 hover:border-violet-300/50 transition-colors duration-200"
              aria-label={social.label}
            >
              <social.icon size={16} />
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Main Hero Content */}
      <div className="flex-1 relative pb-24 md:pb-0">

        {/* Three-column text content */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-12 lg:pl-20 lg:pr-10 xl:pr-14 pt-2 md:pt-6 lg:pt-10">

          {/* Left: Headline */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-5 md:gap-7 order-2 md:order-1 lg:order-1"
          >
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-600 w-fit">
                <span className="w-5 h-[2px] bg-violet-500 rounded-full" />
                Portfolio 2026
              </span>
              <h1 className="text-[24px] sm:text-[28px] md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black text-zinc-950 leading-[1.05] tracking-[-0.03em]">
                Data & DevOps<br />
                Engineer<span className="text-violet-600">.</span>
              </h1>
            </div>
            <p className="text-sm md:text-[15px] text-zinc-700/80 font-medium leading-relaxed max-w-sm">
              Based in Jakarta, I build reliable workflows, automate infrastructure, and turn data into practical systems.
            </p>

            {/* Mini terminal status line */}
            <div className="hidden md:flex items-center gap-2 glass-card rounded-lg px-3 py-2 w-fit">
              <Terminal size={13} className="text-violet-500 shrink-0" />
              <div className="font-mono text-[11px] text-zinc-600 leading-none min-w-[200px]">
                <motion.span
                  key={lineIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="block"
                >
                  {terminalLines[lineIndex]}
                  <span className="inline-block w-[5px] h-[9px] bg-violet-500/70 ml-[3px] align-middle cursor-blink" />
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Center: empty on desktop */}
          <div className="order-1 md:hidden lg:block lg:order-2" />

          {/* Right: Bio + CTA (frosted glass card) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-5 md:gap-6 order-3 md:order-2 lg:order-3 lg:-ml-4 xl:-ml-8"
          >
            {/* Frosted glass card */}
            <div className="glass-card rounded-2xl p-5 md:p-6 flex flex-col gap-4 max-w-sm hero-card relative overflow-hidden">
              <p className="text-sm md:text-[15px] text-zinc-700 leading-relaxed relative z-10">
                Hi, I'm <span className="font-bold text-zinc-900">Patricia Nessa Mae</span> — an Information Systems student and DevOps Intern at{" "}
                <span className="font-semibold text-zinc-800">Adira Finance</span>, passionate about building reliable workflows, automation, and scalable infrastructure.
              </p>

              {/* Tech stack pills */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {techStack.map((tech) => (
                  <span
                    key={tech.label}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-violet-700 bg-violet-100/60 border border-violet-200/50"
                  >
                    <tech.icon size={11} />
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenPortfolio}
                className="group flex items-center gap-3 pl-1.5 pr-6 py-2 rounded-full text-white font-bold text-sm bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 transition-all shadow-xl shadow-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/40 cursor-pointer w-fit ring-1 ring-white/20"
              >
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-violet-700 group-hover:translate-x-0.5 transition-transform duration-300 shadow-sm">
                  <ArrowRight size={15} />
                </div>
                See my works
              </motion.button>

              <motion.a
                href="/CV_Nessa.pdf"
                download
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full font-bold text-sm text-zinc-700 bg-white/70 hover:bg-white/90 backdrop-blur-md border border-white/60 shadow-glass hover:shadow-glass-lg transition-all cursor-pointer w-fit"
              >
                <Download size={15} className="text-violet-500" />
                Download CV
              </motion.a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-2.5 mt-1">
            {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.07, type: "spring", damping: 18 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="glass-card rounded-xl px-3 py-2.5 flex flex-col items-center min-w-[64px] cursor-default"
                >
                  <span className="text-sm font-black text-zinc-900">{stat.value}</span>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Portrait — slightly smaller than original and shifted left */}
        <motion.div
          className="fixed bottom-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none md:absolute"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", damping: 22, stiffness: 100 }}
        >
          <img
            src={heroImage}
            alt={profile.name}
            className="h-[300px] sm:h-[380px] md:h-[480px] lg:h-[640px] xl:h-[720px] w-auto object-contain object-bottom select-none"
            style={{
              filter:
                "drop-shadow(0 28px 55px rgba(124,58,237,0.26)) drop-shadow(0 12px 28px rgba(0,0,0,0.09)) drop-shadow(0 0 85px rgba(168,85,247,0.13))",
            }}
          />
        </motion.div>

        {/* Background watermark name — raised slightly */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden z-[5]">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-[4rem] sm:text-[5rem] md:text-[9rem] lg:text-[14rem] xl:text-[17rem] font-black tracking-tighter leading-none -translate-y-[18%] text-white/100"
            style={{
              textShadow: "0 4px 30px rgba(139,92,246,0.04)",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
            }}
          >
            Patricia Nessa
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};
