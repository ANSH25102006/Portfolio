"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    // Progress animation — runs in ~2s max
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(p));

      if (p < 100) {
        requestAnimationFrame(tick);
      } else {
        // Small pause before exit
        setTimeout(() => {
          setPhase("done");
          setTimeout(() => {
            setVisible(false);
            onComplete();
          }, 600);
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  const letters = ["A", "N", "S", "H", " ", "P", "A", "N", "D", "E", "Y"];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#040408] flex flex-col items-center justify-center select-none"
          aria-label="Loading"
          role="status"
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-blue-500/30" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-blue-500/30" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-blue-500/30" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-blue-500/30" />

          <div className="flex flex-col items-center gap-10">
            {/* Name with stagger reveal */}
            <div className="flex items-center gap-0 overflow-hidden">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`text-4xl md:text-6xl font-black tracking-[0.15em] ${
                    letter === " " ? "w-4" : "text-white"
                  }`}
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Status line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center gap-6"
            >
              <span className="font-mono text-[10px] tracking-[0.4em] text-blue-400/70 uppercase">
                {phase === "done" ? "READY" : "INITIALIZING EXPERIENCE..."}
              </span>

              {/* Progress bar */}
              <div className="w-48 md:w-64 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.05 }}
                />
              </div>

              <span className="font-mono text-[9px] text-slate-600 tabular-nums">
                {progress.toString().padStart(3, "0")}%
              </span>
            </motion.div>
          </div>

          {/* Bottom build info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] text-slate-700 tracking-widest uppercase"
          >
            Built with React · TypeScript · Three.js
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
