"use client";

import React, { useState, useMemo } from "react";
import { Eye, X, BookOpen, GitPullRequest, Laptop, ShieldCheck, Search, Grid, List, Folder, Trophy, Users, Star } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  category: "hackathons" | "competitions" | "leadership" | "academic" | "opensource";
  date: string;
  short: string;
  details: string;
  metrics: string;
  icon: React.ReactNode;
  tags: string[];
}

const achievements: Achievement[] = [
  {
    id: "cgpa",
    title: "Academic Honor Roll",
    category: "academic",
    date: "Ongoing",
    short: "Consistent performance in computer science examinations.",
    details: "Maintained a 7.9 cumulative grade point average (CGPA) in Computer Science engineering courses at Sharda University. Focus areas include computer architectures, algorithms, databases, and mathematics.",
    metrics: "CGPA 7.9 // Sharda University",
    icon: <BookOpen className="w-5 h-5 text-blue-400" />,
    tags: ["GPA", "B.Tech", "Sharda University", "CS Core"]
  },
  {
    id: "commits",
    title: "300+ Commits Logged",
    category: "opensource",
    date: "Past 12 Months",
    short: "Active contributions and repository pushes.",
    details: "Successfully pushed over 300 commits across personal portfolios and public codebases. Demonstrates solid daily coding habits, version control workflows, branching structures, and continuous deployment configurations.",
    metrics: "Open Source Contributor",
    icon: <GitPullRequest className="w-5 h-5 text-cyan-400" />,
    tags: ["Git", "Open Source", "Version Control", "YAML"]
  },
  {
    id: "cs50",
    title: "Harvard CS50 Excellence",
    category: "academic",
    date: "2024",
    short: "Core computer science and algorithms certification.",
    details: "Completed Harvard University's renowned introductory course covering memory layouts, runtime complexity (Big O), data structures (Linked Lists, Trees, Hash Tables), SQL query optimizations, and web architectures.",
    metrics: "Verified CS50 Honor Certificate",
    icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
    tags: ["Algorithms", "C Language", "Python", "SQL"]
  },
  {
    id: "jpmc",
    title: "JPMC Simulation Certificate",
    category: "opensource",
    date: "2025",
    short: "Software engineering job simulation tasks.",
    details: "Completed J.P. Morgan Chase software engineering simulation. Handled financial data stream feeds visual charting modifications, perspective components rendering, logic pipelines testing, and repository configurations.",
    metrics: "Job Simulation Participant",
    icon: <Laptop className="w-5 h-5 text-emerald-400" />,
    tags: ["React", "Python", "Data Visualization", "Perspective"]
  },
  {
    id: "hackathon_runnerup",
    title: "Smart India Hackathon Runner-up",
    category: "hackathons",
    date: "2024",
    short: "Designed a digital logistics system for crop management.",
    details: "Led a team of three in designing and pitching a smart agricultural logistics solution that connects local farmers directly with commercial buyers, reducing middleman fees. Finished 2nd place in the local university round.",
    metrics: "2nd Place / Smart Logistics",
    icon: <Trophy className="w-5 h-5 text-amber-400" />,
    tags: ["Hackathon", "Logistics", "Team Lead", "Pitching"]
  },
  {
    id: "leetcode_50",
    title: "LeetCode 250+ Solved",
    category: "competitions",
    date: "Ongoing",
    short: "Solved 250+ data structures and algorithms challenges.",
    details: "Actively training in algorithmic problem-solving. Solved over 250 challenges covering dynamic programming, array operations, hash maps, graph traversals, and sorting optimization.",
    metrics: "250+ DSA Solutions Logged",
    icon: <Star className="w-5 h-5 text-yellow-400" />,
    tags: ["DSA", "LeetCode", "Algorithms", "Optimization"]
  },
  {
    id: "tech_coord",
    title: "Technical Coordinator Node",
    category: "leadership",
    date: "2024 - Present",
    short: "Organized technical workshops and university hackathons.",
    details: "Appointed as technical coordinator for the student coding community at Sharda University. Managed planning for coding contests, hosted JavaScript/React training sessions, and coordinated hardware labs.",
    metrics: "Elected Coordinator Node",
    icon: <Users className="w-5 h-5 text-purple-400" />,
    tags: ["Leadership", "Community", "Mentoring", "Coordination"]
  }
];

export default function AchievementExplorer() {
  const [activeCategory, setActiveCategory] = useState<"all" | "hackathons" | "competitions" | "leadership" | "academic" | "opensource">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<Achievement | null>(null);
  // Filtering calculations
  const filtered = useMemo(() => {
    return achievements.filter((item) => {
      const matchCategory = activeCategory === "all" || item.category === activeCategory;
      const matchSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="font-mono text-xs text-slate-300 flex flex-col gap-4 select-text h-full min-h-[440px]">
      
      {/* Finder Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-white tracking-wider text-[11px] uppercase">MILESTONES // FINDER</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:max-w-xs">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-black/40 border border-white/10 w-full">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-[10px] text-white placeholder-slate-600 font-mono"
              placeholder="Search achievements..."
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

      {/* Main Dual Pane Explorer Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-grow overflow-hidden">
        
        {/* 1. Left Sidebar Favorite Directories */}
        <div className="md:col-span-3 border-r border-white/5 pr-3 flex flex-col gap-4">
          <div>
            <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">{"// FAVORITES"}</span>
            <div className="flex flex-col gap-1">
              {(
                [
                  { id: "all", name: "All Milestones", count: achievements.length, icon: <Folder className="w-3.5 h-3.5" /> },
                  { id: "academic", name: "Academic Hon.", count: achievements.filter(a => a.category === "academic").length, icon: <BookOpen className="w-3.5 h-3.5" /> },
                  { id: "opensource", name: "OSS Commits", count: achievements.filter(a => a.category === "opensource").length, icon: <GitPullRequest className="w-3.5 h-3.5" /> },
                  { id: "hackathons", name: "Hackathons", count: achievements.filter(a => a.category === "hackathons").length, icon: <Trophy className="w-3.5 h-3.5" /> },
                  { id: "competitions", name: "Competitions", count: achievements.filter(a => a.category === "competitions").length, icon: <Star className="w-3.5 h-3.5" /> },
                  { id: "leadership", name: "Leadership", count: achievements.filter(a => a.category === "leadership").length, icon: <Users className="w-3.5 h-3.5" /> }
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveCategory(item.id)}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[10px] font-bold cursor-pointer transition-colors ${
                    activeCategory === item.id 
                      ? "bg-white/10 text-white" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={activeCategory === item.id ? "text-blue-400" : "text-slate-500"}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-slate-500 font-bold">{item.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Main Area: Cards / Grid / List */}
        <div className="md:col-span-9 overflow-y-auto pr-1 window-scroll max-h-[380px]">
          {filtered.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group cursor-pointer border border-white/5 bg-white/[0.01] hover:border-blue-500/20 hover:bg-white/[0.03] rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-300"
                  >
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-1.5 rounded bg-white/5 border border-white/5 shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-slate-500 font-extrabold bg-white/5 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white tracking-wide mb-1.5 group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-[10px] leading-relaxed mb-4">
                        {item.short}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-2 text-[9px]">
                      <span className="text-slate-500">{item.date}</span>
                      <span className="font-bold text-cyan-400 uppercase">{item.metrics}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group cursor-pointer border border-white/5 bg-white/[0.01] hover:border-blue-500/20 hover:bg-white/[0.03] px-3.5 py-2.5 rounded-lg flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-1 rounded bg-white/5 border border-white/5 text-slate-500 shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <span className="font-bold text-white text-[11px] block">{item.title}</span>
                        <span className="text-[8px] text-slate-500 uppercase">{item.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-wider">{item.metrics}</span>
                      <Eye className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="py-8 text-center text-slate-500">No achievements matches filters.</div>
          )}
        </div>

      </div>

      {/* Detail Overlay Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div
            className="w-full max-w-lg rounded-2xl glass-window border border-white/10 p-6 shadow-2xl relative flex flex-col gap-5 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header detail */}
            <div className="flex items-center gap-3 pb-3 border-b border-white/5">
              <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                {selectedItem.icon}
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold tracking-wider text-blue-400 block mb-0.5">
                  ACHIEVEMENT_ID: {selectedItem.id.toUpperCase()}
                </span>
                <h3 className="text-base font-black text-white leading-tight">
                  {selectedItem.title}
                </h3>
              </div>
            </div>

            {/* Content body */}
            <div className="flex flex-col gap-4 text-[11px] leading-relaxed text-slate-300 font-mono">
              <div>
                <span className="text-slate-500 font-bold uppercase block mb-1">Detailed Log:</span>
                <p className="bg-black/30 border border-white/5 p-4 rounded-lg text-slate-400">
                  {selectedItem.details}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 font-bold uppercase block mb-1">Timeline Node:</span>
                  <span className="text-white font-extrabold">{selectedItem.date}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase block mb-1">Diagnostics:</span>
                  <span className="text-emerald-400 font-extrabold">{selectedItem.metrics}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 font-bold uppercase block mb-2">Registry Tags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer trigger */}
            <div className="mt-4 border-t border-white/5 pt-4 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-[10px] font-bold text-white tracking-wider cursor-pointer"
              >
                CLOSE DIAGNOSTICS
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
