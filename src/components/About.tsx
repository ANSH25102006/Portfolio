"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Trophy, Code2, Library } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      label: "LeetCode Solved",
      value: "100+",
      subtext: "Data structures & algos",
      icon: <Code2 className="w-5 h-5 text-purple-400" />,
      accent: "from-purple-500/10 to-indigo-500/10",
      border: "hover:border-purple-500/30",
    },
    {
      label: "Projects Built",
      value: "10+",
      subtext: "Full stack & automation",
      icon: <Library className="w-5 h-5 text-blue-400" />,
      accent: "from-blue-500/10 to-cyan-500/10",
      border: "hover:border-blue-500/30",
    },
    {
      label: "Certifications",
      value: "3+",
      subtext: "Harvard & industry credentials",
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
      accent: "from-amber-500/10 to-orange-500/10",
      border: "hover:border-amber-500/30",
    },
    {
      label: "CS Graduate",
      value: "2027",
      subtext: "B.Tech Computer Science Major",
      icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
      accent: "from-emerald-500/10 to-teal-500/10",
      border: "hover:border-emerald-500/30",
    },
  ];

  return (
    <div ref={ref} className="relative w-full">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[18vw] font-black text-white/[0.01] uppercase tracking-widest leading-none select-none">
          ABOUT ME
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Profile Frame */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col items-center justify-center"
        >
          {/* Avatar Picture with custom purple-blue glowing border layout */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 select-none">
            {/* Glowing borders */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-blue-500 to-transparent rounded-3xl p-[1.5px] shadow-[0_15px_50px_rgba(139,92,246,0.15)] group">
              <div className="w-full h-full bg-[#070a1a] rounded-3xl overflow-hidden p-2">
                <Image
                  src="/images/profile.jpg"
                  alt="Ansh Pandey profile image"
                  width={340}
                  height={340}
                  className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            
            {/* Hologram decoration rings */}
            <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-purple-500/40 rounded-tr-xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-blue-500/40 rounded-bl-xl pointer-events-none" />
          </div>

          {/* Academic milestone text node */}
          <div className="mt-8 flex items-center gap-3 px-4 py-2 bg-purple-950/20 border border-purple-500/10 rounded-xl max-w-sm text-center">
            <GraduationCap className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-[10px] font-mono text-purple-300 font-semibold tracking-wide">
              Sharda University Major &bull; CGPA 7.9
            </span>
          </div>
        </motion.div>

        {/* Right Column: Narrative Story & Statistics grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="lg:col-span-7 flex flex-col text-left"
        >
          {/* Lowercase identifier label */}
          <div className="flex items-center gap-3 mb-4 select-none">
            <span className="font-mono text-[9px] tracking-[0.35em] text-purple-500 font-extrabold uppercase">
              {"// about me"}
            </span>
            <div className="h-px flex-grow max-w-xs bg-gradient-to-r from-purple-500/40 to-transparent" />
          </div>

          {/* Core statement */}
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6 font-sans">
            I don&apos;t just compile code, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.25)]">
              I create digital impact.
            </span>
          </h2>

          {/* Description biography */}
          <div className="text-base md:text-lg text-slate-350 leading-relaxed font-sans flex flex-col gap-4 mb-8">
            <p>
              I am a Computer Science engineering student deeply passionate about **Full Stack Development (MERN Stack)**, advanced problem-solving, open-source architectures, and building scalable software solutions.
            </p>
            <p>
              My path focuses on building high-performance server structures, type-safe robust frontends, and optimizing database layers. By blending mathematical clarity with dynamic frontend experiences, I build tools that are solid under the hood and gorgeous to interact with.
            </p>
          </div>

          {/* Statistics grid (4 custom cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`p-5 rounded-2xl border border-white/[0.04] bg-gradient-to-br ${stat.accent} transition-all duration-300 ${stat.border} hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 group-hover:scale-105 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <span className="font-mono text-[8px] text-slate-600 uppercase tracking-widest select-none">
                    CELL_0{idx + 1}
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-black text-white leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-350 tracking-wide uppercase mb-1">
                  {stat.label}
                </div>
                <div className="text-[9.5px] text-slate-500 font-sans leading-tight">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </div>
  );
}
