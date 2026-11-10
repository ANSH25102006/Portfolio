"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

export interface TechStone {
  name: string;
  badgeName: string;
  category: string;
  color: string;
  glow: string;
  logoSvg: React.ReactNode;
}

export interface TechStoneCardProps {
  tech: TechStone;
  idx: number;
}

export function TechStoneCard({ tech, idx }: TechStoneCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const randomDuration = 5 + (idx % 3) * 0.7;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -6, 
        rotate: 1.5, 
        scale: 1.05 
      }}
      animate={{
        y: [0, 4, 0],
      }}
      transition={{
        y: {
          duration: randomDuration,
          repeat: Infinity,
          ease: "easeInOut",
        },
        duration: 0.3,
      }}
      className="relative p-4 bg-[#0a0d1d]/45 hover:bg-[#0f142c]/65 border border-white/[0.04] hover:border-purple-500/35 rounded-2xl flex flex-col items-center justify-center gap-3 group transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_30px_rgba(139,92,246,0.15)] select-none cursor-pointer"
      style={{ perspective: 1000 }}
    >
      {/* 3D Low-Poly Gemstone Visual */}
      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-all duration-500"
          style={{
            filter: isHovered
              ? `drop-shadow(0 0 18px ${tech.glow})`
              : "drop-shadow(0 4px 10px rgba(0,0,0,0.45))",
          }}
        >
          <defs>
            <linearGradient id={`gradHighlight-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f3f4f6" />
            </linearGradient>
            <linearGradient id={`gradLight-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f9fafb" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
            <linearGradient id={`gradMid-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#d1d5db" />
            </linearGradient>
            <linearGradient id={`gradDark-${idx}`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d1d5db" />
              <stop offset="100%" stopColor="#9ca3af" />
            </linearGradient>
            <linearGradient id={`gradDeep-${idx}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
            <filter id={`badgeShadow-${idx}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Facets */}
          <polygon points="72,50 95,50 89,72.5" fill={`url(#gradMid-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="72,50 89,72.5 61,69" fill={`url(#gradMid-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="61,69 89,72.5 72.5,89" fill={`url(#gradDark-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="61,69 72.5,89 50,95" fill={`url(#gradDark-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="61,69 50,95 39,69" fill={`url(#gradDeep-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="39,69 50,95 27.5,89" fill={`url(#gradDeep-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="39,69 27.5,89 11,72.5" fill={`url(#gradDark-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="39,69 11,72.5 28,50" fill={`url(#gradMid-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="28,50 11,72.5 5,50" fill={`url(#gradMid-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="28,50 5,50 11,27.5" fill={`url(#gradLight-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="28,50 11,27.5 39,31" fill={`url(#gradLight-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="39,31 11,27.5 27.5,11" fill={`url(#gradHighlight-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="39,31 27.5,11 50,5" fill={`url(#gradHighlight-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="39,31 50,5 61,31" fill={`url(#gradHighlight-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="61,31 50,5 72.5,11" fill={`url(#gradHighlight-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="61,31 72.5,11 89,27.5" fill={`url(#gradHighlight-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="61,31 89,27.5 72,50" fill={`url(#gradLight-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />
          <polygon points="72,50 89,27.5 95,50" fill={`url(#gradLight-${idx})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.35" />

          {/* Central Circular Badge */}
          <circle cx="50" cy="50" r="21" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" filter={`url(#badgeShadow-${idx})`} />
        </svg>

        {/* Floating Technology Logo (projected slightly in front) */}
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          style={{
            transform: "translateZ(15px)",
            transformStyle: "preserve-3d",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="w-[32%] h-[32%]"
          >
            {tech.logoSvg}
          </svg>
        </div>

        {/* Reflection Shine overlay */}
        <div
          className={`absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            clipPath: "polygon(50% 6%, 72% 12%, 88% 27%, 94% 50%, 88% 73%, 72% 88%, 50% 94%, 28% 88%, 12% 73%, 6% 50%, 12% 27%, 28% 12%)",
          }}
        />
      </div>

      {/* Technology Labels */}
      <div className="flex flex-col items-center text-center mt-2 gap-0.5">
        <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-extrabold group-hover:text-purple-400/75 transition-colors">
          {tech.badgeName}
        </span>
        <span className="font-sans text-[13px] md:text-[14px] font-black text-white group-hover:text-purple-300 transition-colors">
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
}

const ThreeTechOrbit = dynamic(
  () => import("./ThreeTechOrbit"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] sm:h-[550px] md:h-[650px] flex items-center justify-center bg-black/10 rounded-3xl border border-white/[0.03]">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border border-purple-500/10" />
          <div className="absolute inset-0 rounded-full border-t border-purple-500 animate-spin" />
        </div>
      </div>
    ),
  }
);

export default function TechOrbit() {
  const [viewMode, setViewMode] = useState<"orbit" | "grid">("orbit");
  const technologies: TechStone[] = [
    {
      name: "HTML5",
      badgeName: "HTML5 Stone",
      category: "Frontend",
      color: "#e34c26",
      glow: "rgba(227,76,38,0.2)",
      logoSvg: (
        <g transform="translate(25, 23) scale(0.5)">
          <path d="M12,6 L88,6 L80.8,78.2 L50,86.8 L19.2,78.2 Z" fill="#e44d26"/>
          <path d="M50,6 L88,6 L80.8,78.2 L50,86.8 Z" fill="#f16529"/>
          <path d="M50,25.6 L26.2,25.6 L28.4,47.2 L50,47.2 Z" fill="#ebebeb"/>
          <path d="M50,67.6 L50,56.8 L42.8,54.8 L42.4,49.8 L28.6,49.8 L29.6,60.8 Z" fill="#ebebeb"/>
          <path d="M50,25.6 L50,47.2 L71.6,47.2 L69.4,69 L50,74.4 L50,85 L78.4,77 Z" fill="#ffffff"/>
          <path d="M50,47.2 L50,36.4 L69.4,36.4 L68.8,47.2 Z" fill="#ffffff"/>
        </g>
      ),
    },
    {
      name: "CSS3",
      badgeName: "CSS3 Stone",
      category: "Frontend",
      color: "#264de4",
      glow: "rgba(38,77,228,0.2)",
      logoSvg: (
        <g transform="translate(25, 23) scale(0.5)">
          <path d="M12,6 L88,6 L80.8,78.2 L50,86.8 L19.2,78.2 Z" fill="#264de4"/>
          <path d="M50,6 L88,6 L80.8,78.2 L50,86.8 Z" fill="#2965f1"/>
          <path d="M50,25.6 L26.2,25.6 L28.4,47.2 L50,47.2 Z" fill="#ebebeb"/>
          <path d="M50,67.6 L50,56.8 L42.8,54.8 L42.4,49.8 L28.6,49.8 L29.6,60.8 Z" fill="#ebebeb"/>
          <path d="M50,25.6 L50,36.4 L71.6,36.4 L71,47.2 L50,47.2 L50,58 L60.2,58 L59.6,64.2 L50,66.8 L50,77.4 L68.2,72.4 L70.6,25.6 Z" fill="#ffffff"/>
        </g>
      ),
    },
    {
      name: "JavaScript",
      badgeName: "JavaScript Stone",
      category: "Frontend",
      color: "#f7df1e",
      glow: "rgba(247,223,30,0.2)",
      logoSvg: (
        <g transform="translate(25, 25) scale(0.5)">
          <rect x="2" y="2" width="96" height="96" rx="10" fill="#f7df1e"/>
          <path d="M59,78 C59,85 54,88 47,88 C39.5,88 36,83.5 36,78 L47.5,78 C47.5,80.5 48.5,81.5 50.5,81.5 C52.5,81.5 53.5,80.5 53.5,78 L53.5,35 L59,35 Z" fill="#000000"/>
          <path d="M72,70 C72,76.5 76,80 81.5,80 C87,80 90,76.5 90,70 C90,64.5 87.5,62.5 80,60 C73,57.5 70,55 70,49.5 C70,43.5 74.5,40 81.5,40 C88.5,40 92,43.5 92,49.5 L80.5,49.5 C80.5,47.5 79.5,46.5 78,46.5 C76.5,46.5 75.5,47 75.5,49 C75.5,51 76.5,52 82.5,54 C89.5,56.5 95,59.5 95,69.5 C95,76 90.5,82.5 81.5,82.5 C72.5,82.5 68,76 68,70 Z" fill="#000000"/>
        </g>
      ),
    },
    {
      name: "TypeScript",
      badgeName: "TypeScript Stone",
      category: "Frontend",
      color: "#3178c6",
      glow: "rgba(49,120,198,0.2)",
      logoSvg: (
        <g transform="translate(25, 25) scale(0.5)">
          <rect x="2" y="2" width="96" height="96" rx="10" fill="#3178c6"/>
          <path d="M46,39.5 L46,88 L34,88 L34,39.5 L20,39.5 L20,30 L60,30 L60,39.5 Z" fill="#ffffff"/>
          <path d="M72,70 C72,76.5 76,80 81.5,80 C87,80 90,76.5 90,70 C90,64.5 87.5,62.5 80,60 C73,57.5 70,55 70,49.5 C70,43.5 74.5,40 81.5,40 C88.5,40 92,43.5 92,49.5 L80.5,49.5 C80.5,47.5 79.5,46.5 78,46.5 C76.5,46.5 75.5,47 75.5,49 C75.5,51 76.5,52 82.5,54 C89.5,56.5 95,59.5 95,69.5 C95,76 90.5,82.5 81.5,82.5 C72.5,82.5 68,76 68,70 Z" fill="#ffffff"/>
        </g>
      ),
    },
    {
      name: "React",
      badgeName: "React Stone",
      category: "Frontend",
      color: "#61dafb",
      glow: "rgba(97,218,251,0.2)",
      logoSvg: (
        <g stroke="#61dafb" strokeWidth="4.5" fill="none" transform="translate(50, 50)">
          <ellipse rx="13" ry="34" transform="rotate(30)" />
          <ellipse rx="13" ry="34" transform="rotate(90)" />
          <ellipse rx="13" ry="34" transform="rotate(150)" />
          <circle r="6" fill="#61dafb" />
        </g>
      ),
    },
    {
      name: "Redux",
      badgeName: "Redux Stone",
      category: "Frontend",
      color: "#764abc",
      glow: "rgba(118,74,188,0.2)",
      logoSvg: (
        <g transform="translate(25, 23) scale(0.5)">
          <path d="M43.7,13 C35.7,-0.7 20,4.7 13.7,7 C7,9.3 1,22.3 6,36.7 C11.3,51.7 26,59 36,54.7 C46,50.3 53.7,33.7 51,20 C48.3,6.3 35.7,-0.7 26.3,1.3 M20,22 C13.7,25 11,35 15,44 C19.3,52.7 30,55 35.7,51 M36,22 C42.3,25 45,35 41,44 C36.7,52.7 26,55 20.3,51" stroke="#764abc" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
          <circle cx="28" cy="27" r="7" fill="#764abc"/>
        </g>
      ),
    },
    {
      name: "Tailwind CSS",
      badgeName: "Tailwind Stone",
      category: "Frontend",
      color: "#38bdf8",
      glow: "rgba(56,189,248,0.2)",
      logoSvg: (
        <g transform="translate(22, 28) scale(0.55)">
          <path d="M29,20 C20,20 14,26 6,35 C-2,44 -7,56 -7,64 C-7,70 -3,75 5,75 C14,75 20,69 28,60 C36,51 41,39 41,31 C41,25 37,20 29,20 Z M69,40 C60,40 54,46 46,55 C38,64 33,76 33,84 C33,90 37,95 45,95 C54,95 60,89 68,80 C76,71 81,59 81,51 C81,45 77,40 69,40 Z" fill="#38bdf8"/>
        </g>
      ),
    },
    {
      name: "Node.js",
      badgeName: "Node Stone",
      category: "Backend",
      color: "#68a063",
      glow: "rgba(104,160,99,0.2)",
      logoSvg: (
        <g transform="translate(25, 25) scale(0.5)" fill="none" stroke="#68a063" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="50,10 90,32 90,76 50,98 10,76 10,32"/>
          <path d="M50,10 L50,98"/>
          <path d="M50,54 L90,32"/>
          <path d="M50,54 L10,32"/>
        </g>
      ),
    },
    {
      name: "MongoDB",
      badgeName: "MongoDB Stone",
      category: "Database",
      color: "#47a248",
      glow: "rgba(71,162,72,0.2)",
      logoSvg: (
        <g transform="translate(30, 20) scale(0.8)">
          <path d="M25,2 C25,2 10.7,18.7 10.7,35 C10.7,50 25,68 25,68 C25,68 39.3,50 39.3,35 C39.3,18.7 25,2 Z" fill="#47a248"/>
          <path d="M25,2 L25,68" stroke="#103010" strokeWidth="2.2" opacity="0.3"/>
          <path d="M25,2 C25,2 17.8,18.7 17.8,35 C17.8,50 25,68 25,68 Z" fill="#3f8b35"/>
        </g>
      ),
    },
    {
      name: "Express.js",
      badgeName: "Express Stone",
      category: "Backend",
      color: "#ffffff",
      glow: "rgba(255,255,255,0.15)",
      logoSvg: (
        <g transform="translate(25, 23) scale(0.5)">
          <text x="50" y="58" textAnchor="middle" fontSize="36" fontWeight="900" fill="#111111" fontFamily="sans-serif">ex</text>
        </g>
      ),
    },
    {
      name: "Git",
      badgeName: "Git Stone",
      category: "Tools",
      color: "#f05032",
      glow: "rgba(240,80,50,0.2)",
      logoSvg: (
        <g transform="translate(25, 25) scale(0.5)">
          <rect x="10" y="10" width="80" height="80" rx="12" fill="#f05032" transform="rotate(45, 50, 50)"/>
          <circle cx="50" cy="30" r="7" fill="#ffffff"/>
          <circle cx="50" cy="70" r="7" fill="#ffffff"/>
          <circle cx="70" cy="50" r="7" fill="#ffffff"/>
          <line x1="50" y1="30" x2="50" y2="70" stroke="#ffffff" strokeWidth="7"/>
          <line x1="50" y1="50" x2="70" y2="50" stroke="#ffffff" strokeWidth="7"/>
        </g>
      ),
    },
    {
      name: "Figma",
      badgeName: "Figma Stone",
      category: "Tools",
      color: "#f24e1e",
      glow: "rgba(242,78,30,0.2)",
      logoSvg: (
        <g transform="translate(32, 20) scale(0.9)">
          <path d="M0,10 C0,4.5 4.5,0 10,0 C15.5,0 20,4.5 20,10 L20,20 L10,20 C4.5,20 0,15.5 0,10 Z" fill="#f24e1e"/>
          <circle cx="30" cy="10" r="10" fill="#ff7262"/>
          <path d="M0,30 C0,24.5 4.5,20 10,20 L20,20 L20,40 L10,40 C4.5,40 0,35.5 0,30 Z" fill="#a259ff"/>
          <circle cx="30" cy="30" r="10" fill="#1abc9c"/>
          <path d="M0,50 C0,44.5 4.5,40 10,40 L20,40 L20,50 C20,55.5 15.5,60 10,60 C4.5,60 0,55.5 0,50 Z" fill="#0acf83"/>
        </g>
      ),
    },
    {
      name: "Docker",
      badgeName: "Docker Stone",
      category: "Tools",
      color: "#2496ed",
      glow: "rgba(36,150,237,0.2)",
      logoSvg: (
        <g transform="translate(20, 28) scale(0.6)">
          <path d="M90,39.5 C90,47 84,65 59,65 C40,65 34,60 25,60 C15,60 7,63 1,60 C-2.5,56.5 0,44 1.5,39.5 C5,36 10,36 15,39.5 C20,43 25,43 30,39.5 C35,36 41,31 49,31 C59,31 69,36 74,43 C79,50 83,50 90,39.5 Z" fill="#2496ed"/>
          <path d="M74,43 C79,35 86,29 90,32 C93,35 90,42 83,47 Z" fill="#2496ed"/>
          <rect x="18" y="20" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" strokeWidth="0.8"/>
          <rect x="28" y="20" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" strokeWidth="0.8"/>
          <rect x="38" y="20" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" strokeWidth="0.8"/>
          <rect x="23" y="10" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" strokeWidth="0.8"/>
          <rect x="33" y="10" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" strokeWidth="0.8"/>
          <rect x="43" y="10" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" strokeWidth="0.8"/>
          <rect x="28" y="0" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" strokeWidth="0.8"/>
          <rect x="38" y="0" width="8" height="8" rx="1.5" fill="#0db7ed" stroke="#ffffff" strokeWidth="0.8"/>
        </g>
      ),
    },
    {
      name: "Next.js",
      badgeName: "Next Stone",
      category: "Frontend",
      color: "#ffffff",
      glow: "rgba(255,255,255,0.2)",
      logoSvg: (
        <g transform="translate(20, 20) scale(0.6)">
          <circle cx="50" cy="50" r="35" fill="#000000" stroke="#ffffff" strokeWidth="3" />
        </g>
      ),
    }
  ];

  return (
    <div className="relative w-full text-center">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center mb-10 select-none">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[9px] tracking-[0.35em] text-purple-500 font-extrabold uppercase">
            {"// toolkit"}
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-r from-purple-500/40 to-transparent" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none font-mono">
          Tech Arsenal
        </h2>
        <p className="text-[11px] md:text-xs text-slate-400 font-sans mt-3 max-w-xl">
          Technologies I use to build scalable, modern, and high-performance applications.
        </p>
      </div>

      {/* Toggle View mode control */}
      <div className="flex items-center justify-center gap-3 mb-8 select-none">
        <div className="p-1 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md flex items-center gap-1.5">
          <button
            onClick={() => setViewMode("orbit")}
            className={`px-4 py-2 rounded-lg text-[9px] font-mono font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
              viewMode === "orbit"
                ? "bg-purple-650 bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                : "text-slate-450 text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            3D Orbit View
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-lg text-[9px] font-mono font-black uppercase tracking-widest transition-all duration-300 cursor-pointer ${
              viewMode === "grid"
                ? "bg-purple-650 bg-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.35)]"
                : "text-slate-450 text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            Grid View
          </button>
        </div>
      </div>

      {/* Conditional Visual Showcase Render */}
      {viewMode === "orbit" ? (
        <ThreeTechOrbit technologies={technologies} />
      ) : (
        /* Collectible Stones Grid System */
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 max-w-[1400px] mx-auto py-6">
          {technologies.map((tech, idx) => (
            <TechStoneCard key={tech.name} tech={tech} idx={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
