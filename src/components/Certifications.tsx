"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  Clock, 
  Cpu, 
  Layers, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  X,
  Eye,
  CheckCircle2,
  Bookmark
} from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  year: number;
  credentialId: string;
  verifyUrl: string;
  image?: string;
  color: string;
  glow: string;
  skills: string[];
  overview?: string;
  badge: string;
  status: "Verified" | "Completed" | "In Queue";
}

// Custom animated counter component that runs when in view
function AnimatedCounter({ value, suffix = "", duration = 1.5 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 25);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Certifications() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredCertId, setHoveredCertId] = useState<string | null>(null);
  const [activeCertModal, setActiveCertModal] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
    {
      id: "cs50",
      title: "CS50x: Introduction to Computer Science",
      issuer: "Harvard University",
      date: "Nov 2024",
      year: 2025, // For progression ordering: python (2024) -> cs50 (2025) -> mern (2025) -> javascript (2025)
      credentialId: "CS50X-HARVARD-8A2F9C",
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      image: "/images/cs50_cert.jpg",
      color: "#ef4444", // Harvard Crimson Red
      glow: "rgba(239,68,68,0.18)",
      badge: "Academic Honor",
      status: "Verified",
      skills: ["Algorithms", "Data Structures", "C", "Python", "SQL", "Web Development"],
      overview: "Harvard University's legendary introduction to the intellectual enterprises of computer science and the art of programming. A rigorous curriculum covering low-level memory management, data structures (linked lists, trees, hash tables), algorithmic runtime analysis, and software systems in C, Python, SQL, and JavaScript."
    },
    {
      id: "jpmorgan",
      title: "Software Engineering Job Simulation",
      issuer: "JPMorgan Chase & Co.",
      date: "June 2026",
      year: 2026,
      credentialId: "JPM-SWE-SIM-2MMCFU",
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      image: "/images/jpmorgan_cert.jpg",
      color: "#3b82f6", // JPMorgan Corporate Blue
      glow: "rgba(59,130,246,0.18)",
      badge: "Simulation",
      status: "Verified",
      skills: ["Java", "Spring Boot", "React", "Perspective Charts", "System Engineering"],
      overview: "Completed practical software engineering tasks covering project setup, interface components, Spring Boot API integrations, data feed visualizations using JPMorgan's open-source Perspective library, and advanced unit testing."
    },
    {
      id: "ai_fundamentals",
      title: "Artificial Intelligence Fundamentals (CAIF™)",
      issuer: "Certaining",
      date: "April 2026",
      year: 2026,
      credentialId: "CERT-AI-FUND-000465",
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      image: "/images/ai_cert.jpg",
      color: "#06b6d4", // AI Cyan
      glow: "rgba(6,182,212,0.18)",
      badge: "Core AI Certification",
      status: "Verified",
      skills: ["Machine Learning", "Neural Networks", "Deep Learning", "AI Ethics", "Generative AI"],
      overview: "Demonstrated fundamental understanding of Artificial Intelligence concepts, machine learning algorithms, model training workflows, neural architectures, ethical AI alignment, and practical prompt engineering methodologies."
    },
    {
      id: "mern",
      title: "MERN Stack Developer Certification",
      issuer: "Advanced Development Academy",
      date: "Feb 2025",
      year: 2025,
      credentialId: "MERN-STACK-99A1C",
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      color: "#10b981", // Green
      glow: "rgba(16,185,129,0.15)",
      badge: "Expert Track",
      status: "Completed",
      skills: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"]
    },
    {
      id: "javascript",
      title: "Advanced JavaScript Programming",
      issuer: "Meta Academy // Coursera",
      date: "Sep 2024",
      year: 2025, // Displayed in the timeline sequence chronologically
      credentialId: "JS-ADVANCED-3C2B1D",
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      color: "#f59e0b", // Yellow
      glow: "rgba(245,158,11,0.15)",
      badge: "Specialization",
      status: "Completed",
      skills: ["JavaScript ES6+", "Design Patterns", "Asynchronous Programming", "APIs"]
    },
    {
      id: "python",
      title: "Programming with Python Specialization",
      issuer: "Harvard University // CS50P",
      date: "Dec 2024",
      year: 2024,
      credentialId: "PYTHON-HARVARD-4A2D8E",
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      color: "#a855f7", // Purple
      glow: "rgba(168,85,247,0.15)",
      badge: "Academic Honor",
      status: "Verified",
      skills: ["Python 3", "Unit Testing", "Object-Oriented Programming", "File I/O"]
    },
    {
      id: "future_cert",
      title: "System Architecture & Cloud Engineering",
      issuer: "AWS / Kubernetes Queue",
      date: "Planned Q3 2026",
      year: 2026,
      credentialId: "STATUS-QUEUE-0x0F",
      verifyUrl: "#",
      color: "#64748b", // Slate
      glow: "rgba(100,116,139,0.06)",
      badge: "Up Next",
      status: "In Queue",
      skills: ["Amazon Web Services", "Docker Containerization", "Kubernetes", "CI/CD Orchestration"]
    }
  ];

  // Stats definition
  const stats = [
    { label: "Certifications Earned", value: 6, suffix: "+", icon: <Award className="w-4 h-4 text-purple-400" /> },
    { label: "Learning Hours", value: 400, suffix: "+ Hrs", icon: <Clock className="w-4 h-4 text-cyan-400" /> },
    { label: "Technologies Mastered", value: 12, suffix: "+ Tech", icon: <Cpu className="w-4 h-4 text-blue-400" /> },
    { label: "Projects Built", value: 15, suffix: "+ Builds", icon: <Layers className="w-4 h-4 text-emerald-400" /> }
  ];

  // Timeline progression list
  const timelineMilestones = [
    { year: "2024", label: "Python Specialization", subtitle: "Harvard CS50P", certId: "python" },
    { year: "2025", label: "CS50 Introduction to CS", subtitle: "Harvard University", certId: "cs50" },
    { year: "2025", label: "MERN Stack Development", subtitle: "Advanced Academy", certId: "mern" },
    { year: "2025", label: "Advanced JavaScript", subtitle: "Meta / Coursera", certId: "javascript" },
    { year: "2026", label: "Software Eng Job Simulation", subtitle: "JPMorgan Chase", certId: "jpmorgan" }
  ];

  // Main featured certification (CS50x)
  const featuredCert = certificates.find(c => c.id === "cs50")!;
  // Other grid certifications
  const gridCerts = certificates.filter(c => c.id !== "cs50");

  return (
    <div ref={containerRef} className="relative w-full text-slate-100 font-sans">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[14vw] font-black text-white/[0.005] uppercase tracking-[0.2em] leading-none select-none font-mono">
          CREDENTIALS
        </span>
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-center justify-center mb-10 select-none relative z-10 text-center">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="font-mono text-[9px] tracking-[0.3em] text-purple-400 font-bold uppercase">
            {"// credentials database"}
          </span>
          <div className="h-px w-12 bg-gradient-to-r from-purple-500/40 to-transparent" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none font-mono">
          Certifications & Achievements
        </h2>
        <p className="text-xs md:text-[13px] text-slate-400 font-mono mt-3 max-w-2xl leading-relaxed">
          Validated knowledge across software engineering, web development, computer science, and modern technologies.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 z-10 relative">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col p-4 rounded-xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-md relative overflow-hidden group hover:border-purple-500/20 hover:bg-white/[0.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{stat.label}</span>
              <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] group-hover:bg-purple-500/5 group-hover:border-purple-500/10 transition-colors">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-black text-white font-mono mt-1 flex items-baseline">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            {/* Ambient border gradient on hover */}
            <div className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/10 rounded-xl pointer-events-none transition-all duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Grid Container for Sidebar Timeline + Certs Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Timeline progression (visible on Desktop) */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 border border-white/[0.04] bg-white/[0.01] backdrop-blur-md rounded-2xl p-5 select-none h-fit">
            <h3 className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              Learning Journey
            </h3>
            
            <div className="relative pl-4 border-l border-white/[0.06] ml-2 flex flex-col gap-6">
              {timelineMilestones.map((milestone, idx) => {
                const isActive = hoveredCertId === milestone.certId;
                return (
                  <div 
                    key={idx}
                    className="relative cursor-pointer group"
                    onMouseEnter={() => setHoveredCertId(milestone.certId)}
                    onMouseLeave={() => setHoveredCertId(null)}
                  >
                    {/* Glowing Bullet */}
                    <div 
                      className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border transition-all duration-350 ${
                        isActive 
                          ? "bg-purple-500 border-purple-400 scale-125 shadow-[0_0_10px_rgba(168,85,247,0.7)]" 
                          : "bg-black border-white/20 group-hover:border-purple-400/50"
                      }`}
                    />
                    
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-mono font-black tracking-widest ${isActive ? "text-purple-400" : "text-slate-500"} transition-colors`}>
                        {milestone.year}
                      </span>
                      <span className={`text-[11px] font-bold mt-0.5 leading-snug ${isActive ? "text-white" : "text-slate-350 group-hover:text-slate-200"} transition-colors`}>
                        {milestone.label}
                      </span>
                      <span className="text-[9px] text-slate-500 font-mono mt-0.5">{milestone.subtitle}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-[9px] text-slate-500 font-mono">
              <Calendar className="w-3 h-3" />
              <span>Timeline updated Jun 2026</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero featured card + asymmetrical grid */}
        <div className="col-span-1 lg:col-span-9 flex flex-col gap-6">
          
          {/* Featured Card (CS50x) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`w-full bg-white/[0.01] hover:bg-white/[0.015] border border-white/[0.05] hover:border-red-500/20 backdrop-blur-md rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 relative overflow-hidden group transition-all duration-500 cursor-default ${
              hoveredCertId === "cs50" ? "border-red-500/30 bg-white/[0.02]" : ""
            }`}
            style={{
              boxShadow: hoveredCertId === "cs50" || hoveredCertId === null && hoveredCertId === "cs50" 
                ? `0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(239,68,68,0.06)`
                : "0 15px 35px rgba(0,0,0,0.3)"
            }}
            onMouseEnter={() => setHoveredCertId("cs50")}
            onMouseLeave={() => setHoveredCertId(null)}
          >
            {/* Ambient Background Aura */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-500/[0.02] rounded-full blur-[100px] pointer-events-none group-hover:bg-red-500/[0.04] transition-all duration-700" />
            
            {/* Left side: Certificate Preview Image */}
            <div className="relative w-full md:w-[320px] aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.06] shadow-xl flex-shrink-0 bg-black/60 group-hover:border-red-500/30 transition-all duration-500 select-none">
              {featuredCert.image && (
                <Image
                  src={featuredCert.image}
                  alt={featuredCert.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-contain p-2.5 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              )}
              {/* Blur backdrop overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Click to preview visual cue */}
              <div 
                onClick={() => setActiveCertModal(featuredCert)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex items-center justify-center gap-2 cursor-pointer z-10"
              >
                <div className="px-3.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider font-bold text-white flex items-center gap-1.5 uppercase hover:bg-white/20 transition-all">
                  <Eye className="w-3.5 h-3.5" />
                  Inspect Credential
                </div>
              </div>
            </div>

            {/* Right side: Detailed contents */}
            <div className="flex-grow flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wide uppercase bg-red-500/10 text-red-400 border border-red-500/20">
                      {featuredCert.badge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      {featuredCert.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono font-bold select-none">{featuredCert.date}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-1 select-none font-mono tracking-tight group-hover:text-red-400 transition-colors">
                  {featuredCert.title}
                </h3>
                <span className="text-xs font-bold text-slate-400 block mb-4 select-none">
                  {featuredCert.issuer}
                </span>

                <div className="mb-4">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Credential Overview</span>
                  <p className="text-[12px] text-slate-350 leading-relaxed font-sans select-none">
                    {featuredCert.overview}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Skills Gained</span>
                  <div className="flex flex-wrap gap-1.5">
                    {featuredCert.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-[10px] text-slate-300 font-mono hover:bg-red-500/5 hover:border-red-500/10 transition-colors duration-300 select-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04] mt-auto">
                <a
                  href={featuredCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-[10px] font-mono font-bold tracking-wider text-white uppercase bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-all flex items-center gap-1.5"
                >
                  View Credential
                  <ExternalLink className="w-3 h-3" />
                </a>
                
                <button
                  onClick={() => setActiveCertModal(featuredCert)}
                  className="px-4 py-2 rounded-lg text-[10px] font-mono font-bold tracking-wider text-black bg-white hover:bg-slate-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  View Details
                  <Eye className="w-3 h-3 text-black" />
                </button>
              </div>
            </div>
            
            {/* Decorative Laser Scanned Line */}
            {hoveredCertId === "cs50" && (
              <motion.div
                initial={{ top: 0 }}
                animate={{ top: "100%" }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1.5px] z-20 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${featuredCert.color}, transparent)`,
                  boxShadow: `0 0 10px ${featuredCert.color}`,
                }}
              />
            )}
          </motion.div>

          {/* Other Certifications Grid with Size Variations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
            {gridCerts.map((cert) => {
              const isHovered = hoveredCertId === cert.id;
              // Set JPMorgan to span 2 columns on desktop to break up uniformity
              const isWide = cert.id === "jpmorgan";

              return (
                <motion.div
                  key={cert.id}
                  onMouseEnter={() => setHoveredCertId(cert.id)}
                  onMouseLeave={() => setHoveredCertId(null)}
                  className={`group relative flex flex-col justify-between rounded-2xl border backdrop-blur-md transition-all duration-500 cursor-default bg-white/[0.01] p-5 h-full ${
                    isWide ? "md:col-span-2" : "col-span-1"
                  } ${isHovered ? "bg-white/[0.015]" : ""}`}
                  style={{
                    boxShadow: isHovered
                      ? `0 20px 45px rgba(0,0,0,0.55), 0 0 25px ${cert.glow}`
                      : "0 10px 25px rgba(0,0,0,0.3)",
                    borderColor: isHovered ? `${cert.color}35` : "rgba(255,255,255,0.04)"
                  }}
                >
                  <div>
                    {/* Top status bar */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="px-2 py-0.5 rounded-full text-[8.5px] font-bold font-mono tracking-wide uppercase border"
                          style={{
                            backgroundColor: `${cert.color}0a`,
                            color: cert.color,
                            borderColor: `${cert.color}25`
                          }}
                        >
                          {cert.badge}
                        </span>
                        
                        {cert.status === "Verified" ? (
                          <span className="inline-flex items-center gap-0.5 text-[8px] font-bold font-mono text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 rounded-full border border-emerald-500/10">
                            <ShieldCheck className="w-2.5 h-2.5" />
                            Verified
                          </span>
                        ) : cert.status === "In Queue" ? (
                          <span className="inline-flex items-center gap-0.5 text-[8px] font-bold font-mono text-slate-400 bg-slate-500/5 px-1.5 py-0.5 rounded-full border border-slate-500/10">
                            <Bookmark className="w-2.5 h-2.5" />
                            In Queue
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 text-[8px] font-bold font-mono text-blue-400 bg-blue-500/5 px-1.5 py-0.5 rounded-full border border-blue-500/10">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Completed
                          </span>
                        )}
                      </div>
                      
                      <span className="text-[9px] text-slate-500 font-mono font-bold select-none">{cert.date}</span>
                    </div>

                    {/* Content layout (Split side-by-side for Wide card) */}
                    <div className={`flex flex-col gap-4 ${isWide ? "md:flex-row md:items-start" : ""}`}>
                      
                      {/* Image Thumbnail Block (If available) */}
                      {cert.image && (
                        <div 
                          className={`relative aspect-[4/3] rounded-lg overflow-hidden border border-white/[0.05] bg-black/55 group-hover:border-white/10 transition-colors flex-shrink-0 mx-auto select-none cursor-pointer ${
                            isWide ? "w-full md:w-[220px]" : "w-full"
                          }`}
                        >
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            sizes={isWide ? "220px" : "100vw"}
                            className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          />
                          
                          {/* Laser Scan scanning line inside thumbnail */}
                          {isHovered && (
                            <motion.div
                              initial={{ top: 0 }}
                              animate={{ top: "100%" }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                              className="absolute left-0 right-0 h-[1.5px] z-10 pointer-events-none"
                              style={{
                                background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
                                boxShadow: `0 0 8px ${cert.color}`,
                              }}
                            />
                          )}
                          
                          {/* Zoom Hover action Overlay */}
                          <div 
                            onClick={() => setActiveCertModal(cert)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                          >
                            <Eye className="w-5 h-5 text-white/80" />
                          </div>
                        </div>
                      )}

                      {/* Text info block */}
                      <div className="flex-grow">
                        <h4 className="text-sm font-bold text-white leading-tight font-mono tracking-tight group-hover:text-purple-400 transition-colors">
                          {cert.title}
                        </h4>
                        <span className="text-[11px] font-bold text-slate-400 block mt-0.5 mb-2.5">
                          {cert.issuer}
                        </span>
                        
                        {cert.overview && isWide && (
                          <p className="text-[11.5px] text-slate-350 mb-3 leading-relaxed hidden md:block">
                            {cert.overview}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-1 mt-2">
                          {cert.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.04] text-[9px] text-slate-400 font-mono group-hover:border-white/10 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification button footer */}
                  <div className="flex items-center justify-between border-t border-white/[0.04] pt-3 mt-4">
                    <div className="flex flex-col">
                      <span className="text-[6.5px] text-slate-500 uppercase tracking-widest font-mono">Telemetry ID</span>
                      <span className="text-[8.5px] font-mono text-slate-400 font-bold leading-none mt-0.5">{cert.credentialId}</span>
                    </div>

                    {cert.status !== "In Queue" && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold tracking-wider text-white uppercase border border-white/[0.04] hover:bg-white/[0.05] transition-all"
                        style={{
                          borderColor: isHovered ? `${cert.color}25` : "rgba(255,255,255,0.04)",
                          boxShadow: isHovered ? `0 0 10px ${cert.color}05` : "none"
                        }}
                      >
                        Verify Code
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>

                  {/* Timeline Indicator for each card (Top/Right or Left Tag) */}
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 border-y border-r border-white/5 rounded-r-md hidden lg:flex items-center justify-center bg-black/60 pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-mono text-slate-400 rotate-90">{cert.year}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom view links */}
          <div className="flex justify-end mt-4 select-none">
            <a
              href="https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 hover:text-purple-400 transition-colors"
            >
              Verify Complete Registry
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>
          </div>

        </div>
      </div>

      {/* Full-Screen Credential Inspection Modal */}
      <AnimatePresence>
        {activeCertModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out"
            onClick={() => setActiveCertModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[#0c0c0e]/95 border border-white/[0.08] rounded-2xl p-6 md:p-8 cursor-default flex flex-col md:flex-row gap-6 items-center shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveCertModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.1] transition-all cursor-pointer z-20 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Large Image Frame */}
              <div 
                className="relative w-full md:w-[460px] aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.06] bg-black/90 shadow-inner flex-shrink-0 flex items-center justify-center p-3 select-none"
                style={{
                  boxShadow: `0 0 40px ${activeCertModal.glow}`
                }}
              >
                {activeCertModal.image ? (
                  <Image
                    src={activeCertModal.image}
                    alt={activeCertModal.title}
                    fill
                    sizes="(max-width: 768px) 100%, 460px"
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 gap-2">
                    <BookOpen className="w-10 h-10 mb-2" style={{ color: activeCertModal.color }} />
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">Digital Accreditation Record</span>
                    <h4 className="text-md font-bold text-white font-mono">{activeCertModal.title}</h4>
                    <span className="text-xs text-slate-400">{activeCertModal.issuer}</span>
                  </div>
                )}
              </div>

              {/* Detail Info on Right */}
              <div className="flex-grow flex flex-col justify-between w-full h-full">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono tracking-wide uppercase bg-white/[0.03] border border-white/[0.05]" style={{ color: activeCertModal.color }}>
                      {activeCertModal.badge}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 bg-white/[0.02] border border-white/[0.04] px-2 py-0.5 rounded-full">
                      Class of {activeCertModal.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-mono text-white leading-tight mb-1">
                    {activeCertModal.title}
                  </h3>
                  <span className="text-xs font-bold text-slate-400 block mb-4">
                    {activeCertModal.issuer}
                  </span>

                  <div className="mb-4">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5">Acquisition & Skills</span>
                    <p className="text-[12.5px] text-slate-300 leading-relaxed font-sans">
                      {activeCertModal.overview || `Successful completion of professional modules covering core components, architectures, code design patterns, and programming structures relevant to ${activeCertModal.title}.`}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Validated Competencies</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCertModal.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-[10px] text-slate-300 font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer details & direct link */}
                <div className="pt-4 border-t border-white/[0.06] mt-auto">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col">
                      <span className="text-[7px] text-slate-500 uppercase tracking-widest font-mono">Registry Serial Code</span>
                      <span className="text-[10px] font-mono text-slate-300 font-bold mt-0.5">{activeCertModal.credentialId}</span>
                    </div>

                    {activeCertModal.status !== "In Queue" && (
                      <a
                        href={activeCertModal.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-mono font-bold tracking-wider text-black bg-white hover:bg-slate-200 transition-all uppercase"
                      >
                        Verify Credential
                        <ExternalLink className="w-3 h-3 text-black" />
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
