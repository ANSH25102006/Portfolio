"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Award, Compass, MapPin } from "lucide-react";

interface TimelineItem {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  icon: React.ReactNode;
  status: "current" | "completed" | "milestone";
}

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const items: TimelineItem[] = [
    {
      title: "B.Tech Second Year",
      subtitle: "Sharda University",
      date: "2025 — Present",
      description: "Focusing on core engineering subjects including Data Structures, Database Systems (PostgreSQL), and Software Engineering architectures. Maintaining a CGPA of 7.9.",
      icon: <GraduationCap className="w-5 h-5" />,
      status: "current",
    },
    {
      title: "B.Tech First Year",
      subtitle: "Sharda University",
      date: "2024 — 2025",
      description: "Mastered fundamental concepts in engineering math, computing architectures, and introductory C/Python coding blocks.",
      icon: <Compass className="w-5 h-5" />,
      status: "completed",
    },
    {
      title: "B.Tech Program Enrollment",
      subtitle: "Sharda University Admission",
      date: "August 2024",
      description: "Successfully matriculated into the Bachelor of Technology program, choosing computer science as the core path.",
      icon: <Award className="w-5 h-5" />,
      status: "milestone",
    },
  ];

  const statusColors = {
    current: {
      dot: "bg-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.8)]",
      ring: "border-blue-500/50",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      text: "ACTIVE",
    },
    completed: {
      dot: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]",
      ring: "border-emerald-500/30",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      text: "COMPLETED",
    },
    milestone: {
      dot: "bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]",
      ring: "border-purple-500/30",
      badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      text: "MILESTONE",
    },
  };

  return (
    <div className="relative w-full">
      {/* Section Header */}
      <div className="flex flex-col mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[9px] tracking-[0.35em] text-blue-500 font-extrabold uppercase">
            EDUCATION
          </span>
          <div className="h-px flex-grow max-w-xs bg-gradient-to-r from-blue-500/40 to-transparent" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase leading-none">
          Journey
        </h2>
        <p className="text-[11px] text-slate-500 font-mono mt-3 tracking-wider">
          {"// CAREER TRAJECTORY LOG"}
        </p>
      </div>

      {/* Timeline Container */}
      <div ref={ref} className="relative">
        {/* Vertical Track */}
        <div className="absolute left-5 md:left-7 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-white/[0.06] to-transparent pointer-events-none">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-b from-blue-500 via-cyan-500/50 to-transparent origin-top"
          />
        </div>

        <div className="flex flex-col gap-10 pl-16 md:pl-20">
          {items.map((item, idx) => {
            const colors = statusColors[item.status];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className="relative group"
              >
                {/* Dot Node */}
                <div
                  className={`absolute -left-[48px] md:-left-[56px] top-7 flex items-center justify-center w-8 h-8 rounded-full bg-[#030712] border ${colors.ring} z-10 transition-transform duration-300 group-hover:scale-110`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                </div>

                {/* Card */}
                <div
                  className="relative rounded-2xl border border-white/[0.06] bg-[#050a14]/70 p-6 overflow-hidden backdrop-blur-xl transition-all duration-300 group-hover:border-white/[0.10] cursor-default"
                  style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}
                >
                  {/* Top meta row */}
                  <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[7px] font-extrabold uppercase tracking-widest border ${colors.badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full block ${colors.dot.split(" ")[0]}`} />
                        {colors.text}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-mono font-bold">
                      <MapPin className="w-3 h-3 text-slate-600" />
                      {item.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-xl border border-white/[0.06] shrink-0 ${
                        item.status === "current"
                          ? "bg-blue-500/10 text-blue-400"
                          : item.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-purple-500/10 text-purple-400"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-black text-white mb-0.5 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-[10px] font-mono text-blue-400/70 font-bold mb-3 uppercase tracking-wider">
                        {item.subtitle}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Glow accent */}
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full ${
                      item.status === "current"
                        ? "bg-blue-500/10"
                        : item.status === "completed"
                        ? "bg-emerald-500/10"
                        : "bg-purple-500/10"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
