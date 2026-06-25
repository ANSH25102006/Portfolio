"use client";

import React from "react";
import { ArrowUp, Heart } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-[#050816] border-t border-white/[0.04] py-10 px-4 md:px-8 select-none relative z-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-[10px] text-slate-500">
        
        {/* Left Side: Copyright + Info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider">
            <span>© 2026 ANSH PANDEY</span>
            <span className="text-slate-700">|</span>
            <span className="text-[9px] text-slate-500 font-normal">PORTFOLIO V2</span>
          </div>
          <div className="flex items-center gap-1 text-[9px]">
            <span>Designed & Built with</span>
            <Heart className="w-2.5 h-2.5 text-purple-500 fill-purple-500/20" />
            <span>using Next.js & Tailwind</span>
          </div>
        </div>

        {/* Center/Right Side: Direct links & Back to Top */}
        <div className="flex items-center gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ANSH25102006"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ansh-pandey251"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <span className="text-slate-800 hidden sm:inline">|</span>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-slate-400 hover:text-purple-400 hover:border-purple-500/35 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all cursor-pointer uppercase tracking-wider font-extrabold"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3 text-purple-500 animate-bounce" />
          </button>
        </div>

      </div>
    </footer>
  );
}
