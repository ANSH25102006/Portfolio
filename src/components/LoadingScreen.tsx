"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing systems...");
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Scroll block
    document.body.style.overflow = "hidden";

    const duration = 2000; // 2 seconds total loader
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);
        
        // Update status text based on progress
        if (next < 25) {
          setStatusText("Establishing secure connection...");
        } else if (next < 55) {
          setStatusText("Compiling component files...");
        } else if (next < 85) {
          setStatusText("Loading high-tech assets...");
        } else {
          setStatusText("Launching experience...");
        }

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setShow(false);
            // Re-enable scroll
            document.body.style.overflow = "";
            onComplete();
          }, 400); // Small pause at 100%
        }
        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030014] text-white select-none"
        >
          {/* Subtle glowing ring background */}
          <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[80px]" />
          
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-[2px] shadow-[0_0_30px_rgba(0,242,254,0.15)]"
            >
              <div className="w-full h-full bg-[#030014] rounded-[14px] flex items-center justify-center">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  AP
                </span>
              </div>
            </motion.div>

            {/* Percentage display */}
            <div className="font-mono text-5xl md:text-6xl font-black tracking-widest bg-gradient-to-r from-cyan-400 via-indigo-200 to-purple-500 bg-clip-text text-transparent mb-4">
              {Math.floor(progress)}%
            </div>

            {/* Status log lines */}
            <div className="h-6 font-mono text-xs md:text-sm text-slate-400 tracking-wider">
              <motion.span
                key={statusText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {statusText}
              </motion.span>
            </div>

            {/* Loading progress bar */}
            <div className="w-64 md:w-80 h-[2px] bg-slate-800 rounded-full mt-6 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-600"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 h-full animate-[shimmer_1.5s_infinite]" />
            </div>
          </div>

          {/* Minimalist footer detail */}
          <div className="absolute bottom-8 font-mono text-[10px] text-slate-600 tracking-widest uppercase">
            Ansh Pandey © 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
