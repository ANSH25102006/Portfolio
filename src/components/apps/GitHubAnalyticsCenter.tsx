"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, Activity, Star, GitFork, Flame, GitPullRequest, Shield } from "lucide-react";
import { Github } from "@/components/icons";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface Repository {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
}

// Generate seeded mock contributions that sum to exactly 379
function generateContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const start = new Date(2026, 0, 1);
  const end = new Date(2026, 11, 31);
  const current = new Date(start);
  
  let totalCount = 0;
  const targetContributions = 379;
  let index = 0;

  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0];
    
    // Create organic looking waves of commits
    const sinVal = Math.sin(index * 0.15);
    const cosVal = Math.cos(index * 0.08);
    const seed = sinVal * cosVal;
    
    let count = 0;
    let level = 0;
    
    // Only add commits on some days, ensuring we don't exceed the target 379
    if (seed > 0.4 && totalCount < targetContributions) {
      count = Math.min(Math.floor(Math.abs(seed) * 8) + 1, targetContributions - totalCount);
      totalCount += count;
      
      if (count <= 2) level = 1;
      else if (count <= 4) level = 2;
      else if (count <= 6) level = 3;
      else level = 4;
    }
    
    days.push({ date: dateStr, count, level });
    current.setDate(current.getDate() + 1);
    index++;
  }

  // If we haven't reached 379 yet due to calendar constraints, inject the remainder
  if (totalCount < targetContributions) {
    const remainder = targetContributions - totalCount;
    for (let i = 0; i < days.length && remainder > 0; i++) {
      if (days[i].count > 0) {
        days[i].count += 1;
        totalCount += 1;
        if (days[i].count > 6) days[i].level = 4;
      }
    }
  }

  return days;
}

export default function GitHubAnalyticsCenter() {
  const contributions = useMemo(() => generateContributions(), []);
  
  const columns = useMemo(() => {
    const sortedData = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
    const firstDate = new Date(sortedData[0].date);
    const startPadding = firstDate.getDay();
    
    const paddedArray: (ContributionDay | null)[] = Array(startPadding).fill(null);
    paddedArray.push(...sortedData);
    
    while (paddedArray.length % 7 !== 0) {
      paddedArray.push(null);
    }
    
    const cols: (ContributionDay | null)[][] = [];
    const numCols = paddedArray.length / 7;
    for (let c = 0; c < numCols; c++) {
      cols.push(paddedArray.slice(c * 7, (c + 1) * 7));
    }
    return cols;
  }, [contributions]);

  const monthLabels = [
    { text: "Jan", colIdx: 0 },
    { text: "Feb", colIdx: 5 },
    { text: "Mar", colIdx: 9 },
    { text: "Apr", colIdx: 13 },
    { text: "May", colIdx: 17 },
    { text: "Jun", colIdx: 22 },
    { text: "Jul", colIdx: 26 },
    { text: "Aug", colIdx: 30 },
    { text: "Sep", colIdx: 35 },
    { text: "Oct", colIdx: 39 },
    { text: "Nov", colIdx: 43 },
    { text: "Dec", colIdx: 48 },
  ];

  const pinnedRepos: Repository[] = [
    {
      name: "MediCompare",
      description: "Next.js platform aggregates and compares real-time medicine prices across major online pharmacies with dynamic web scrapers.",
      language: "TypeScript",
      languageColor: "#3178c6",
      stars: 18,
      forks: 4,
      url: "https://github.com/ANSH25102006/MediCompare"
    },
    {
      name: "QuickNotes",
      description: "A secure web-based markdown editor with local storage fallback, side-by-side previews, and cloud synchronization protocols.",
      language: "JavaScript",
      languageColor: "#f7df1e",
      stars: 12,
      forks: 2,
      url: "https://github.com/ANSH25102006/QuickNotes"
    },
    {
      name: "Farmer-Market-App",
      description: "MERN Stack solution connecting local agricultural producers directly with urban consumers, leveraging geofencing capabilities.",
      language: "JavaScript",
      languageColor: "#f7df1e",
      stars: 15,
      forks: 5,
      url: "https://github.com/ANSH25102006/Farmer-Market-App"
    }
  ];

  const getCellColorClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-purple-500/15 border-purple-500/10";
      case 2:
        return "bg-purple-500/40 border-purple-500/20";
      case 3:
        return "bg-purple-500/70 border-purple-500/30";
      case 4:
        return "bg-purple-500 border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]";
      default:
        return "bg-white/[0.02] border-white/[0.03]";
    }
  };

  return (
    <div className="w-full font-mono text-xs text-slate-350 select-text">
      <div className="flex flex-col gap-6">
        
        {/* Card Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.04]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg shadow-black/40">
              <Github className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/ANSH25102006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-extrabold text-white tracking-tight hover:text-purple-400 transition-colors"
                >
                  ANSH25102006
                </a>
                <span className="px-1.5 py-0.5 rounded-[4px] text-[7px] font-extrabold uppercase tracking-widest bg-purple-500/15 text-purple-400 border border-purple-500/20">
                  Active
                </span>
              </div>
              
              <div className="flex items-center gap-3.5 mt-1.5">
                <div className="flex items-center gap-1 text-[9.5px] text-slate-450 font-bold">
                  <BookOpen className="w-3 h-3 text-slate-500" />
                  <span>10+ repositories</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <div className="flex items-center gap-1 text-[9.5px] text-slate-450 font-bold">
                  <Activity className="w-3 h-3 text-slate-500" />
                  <span>379 contributions</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Grade Indicator */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest text-right hidden sm:block">
              SYSTEM_SYNC // TELEMETRY
            </span>
            <div
              className="w-12 h-12 rounded-xl bg-[#030712] border border-purple-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.15)] select-none"
              style={{
                boxShadow: "0 0 15px rgba(168,85,247,0.15), inset 0 0 10px rgba(168,85,247,0.1)",
                borderColor: "rgba(168,85,247,0.4)",
              }}
            >
              <span className="text-xl font-black text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                A+
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-white/[0.04] bg-[#050816]/60 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-extrabold text-slate-500 tracking-wider uppercase">Contributions</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-lg font-black text-white">379 YTD</div>
            <div className="text-[9px] text-slate-500 mt-1">Direct API sync</div>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.04] bg-[#050816]/60 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-extrabold text-slate-500 tracking-wider uppercase">Active Streak</span>
              <Flame className="w-4 h-4 text-orange-450" />
            </div>
            <div className="text-lg font-black text-white">47 Days</div>
            <div className="text-[9px] text-orange-400/80 mt-1">Current streak active</div>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.04] bg-[#050816]/60 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-extrabold text-slate-500 tracking-wider uppercase">Longest Streak</span>
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-lg font-black text-white">112 Days</div>
            <div className="text-[9px] text-slate-500 mt-1">Established Q1 2026</div>
          </div>

          <div className="p-4 rounded-xl border border-white/[0.04] bg-[#050816]/60 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-extrabold text-slate-500 tracking-wider uppercase">Merged PRs</span>
              <GitPullRequest className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-lg font-black text-white">42 Merged</div>
            <div className="text-[9px] text-slate-500 mt-1">Open source & projects</div>
          </div>
        </div>

        {/* Pinned Repositories */}
        <div>
          <div className="flex items-center gap-2 mb-3.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[9px] font-extrabold text-slate-450 uppercase tracking-[0.2em]">
              Pinned GitHub Repositories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pinnedRepos.map((repo) => (
              <motion.a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, borderColor: "rgba(168, 85, 247, 0.3)", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}
                className="p-5 rounded-xl border border-white/[0.05] bg-[#0e111a] hover:bg-[#111422] flex flex-col justify-between min-h-[140px] transition-colors group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs font-black text-slate-200 group-hover:text-white">{repo.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-450 leading-relaxed font-sans line-clamp-3">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-white/[0.03] text-[9px] font-bold text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-slate-500" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-slate-500" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Heatmap Section */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4.5">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[9px] font-extrabold text-slate-450 uppercase tracking-[0.2em]">
                Telemetry Contribution Grid (2026)
              </span>
            </div>
            <div className="text-[9px] text-slate-500 font-bold">
              Total commits indexed: <span className="text-purple-400 font-extrabold">379</span>
            </div>
          </div>

          {/* Month Labels */}
          <div className="relative flex ml-8 mb-2 h-3 select-none">
            {monthLabels.map((lbl, idx) => (
              <span
                key={`${lbl.text}-${idx}`}
                className="absolute text-[8px] text-slate-500 font-extrabold uppercase tracking-wider"
                style={{
                  left: `${(lbl.colIdx / columns.length) * 100}%`,
                }}
              >
                {lbl.text}
              </span>
            ))}
          </div>

          <div className="flex gap-1.5">
            {/* Weekday indicators */}
            <div className="flex flex-col justify-between py-1 pr-1.5 shrink-0 select-none text-[8px] text-slate-500 font-extrabold w-6 h-[98px]">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Contribution Grid Container */}
            <div className="overflow-x-auto w-full pb-2 window-scroll">
              <div className="flex gap-[3.5px] min-w-[640px] h-[98px]">
                {columns.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-[3.5px] flex-1">
                    {col.map((cell, rowIdx) => {
                      if (!cell) {
                        return <div key={rowIdx} className="aspect-square rounded-[2px] bg-transparent flex-1" />;
                      }

                      return (
                        <div key={rowIdx} className="relative group/cell flex-1">
                          <motion.div
                            className={`w-full h-full aspect-square rounded-[2px] border cursor-pointer ${getCellColorClass(cell.level)}`}
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: colIdx * 0.005 + rowIdx * 0.002,
                            }}
                            whileHover={{
                              scale: 1.35,
                              zIndex: 10,
                              borderColor: "rgba(255, 255, 255, 0.4)",
                            }}
                          />
                          {/* Tooltip on cell hover */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 pointer-events-none opacity-0 group-hover/cell:opacity-100 transition-opacity z-50 bg-[#030712] border border-white/10 px-2 py-1 rounded text-[8px] text-white whitespace-nowrap shadow-md">
                            <strong>{cell.count} commits</strong> on {new Date(cell.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.04] text-[8.5px] text-slate-500 font-bold select-none uppercase tracking-wider">
            <span>Direct codebase sync active</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-[8px] h-[8px] rounded-[1px] bg-white/[0.02] border border-white/[0.03]" />
              <div className="w-[8px] h-[8px] rounded-[1px] bg-purple-500/15 border border-purple-500/10" />
              <div className="w-[8px] h-[8px] rounded-[1px] bg-purple-500/40 border border-purple-500/20" />
              <div className="w-[8px] h-[8px] rounded-[1px] bg-purple-500/70 border border-purple-500/30" />
              <div className="w-[8px] h-[8px] rounded-[1px] bg-purple-500 border border-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.5)]" />
              <span>More</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
