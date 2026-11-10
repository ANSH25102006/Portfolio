"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }

      const target = e.target as HTMLElement;
      const hoverable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(!!hoverable);
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    // Smooth ring interpolation
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.1);
      if (ringRef.current) {
        const size = isPointer ? 48 : 32;
        ringRef.current.style.transform = `translate(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isPointer]);

  return (
    <>
      {/* Primary dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: isPointer ? "#06b6d4" : "#3b82f6",
          opacity: isHidden ? 0 : 1,
          transition: "background-color 0.2s, opacity 0.2s, transform 0s",
          willChange: "transform",
          mixBlendMode: "difference",
        }}
        aria-hidden="true"
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          borderRadius: "50%",
          border: `1px solid ${isPointer ? "rgba(6,182,212,0.5)" : "rgba(59,130,246,0.35)"}`,
          opacity: isHidden ? 0 : 1,
          transition: "width 0.25s, height 0.25s, border-color 0.2s, opacity 0.2s, transform 0s",
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
}
