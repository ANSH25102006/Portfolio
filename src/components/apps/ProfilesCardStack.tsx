"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers3, RefreshCw, ExternalLink, ShieldCheck, Award, MessageCircle, Terminal } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/icons";

interface ProfileCard {
  id: string;
  title: string;
  sub: string;
  username: string;
  url: string;
  avatar: string;
  stats: string;
  verified: boolean;
  colorClass: string;
  icon: React.ReactNode;
}

export default function ProfilesCardStack() {
  const [cards, setCards] = useState<ProfileCard[]>([
    {
      id: "github",
      title: "GITHUB SECURE LOG",
      sub: "CODE_REPOSITORY_GATEWAY",
      username: "@ANSH25102006",
      url: "https://github.com/ANSH25102006",
      avatar: "https://github.com/ANSH25102006.png",
      stats: "300+ Commits // 18+ Public Repos",
      verified: true,
      colorClass: "from-slate-900 via-slate-800 to-slate-950 border-slate-700 shadow-slate-950/50",
      icon: <Github className="w-6 h-6 text-blue-400" />
    },
    {
      id: "linkedin",
      title: "LINKEDIN PROFILE",
      sub: "PROFESSIONAL_CONNECTION_GATE",
      username: "ansh-pandey251",
      url: "https://www.linkedin.com/in/ansh-pandey251",
      avatar: "https://github.com/ANSH25102006.png",
      stats: "500+ Nodes Connected // Delhi NCR",
      verified: true,
      colorClass: "from-blue-950 via-slate-900 to-blue-900 border-blue-800 shadow-blue-950/50",
      icon: <Linkedin className="w-6 h-6 text-cyan-400" />
    },
    {
      id: "leetcode",
      title: "LEETCODE ALGO DATA",
      sub: "COMPUTATIONAL_METRICS_LOG",
      username: "ansh_25",
      url: "https://leetcode.com",
      avatar: "https://github.com/ANSH25102006.png",
      stats: "250+ Solved // Top 15% Rank",
      verified: true,
      colorClass: "from-amber-950 via-slate-900 to-amber-900 border-amber-800 shadow-amber-950/50",
      icon: <Award className="w-6 h-6 text-amber-500" />
    },
    {
      id: "hackerrank",
      title: "HACKERRANK CERT",
      sub: "PROBLEM_SOLVING_RECORD",
      username: "anshpandey",
      url: "https://hackerrank.com",
      avatar: "https://github.com/ANSH25102006.png",
      stats: "5 Stars // Problem Solving Skill",
      verified: true,
      colorClass: "from-emerald-950 via-slate-900 to-emerald-900 border-emerald-800 shadow-emerald-950/50",
      icon: <Terminal className="w-6 h-6 text-emerald-400" />
    },
    {
      id: "instagram",
      title: "INSTAGRAM INDEX",
      sub: "SOCIAL_TIMELINE_FEED",
      username: "@ansh_pandey",
      url: "https://instagram.com",
      avatar: "https://github.com/ANSH25102006.png",
      stats: "400+ Follower Node logs",
      verified: false,
      colorClass: "from-pink-950 via-slate-900 to-pink-900 border-pink-800 shadow-pink-950/50",
      icon: <Instagram className="w-6 h-6 text-pink-400" />
    },
    {
      id: "twitter",
      title: "X TWITTER STREAM",
      sub: "MICRO_ANNOUNCEMENTS_LOG",
      username: "@ansh_pandey",
      url: "https://twitter.com",
      avatar: "https://github.com/ANSH25102006.png",
      stats: "120+ Active Network Listeners",
      verified: false,
      colorClass: "from-slate-950 via-zinc-900 to-zinc-950 border-zinc-800 shadow-zinc-950/50",
      icon: <MessageCircle className="w-6 h-6 text-slate-300" />
    }
  ]);

  const handleCycle = () => {
    setCards((prev) => {
      const copy = [...prev];
      const front = copy.shift();
      if (front) copy.push(front);
      return copy;
    });
  };

  return (
    <div className="font-mono text-xs text-slate-300 flex flex-col gap-4 select-none h-full min-h-[440px] justify-between relative overflow-hidden">
      
      {/* Top Header Controls */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5 shrink-0">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400 flex items-center gap-2">
          <Layers3 className="w-5 h-5" />
          PUBLIC_PROFILES_STACK
        </h3>
        <button
          onClick={handleCycle}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[9px] font-bold text-slate-350 cursor-pointer uppercase transition-all"
        >
          <RefreshCw className="w-3 h-3 text-cyan-400" />
          Cycle Deck
        </button>
      </div>

      {/* Stack Container */}
      <div className="flex-grow flex flex-col items-center justify-center relative min-h-[290px] pt-4">
        
        {/* Overlapping 3D keycard items */}
        <div className="relative w-64 h-[200px]">
          {cards.map((card, idx) => {
            const isFront = idx === 0;
            const offset = (cards.length - 1 - idx) * 9;
            const scale = 1 - (cards.length - 1 - idx) * 0.04;
            const rotate = (cards.length - 1 - idx) * -3;

            return (
              <motion.div
                key={card.id}
                style={{
                  zIndex: idx,
                  transformOrigin: "bottom center"
                }}
                animate={{
                  y: isFront ? 0 : -offset,
                  scale: isFront ? 1 : scale,
                  rotate: isFront ? 0 : rotate,
                }}
                whileHover={isFront ? { scale: 1.05, y: -8 } : undefined}
                transition={{ duration: 0.4, type: "spring", stiffness: 350, damping: 22 }}
                onClick={() => {
                  if (!isFront) {
                    setCards((prev) => {
                      const pos = prev.findIndex(c => c.id === card.id);
                      const frontSlice = prev.slice(pos);
                      const backSlice = prev.slice(0, pos);
                      return [...frontSlice, ...backSlice];
                    });
                  }
                }}
                className={`absolute inset-0 rounded-2xl border p-4.5 flex flex-col justify-between bg-gradient-to-br ${card.colorClass} shadow-2xl transition-all duration-300 ${
                  isFront ? "cursor-grab active:cursor-grabbing border-white/20 active:border-cyan-400/50" : "cursor-pointer hover:brightness-110"
                }`}
                drag={isFront ? "x" : false}
                dragConstraints={{ left: -120, right: 120 }}
                onDragEnd={(event, info) => {
                  if (Math.abs(info.offset.x) > 65) {
                    handleCycle();
                  }
                }}
              >
                {/* Security Pass Card Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <img 
                      src={card.avatar} 
                      alt={card.username} 
                      className="w-8 h-8 rounded-full border border-white/10 bg-black object-cover"
                    />
                    <div>
                      <span className="text-[9px] text-white font-extrabold tracking-wide block">{card.title}</span>
                      <span className="text-[7.5px] text-slate-400 block leading-tight">{card.sub}</span>
                    </div>
                  </div>
                  <div className="p-1 rounded bg-white/5 border border-white/10 shrink-0">
                    {card.icon}
                  </div>
                </div>

                {/* Details Metrics */}
                <div className="py-2.5 my-1.5 border-t border-b border-white/5 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">USERNAME:</span>
                    <span className="text-slate-200 font-bold">{card.username}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">STAT_LOGS:</span>
                    <span className="text-cyan-400 font-bold truncate max-w-[130px]">{card.stats}</span>
                  </div>
                </div>

                {/* Footer specs & connect button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[8px]">
                    {card.verified ? (
                      <>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-bold uppercase">VERIFIED</span>
                      </>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500 block animate-pulse" />
                        <span className="text-slate-500 uppercase">INTERNAL</span>
                      </>
                    )}
                  </div>

                  {isFront && (
                    <a
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-blue-600 hover:text-white border border-white/10 text-[8px] font-bold text-slate-200 transition-all cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      CONNECT
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>

                {/* Barcode line decorations */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-12 flex gap-[1.5px] opacity-15 pointer-events-none">
                  <div className="w-[1px] h-full bg-white" />
                  <div className="w-[2px] h-full bg-white" />
                  <div className="w-[1px] h-full bg-white" />
                  <div className="w-[3px] h-full bg-white" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      <div className="text-[9px] text-slate-500 text-center font-sans mt-3">
        * Swipe card right/left or click stack layers to cycle social credentials
      </div>

    </div>
  );
}
