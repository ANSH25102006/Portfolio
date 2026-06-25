"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Orbit", href: "#skills" },
  { name: "Journey", href: "#journey" },
  { name: "Projects", href: "#projects" },
  { name: "Certs", href: "#certifications" },
  { name: "Contact", href: "#contact" },
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

      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      let currentSection = "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const offset = 96;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-white/5 z-[100] pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Pill Navbar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`fixed top-10 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 rounded-full border border-white/5 ${
          scrolled
            ? "bg-[#0d0d0d]/85 backdrop-blur-md py-2.5 px-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-white/10"
            : "bg-transparent py-4 px-5"
        }`}
        style={{ width: scrolled ? "max-content" : "90%", maxWidth: "1000px" }}
      >
        <div className="flex items-center justify-between gap-12">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative w-7.5 h-7.5 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-[1.2px] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center">
                <span className="text-[11px] font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  AP
                </span>
              </div>
            </div>
            {!scrolled && (
              <span className="text-xs font-mono tracking-widest text-slate-300 group-hover:text-blue-400 transition-colors duration-300">
                ANSH.DEV
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-[11px]">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-300 hover:text-blue-400 ${
                    isActive ? "text-blue-400 font-bold" : "text-slate-400"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-white/5 rounded-full border-b border-blue-500/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Contact link */}
          {!scrolled && (
            <div className="hidden md:flex items-center">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="group font-mono text-[11px] text-slate-300 hover:text-blue-400 flex items-center gap-1 transition-colors py-1.5"
              >
                Hire Me
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          )}

          {/* Mobile Hamburguer */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-blue-400 focus:outline-none p-1 rounded-full bg-white/5 border border-white/5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-[5%] right-[5%] z-45 glass-card bg-[#0d0d0d]/95 border border-white/10 rounded-3xl p-6 md:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-3.5 font-mono text-xs">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-l-2 border-blue-500 text-blue-400 font-bold"
                        : "text-slate-400 hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <div className="h-[1px] bg-white/5 my-1.5" />
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 font-bold text-center text-xs flex items-center justify-center gap-1 cursor-pointer text-white shadow-[0_0_15px_rgba(59,130,246,0.25)]"
              >
                Let&apos;s Talk
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
