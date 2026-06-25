"use client";

import React, { useRef } from "react";
import { motion, useDragControls } from "framer-motion";

interface WindowManagerProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export default function WindowManager({
  title,
  isMaximized,
  zIndex,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}: WindowManagerProps) {
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={windowRef}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        width: isMaximized ? "100%" : "740px",
        height: isMaximized ? "calc(100vh - 28px - 76px)" : "500px",
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
        top: isMaximized ? "28px" : "15%",
        left: isMaximized ? 0 : "22%",
      }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 240, 
        damping: 24, 
        duration: 0.35 
      }}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      onPointerDown={onFocus}
      style={{ zIndex }}
      className={`fixed rounded-2xl glass-window flex flex-col overflow-hidden text-slate-100 ${
        isActive ? "active" : ""
      }`}
    >
      {/* Authentic macOS Finder Glass Title Bar */}
      <div
        onPointerDown={(e) => dragControls.start(e)}
        className="h-11 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center px-4 justify-between cursor-move select-none shrink-0"
      >
        {/* macOS Traffic-Light Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-3.5 h-3.5 rounded-full mac-btn-red flex items-center justify-center text-[9px] text-red-950/80 font-bold group cursor-pointer focus:outline-none"
            aria-label="Close"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">×</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-3.5 h-3.5 rounded-full mac-btn-yellow flex items-center justify-center text-[9px] text-yellow-950/80 font-bold group cursor-pointer focus:outline-none"
            aria-label="Minimize"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity leading-none">-</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="w-3.5 h-3.5 rounded-full mac-btn-green flex items-center justify-center text-[7px] text-green-950/80 font-bold group cursor-pointer focus:outline-none"
            aria-label="Maximize"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">↕</span>
          </button>
        </div>

        {/* Finder Title */}
        <span className="text-xs font-mono font-bold tracking-wider text-slate-200">
          {title}
        </span>

        {/* Dummy spacing */}
        <div className="w-16" />
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto overflow-x-hidden p-6 window-scroll bg-black/15">
        {children}
      </div>
    </motion.div>
  );
}
