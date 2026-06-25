"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { RefreshCw, BarChart2, Calendar } from "lucide-react";

interface SolvedBreakdown {
  all: number;
  easy: number;
  medium: number;
  hard: number;
  totalQuestions: number;
}

interface ContestRanking {
  rating: number;
  globalRanking: number;
  topPercentage: number;
  attendedContestsCount: number;
  badge: string;
}

interface Badge {
  name: string;
  icon: string;
}

interface LeetCodeData {
  username: string;
  solved: SolvedBreakdown;
  contest: ContestRanking;
  badges: Badge[];
  submissionCalendar: Record<string, number>;
}

export default function LeetCodeShowcase() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeetCodeData = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/leetcode?username=ansh_25");
      if (!res.ok) throw new Error("Fetch failed");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error loading LeetCode data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeetCodeData();
  }, []);

  // Compute a list of dates for the LeetCode calendar (past 18 weeks)
  const heatmapData = useMemo(() => {
    if (!data) return [];
    const days: { date: string; count: number; level: number }[] = [];
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - 7 * 18); // Past 18 weeks

    const dateIter = new Date(startDate);
    while (dateIter <= now) {
      const dateStr = dateIter.toISOString().split("T")[0];
      const unixTime = Math.floor(new Date(dateStr).getTime() / 1000);
      
      let count = 0;
      Object.entries(data.submissionCalendar).forEach(([ts, val]) => {
        const itemTs = parseInt(ts);
        const dayDiff = Math.abs(itemTs - unixTime);
        if (dayDiff < 43200) { // Same day within 12h
          count += val;
        }
      });

      let level = 0;
      if (count > 0) {
        if (count <= 1) level = 1;
        else if (count <= 2) level = 2;
        else if (count <= 4) level = 3;
        else level = 4;
      }

      days.push({ date: dateStr, count, level });
      dateIter.setDate(dateIter.getDate() + 1);
    }
    return days;
  }, [data]);

  // Group heatmap cells by column (weeks of 7 days)
  const heatmapColumns = useMemo(() => {
    if (heatmapData.length === 0) return [];
    const cols: typeof heatmapData[] = [];
    
    const startPadding = new Date(heatmapData[0].date).getDay();
    const padded = [...Array(startPadding).fill(null), ...heatmapData];
    
    while (padded.length % 7 !== 0) {
      padded.push(null);
    }
    
    for (let i = 0; i < padded.length; i += 7) {
      cols.push(padded.slice(i, i + 7));
    }
    return cols;
  }, [heatmapData]);

  const totalQuestions = data?.solved?.totalQuestions || 3200;
  const solvedCount = data?.solved?.all || 268;

  const getCellColor = (level: number) => {
    switch (level) {
      case 1: return "bg-purple-500/20 border-purple-500/15";
      case 2: return "bg-purple-500/40 border-purple-500/30";
      case 3: return "bg-purple-500/70 border-purple-500/50";
      case 4: return "bg-purple-500 border-purple-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]";
      default: return "bg-white/[0.02] border-white/[0.04]";
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 font-mono text-xs select-none">
        <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        FETCHING ALGORITHMIC TELEMETRY...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-10 text-center text-slate-500 font-mono text-xs select-none border border-white/5 rounded-2xl bg-white/[0.01]">
        UNABLE TO LOAD ALGORITHMIC TELEMETRY LOGS.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 select-none font-mono">
      {/* Header controls */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5 text-slate-350 select-none">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4.5 h-4.5 text-purple-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]" />
          <span className="font-extrabold uppercase text-[10px] tracking-wider text-slate-200">
            LeetCode Metrics Registry
          </span>
        </div>
        <button
          onClick={fetchLeetCodeData}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 text-[9px] hover:bg-white/[0.08] hover:text-purple-400 font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin text-purple-500" : ""}`} />
          Refresh Stats
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Progress circle */}
        <div className="md:col-span-4 bg-white/[0.01] border border-white/[0.05] rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent pointer-events-none" />
          
          <div className="relative w-36 h-36 flex items-center justify-center mb-5">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle
                cx="72"
                cy="72"
                r="60"
                fill="transparent"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="10"
              />
              <motion.circle
                cx="72"
                cy="72"
                r="60"
                fill="transparent"
                stroke="#8b5cf6"
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 60}
                initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - solvedCount / totalQuestions) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 10px rgba(139,92,246,0.35))" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{solvedCount}</span>
              <span className="text-[8px] text-slate-500 font-bold tracking-widest mt-0.5">SOLVED</span>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3">
            {/* Easy */}
            <div className="flex flex-col gap-1 text-[9px] font-bold">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-emerald-400">Easy</span>
                <span className="text-slate-300">{data?.solved.easy} <span className="text-slate-600">/ 800</span></span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(data?.solved.easy || 0) / 800 * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>

            {/* Medium */}
            <div className="flex flex-col gap-1 text-[9px] font-bold">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-purple-450 text-indigo-400">Medium</span>
                <span className="text-slate-300">{data?.solved.medium} <span className="text-slate-600">/ 1600</span></span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(data?.solved.medium || 0) / 1600 * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-purple-500 rounded-full"
                />
              </div>
            </div>

            {/* Hard */}
            <div className="flex flex-col gap-1 text-[9px] font-bold">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-rose-500">Hard</span>
                <span className="text-slate-300">{data?.solved.hard} <span className="text-slate-600">/ 800</span></span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(data?.solved.hard || 0) / 800 * 100}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-rose-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stats Heatmap */}
        <div className="md:col-span-8 flex flex-col gap-5 justify-between">
          
          {/* Contest info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/[0.02] to-transparent pointer-events-none" />

            <div className="flex flex-col gap-1 bg-black/20 border border-white/[0.03] p-3.5 rounded-xl">
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Contest Rating</span>
              <span className="text-xl font-black text-purple-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.25)]">
                {data?.contest.rating}
              </span>
            </div>

            <div className="flex flex-col gap-1 bg-black/20 border border-white/[0.03] p-3.5 rounded-xl">
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Global Ranking</span>
              <span className="text-lg font-black text-white">
                #{data?.contest.globalRanking.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col gap-1 bg-black/20 border border-white/[0.03] p-3.5 rounded-xl">
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Top Percentage</span>
              <span className="text-lg font-black text-blue-400">
                Top {data?.contest.topPercentage}%
              </span>
            </div>

            <div className="flex flex-col gap-1 bg-black/20 border border-white/[0.03] p-3.5 rounded-xl">
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Contests Logged</span>
              <span className="text-lg font-black text-white">
                {data?.contest.attendedContestsCount}
              </span>
            </div>
          </div>

          {/* Activity Calendar Heatmap */}
          <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl flex flex-col gap-3 justify-center">
            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 border-b border-white/[0.03] pb-2">
              <Calendar className="w-3.5 h-3.5 text-purple-450 text-purple-400" />
              <span>SUBMISSION HEATMAP (PAST 18 WEEKS)</span>
            </div>
            
            <div className="flex gap-2">
              <div className="flex flex-col justify-between py-0.5 text-[7px] text-slate-600 font-extrabold w-4 select-none">
                <span>S</span>
                <span>T</span>
                <span>T</span>
                <span>S</span>
              </div>

              <div className="overflow-x-auto w-full pb-1 window-scroll">
                <div className="flex gap-[3px] min-w-[340px] h-[55px]">
                  {heatmapColumns.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-[3px] flex-1">
                      {col.map((cell, rowIdx) => {
                        if (!cell) {
                          return <div key={rowIdx} className="aspect-square rounded-[2px] bg-transparent flex-1" />;
                        }
                        return (
                          <div
                            key={rowIdx}
                            title={`${cell.count} submits on ${cell.date}`}
                            className={`aspect-square rounded-[2px] border transition-all duration-300 ${getCellColor(cell.level)}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[8px] text-slate-650 font-bold uppercase tracking-wider select-none mt-1">
              <span>Less</span>
              <div className="flex gap-1 items-center">
                <div className="w-[8px] h-[8px] rounded-[1px] bg-white/[0.02] border border-white/[0.04]" />
                <div className="w-[8px] h-[8px] rounded-[1px] bg-purple-500/20 border border-purple-500/15" />
                <div className="w-[8px] h-[8px] rounded-[1px] bg-purple-500/40 border border-purple-500/30" />
                <div className="w-[8px] h-[8px] rounded-[1px] bg-purple-500/70 border border-purple-500/50" />
                <div className="w-[8px] h-[8px] rounded-[1px] bg-purple-500 border border-purple-400 shadow-[0_0_4px_rgba(139,92,246,0.5)]" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Badges */}
          {data && data.badges.length > 0 && (
            <div className="bg-white/[0.01] border border-white/[0.05] p-4.5 rounded-2xl flex flex-col gap-3">
              <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block border-b border-white/[0.03] pb-2">
                {"// LEETCODE BADGES"}
              </span>
              <div className="flex flex-wrap gap-4 items-center">
                {data.badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/[0.04] bg-[#030510]/60 hover:border-purple-500/30 transition-all duration-300 select-none group"
                    title={badge.name}
                  >
                    <img
                      src={badge.icon}
                      alt={badge.name}
                      className="w-7 h-7 object-contain drop-shadow-[0_0_4px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform"
                    />
                    <span className="text-[9.5px] font-extrabold text-slate-350 select-text font-mono truncate max-w-[120px]">
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
