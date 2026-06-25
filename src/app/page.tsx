"use client";

import { useState, useEffect } from "react";
import { 
  Home as HomeIcon, 
  Award, 
  Cpu, 
  FolderOpen, 
  Mail, 
  Wifi, 
  Battery, 
  Search, 
  Cloud, 
  User, 
  Calendar
} from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import AnimatedBackground from "@/components/AnimatedBackground";
import Dock from "@/components/Dock";
import Spotlight from "@/components/Spotlight";
import Navbar from "@/components/Navbar";
import { AnimatePresence } from "framer-motion";

// Application components
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechOrbit from "@/components/TechOrbit";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Animation / Scroll Imports
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTIONS = ["home", "about", "skills", "journey", "projects", "certifications", "contact"];

/* ─── Section wrapper ─── */
function Section({
  id,
  children,
  className = "",
  maxWidth = "max-w-[min(95vw,1600px)]",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <section
      id={id}
      className={`w-full ${maxWidth} mx-auto px-4 md:px-8 scroll-mt-28 relative z-10 ${className}`}
    >
      {children}
    </section>
  );
}

/* ─── Generic Section Label ─── */
function SectionLabel({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-10 flex flex-col items-center justify-center text-center select-none">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[9px] tracking-[0.35em] text-purple-550 text-purple-500 font-extrabold uppercase">
          {tag}
        </span>
        <div className="h-px w-20 bg-gradient-to-r from-purple-500/40 to-transparent" />
      </div>
      <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none font-mono mb-3">
        {title}
      </h2>
      <p className="text-[11px] text-slate-505 text-slate-500 font-mono tracking-wider uppercase">
        {subtitle}
      </p>
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [currentTime, setCurrentTime] = useState("");

  // 1. Clock updating menu bar time dynamically
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      setCurrentTime(date.toLocaleDateString("en-US", options).replace(",", ""));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Spotlight toggle shortcut hook (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // 3. Scroll tracking using Intersection Observer to dynamically update Dock/Navbar active items
  useEffect(() => {
    if (!loaded) return;

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [loaded]);

  // 4. Initialize Lenis + GSAP linkage
  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    // Scroll reveal for all sections except home
    SECTIONS.filter(id => id !== "home").forEach((sectionId) => {
      gsap.fromTo(
        `#${sectionId}`,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `#${sectionId}`,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickHandler);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loaded]);

  // Smooth scroll handler linking Dock, Spotlight and Navbar actions
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -96; // adjusted for sticky macOS bar + Navbar height
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const dockApps = [
    { id: "home", name: "Home", icon: <HomeIcon className="w-5 h-5" />, isOpen: activeSection === "home" },
    { id: "about", name: "About", icon: <User className="w-5 h-5" />, isOpen: activeSection === "about" },
    { id: "skills", name: "Orbit", icon: <Cpu className="w-5 h-5" />, isOpen: activeSection === "skills" },
    { id: "journey", name: "Journey", icon: <Calendar className="w-5 h-5" />, isOpen: activeSection === "journey" },
    { id: "projects", name: "Projects", icon: <FolderOpen className="w-5 h-5" />, isOpen: activeSection === "projects" },
    { id: "certifications", name: "Certs", icon: <Award className="w-5 h-5" />, isOpen: activeSection === "certifications" },
    { id: "contact", name: "Contact", icon: <Mail className="w-5 h-5" />, isOpen: activeSection === "contact" },
  ];

  return (
    <>
      {/* Dynamic preloader screen */}
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <div className="relative min-h-screen text-slate-100 font-mono select-none">
          {/* Animated coordinate wallpaper background */}
          <AnimatedBackground />

          {/* 1. Sleek Floating Pill Navbar */}
          <Navbar />

          {/* 2. Fixed top macOS Menu Bar */}
          <div className="fixed top-0 left-0 right-0 h-7 bg-black/45 border-b border-white/5 flex items-center justify-between px-4 z-[100] text-[11px] font-bold backdrop-blur-md">
            <div className="flex items-center gap-5">
              <span className="text-sm cursor-pointer hover:text-purple-400 transition-colors"></span>
              <span className="cursor-pointer hover:text-purple-400 transition-colors font-black">Ansh</span>
              <span className="cursor-pointer hover:text-purple-400 transition-colors hidden sm:inline">File</span>
              <span className="cursor-pointer hover:text-purple-400 transition-colors hidden sm:inline">Edit</span>
              <span className="cursor-pointer hover:text-purple-400 transition-colors hidden sm:inline">View</span>
              <span className="cursor-pointer hover:text-purple-400 transition-colors hidden sm:inline">Go</span>
              <span className="cursor-pointer hover:text-purple-400 transition-colors hidden sm:inline">Window</span>
              <span className="cursor-pointer hover:text-purple-400 transition-colors hidden sm:inline">Help</span>
            </div>

            <div className="flex items-center gap-4 text-slate-350">
              <div className="flex items-center gap-1 hover:text-purple-400 cursor-pointer">
                <Cloud className="w-3.5 h-3.5" />
                <span className="text-[10px]">31°C</span>
              </div>
              <Wifi className="w-3.5 h-3.5 hover:text-purple-400 cursor-pointer" />
              <div className="flex items-center gap-1">
                <Battery className="w-3.5 h-3.5" />
                <span className="text-[10px]">100%</span>
              </div>
              <button
                onClick={() => setSpotlightOpen(true)}
                className="hover:text-purple-400 focus:outline-none cursor-pointer"
                title="Search Spotlight (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] select-none border-l border-white/10 pl-3">
                {currentTime}
              </span>
            </div>
          </div>

          {/* 3. Scrolling Section flow */}
          <main className="w-full flex flex-col pt-16 pb-24 relative z-10 gap-0">
            
            {/* ─── HOME: Hero Section ─── */}
            <div id="home">
              <Hero onScrollTo={handleScrollTo} />
            </div>

            {/* ─── ABOUT ─── */}
            <Section id="about" className="py-12 md:py-16">
              <About />
            </Section>
 
            {/* Divider */}
            <div className="w-full max-w-[min(95vw,1600px)] mx-auto px-4 md:px-8 py-2">
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            </div>

            {/* ─── SKILLS: Tech Orbit ─── */}
            <Section id="skills" className="py-12 md:py-16">
              <TechOrbit />
            </Section>
 
            {/* Divider */}
            <div className="w-full max-w-[min(95vw,1600px)] mx-auto px-4 md:px-8 py-2">
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            </div>

            {/* ─── JOURNEY: Career Timeline ─── */}
            <Section id="journey" className="py-12 md:py-16">
              <Journey />
            </Section>
 
            {/* Divider */}
            <div className="w-full max-w-[min(95vw,1600px)] mx-auto px-4 md:px-8 py-2">
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            </div>

            {/* ─── PROJECTS: Featured Projects ─── */}
            <Section id="projects" className="py-12 md:py-16">
              <Projects />
            </Section>
 
            {/* Divider */}
            <div className="w-full max-w-[min(95vw,1600px)] mx-auto px-4 md:px-8 py-2">
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            </div>

            {/* ─── CERTIFICATIONS ─── */}
            <Section id="certifications" className="py-12 md:py-16">
              <Certifications />
            </Section>
 
            {/* Divider */}
            <div className="w-full max-w-[min(95vw,1600px)] mx-auto px-4 md:px-8 py-2">
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            </div>

            {/* ─── CONTACT ─── */}
            <Section id="contact" className="py-12 md:py-16 mb-6">
              <SectionLabel
                tag="transmission lock"
                title="Let's Connect"
                subtitle="Direct socket routing protocol for messaging payloads"
              />
              <div className="w-full rounded-2xl border border-white/[0.04] shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden">
                <Contact />
              </div>
            </Section>
          </main>

          {/* 4. Bottom floating Dock */}
          <Dock
            items={dockApps}
            onOpenApp={handleScrollTo}
          />

          {/* 5. Footer */}
          <Footer />

          {/* 6. Spotlight search overlay */}
          <AnimatePresence>
            {spotlightOpen && (
              <Spotlight
                isOpen={spotlightOpen}
                onClose={() => setSpotlightOpen(false)}
                onOpenApp={handleScrollTo}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
