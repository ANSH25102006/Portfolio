"use client";

import React from "react";
import { motion } from "framer-motion";

interface DesktopIconProps {
  name: string;
  icon: React.ReactNode;
  onOpen: () => void;
}

export default function DesktopIcon({ name, icon, onOpen }: DesktopIconProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={onOpen}
      className="w-28 h-28 flex flex-col items-center justify-center cursor-pointer select-none group focus:outline-none"
      title="Click to open"
    >
      {/* Icon Wrapper with Custom Hover Blue Glow */}
      <div className="w-16 h-16 rounded-2xl bg-[#0d0d0d]/50 backdrop-blur-md border border-white/5 flex items-center justify-center text-slate-300 shadow-lg group-hover:bg-[#3b82f6]/10 group-hover:border-[#3b82f6]/40 group-hover:text-blue-400 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] transition-all duration-300">
        {icon}
      </div>

      {/* App Name Label */}
      <span className="mt-2 text-[10px] font-mono text-center text-slate-200 bg-black/55 px-2.5 py-0.5 rounded-full border border-white/5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-md">
        {name}
      </span>
    </motion.div>
  );
}
