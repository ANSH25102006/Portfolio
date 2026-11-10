"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home",         href: "#home" },
  { name: "About",        href: "#about" },
  { name: "Skills",       href: "#skills" },
  { name: "Projects",     href: "#projects" },
  { name: "Experience",   href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Education",    href: "#education" },
  { name: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setScrolled(window.scrollY > 40);

      // Active section tracking
      const sections = navItems.map((item) => item.href.substring(1));
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.03] z-[200] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 origin-left transition-none"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating pill nav */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-[100] transition-all duration-400 ${
          scrolled
            ? "bg-[#040408]/90 backdrop-blur-xl border border-white/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.6)] rounded-full py-2.5 px-5"
            : "bg-transparent py-4 px-4"
        }`}
        style={{ maxWidth: "min(92vw, 960px)", width: scrolled ? "auto" : "min(92vw, 960px)" }}
      >
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollTo(e, "#home")}
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[1px] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#040408] rounded-full flex items-center justify-center">
                <span
                  className="text-[11px] font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  AP
                </span>
              </div>
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-slate-400 group-hover:text-blue-400 transition-colors hidden sm:block">
              ANSH.DEV
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 font-mono text-[10.5px]" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className={`relative px-3 py-1.5 rounded-full transition-colors duration-300 hover:text-blue-400 ${
                    isActive ? "text-blue-400 font-bold" : "text-slate-500 hover:text-slate-300"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-blue-500/[0.08] border border-blue-500/20 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "#contact")}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-blue-500/30 text-blue-400 font-mono text-[10px] tracking-widest font-bold hover:bg-blue-500/10 hover:border-blue-400/50 transition-all duration-300 uppercase"
            >
              Hire Me
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-blue-400 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[72px] left-4 right-4 z-[99] bg-[#070b14]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 lg:hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className={`px-4 py-2.5 rounded-xl font-mono text-[11px] tracking-wide transition-all ${
                      isActive
                        ? "bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="h-px bg-white/[0.05] my-1" />
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, "#contact")}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-mono font-bold text-[11px] text-white tracking-widest uppercase hover:opacity-90 transition-opacity"
              >
                Let&apos;s Connect
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
