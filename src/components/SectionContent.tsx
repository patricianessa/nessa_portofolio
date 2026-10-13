import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  FolderOpen,
  Terminal,
  Award,
  Star,
  Mail,
  MapPin,
  ExternalLink,
  Download,
  GraduationCap,
  Code2,
  Building2,
  Database,
  Server,
  Cloud,
  Layout,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { profile } from "../data/profile";
import { certifications } from "../data/certifications";
import { leadership } from "../data/leadership";
import { skills } from "../data/skills";
import { SectionHeader } from "./SectionHeader";
import { FinderProjects } from "./FinderProjects";
import { TerminalWindow } from "./TerminalWindow";
import { TimelineItem } from "./TimelineItem";
import { CertificateCard } from "./CertificateCard";
import { AnimatedCard } from "./AnimatedCard";
import { staggerContainer, staggerItem } from "../lib/motion";
import profilePhoto from "../assets/nessa_pp.jpeg";

interface SectionContentProps {
  windowId: string;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}

export const SectionContent: React.FC<SectionContentProps> = ({ windowId, headingRef }) => {
  switch (windowId) {
    // ─────────────── ABOUT — Profile Dashboard ───────────────
    case "about":
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <SectionHeader
            icon={User}
            eyebrow="About"
            title="About Me"
            description=""
            gradient="from-violet-500/8 to-fuchsia-400/6"
            sectionNumber="Portfolio / 01"
            headingRef={headingRef}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Profile card */}
            <motion.div variants={staggerItem} className="lg:col-span-4 xl:col-span-3">
              <AnimatedCard accent="violet" innerGlow className="h-full">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar with glowing frame */}
                  <div className="relative mb-4">
                    <div
                      className="w-28 h-28 rounded-2xl overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #8b5cf6, #6366f1, #06b6d4)",
                        boxShadow: "0 0 28px rgba(139, 92, 246, 0.25)",
                      }}
                    />
                    <div className="absolute inset-[3px] rounded-2xl overflow-hidden bg-white">
                      <img
                        src={profilePhoto}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: "center top" }}
                      />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-zinc-800">{profile.name}</h3>
                  <p className="text-xs font-semibold text-violet-600 mt-0.5">{profile.title}</p>

                  {/* Animated status pill */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="status-pulse inline-flex items-center text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-2.5 py-1 rounded-full">
                      {profile.availabilityStatus}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-700 bg-white/80 border border-zinc-200/50 px-2 py-1 rounded-full">
                      <MapPin size={10} />
                      {profile.location}
                    </span>
                  </div>

                  {/* Quick stats */}
                </div>
              </AnimatedCard>
            </motion.div>

            {/* Right: Bio + Highlights */}
            <motion.div variants={staggerItem} className="lg:col-span-8 xl:col-span-9 space-y-3">
              <AnimatedCard accent="violet" innerGlow>
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 border border-violet-200/50 flex items-center justify-center shrink-0">
                    <Sparkles size={16} className="text-violet-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-800">Background</h4>
                    <p className="text-[13px] text-zinc-600 leading-relaxed mt-1">{profile.about}</p>
                  </div>
                </div>
              </AnimatedCard>

              {/* Highlight bento cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {profile.highlights.map((highlight, idx) => {
                  const icons = [Database, Server, TrendingUp];
                  const colors = [
                    { bg: "bg-violet-100", border: "border-violet-200/50", text: "text-violet-600" },
                    { bg: "bg-sky-100", border: "border-sky-200/50", text: "text-sky-600" },
                    { bg: "bg-amber-100", border: "border-amber-200/50", text: "text-amber-600" },
                  ];
                  const IconEl = icons[idx % icons.length];
                  const color = colors[idx % colors.length];
                  return (
                    <AnimatedCard key={idx} accent={["violet", "sky", "amber"][idx] as "violet" | "sky" | "amber"}>
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-lg ${color.bg} ${color.border} border flex items-center justify-center shrink-0`}>
                          <IconEl size={16} className={color.text} />
                        </div>
                        <div>
                          <h4 className="font-bold text-zinc-800 text-sm">{highlight.title}</h4>
                          <p className="text-xs text-zinc-500 leading-relaxed mt-0.5">{highlight.description}</p>
                        </div>
                      </div>
                    </AnimatedCard>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      );

    // ─────────────── EXPERIENCE — Company Card + Timeline ───────────────
    case "experience":
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <SectionHeader
            icon={Briefcase}
            eyebrow="Career"
            title="Experience"
            description=""
            gradient="from-amber-500/8 to-orange-400/6"
            sectionNumber="Portfolio / 02"
            headingRef={headingRef}
          />

          <div className="relative">
            {/* Animated timeline rail */}
            <div className="absolute left-[23px] md:left-[27px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-400/30 via-amber-300/20 to-transparent rounded-full pointer-events-none" aria-hidden="true" />

            {profile.experience.map((exp, idx) => (
              <motion.div key={idx} variants={staggerItem} className="relative flex gap-4 mb-6 last:mb-0">
                {/* Timeline dot */}
                <div className="flex flex-col items-center shrink-0 pt-2">
                  <div
                    className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 border-[3px] border-white shadow-md z-10"
                    style={{ boxShadow: "0 0 12px rgba(245, 158, 11, 0.35)" }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <AnimatedCard accent="amber" innerGlow>
                    {/* Gradient header strip */}
                    <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 rounded-t-2xl" />
                    <div className="p-4 md:p-6">
                      <div className="flex flex-wrap items-start gap-3 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-lg shrink-0"
                          style={{
                            background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                            boxShadow: "0 0 16px rgba(245, 158, 11, 0.20)",
                          }}
                        >
                          AF
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-extrabold text-zinc-800">{exp.position}</h3>
                          <p className="text-sm font-semibold text-amber-600">{exp.company}</p>
                        </div>
                        <span className="text-[11px] font-semibold text-zinc-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200/40 whitespace-nowrap basis-full sm:basis-auto sm:ml-auto">
                          {exp.period}
                        </span>
                      </div>

                      <div className="mb-4 rounded-lg bg-white/50 border border-white/40 px-3 py-2 text-sm text-zinc-700">
                        {exp.description}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {["Deployment", "Monitoring", "Infrastructure", "Reliability", "Collaboration"].map(
                          (chip) => (
                            <span
                              key={chip}
                              className="text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/40"
                            >
                              {chip}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </AnimatedCard>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );

    // ─────────────── PROJECTS — Finder Browser ───────────────
    case "projects":
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <SectionHeader
            icon={FolderOpen}
            eyebrow="Projects"
            title="Project Browser"
            description="Browse projects by category"
            gradient="from-sky-500/8 to-blue-400/6"
            sectionNumber="Portfolio / 03"
            headingRef={headingRef}
          />
          <motion.div variants={staggerItem}>
            <FinderProjects />
          </motion.div>
        </motion.div>
      );

    // ─────────────── SKILLS — Terminal ───────────────
    case "skills":
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <SectionHeader
            icon={Terminal}
            eyebrow="Skills"
            title="Skills Terminal"
            description="Explore technical skills via terminal"
            gradient="from-zinc-500/8 to-slate-400/6"
            sectionNumber="Portfolio / 04"
            headingRef={headingRef}
          />
          <motion.div variants={staggerItem}>
            <TerminalWindow />
          </motion.div>

          {/* Secondary skill bento grid */}
          <motion.div variants={staggerItem} className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {[
              { icon: Database, label: "Data Engineering", items: skills.data_engineering, accent: "sky" as const },
              { icon: Cloud, label: "DevOps & Infrastructure", items: skills.devops, accent: "amber" as const },
              { icon: Layout, label: "Tools", items: skills.tools, accent: "violet" as const },
              { icon: Star, label: "Leadership & Collaboration", items: skills.soft_skills, accent: "emerald" as const },
            ].map((group, idx) => (
              <AnimatedCard key={idx} accent={group.accent}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-md bg-zinc-100 border border-zinc-200/60 flex items-center justify-center">
                    <group.icon size={14} className="text-zinc-600" />
                  </div>
                  <span className="text-xs font-bold text-zinc-700">{group.label}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-medium text-zinc-500 bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </AnimatedCard>
            ))}
          </motion.div>
        </motion.div>
      );

    // ─────────────── EDUCATION — Academic Record ───────────────
    case "education":
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <SectionHeader
            icon={GraduationCap}
            eyebrow="Education"
            title="Academic Record"
            description=""
            gradient="from-emerald-500/8 to-teal-400/6"
            sectionNumber="Portfolio / 05"
            headingRef={headingRef}
          />

          <AnimatedCard accent="emerald" innerGlow>
            <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 rounded-t-2xl" />
            <div className="p-5 md:p-6">
              <div className="flex flex-wrap items-start gap-4 mb-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #14b8a6)",
                    boxShadow: "0 0 20px rgba(16, 185, 129, 0.25)",
                  }}
                >
                  <Building2 size={26} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-extrabold text-zinc-800">{profile.education.school}</h3>
                  <p className="text-sm font-semibold text-emerald-600 mt-0.5">{profile.education.degree}</p>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-emerald-50/70 rounded-xl p-3 text-center border border-emerald-100/40">
                  <span className="text-xl font-extrabold text-emerald-600 block">{profile.education.gpa}</span>
                  <span className="text-xs font-medium text-zinc-700 uppercase tracking-wide">GPA</span>
                </div>
                <div className="bg-sky-50/70 rounded-xl p-3 text-center border border-sky-100/40">
                  <span className="text-sm font-bold text-sky-700 block">{profile.education.expectedGraduation}</span>
                  <span className="text-xs font-medium text-zinc-700 uppercase tracking-wide">Graduation</span>
                </div>
                <div className="bg-violet-50/70 rounded-xl p-3 text-center border border-violet-100/40 sm:col-span-2">
                  <span className="text-sm font-bold text-violet-700 block">Information Systems</span>
                  <span className="text-xs font-medium text-zinc-700 uppercase tracking-wide">Major</span>
                </div>
              </div>

              {/* Academic Focus panel */}
              <div className="p-3.5 rounded-xl bg-zinc-50/80 border border-zinc-100/60 border-l-4 border-l-emerald-400">
                <p className="text-xs text-zinc-500 leading-relaxed">{profile.education.additional}</p>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>
      );

    // ─────────────── CERTIFICATIONS — Certificate Gallery ───────────────
    case "certifications":
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <SectionHeader
            icon={Award}
            eyebrow="Credentials"
            title="Certifications"
            description="Professional certifications and badges"
            gradient="from-rose-500/8 to-pink-400/6"
            sectionNumber="Portfolio / 06"
            headingRef={headingRef}
          />
          <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certifications.map((cert) => (
              <CertificateCard
                key={cert.id}
                title={cert.title}
                issuer={cert.issuer}
                date={cert.date}
                index={cert.id - 1}
              />
            ))}
          </motion.div>
        </motion.div>
      );

    // ─────────────── LEADERSHIP — Vertical Timeline ───────────────
    case "leadership":
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <SectionHeader
            icon={Star}
            eyebrow="Leadership"
            title="Organizational Experience"
            description=""
            gradient="from-yellow-500/8 to-amber-400/6"
            sectionNumber="Portfolio / 07"
            headingRef={headingRef}
          />
          <motion.div variants={staggerItem} className="pt-1 relative">
            {/* Central rail */}
            <div className="absolute left-[17px] md:left-[21px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-amber-300/40 via-violet-300/30 to-transparent rounded-full pointer-events-none" aria-hidden="true" />
            {leadership.map((role, idx) => (
              <TimelineItem
                key={role.id}
                role={role.role}
                organization={role.organization}
                period={role.period}
                highlight={role.highlight}
                index={idx}
                isLast={idx === leadership.length - 1}
              />
            ))}
          </motion.div>
        </motion.div>
      );

    // ─────────────── CONTACT — Mail App ───────────────
    case "contact":
      return (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <SectionHeader
            icon={Mail}
            eyebrow="Contact"
            title="Get in Touch"
            description=""
            gradient="from-sky-500/8 to-indigo-400/6"
            sectionNumber="Portfolio / 08"
            headingRef={headingRef}
          />

          {/* Main CTA Card */}
          <AnimatedCard accent="sky" innerGlow>
            <div className="h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 rounded-t-2xl" />
            <div className="p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200/60 flex items-center justify-center">
                  <Mail size={18} className="text-sky-600" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-zinc-800">Let's Collaborate</h3>
                  <span className="status-pulse inline-flex items-center text-[10px] font-semibold text-emerald-600 mt-0.5">
                    {profile.collaborationStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-3.5 bg-sky-50 border border-sky-200 rounded-xl hover:shadow-md transition-all group focus-ring"
                >
                  <div className="w-10 h-10 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                    <Mail size={16} className="text-sky-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-700 uppercase tracking-wide">Email · Primary</p>
                    <p className="text-sm font-semibold text-sky-800 group-hover:text-sky-900 [overflow-wrap:anywhere] transition-colors">
                      {profile.email}
                    </p>
                  </div>
                </a>
                <a
                  href={`tel:${profile.phone}`}
                  className="flex items-center gap-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl hover:shadow-md transition-all group focus-ring"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                    <span className="text-emerald-600 text-sm font-bold">📞</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-700 uppercase tracking-wide">Phone</p>
                    <p className="text-sm font-semibold text-emerald-800 group-hover:text-emerald-900 transition-colors">
                      {profile.phone}
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-3 p-3.5 bg-indigo-50/70 border border-indigo-100/50 rounded-xl hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                    <MapPin size={16} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-700 uppercase tracking-wide">Location</p>
                    <p className="text-sm font-semibold text-zinc-800">{profile.location}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <motion.a
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://linkedin.com/in/patricianessa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-[40px] px-4 bg-white text-blue-800 border border-blue-300 text-[13px] font-semibold rounded-xl hover:bg-blue-50 transition-all focus-ring"
                >
                  <ExternalLink size={14} />
                  LinkedIn
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://github.com/patricianessa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full h-[40px] px-4 bg-white text-zinc-800 border border-zinc-300 text-[13px] font-semibold rounded-xl hover:bg-zinc-50 transition-all focus-ring"
                >
                  <Code2 size={14} />
                  GitHub
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  href="/CV_Nessa.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full h-[40px] px-4 bg-white text-violet-800 border border-violet-300 text-[13px] font-semibold rounded-xl hover:bg-violet-50 transition-all focus-ring"
                >
                  <Download size={14} />
                  Download CV
                </motion.a>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>
      );

    default:
      return null;
  }
};
