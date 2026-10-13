import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { skills } from "../data/skills";

const tabs = [
  { id: "skills.json", label: "skills.json", color: "text-violet-600" },
  { id: "devops.sh", label: "devops.sh", color: "text-fuchsia-600" },
  { id: "data.sql", label: "data.sql", color: "text-purple-600" },
];

const tabContent: Record<string, { text: string; color: string }> = {
  "skills.json": {
    text: JSON.stringify(skills, null, 2),
    color: "text-violet-600",
  },
  "devops.sh": {
    text: `#!/bin/bash\n# DevOps Pipeline Script\n\necho "🚀 Deploying application..."\n\ndocker build -t portfolio .\ndocker tag portfolio registry:5000/portfolio:latest\ndocker push registry:5000/portfolio:latest\n\nkubectl rollout restart deployment/portfolio\n\necho "✅ Deployment complete!"\n\n# Monitoring\nwatch -n 5 'kubectl get pods | grep portfolio'`,
    color: "text-fuchsia-600",
  },
  "data.sql": {
    text: `-- Data Analytics Pipeline\n-- Transform raw data into insights\n\nWITH cleaned_data AS (\n  SELECT\n    id,\n    TRIM(name) AS name,\n    COALESCE(amount, 0) AS amount,\n    DATE(created_at) AS date\n  FROM raw_transactions\n  WHERE status = 'active'\n),\n\naggregated AS (\n  SELECT\n    date,\n    COUNT(*) AS transactions,\n    SUM(amount) AS total_revenue\n  FROM cleaned_data\n  GROUP BY date\n)\n\nSELECT * FROM aggregated\nORDER BY date DESC;`,
    color: "text-purple-600",
  },
};

const AVAILABLE_CMDS = [
  { name: "help", desc: "Show available commands" },
  { name: "clear", desc: "Clear the terminal" },
  { name: "whoami", desc: "Show profile info" },
  { name: "skills", desc: "Show digital skills list" },
  { name: "date", desc: "Show current date & time" },
];

export const TerminalWindow: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState("skills.json");
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<{ type: "in" | "out"; text: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentContent = tabContent[activeTab];

  // Typewriter for file preview
  useEffect(() => {
    const text = `patricia@portfolio:~$ cat ${activeTab}\n\n${currentContent.text}\n\npatricia@portfolio:~$ `;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      if (reducedMotion) {
        setDisplayedText(text);
        setIsTyping(false);
        return;
      }
      setIsTyping(true);
      setDisplayedText("");
      let index = 0;
      interval = setInterval(() => {
        index = Math.min(index + 2, text.length);
        setDisplayedText(text.substring(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 12);
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [activeTab, currentContent.text, reducedMotion]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleSubmit = useCallback(() => {
    const cmd = inputValue.trim().toLowerCase();
    if (!cmd) return;

    setHistory((prev) => [...prev, { type: "in", text: `patricia@portfolio:~$ ${cmd}` }]);

    if (cmd === "help") {
      setHistory((prev) => [
        ...prev,
        { type: "out", text: "Available commands:\n" + AVAILABLE_CMDS.map((c) => `  • ${c.name.padEnd(10)} — ${c.desc}`).join("\n") },
      ]);
    } else if (cmd === "clear") {
      setHistory([]);
    } else if (cmd === "whoami") {
      setHistory((prev) => [
        ...prev,
        { type: "out", text: "Patricia Nessa Mae\nData Engineer & DevOps Engineer\nLoves building reliable data pipelines & automating infrastructure." },
      ]);
    } else if (cmd === "skills") {
      setHistory((prev) => [
        ...prev,
        { type: "out", text: Object.entries(skills).map(([category, items]) => `${category}: ${items.join(", ")}`).join("\n") },
      ]);
    } else if (cmd === "date") {
      setHistory((prev) => [
        ...prev,
        { type: "out", text: new Date().toString() },
      ]);
    } else if (cmd.startsWith("open ")) {
      const section = cmd.replace("open ", "");
      setHistory((prev) => [...prev, { type: "out", text: `To open '${section}', use the Dock at the bottom or click Back and select from the menu.` }]);
    } else if (cmd === "download cv") {
      const a = document.createElement("a");
      a.href = "/CV_Nessa.pdf";
      a.download = "Patricia_Nessa_CV.pdf";
      a.click();
      setHistory((prev) => [...prev, { type: "out", text: "Downloading CV... ✅" }]);
    } else {
      setHistory((prev) => [
        ...prev,
        { type: "out", text: `Command '${cmd}' not found. Type 'help' for available commands.` },
      ]);
    }

    setInputValue("");
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  // Auto-scroll
  useEffect(() => {
    if (history.length && scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  return (
    <div className="relative bg-white rounded-xl overflow-hidden border border-[#d7c8f0] shadow-2xl">
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] z-10"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124,58,237,0.08) 2px, rgba(124,58,237,0.08) 4px)",
        }}
      />

      {/* Terminal glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] z-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25), transparent 70%)",
        }}
      />

      {/* Terminal header */}
      <div className="relative z-20 bg-[#f8f5ff] px-4 py-2.5 border-b border-[#e5daf5] flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-400/80" />
          <div className="w-3 h-3 rounded-full bg-amber-400/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[12px] text-[#8b6bb8] font-mono font-medium ml-2">terminal — patricia@portfolio</span>
      </div>

      {/* Tab bar */}
      <div className="relative z-20 flex bg-[#faf7ff] border-b border-[#ece4f7] overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-mono font-medium transition-all duration-200 whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? "text-violet-600 border-violet-500 bg-[#f3edff]"
                : "text-[#9d8bbd] border-transparent hover:text-[#6b4f94] hover:bg-[#f3edff]/50"
            }`}
          >
            <motion.div
              animate={{ scale: activeTab === tab.id ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
              className={`w-1.5 h-1.5 rounded-full ${activeTab === tab.id ? "bg-violet-500" : "bg-[#cdbce6]"}`}
            />
            {tab.id}
          </button>
        ))}
      </div>

      {/* Terminal content */}
      <div ref={scrollRef} className="relative z-20 p-4 sm:p-5 font-mono text-[12.5px] overflow-auto max-h-[340px] min-h-[280px] leading-relaxed">
        {/* History */}
        <AnimatePresence>
          {history.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-1"
            >
              {entry.type === "in" ? (
                <span className="text-violet-600">{entry.text}</span>
              ) : (
                <pre className="whitespace-pre-wrap text-[#5a4a7a]">{entry.text}</pre>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* File preview (typewriter) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`whitespace-pre-wrap break-words ${currentContent.color}`}
          >
            {displayedText}
            {!isTyping && <span className={cursorVisible ? "cursor-blink" : ""}>▋</span>}
          </motion.div>
        </AnimatePresence>

        {/* Interactive prompt */}
        <label className="mt-4 flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-violet-800 font-mono shrink-0">patricia@portfolio:~$ </span>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Enter a terminal command"
            className="min-w-0 flex-1 bg-transparent border-none text-[#2d1b4e] font-mono text-[12.5px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-700 focus-visible:outline-offset-2"
            placeholder="Type help..."
            spellCheck={false}
            autoComplete="off"
          />
          <span className="text-zinc-700 text-xs shrink-0">Press Enter to run</span>
        </label>
      </div>
    </div>
  );
};
