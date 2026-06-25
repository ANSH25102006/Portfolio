"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, ChevronDown, Award } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import dynamic from "next/dynamic";

// Dynamically import the 3D model component to bypass SSR compile runs cleanly
// Includes auto-recovery reload logic to handle dev-server compilation chunk hash mismatches.
const ThreeHeroModel = dynamic(
  () =>
    import("./ThreeHeroModel").catch((err) => {
      console.warn("Dynamic chunk load failed. Attempting page reload to sync bundles:", err);
      if (typeof window !== "undefined") {
        window.location.reload();
      }
      throw err;
    }),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border border-purple-500/10" />
          <div className="absolute inset-0 rounded-full border-t border-purple-500 animate-spin" />
        </div>
      </div>
    ),
  }
);

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  const [typedText, setTypedText] = useState("");
  const username = "anshtrix";

  // Typewriter loop revealing username
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < username.length) {
        setTypedText((prev) => prev + username[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.3,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const, // Custom cinematic easing
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 overflow-hidden select-none"
    >
      {/* Cinematic ambient lighting globs */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute top-[20%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-purple-500/5 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/5 blur-[150px] animate-glow-slow" />
      </div>

      <div className="container max-w-6xl relative z-10 mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 py-8">
          
          {/* Left Column: Typographic Details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-[1.1] order-2 lg:order-1 text-left flex flex-col items-start"
          >
            {/* Engineering header tag */}
            <motion.div variants={lineVariants} className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-[9px] font-mono font-extrabold text-purple-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                Engineering Systems V2.0
              </div>
            </motion.div>

            {/* Micro console user terminal marker */}
            <motion.div
              variants={lineVariants}
              className="font-mono text-slate-450 text-[11px] font-bold mb-3 flex items-center gap-1.5"
            >
              <span className="text-purple-400 font-extrabold">$</span>
              <span>guest@anshtrix:~$ exec -init</span>
              <span>{typedText}</span>
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-3.5 bg-purple-400 inline-block align-middle"
              />
            </motion.div>

            {/* Main title text with high contrast purple-blue gradients */}
            <div className="flex flex-col mb-4">
              <motion.h1
                variants={lineVariants}
                className="font-sans tracking-tight leading-[0.95] text-white"
                style={{
                  fontSize: "clamp(4.8rem, 10vw, 8.5rem)",
                  fontWeight: 900,
                }}
              >
                Ansh
              </motion.h1>
              <motion.h1
                variants={lineVariants}
                className="font-sans tracking-tight leading-[0.95] bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
                style={{
                  fontSize: "clamp(4.8rem, 10vw, 8.5rem)",
                  fontWeight: 900,
                }}
              >
                Pandey
              </motion.h1>

              {/* Dynamic role presentation */}
              <motion.div
                variants={lineVariants}
                className="mt-4 inline-flex items-center gap-2 text-xs md:text-sm font-mono font-bold text-slate-350 tracking-wide uppercase border-l-2 border-purple-500 pl-3 py-0.5"
              >
                <span>Full Stack Developer</span>
                <span className="text-purple-400 font-extrabold">&bull;</span>
                <span className="text-slate-400">Software Engineer</span>
              </motion.div>
            </div>

            {/* Role description */}
            <motion.p
              variants={lineVariants}
              className="text-base md:text-lg text-slate-300 mb-6 max-w-2xl leading-relaxed font-sans"
            >
              Building scalable web applications and solving real-world problems through robust software engineering and technologies.
            </motion.p>

            {/* Social linkages */}
            <motion.div
              variants={lineVariants}
              className="flex items-center gap-3 mb-8"
            >
              <a
                href="https://github.com/ANSH25102006"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-slate-300 hover:text-purple-400 hover:border-purple-500/40 hover:-translate-y-0.5 transition-all shadow-md group"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/ansh-pandey251"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-slate-300 hover:text-blue-400 hover:border-blue-500/40 hover:-translate-y-0.5 transition-all shadow-md group"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://leetcode.com/u/ansh_25/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-slate-300 hover:text-amber-500 hover:border-amber-500/40 hover:-translate-y-0.5 transition-all shadow-md group"
                title="LeetCode Profile"
              >
                <Award className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>

            {/* Action buttons (CTAs) */}
            <motion.div
              variants={lineVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => onScrollTo("projects")}
                className="group relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap text-[10px] font-bold font-mono tracking-wider h-11 rounded-xl px-7 transition-all cursor-pointer uppercase gap-2 text-white border border-purple-500/30"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                  boxShadow: "0 0 25px rgba(124,58,237,0.3), 0 8px 16px rgba(0,0,0,0.4)",
                }}
              >
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                View Projects
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden inline-flex items-center justify-center whitespace-nowrap text-[10px] font-bold font-mono tracking-wider h-11 rounded-xl px-7 border border-white/[0.08] text-slate-300 hover:bg-white/[0.05] hover:border-purple-500/40 transition-all uppercase gap-2 bg-[#0d0f1a]/60 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              >
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                <FileText className="w-3.5 h-3.5 text-purple-400 group-hover:scale-105 transition-transform" />
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Holographic Model Canvas */}
          <div className="flex-1 order-1 lg:order-2 w-full flex items-center justify-center relative">
            <div className="absolute w-[100%] h-[100%] bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
            <ThreeHeroModel />
          </div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-10"
          onClick={() => onScrollTo("about")}
        >
          <span className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.35em]">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
