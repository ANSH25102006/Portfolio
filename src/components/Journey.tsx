"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Award, Code, Globe, UserCheck } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  color: string;
  glow: string;
}

export default function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timelineItems: TimelineItem[] = [
    {
      year: "2023",
      title: "Started Programming Journey",
      icon: <Code className="w-5 h-5" />,
      description: "Discovered the world of programming. Set up initial development terminal workflow.",
      details: ["Mastered foundational structures (Python, C, standard Git command integrations)", "Learned basic terminal automation scripts"],
      color: "#8b5cf6",
      glow: "rgba(139,92,246,0.15)",
    },
    {
      year: "2024",
      title: "Web Development & DSA",
      icon: <Award className="w-5 h-5" />,
      description: "Dived into frontend technologies and algorithms to refine logical execution.",
      details: ["Developed clean sites in React and Tailwind CSS", "Solved core algorithmic challenges on LeetCode focusing on arrays, pointers, and sorting"],
      color: "#3b82f6",
      glow: "rgba(59,130,246,0.15)",
    },
    {
      year: "2025",
      title: "Full Stack Projects & Open Source",
      icon: <Globe className="w-5 h-5" />,
      description: "Scaled backend integrations, databases, and contributed code structures online.",
      details: ["Built complex databases in MongoDB and PostgreSQL", "Contributed modular layouts to open-source developer toolkits"],
      color: "#06b6d4",
      glow: "rgba(6,182,212,0.15)",
    },
    {
      year: "2026",
      title: "MERN Stack & Advanced Development",
      icon: <UserCheck className="w-5 h-5" />,
      description: "Constructing scalable enterprise architectures and modular APIs.",
      details: ["Designing multi-tenant MERN microservices", "Integrating machine learning models and automated AI workflow pipelines"],
      color: "#10b981",
      glow: "rgba(16,185,129,0.15)",
    },
    {
      year: "2027",
      title: "Software Engineering Career",
      icon: <Calendar className="w-5 h-5" />,
      description: "Graduation and launching a full-scale professional software engineering career.",
      details: ["Deploying production-ready cloud solutions", "Driving tech innovation as an impactful full-stack engineer"],
      color: "#f59e0b",
      glow: "rgba(245,158,11,0.15)",
    },
  ];

  return (
    <div ref={ref} className="relative w-full">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[18vw] font-black text-white/[0.008] uppercase tracking-widest leading-none select-none">
          JOURNEY
        </span>
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-center justify-center mb-16 select-none relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[9px] tracking-[0.35em] text-purple-500 font-extrabold uppercase">
            {"// timeline"}
          </span>
          <div className="h-px w-20 bg-gradient-to-r from-purple-500/40 to-transparent" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none font-mono">
          Path of Progression
        </h2>
        <p className="text-[11px] text-slate-500 font-mono mt-3 tracking-wider uppercase">
          {"// 2023 - 2027 timeline journey"}
        </p>
      </div>

      {/* Vertical Timeline container */}
      <div className="relative w-full max-w-4xl mx-auto px-4 py-8 z-10">
        {/* Central glowing vertical timeline track line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-emerald-500 opacity-20 pointer-events-none -translate-x-1/2" />

        {/* Timeline items mapped */}
        <div className="flex flex-col gap-12 md:gap-16 w-full">
          {timelineItems.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div 
                key={item.year}
                className={`relative flex flex-col md:flex-row items-start ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                } w-full`}
              >
                {/* Timeline node dot indicator */}
                <div 
                  className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full border-2 bg-[#050816] z-20 flex items-center justify-center -translate-x-1/2 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                  style={{ 
                    borderColor: item.color,
                    boxShadow: isInView ? `0 0 15px ${item.glow}` : "none" 
                  }}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                </div>

                {/* Staggered Timeline Card Container */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 10 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: idx * 0.15, ease: "easeOut" }}
                  className={`w-full md:w-[45%] pl-14 md:pl-0 ${
                    isLeft ? "md:text-right" : "md:text-left"
                  }`}
                >
                  {/* Carbon block card with glowing borders (no glassmorphism blur) */}
                  <div 
                    className="p-6 rounded-2xl bg-[#0e111a] border border-white/[0.04] transition-all duration-350 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] group"
                    style={{ 
                      borderTop: `2px solid ${item.color}`,
                    }}
                  >
                    {/* Header: Year + Icon */}
                    <div className={`flex items-center gap-3 mb-4 ${
                      isLeft ? "md:flex-row-reverse" : "flex-row"
                    }`}>
                      <span 
                        className="font-mono text-sm font-black px-3 py-1 rounded-lg select-none"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                      >
                        {item.year}
                      </span>
                      <div 
                        className="p-2 rounded-xl bg-white/[0.02] border border-white/5"
                        style={{ color: item.color }}
                      >
                        {item.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold font-mono tracking-wide text-white mb-2 uppercase">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-slate-300 leading-relaxed font-sans mb-4">
                      {item.description}
                    </p>

                    {/* Details list */}
                    <ul className={`flex flex-col gap-2 text-xs md:text-sm text-slate-400 font-mono ${
                      isLeft ? "md:items-end text-right" : "items-start text-left"
                    }`}>
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-purple-500 select-none mt-0.5">&bull;</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
