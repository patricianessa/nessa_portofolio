import { useRef, useState } from "react";
import { ArrowUpRight, CornerDownLeft, Terminal } from "lucide-react";
import { profile } from "../data/profile";
import { skills } from "../data/skills";

const commands = ["help", "whoami", "skills", "projects", "contact", "clear"] as const;
type Entry = { command: string; output: string };

export function TerminalWindow() {
  const [history, setHistory] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);

  const run = (value: string) => {
    const command = value.trim().toLowerCase();
    if (!command) return;
    setInput("");
    if (command === "clear") { setHistory([]); return; }
    let output: string;
    switch (command) {
      case "help": output = "whoami   A quick introduction\nskills   My technical toolkit\nprojects Jump to Projects\ncontact  Let’s connect\nclear    Clear the terminal"; break;
      case "whoami": output = `${profile.name}\nDevOps Intern at Adira Finance\n${profile.location}\nData-minded. Open to opportunities.`; break;
      case "skills": output = Object.entries(skills).map(([key, items]) => `${key.replaceAll("_", " ")}\n  ${items.join(" · ")}`).join("\n\n"); break;
      case "projects":
      case "contact": {
        output = `Navigating to ${command}…`;
        window.location.hash = command;
        document.getElementById(`${command}-title`)?.focus({ preventScroll: true });
        break;
      }
      default: output = `Command not found: ${command}. Type help to see available commands.`;
    }
    setHistory((previous) => [...previous, { command, output }]);
    requestAnimationFrame(() => { if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight; });
  };

  return (
    <div className="terminal-window">
      <div className="terminal-title"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span><Terminal size={14} aria-hidden="true" /> nessa — terminal</span><span className="terminal-shell">zsh</span></div>
      <div className="terminal-output" ref={outputRef} role="region" aria-label="Terminal output" tabIndex={0}>
        <p className="terminal-welcome">A small shortcut to getting to know me.</p><p className="terminal-hint">Try a command below, or type <strong>help</strong>.</p>
        <div role="log" aria-live="polite" aria-relevant="additions">
          {history.map((entry, index) => <div className="terminal-entry" key={index}><p><span>nessa ~ %</span> {entry.command}</p><pre>{entry.output}</pre></div>)}
        </div>
      </div>
      <form className="terminal-prompt" onSubmit={(event) => { event.preventDefault(); run(input); }}>
        <label htmlFor="terminal-command">nessa ~ %</label>
        <input id="terminal-command" aria-label="Enter a terminal command" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type help…" autoComplete="off" autoCapitalize="none" spellCheck={false} />
        <button type="submit" aria-label="Run command"><CornerDownLeft size={17} /></button>
      </form>
      <div className="terminal-shortcuts" role="group" aria-label="Terminal shortcuts">{commands.map((command) => <button key={command} onClick={() => run(command)}>{command}{["projects", "contact"].includes(command) && <ArrowUpRight size={11} aria-hidden="true" />}</button>)}</div>
    </div>
  );
}
