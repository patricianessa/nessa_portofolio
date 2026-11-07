import type { RefObject } from "react";
import { ArrowUpRight, Download, Code2 as Github, Link2 as Linkedin, Mail, MapPin, Phone, GraduationCap, Award } from "lucide-react";
import { profile } from "../data/profile";
import { certifications } from "../data/certifications";
import { leadership } from "../data/leadership";
import { skills } from "../data/skills";
import { FinderProjects } from "./FinderProjects";
import { TerminalWindow } from "./TerminalWindow";

interface SectionContentProps {
  windowId: string;
  headingRef?: RefObject<HTMLHeadingElement | null>;
}

export function SectionContent({ windowId }: SectionContentProps) {
  switch (windowId) {
    case "projects":
      return <FinderProjects />;
    case "experience":
      return (
        <div className="experience-list">
          {profile.experience.map((experience) => (
            <article className="experience-entry surface" key={experience.company}>
              <div className="company-mark" aria-hidden="true">AF</div>
              <div>
                <div className="entry-heading"><h3>{experience.position}</h3><span className="entry-date">{experience.period}</span></div>
                <p className="company-name">{experience.company}</p>
                <p>{experience.description}</p>
                <div className="tags">{["Deployment", "Monitoring", "Infrastructure", "Reliability", "Collaboration"].map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      );
    case "about":
      return (
        <div className="about-content">
          <div className="about-introduction">
            <p className="about-statement">A technical mindset.<br /><span>A collaborative approach.</span></p>
            <div><p>{profile.about}</p><p>My interests connect DevOps, data engineering, and enterprise systems, alongside experience leading student organizations.</p></div>
          </div>
          <div className="skills-layout" id="skills">
            <div>
              <h3>What I work with</h3>
              <p className="supporting-copy">Infrastructure foundations, data workflows, and the tools that connect them.</p>
              {[
                { title: "DevOps & infrastructure", items: skills.devops },
                { title: "Data engineering", items: skills.data_engineering },
                { title: "Tools", items: skills.tools },
                { title: "Working together", items: skills.soft_skills },
              ].map((group) => <div className="skill-group" key={group.title}><h4>{group.title}</h4><div className="tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div></div>)}
            </div>
            <TerminalWindow />
          </div>
          <div className="background-grid">
            <div id="education">
              <h3 className="subsection-heading"><GraduationCap size={22} aria-hidden="true" /> Education</h3>
              <div className="education-content">
                <h4>{profile.education.school}</h4>
                <p>{profile.education.degree} · Information Systems</p>
                <dl><div><dt>GPA</dt><dd>{profile.education.gpa}</dd></div><div><dt>Expected graduation</dt><dd>{profile.education.expectedGraduation}</dd></div></dl>
                <p className="supporting-copy">{profile.education.additional}</p>
              </div>
            </div>
            <div id="certifications">
              <h3 className="subsection-heading"><Award size={21} aria-hidden="true" /> Certifications</h3>
              <ul className="credential-list">{certifications.map((cert) => <li key={cert.id}><h4>{cert.title}</h4><p>{cert.issuer} <span>· {cert.date}</span></p></li>)}</ul>
            </div>
          </div>
          <div id="leadership" className="leadership-section">
            <h3>Leadership & community</h3>
            <div className="leadership-list">{leadership.map((role) => <article key={role.id}><div><h4>{role.role}</h4><p>{role.organization}</p><span className="entry-date">{role.period}</span></div><p>{role.highlight}</p></article>)}</div>
          </div>
        </div>
      );
    case "contact":
      return (
        <div className="contact-panel surface">
          <div><span className="availability"><span className="availability-dot" />{profile.availabilityStatus}</span><h3>Have an opportunity<br />in mind?</h3><p>I’d love to hear about your team and what you’re building.</p></div>
          <div className="contact-links">
            <a className="contact-email" href={`mailto:${profile.email}`}><Mail size={20} aria-hidden="true" /><span>{profile.email}</span><ArrowUpRight size={20} aria-hidden="true" /></a>
            <div className="contact-meta"><a href={`tel:${profile.phone}`}><Phone size={16} aria-hidden="true" />{profile.phone}</a><span><MapPin size={16} aria-hidden="true" />{profile.location}</span></div>
            <div className="contact-socials">
              <a className="button button-glass" href="https://linkedin.com/in/patricianessa" target="_blank" rel="noopener noreferrer"><Linkedin size={17} aria-hidden="true" /> LinkedIn</a>
              <a className="button button-glass" href="https://github.com/patricianessa" target="_blank" rel="noopener noreferrer"><Github size={17} aria-hidden="true" /> GitHub</a>
              <a className="button button-glass" href="/CV_Nessa.pdf" download><Download size={17} aria-hidden="true" /> CV</a>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}
