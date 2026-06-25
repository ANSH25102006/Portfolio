"use client";

import React, { useEffect, useState, useRef } from "react";
import { Search, FolderOpen, Award, Wrench, Contact2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SpotlightItem {
  id: string; // The app window ID it targets
  title: string;
  category: "projects" | "skills" | "certifications" | "contact" | "about";
  description: string;
  icon: React.ReactNode;
}

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
}

export default function Spotlight({ isOpen, onClose, onOpenApp }: SpotlightProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchIndex: SpotlightItem[] = [
    {
      id: "home",
      title: "Home - Workstation Landing Desk",
      category: "about",
      description: "Overview dashboard displaying Ansh Pandey's brand summary and primary contact linkages.",
      icon: <Contact2 className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: "achievements",
      title: "AchievementExplorer - Academic & Open Source Gallery",
      category: "about",
      description: "Visual media grid showcasing CGPA, hackathons, and software milestones with inspector lightboxes.",
      icon: <Award className="w-4 h-4 text-yellow-400" />,
    },
    {
      id: "skills",
      title: "TechnicalArsenal - Capability Nodes Visualization",
      category: "skills",
      description: "Searchable tech stack categorizations mapped over a connected interactive node graph.",
      icon: <Wrench className="w-4 h-4 text-blue-400" />,
    },
    {
      id: "timeline",
      title: "CareerTimeline - Historical Diagnostics Chronology",
      category: "about",
      description: "Work and studies timelines linking milestone selections directly to a side terminal log console.",
      icon: <Contact2 className="w-4 h-4 text-indigo-400" />,
    },
    {
      id: "credentials",
      title: "CredentialsDatabase - Verified Certificates Records",
      category: "certifications",
      description: "Searchable table registry database for verified Harvard and JPMorgan simulation credentials.",
      icon: <FolderOpen className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: "projects",
      title: "ProjectsExplorer - Finder Directory Browser",
      category: "projects",
      description: "Double-pane Finder-style browser with grid/list modes and right sidebar Get Info specifications.",
      icon: <FolderOpen className="w-4 h-4 text-cyan-400" />,
    },
    {
      id: "profiles",
      title: "ProfilesCardStack - Draggable 3D Keycards Deck",
      category: "about",
      description: "Swipable 3D physical keycard stack for LinkedIn, GitHub, Resume, and Mail directories.",
      icon: <Contact2 className="w-4 h-4 text-purple-400" />,
    },
    {
      id: "contact",
      title: "ContactTerminal - Secure Telemetry Form Gateway",
      category: "contact",
      description: "Communication gateway terminal validating forms and tracing dispatcher handshake traces.",
      icon: <Contact2 className="w-4 h-4 text-blue-400" />,
    },
  ];

  // Focus input automatically on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredItems = searchIndex.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        onOpenApp(filteredItems[selectedIndex].id);
        onClose();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop blur overlay click closing */}
          <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

          {/* Search Box panel */}
          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl rounded-2xl glass-window border border-white/10 overflow-hidden relative z-10 shadow-[0_20px_70px_rgba(0,0,0,0.8)]"
          >
            {/* Search Input bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-black/20">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                className="w-full text-sm font-mono text-white bg-transparent outline-none border-none placeholder-slate-500"
                placeholder="Spotlight Search... (Use ↑↓ and Enter)"
              />
              <span className="font-mono text-[9px] bg-white/5 border border-white/5 px-2 py-0.5 rounded-md text-slate-500">
                ESC
              </span>
            </div>

            {/* Search results list */}
            <div className="max-h-[300px] overflow-y-auto window-scroll py-2 bg-black/10 select-none">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        onOpenApp(item.id);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center gap-4 px-4 py-3.5 cursor-pointer transition-colors ${
                        isSelected ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-white/10 text-white" : "bg-white/5 text-slate-400"}`}>
                        {item.icon}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold font-mono">
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-sans ${isSelected ? "text-slate-200" : "text-slate-500"}`}>
                          {item.description}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs font-mono text-slate-500">
                  No matching files or utilities.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
