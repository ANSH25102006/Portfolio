"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Activity, Layers, ShieldCheck, GitFork } from "lucide-react";
import TiltCard from "@/components/TiltCard";

interface CounterProps {
  value: number;
  suffix?: string;
}

function IntegerCounter({ value, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (end === 0) return;

    const duration = 1600;
    const steps = Math.min(end, 60);
    const increment = Math.ceil(end / steps);
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const milestones = [
    {
      title: "LeetCode Problems",
      count: 164,
      suffix: "",
      description: "Data structures & algorithm templates solved under spatial-temporal complexities.",
      icon: <Award className="w-5 h-5 text-yellow-400" />,
      tag: "LeetCode",
      accent: "#f59e0b",
      glow: "rgba(245,158,11,0.15)",
    },
    {
      title: "GitHub Contributions",
      count: 379,
      suffix: "",
      description: "Codebase check-ins, commits, and pull request events across active branches.",
      icon: <Activity className="w-5 h-5 text-green-400" />,
      tag: "Contributions",
      accent: "#10b981",
      glow: "rgba(16,185,129,0.15)",
    },
    {
      title: "Projects Built",
      count: 5,
      suffix: "+",
      description: "Completed full-stack systems, dynamic web apps, and machine learning structures.",
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      tag: "Production Ready",
      accent: "#3b82f6",
      glow: "rgba(59,130,246,0.15)",
    },
    {
      title: "Certificates Earned",
      count: 4,
      suffix: "",
      description: "Verified accreditations compiled from global engineering academies.",
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
      tag: "Accredited",
      accent: "#a855f7",
      glow: "rgba(168,85,247,0.15)",
    },
    {
      title: "GitHub Repositories",
      count: 10,
      suffix: "+",
      description: "Code directories maintained with full revision tracking systems.",
      icon: <GitFork className="w-5 h-5 text-pink-400" />,
      tag: "Repositories",
      accent: "#ec4899",
      glow: "rgba(236,72,153,0.15)",
    },
  ];

  return (
    <div className="relative w-full">
      {/* Section Label */}
      <div className="flex flex-col mb-16 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[9px] tracking-[0.35em] text-blue-500 font-extrabold uppercase">
            {"// achievements"}
          </span>
          <div className="h-px flex-grow max-w-xs bg-gradient-to-r from-blue-500/40 to-transparent" />
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
          Key Milestones
        </h2>
        <p className="text-[11px] text-slate-500 font-mono mt-3 tracking-wider">
          {"// DECRYPTED METRIC TELEMETRY"}
        </p>
      </div>

      {/* Milestones Grid */}
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5 relative z-10">
        {milestones.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: idx * 0.08, ease: "easeOut" }}
            className="w-full"
          >
            <TiltCard className="w-full h-full">
              <motion.div
                className="p-5.5 rounded-2xl border bg-[#050a14]/65 backdrop-blur-xl transition-all duration-300 relative group overflow-hidden h-full flex flex-col justify-between"
                style={{
                  borderColor: "rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                }}
                whileHover={{
                  borderColor: `${item.accent}30`,
                  boxShadow: `0 16px 40px rgba(0,0,0,0.5), 0 0 35px ${item.glow}`,
                }}
              >
                {/* Accent side stripe */}
                <div
                  className="absolute top-0 bottom-0 left-0 w-[3px] opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: item.accent }}
                />

                {/* Hover glow highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-300"
                      style={{ borderColor: `${item.accent}20` }}
                    >
                      {item.icon}
                    </div>
                    <span className="font-mono text-[7px] tracking-widest text-slate-500 bg-white/5 px-2.5 py-0.5 rounded-full uppercase">
                      {item.tag}
                    </span>
                  </div>

                  <div className="text-3xl font-black font-mono tracking-tight text-white mb-2">
                    <IntegerCounter value={item.count} suffix={item.suffix} />
                  </div>

                  <h3 className="text-[11px] font-bold text-slate-200 group-hover:text-blue-400 transition-colors mb-1.5 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-[10px] text-slate-450 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <span className="font-mono text-[8px] tracking-widest text-slate-600 uppercase mt-5 block select-none">
                  STAT // 0{idx + 1}
                </span>
              </motion.div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
