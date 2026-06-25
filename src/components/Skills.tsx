"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Atom, Server, Database, Wrench } from "lucide-react";
import TiltCard from "@/components/TiltCard";

interface SkillItem {
  name: string;
  percentage: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: SkillItem[];
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: <Atom className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-400",
      skills: [
        { name: "React", percentage: 90 },
        { name: "TypeScript", percentage: 75 },
        { name: "Tailwind CSS", percentage: 95 },
      ],
    },
    {
      title: "Backend Development",
      icon: <Server className="w-5 h-5" />,
      color: "from-blue-600 to-sky-500",
      skills: [
        { name: "Node.js", percentage: 80 },
        { name: "Express.js", percentage: 80 },
      ],
    },
    {
      title: "Database Management",
      icon: <Database className="w-5 h-5" />,
      color: "from-indigo-500 to-blue-600",
      skills: [
        { name: "PostgreSQL", percentage: 75 },
      ],
    },
    {
      title: "Dev Tools & OS",
      icon: <Wrench className="w-5 h-5" />,
      color: "from-cyan-500 to-blue-500",
      skills: [
        { name: "Git", percentage: 90 },
        { name: "GitHub", percentage: 95 },
        { name: "Docker", percentage: 60 },
        { name: "VS Code", percentage: 95 },
        { name: "Xcode", percentage: 75 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-32 px-6 md:px-12 relative overflow-hidden bg-[#050505]/20">
      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-20">
          <span className="font-mono text-[10px] tracking-widest text-blue-500 uppercase mb-3">
            {"// 02. Skills"}
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase flex items-center gap-4">
            Technical Stack
            <span className="h-[1px] bg-slate-800 flex-grow max-w-sm hidden sm:block" />
          </h2>
        </div>

        {/* Categories Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="w-full h-full"
            >
              <TiltCard className="w-full h-full">
                <div className="glass-card p-10 rounded-[2rem] border border-white/5 bg-[#0d0d0d]/65 hover:border-blue-500/30 transition-all duration-300 relative group overflow-hidden h-full flex flex-col justify-between">
                  {/* Internal hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`p-3 rounded-2xl bg-gradient-to-tr ${cat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {cat.icon}
                      </div>
                      <h3 className="text-xl font-bold font-mono tracking-wide text-white">
                        {cat.title}
                      </h3>
                    </div>

                    {/* Skills progress list */}
                    <div className="flex flex-col gap-6">
                      {cat.skills.map((skill) => (
                        <div key={skill.name} className="flex flex-col gap-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-sans font-semibold text-slate-200">
                              {skill.name}
                            </span>
                            <span className="font-mono text-xs text-slate-400">
                              {skill.percentage}%
                            </span>
                          </div>
                          
                          {/* Slider Track */}
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.percentage}%` } : {}}
                              transition={{ duration: 1.2, delay: idx * 0.1 + 0.2, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <span className="font-mono text-[9px] tracking-widest text-slate-600 uppercase mt-8 block">
                    CATEGORY // 0{idx + 1}
                  </span>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
