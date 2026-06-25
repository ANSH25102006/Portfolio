"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

interface DockItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  isOpen: boolean;
}

interface DockProps {
  items: DockItem[];
  onOpenApp: (id: string) => void;
}

export default function Dock({ items, onOpenApp }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-5 py-3 rounded-3xl glass-panel bg-[#030712]/50 border border-white/10 flex items-end gap-3.5 shadow-2xl shrink-0 pointer-events-auto h-[68px] backdrop-blur-xl">
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-3.5 h-full"
      >
        {items.map((app) => (
          <DockIcon key={app.id} app={app} mouseX={mouseX} onOpenApp={onOpenApp} />
        ))}
      </div>
    </div>
  );
}

function DockIcon({
  app,
  mouseX,
  onOpenApp,
}: {
  app: DockItem;
  mouseX: MotionValue<number>;
  onOpenApp: (id: string) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  // Calculate distance from cursor X to icon center X
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale width/height from 48px to 72px based on distance (range of 150px)
  const sizeTransform = useTransform(distance, [-150, 0, 150], [48, 72, 48]);

  // Spring animation for native bouncing effect
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 220, damping: 15 });

  return (
    <motion.button
      ref={ref}
      style={{ width: size, height: size }}
      onClick={() => onOpenApp(app.id)}
      className="relative flex flex-col items-center justify-end group cursor-pointer focus:outline-none shrink-0"
    >
      {/* Tooltip */}
      <span className="absolute -top-11 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none font-mono text-[9px] bg-black/90 text-slate-200 border border-white/5 px-2 py-0.5 rounded-md whitespace-nowrap shadow-md z-50">
        {app.name}
      </span>

      {/* Active Blue Neon Glow Icon */}
      <div className={`w-full h-full rounded-xl flex items-center justify-center transition-colors duration-300 ${
        app.isOpen 
          ? "bg-[#3b82f6]/10 border border-[#3b82f6]/40 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)]" 
          : "bg-white/5 border border-white/5 text-slate-350 hover:text-blue-400 hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/20 shadow-md"
      }`}>
        <div className="w-[50%] h-[50%] flex items-center justify-center scale-up-icon">
          {app.icon}
        </div>
      </div>

      {/* Dot indicator below */}
      {app.isOpen && (
        <span className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
      )}
    </motion.button>
  );
}
