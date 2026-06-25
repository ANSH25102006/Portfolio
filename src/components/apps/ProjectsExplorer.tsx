"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Folder, Search, List, Grid, Info, ChevronRight, ExternalLink, HardDrive } from "lucide-react";
import { Github } from "@/components/icons";

interface ProjectItem {
  id: string;
  title: string;
  category: "fullstack" | "ai" | "mobile" | "backend" | "opensource";
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  status: "ONLINE" | "STABLE" | "TESTING";
  version: string;
  fileSize: string;
  createdDate: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "medicompare",
    title: "MediCompare.app",
    category: "fullstack",
    description: "A comprehensive healthcare price comparison platform designed to help patients compare medical procedures and medicine pricing across providers. Empowers users with cost transparency.",
    image: "/images/medicompare.png",
    tags: ["React", "TypeScript", "Supabase", "Tailwind"],
    github: "https://github.com/ANSH25102006",
    demo: "#",
    status: "ONLINE",
    version: "v1.2.0",
    fileSize: "1.4 MB",
    createdDate: "Oct 2024"
  },
  {
    id: "farmermarket",
    title: "FarmerMarketAccess.app",
    category: "fullstack",
    description: "A secure digital marketplace connecting local crop farmers directly with commercial and private buyers. Simplifies supply chain logistics and removes traditional middlemen overheads.",
    image: "/images/farmer.png",
    tags: ["React", "Node.js", "Express.js", "PostgreSQL"],
    github: "https://github.com/ANSH25102006",
    demo: "#",
    status: "ONLINE",
    version: "v1.0.1",
    fileSize: "2.1 MB",
    createdDate: "Jan 2025"
  },
  {
    id: "quicknotes",
    title: "QuickNotes.app",
    category: "opensource",
    description: "A modern, hyper-fast note-taking application designed for efficient organizational workflows. Features smooth folder structures, tags, search queries, and beautiful markdown writing support.",
    image: "/images/quicknotes.png",
    tags: ["React", "TypeScript", "Tailwind", "FramerMotion"],
    github: "https://github.com/ANSH25102006",
    demo: "#",
    status: "STABLE",
    version: "v2.0.4",
    fileSize: "820 KB",
    createdDate: "Dec 2024"
  },
  {
    id: "cs50finance",
    title: "CS50_Finance.app",
    category: "backend",
    description: "An interactive stock simulation app enabling users to retrieve real-time stock prices, simulate virtual trades of stock indices, inspect full histories log records, and manage mock credit limits.",
    image: "/images/finance.png",
    tags: ["Python", "Flask", "SQL", "Bootstrap"],
    github: "https://github.com/ANSH25102006",
    demo: "#",
    status: "STABLE",
    version: "v1.0.0",
    fileSize: "680 KB",
    createdDate: "Nov 2024"
  }
];

export default function ProjectsExplorer() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "fullstack" | "ai" | "mobile" | "backend" | "opensource">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedId, setSelectedId] = useState<string>("medicompare");

  const filtered = useMemo(() => {
    return PROJECTS_DATA.filter(
      (p) =>
        (activeCategory === "all" || p.category === activeCategory) &&
        p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, activeCategory]);

  const selectedProject = useMemo(() => {
    return PROJECTS_DATA.find((p) => p.id === selectedId) || filtered[0] || PROJECTS_DATA[0];
  }, [selectedId, filtered]);

  return (
    <div className="font-mono text-xs text-slate-350 flex flex-col gap-4 select-text h-full min-h-[440px]">
      
      {/* Finder Header Search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-white tracking-wider text-[11px] uppercase">PROJECTS_EXPLORER // FINDER</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:max-w-xs">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/40 border border-white/10 w-full">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-[10px] text-white placeholder-slate-600 font-mono"
              placeholder="Search files..."
            />
          </div>
          
          {/* View Toggles */}
          <div className="flex items-center border border-white/10 rounded overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 cursor-pointer ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"}`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 cursor-pointer ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"}`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-grow overflow-hidden">
        
        {/* 1. Sidebar Nav (left 3 columns) */}
        <div className="md:col-span-3 border-r border-white/5 pr-3 flex flex-col gap-4">
          <div>
            <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">{"// DIRECTORIES"}</span>
            <div className="flex flex-col gap-1">
              {(
                [
                  { id: "all", name: "All Modules", count: PROJECTS_DATA.length },
                  { id: "fullstack", name: "Full Stack", count: PROJECTS_DATA.filter(p => p.category === "fullstack").length },
                  { id: "ai", name: "AI Modules", count: PROJECTS_DATA.filter(p => p.category === "ai").length },
                  { id: "mobile", name: "Mobile Apps", count: PROJECTS_DATA.filter(p => p.category === "mobile").length },
                  { id: "backend", name: "Backend Core", count: PROJECTS_DATA.filter(p => p.category === "backend").length },
                  { id: "opensource", name: "Open Source", count: PROJECTS_DATA.filter(p => p.category === "opensource").length }
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveCategory(item.id);
                    const matched = PROJECTS_DATA.find(p => item.id === "all" || p.category === item.id);
                    if (matched) setSelectedId(matched.id);
                  }}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[10px] font-bold cursor-pointer transition-colors ${
                    activeCategory === item.id 
                      ? "bg-white/10 text-white" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Folder className={`w-3.5 h-3.5 ${activeCategory === item.id ? "text-blue-400" : "text-slate-500"}`} />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-slate-500 font-bold">{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto p-3 border border-white/5 bg-white/[0.01] rounded-lg hidden md:block">
            <div className="flex items-center gap-1.5 mb-1.5 text-slate-400">
              <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-extrabold text-[9px] uppercase">OS Volume Info</span>
            </div>
            <div className="text-[8px] text-slate-500 leading-normal">
              Volume: SSD-250G<br />
              Free Space: 180 GB<br />
              Format: APFS (Encrypted)
            </div>
          </div>
        </div>

        {/* 2. Main Area: Folders / Files View (middle 5 columns) */}
        <div className="md:col-span-5 overflow-y-auto pr-1 window-scroll max-h-[380px]">
          {filtered.length > 0 ? (
            viewMode === "grid" ? (
              /* Grid Layout Mode */
              <div className="grid grid-cols-2 gap-3.5 select-none">
                {filtered.map((item) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`p-3.5 border rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? "bg-blue-600/10 border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.15)] text-white" 
                          : "bg-white/[0.01] border-white/5 hover:border-blue-500/20 hover:bg-white/[0.02]"
                      }`}
                    >
                      <Folder className={`w-10 h-10 mb-2 ${isSelected ? "text-blue-400" : "text-slate-600"}`} />
                      <span className="font-bold text-[10px] truncate max-w-[100px]">{item.title}</span>
                      <span className="text-[8px] text-slate-500 mt-1">{item.fileSize}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List Layout Mode */
              <div className="flex flex-col gap-1 select-none">
                {filtered.map((item) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`px-3 py-2 rounded-lg border flex items-center justify-between text-left cursor-pointer transition-colors duration-200 ${
                        isSelected 
                          ? "bg-blue-600/15 border-blue-500/40 text-white" 
                          : "bg-white/[0.01] border-white/5 hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Folder className={`w-4 h-4 ${isSelected ? "text-blue-400" : "text-slate-500"}`} />
                        <span className="font-bold text-[10px]">{item.title}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[9px] text-slate-500">
                        <span>{item.fileSize}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            <div className="py-8 text-center text-slate-500">No project nodes match filters.</div>
          )}
        </div>

        {/* 3. Get Info Right Sidebar Panel (right 4 columns) */}
        <div className="md:col-span-4 border border-white/5 bg-white/[0.01] p-4 rounded-xl flex flex-col justify-between overflow-y-auto max-h-[380px] window-scroll">
          {selectedProject ? (
            <div className="flex flex-col gap-4">
              
              {/* Image & Title specs */}
              <div className="flex flex-col gap-2 pb-2.5 border-b border-white/5">
                <div className="flex items-center gap-1 text-[8px] text-slate-500 font-extrabold uppercase mb-0.5">
                  <Info className="w-3 h-3 text-cyan-400" />
                  <span>Module Information</span>
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded bg-black border border-white/5 mb-1.5">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={200}
                    height={115}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white font-black text-xs truncate max-w-[120px]">{selectedProject.title}</span>
                  <span className="text-[8px] bg-cyan-950 text-cyan-400 border border-cyan-800/30 px-1.5 py-0.5 rounded font-bold uppercase">
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              {/* Attributes logs */}
              <div className="flex flex-col gap-1.5 text-[9px] border-b border-white/5 pb-3.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">VERSION:</span>
                  <span className="text-slate-200 font-bold">{selectedProject.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">FILE_SIZE:</span>
                  <span className="text-slate-200 font-bold">{selectedProject.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">COMPILED:</span>
                  <span className="text-slate-200 font-bold">{selectedProject.createdDate}</span>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-slate-500 uppercase font-bold">SUMMARY // SCOPE:</span>
                <p className="text-[10px] text-slate-450 leading-relaxed bg-black/10 p-2.5 rounded border border-white/5 font-sans">
                  {selectedProject.description}
                </p>
              </div>

              {/* Tech stack tags */}
              <div>
                <span className="text-[8px] text-slate-500 uppercase font-bold block mb-1.5">DEPENDENCY_MODULES:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] text-slate-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3.5 border-t border-white/5 mt-auto">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-blue-600 hover:text-white border border-white/5 transition-all text-[9px] font-bold"
                >
                  <Github className="w-3.5 h-3.5" />
                  Code
                </a>
                <a
                  href={selectedProject.demo}
                  className="flex-grow flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-[9px] text-slate-400 hover:text-white font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Demo
                </a>
              </div>

            </div>
          ) : (
            <div className="py-8 text-center text-slate-500 flex flex-col justify-center h-full">
              Select a project module folder to inspect.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
