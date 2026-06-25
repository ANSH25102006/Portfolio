"use client";

import React, { useState, useRef, useEffect } from "react";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "",
      output: (
        <div className="text-slate-400 font-mono text-xs leading-relaxed">
          Welcome to AnshOS v1.0.0 Terminal Emulator.<br />
          Type <span className="text-blue-400">help</span> to view all available commands.
        </div>
      ),
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    // Scroll to bottom on updates
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = input.trim().toLowerCase();
    let response: string | React.ReactNode = "";

    if (cleanCmd) {
      switch (cleanCmd) {
        case "help":
          response = (
            <div className="grid grid-cols-1 gap-1 text-[11px] text-slate-300">
              <div>Available Commands:</div>
              <div>  <span className="text-cyan-400 font-bold">about</span>          - Display developer diagnostics profile</div>
              <div>  <span className="text-cyan-400 font-bold">projects</span>       - View system project modules directory</div>
              <div>  <span className="text-cyan-400 font-bold">skills</span>         - Print installed capability packages</div>
              <div>  <span className="text-cyan-400 font-bold">github</span>         - Query live GitHub contributions & metrics</div>
              <div>  <span className="text-cyan-400 font-bold">certifications</span> - Display verified system milestones</div>
              <div>  <span className="text-cyan-400 font-bold">resume</span>         - Load document resume viewer link</div>
              <div>  <span className="text-cyan-400 font-bold">contact</span>        - Trigger contact dispatch protocols</div>
              <div>  <span className="text-cyan-400 font-bold">clear</span>          - Flush previous shell log sessions</div>
            </div>
          );
          break;
        case "about":
          response = "SYSTEM INFO // ANSH PANDEY: Second-year CS Major B.Tech student at Sharda University (CGPA 7.9). Specializes in React/Next.js UI design, Node.js API scaling, and custom operating system mock dashboards.";
          break;
        case "projects":
          response = (
            <div className="flex flex-col gap-2 text-[11px]">
              <div>1. [ProjectRegistry: MediCompare]  - Healthcare cost comparison indexer (React / Supabase)</div>
              <div>2. [ProjectRegistry: QuickNotes]    - Markdown organizational note space (TypeScript)</div>
              <div>3. [ProjectRegistry: FarmerDirect] - Agro crop broker logistics hub (Node / Express / PG)</div>
            </div>
          );
          break;
        case "skills":
          response = "CAPABILITY DEPENDECIES: Frontend: React, Next.js, TypeScript, Tailwind | Backend: Node.js, Express.js | Databases: PostgreSQL, Supabase | Environments: Git, GitHub, Docker, VS Code, Xcode.";
          break;
        case "github":
          response = (
            <div className="flex flex-col gap-1.5 text-[11px]">
              <div className="text-emerald-400 font-bold">GITHUB_METRICS_DASHBOARD</div>
              <div>  • Commit Count      : 300+ Commits</div>
              <div>  • Active Repositories: 18 public/private</div>
              <div>  • Current Streak     : 15 Days</div>
              <div>  • Longest Streak     : 45 Days</div>
              <div>  • Core Languages     : TypeScript (45%), React/JS (30%), Tailwind/CSS (15%), SQL (10%)</div>
            </div>
          );
          break;
        case "certifications":
          response = (
            <div className="flex flex-col gap-2 text-[11px]">
              <div>1. [Harvard CS50] - Intro to Computer Science covering algorithms, database structures and C/Python fundamentals.</div>
              <div>2. [JP Morgan Simulation] - Completed typescript frontend analysis and perspective chart modules.</div>
            </div>
          );
          break;
        case "contact":
          response = "SIGNAL DETAILS: Email: anshpandey2510@gmail.com | Phone: +91 9599582379 | GitHub: ANSH25102006 | LinkedIn: ansh-pandey251 | Loc: Delhi, India.";
          break;
        case "resume":
          response = (
            <div>
              Initiating open command... Click here if blocked:{" "}
              <a
                href="https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                Open Resume viewer
              </a>
            </div>
          );
          window.open("https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit", "_blank");
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        default:
          response = `anshsh: command not found: ${input}. Type 'help' for instructions.`;
      }

      setHistory((prev) => [...prev, { command: input, output: response }]);
    } else {
      setHistory((prev) => [...prev, { command: "", output: "" }]);
    }

    setInput("");
  };

  return (
    <div
      onClick={focusInput}
      className="w-full h-full bg-[#050505]/90 rounded-b-xl p-4 flex flex-col font-mono text-[11px] text-green-400 select-text overflow-hidden cursor-text"
      style={{ minHeight: "410px" }}
    >
      {/* Scrollable command history */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto window-scroll pr-2 flex flex-col gap-4 mb-4">
        {history.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            {item.command && (
              <div className="flex items-center gap-2 text-slate-300 font-bold">
                <span>ansh@macbook ~ %</span>
                <span>{item.command}</span>
              </div>
            )}
            {item.output && <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">{item.output}</div>}
          </div>
        ))}
      </div>

      {/* Console prompt line */}
      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 text-slate-300 shrink-0 font-bold">
        <span>ansh@macbook ~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow terminal-input text-green-400 placeholder-slate-800"
          placeholder="type command..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
