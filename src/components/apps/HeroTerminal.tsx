"use client";

import React, { useState, useRef, useEffect } from "react";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

interface HeroTerminalProps {
  onOpenApp?: (appId: string) => void;
}

export default function HeroTerminal({ onOpenApp }: HeroTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "",
      output: (
        <div className="text-slate-400 font-mono text-[11px] leading-relaxed">
          Welcome to AnshOS v2.0.4 Shell Emulator.<br />
          Type <span className="text-blue-400 font-bold">help</span> to query the system commands registry.
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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdTrimmed = input.trim();
    if (!cmdTrimmed) return;

    const parts = cmdTrimmed.split(" ");
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();
    let response: string | React.ReactNode = "";

    switch (command) {
      case "help":
        response = (
          <div className="grid grid-cols-1 gap-1 text-[10px] text-slate-300">
            <div className="font-bold text-blue-400 mb-1">ANSHOS SYSTEM REGISTERED COMMANDS:</div>
            <div>  <span className="text-cyan-400 font-bold">whoami</span>       - Query active engineer diagnostic profile</div>
            <div>  <span className="text-cyan-400 font-bold">ls</span>           - List virtual application registry nodes</div>
            <div>  <span className="text-cyan-400 font-bold">open &lt;app&gt;</span>    - Execute and launch an application window</div>
            <div>  <span className="text-cyan-400 font-bold">sysvar</span>         - Print local OS config and machine metrics</div>
            <div>  <span className="text-cyan-400 font-bold">matrix</span>         - Stream standard binary grid matrix overlay</div>
            <div>  <span className="text-cyan-400 font-bold">clear</span>          - Flush current shell interface histories</div>
            <div className="text-slate-500 mt-1">Example: &quot;open projects&quot;, &quot;open github&quot;</div>
          </div>
        );
        break;
      case "whoami":
        response = "USER_NODE // Ansh Pandey: CS Major Student at Sharda University, specializing in full-stack engineering, React, TypeScript, and database protocols.";
        break;
      case "sysvar":
        response = (
          <div className="grid grid-cols-2 gap-y-1 text-[10px] text-slate-400">
            <div>HOST_MACHINE:</div><div className="text-slate-200">MacBook Pro (Node Core)</div>
            <div>OS_VERSION:</div><div className="text-slate-200">AnshOS v2.0.4 (Turbopack)</div>
            <div>IP_ADDRESS:</div><div className="text-slate-200">127.0.0.1</div>
            <div>LOCATION:</div><div className="text-slate-200">Delhi, India</div>
            <div>CURRENT_CGPA:</div><div className="text-slate-200">7.9 / 10.0</div>
            <div>SHELL:</div><div className="text-slate-200">/bin/zsh-ansh</div>
          </div>
        );
        break;
      case "ls":
        response = (
          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
            <div>profile.app [DeveloperProfile]</div>
            <div>projects.app [ProjectsExplorer]</div>
            <div>skills.app [TechnicalArsenal]</div>
            <div>timeline.app [CareerTimeline]</div>
            <div>credentials.app [CredentialsDatabase]</div>
            <div>profiles.app [ProfilesCardStack]</div>
            <div>github.app [GitHubAnalyticsCenter]</div>
            <div>contact.app [ContactTerminal]</div>
          </div>
        );
        break;
      case "open":
        if (!arg) {
          response = "Usage: open <app_name>. Example: 'open projects'";
        } else {
          // Map target arguments to window IDs
          const appMappings: Record<string, string> = {
            profile: "profile",
            about: "profile",
            projects: "projects",
            explorer: "projects",
            skills: "skills",
            arsenal: "skills",
            timeline: "timeline",
            career: "timeline",
            credentials: "credentials",
            database: "credentials",
            profiles: "profiles",
            cards: "profiles",
            github: "github",
            analytics: "github",
            contact: "contact",
            terminal: "terminal"
          };

          const matchedId = appMappings[arg] || appMappings[arg.replace(".app", "")];
          if (matchedId) {
            if (onOpenApp) {
              onOpenApp(matchedId);
              response = `Launching process for node [${matchedId}]... Complete.`;
            } else {
              response = "Error: OS window manager linkage offline.";
            }
          } else {
            response = `open: no node matches identifier: '${arg}'. Type 'ls' to view available app nodes.`;
          }
        }
        break;
      case "matrix":
        response = (
          <div className="text-[10px] text-emerald-500 font-mono leading-none flex flex-col gap-0.5 animate-pulse">
            <div>01000101 01010010 01010010 01001111 01010010</div>
            <div>11001010 11100101 00101010 01011101 11001010</div>
            <div>01010101 AnshOS Secure Shield Active 10101010</div>
            <div>00011100 00111000 11110000 11001100 00110011</div>
            <div>[CORE] UPTIME STABLE // COMPILER DISPATCH ONLINE</div>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = `anshsh: command not found: '${command}'. Type 'help' for instructions.`;
    }

    setHistory((prev) => [...prev, { command: cmdTrimmed, output: response }]);
    setInput("");
  };

  return (
    <div
      onClick={focusInput}
      className="w-full h-full bg-[#050505]/95 rounded-b-xl p-4 flex flex-col font-mono text-[11px] text-emerald-400 select-text overflow-hidden cursor-text"
      style={{ minHeight: "410px" }}
    >
      {/* Shell logs */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto window-scroll pr-2 flex flex-col gap-3.5 mb-4">
        {history.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            {item.command && (
              <div className="flex items-center gap-2 text-slate-400 font-bold">
                <span>ansh@AnshOS ~ %</span>
                <span className="text-white">{item.command}</span>
              </div>
            )}
            {item.output && <div className="text-slate-300 leading-normal whitespace-pre-wrap">{item.output}</div>}
          </div>
        ))}
      </div>

      {/* Input console */}
      <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 text-slate-400 shrink-0 font-bold">
        <span>ansh@AnshOS ~ %</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow terminal-input text-emerald-400 placeholder-slate-800"
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
