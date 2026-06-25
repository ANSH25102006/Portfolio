"use client";

import React, { useState, useMemo } from "react";
import { Compass, Calendar, BookOpen, Briefcase, Search, GraduationCap, Users, MapPin } from "lucide-react";

interface TimelineEvent {
  id: string;
  role: string;
  organization: string;
  location: string;
  duration: string;
  category: "experience" | "education" | "leadership";
  description: string;
  achievements: string[];
  icon: React.ReactNode;
  colorClass: string;
}

const events: TimelineEvent[] = [
  {
    id: "sharda",
    role: "B.Tech Computer Science Student",
    organization: "Sharda University",
    location: "Delhi NCR, India",
    duration: "2024 - Present",
    category: "education",
    description: "Pursuing computer science engineering, focusing on core engineering mathematics, systems structures, databases, and software design principles.",
    achievements: [
      "Maintained a strong 7.9 cumulative GPA score throughout CS modules.",
      "Completed rigorous semesters in Data Structures, Database Systems, and Discrete Math.",
      "Created agricultural logistical portals connecting local crop growers with commercial vendors."
    ],
    icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
    colorClass: "from-blue-500/10 to-transparent border-blue-500/20"
  },
  {
    id: "cs50",
    role: "Harvard CS50 Coursework",
    organization: "Harvard University (edX)",
    location: "Remote // Massachusetts",
    duration: "2024",
    category: "education",
    description: "Immersive program in foundational computer science engineering. Rebuilt algorithms in C, optimized relational SQL tables, configured local web servers, and studied Big O space-time complexities.",
    achievements: [
      "Obtained Harvard University edX Honor Certificate.",
      "Completed final projects creating real-time secure web search filters.",
      "Studied low-level memory layout, heap/stack boundaries, pointers and custom data structures."
    ],
    icon: <BookOpen className="w-5 h-5 text-indigo-400" />,
    colorClass: "from-indigo-500/10 to-transparent border-indigo-500/20"
  },
  {
    id: "jpmc",
    role: "Software Engineer Job Simulation",
    organization: "J.P. Morgan Chase & Co. (Forage)",
    location: "Remote Simulation // New York",
    duration: "2025",
    category: "experience",
    description: "Participated in simulated engineering workflows resolving live dashboard client feed charting bugs.",
    achievements: [
      "Set up local development servers compiling high-frequency financial feeds.",
      "Leveraged Perspective UI widgets to map live metrics analytics pipelines.",
      "Optimized React and Python stream links ensuring zero state drops."
    ],
    icon: <Briefcase className="w-5 h-5 text-emerald-400" />,
    colorClass: "from-emerald-500/10 to-transparent border-emerald-500/20"
  },
  {
    id: "club_coord",
    role: "Coding Club Coordinator Node",
    organization: "Sharda University Community",
    location: "Greater Noida, India",
    duration: "2024 - Present",
    category: "leadership",
    description: "Elected as student community technical coordinator to guide and manage core programming labs.",
    achievements: [
      "Mentored 60+ engineering freshmen in basic Python/JavaScript debugging techniques.",
      "Co-managed university-wide coding events and hackathon challenges.",
      "Designed and launched resource index pages keeping fresh materials accessible."
    ],
    icon: <Users className="w-5 h-5 text-purple-400" />,
    colorClass: "from-purple-500/10 to-transparent border-purple-500/20"
  }
];

export default function CareerTimeline() {
  const [activeCategory, setActiveCategory] = useState<"all" | "experience" | "education" | "leadership">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering calculations
  const filtered = useMemo(() => {
    return events.filter((item) => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const matchSearch = 
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.achievements.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="font-mono text-xs text-slate-350 flex flex-col gap-4 select-text h-full min-h-[440px]">
      
      {/* Search Header Options */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-white tracking-wider text-[11px] uppercase">HISTORY_LOGS // EXPLORER</span>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 w-full sm:max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[10px] text-white placeholder-slate-600 font-mono"
            placeholder="Search work logs..."
          />
        </div>
      </div>

      {/* Main Area layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-grow overflow-hidden">
        
        {/* 1. Left Sidebar Filter Tree */}
        <div className="md:col-span-3 border-r border-white/5 pr-3 flex flex-col gap-4">
          <div>
            <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">{"// CATEGORIES"}</span>
            <div className="flex flex-col gap-1">
              {(
                [
                  { id: "all", name: "All Records", count: events.length, icon: <Compass className="w-3.5 h-3.5" /> },
                  { id: "experience", name: "Experience", count: events.filter(e => e.category === "experience").length, icon: <Briefcase className="w-3.5 h-3.5" /> },
                  { id: "education", name: "Education", count: events.filter(e => e.category === "education").length, icon: <GraduationCap className="w-3.5 h-3.5" /> },
                  { id: "leadership", name: "Leadership", count: events.filter(e => e.category === "leadership").length, icon: <Users className="w-3.5 h-3.5" /> }
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

        {/* 2. Main Timeline Stream layout (right 9 columns) */}
        <div className="md:col-span-9 overflow-y-auto pr-1 window-scroll max-h-[380px] flex flex-col gap-4">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`border border-white/5 bg-gradient-to-r rounded-xl p-5 hover:border-blue-500/20 transition-all duration-300 flex flex-col gap-3.5 ${item.colorClass}`}
              >
                {/* Timeline row header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded bg-[#0a0a0a]/90 border border-white/10 text-slate-200 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white leading-tight">{item.role}</h4>
                      <span className="text-[10px] text-slate-400 font-bold mt-0.5 block">{item.organization}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end text-right text-[9px] shrink-0">
                    <div className="flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-0.5 rounded font-bold text-slate-300">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-550 mt-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                {/* Event Summary Description */}
                <p className="text-[11px] text-slate-350 leading-relaxed font-sans bg-black/10 p-3 rounded border border-white/5">
                  {item.description}
                </p>

                {/* Key Bullet Accomplishments */}
                <div className="flex flex-col gap-1.5 pl-2 border-l border-blue-500/20">
                  <span className="text-[8px] text-slate-500 uppercase tracking-wider font-extrabold mb-1 block">Key Accomplishments:</span>
                  {item.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[10px] leading-relaxed text-slate-400">
                      <span className="text-blue-400 mt-1 select-none font-bold">›</span>
                      <p className="font-sans">{ach}</p>
                    </div>
                  ))}
                </div>

              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500">No events matched filters.</div>
          )}
        </div>

      </div>

    </div>
  );
}
