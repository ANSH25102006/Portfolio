"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { 
  ExternalLink, 
  Check, 
  AlertCircle, 
  Sparkles
} from "lucide-react";
import { Github } from "@/components/icons";
import TiltCard from "@/components/TiltCard";

// ─── PROJECT VISUAL 1: MediCompare Overlapping Mockups ───
function MediCompareVisual() {
  return (
    <div className="relative w-full h-[360px] md:h-[440px] flex items-center justify-center p-6 select-none">
      {/* Background radial purple glow */}
      <div className="absolute inset-0 bg-purple-600/10 blur-[80px] pointer-events-none rounded-3xl" />
      
      {/* Main Home Page Screenshot (Back Layer) */}
      <div className="absolute top-10 left-6 w-[80%] aspect-[1.6/1] rounded-xl border border-white/10 bg-[#0d0f22] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 group-hover:scale-102 group-hover:border-purple-500/30">
        {/* macOS header stub */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-black/40">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
          <div className="mx-auto w-1/2 h-3.5 rounded bg-white/5 flex items-center justify-center text-[7px] text-slate-400 font-mono">
            medi-compare.netlify.app
          </div>
        </div>
        <div className="relative w-full h-full">
          <Image 
            src="/images/project1_medicompare_home.png" 
            alt="MediCompare Home Page" 
            fill
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Search Results Page Screenshot (Front Layer, Overlapping Right) */}
      <div className="absolute bottom-10 right-6 w-[70%] aspect-[1.6/1] rounded-xl border border-white/10 bg-[#0d0f22] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:translate-x-1 group-hover:border-purple-400/40">
        {/* macOS header stub */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-black/40">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
          <div className="mx-auto w-1/2 h-3.5 rounded bg-white/5 flex items-center justify-center text-[7px] text-slate-400 font-mono">
            medi-compare.netlify.app/search
          </div>
        </div>
        <div className="relative w-full h-full">
          <Image 
            src="/images/project1_medicompare_results.png" 
            alt="MediCompare Search Results" 
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT VISUAL 2: Shop Forecast Pro Mockup ───
function ShopForecastProVisual() {
  return (
    <div className="relative w-full h-[360px] md:h-[440px] flex items-center justify-center p-6 select-none">
      {/* Background radial blue/indigo glow */}
      <div className="absolute inset-0 bg-blue-600/10 blur-[80px] pointer-events-none rounded-3xl" />

      {/* Main Panel Frame */}
      <div className="w-[90%] aspect-[1.6/1] rounded-xl border border-white/10 bg-[#070b19] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-500 group-hover:border-blue-500/30 group-hover:shadow-[0_25px_60px_rgba(59,130,246,0.15)] group-hover:scale-103">
        {/* Browser header stub */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-black/40">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
          <div className="mx-auto w-1/2 h-3.5 rounded bg-white/5 flex items-center justify-center text-[7px] text-slate-400 font-mono">
            forecast-pro.ai/dashboard
          </div>
        </div>
        <div className="relative w-full h-full">
          <Image 
            src="/images/project2_forecastpro.png" 
            alt="Shop Forecast Pro Analytics Dashboard" 
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT VISUAL 3: Lumen Study Twin Mockups ───
function LumenVisual() {
  return (
    <div className="relative w-full h-[360px] md:h-[440px] flex items-center justify-center p-6 select-none">
      {/* Background radial cyan/emerald glow */}
      <div className="absolute inset-0 bg-cyan-600/10 blur-[80px] pointer-events-none rounded-3xl" />

      {/* Landing Page (Back Layer) */}
      <div className="absolute top-10 left-6 w-[80%] aspect-[1.6/1] rounded-xl border border-white/10 bg-[#071318] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 group-hover:scale-102 group-hover:border-cyan-500/30">
        {/* Browser header stub */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-black/40">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
          <div className="mx-auto w-1/2 h-3.5 rounded bg-white/5 flex items-center justify-center text-[7px] text-slate-400 font-mono">
            lumen.study/dashboard
          </div>
        </div>
        <div className="relative w-full h-full">
          <Image 
            src="/images/project3_lumen_home.png" 
            alt="Lumen Study Twin Dashboard" 
            fill
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Signup Form View (Front Layer, Overlapping Right) */}
      <div className="absolute bottom-10 right-6 w-[62%] aspect-[1.4/1] rounded-xl border border-white/10 bg-[#071318] shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:translate-x-1 group-hover:border-cyan-400/40">
        {/* Browser header stub */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-black/40">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
          <div className="mx-auto w-1/2 h-3.5 rounded bg-white/5 flex items-center justify-center text-[7px] text-slate-400 font-mono">
            lumen.study/signup
          </div>
        </div>
        <div className="relative w-full h-full">
          <Image 
            src="/images/project3_lumen_signup.png" 
            alt="Lumen Study Twin Signup Portal" 
            fill
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

// ─── MODEL INTERFACE DEFINITIONS ───
interface ProjectData {
  number: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  liveLink: string;
  githubLink: string;
  metrics: { label: string; value: string }[];
  accentGlow: string;
  visual: React.ReactNode;
}

interface ProjectRowProps {
  project: ProjectData;
  idx: number;
}

// ─── RENDER SUB-COMPONENT (ADHERES TO REACT HOOK RULES) ───
function ProjectRow({ project, idx }: ProjectRowProps) {
  const isEven = idx % 2 === 0;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
      className="group relative w-full"
    >
      {/* Large faded numbers */}
      <div
        className="absolute -top-16 font-black text-[12rem] md:text-[18rem] text-purple-500/[0.015] font-mono select-none pointer-events-none leading-none z-0"
        style={{ 
          left: isEven ? "auto" : "0px", 
          right: isEven ? "0px" : "auto" 
        }}
      >
        {project.number}
      </div>

      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center z-10 relative">
        
        {/* 1. Visual Panel */}
        <div className={`col-span-12 lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <TiltCard className="w-full">
            <div 
              className="relative rounded-3xl border border-white/[0.04] overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(145deg, rgba(13,17,35,0.7) 0%, rgba(5,7,18,0.9) 100%)",
              }}
            >
              {/* Pulsing neon highlight on visual hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${project.accentGlow}, transparent 70%)`
                }}
              />
              
              {/* Project Visual Render */}
              {project.visual}

            </div>
          </TiltCard>
        </div>

        {/* 2. Detailed Content Panel */}
        <div className={`col-span-12 lg:col-span-5 flex flex-col justify-center select-text ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          
          {/* Category Badge & Index Indicator */}
          <div className="flex items-center gap-3.5 mb-4 select-none">
            <span className="font-mono text-[9px] text-purple-400 font-extrabold uppercase px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5">
              {project.category}
            </span>
            <span className="font-mono text-[9.5px] text-slate-500 font-bold uppercase tracking-wider">
              {"// ID_M0"}{idx + 1}
            </span>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none mb-2 font-mono group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <div className="text-[12px] md:text-sm font-semibold text-purple-400/90 font-mono mb-6 uppercase tracking-wider">
            {project.tagline}
          </div>

          {/* Core Description */}
          <p className="text-slate-300 text-lg lg:text-xl font-sans leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-6 border-y border-white/[0.05] py-6 text-[10.5px] font-mono">
            <div className="flex flex-col gap-1.5">
              <span className="text-slate-500 font-extrabold text-[8px] uppercase tracking-widest flex items-center gap-1.5">
                <AlertCircle className="w-3 h-3 text-rose-500" /> The Challenge
              </span>
              <p className="text-slate-400 font-sans leading-relaxed text-xs md:text-sm">
                {project.problem}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 border-l border-white/[0.05] pl-0 sm:pl-5">
              <span className="text-slate-500 font-extrabold text-[8px] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-emerald-400" /> The Solution
              </span>
              <p className="text-slate-400 font-sans leading-relaxed text-xs md:text-sm">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Features bullet list */}
          <div className="mb-6">
            <div className="text-[8.5px] font-black text-slate-500 font-mono uppercase tracking-widest mb-3">
              Core Features
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {project.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-xs md:text-sm font-mono text-slate-400">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack tags */}
          <div className="mb-8 select-none">
            <div className="text-[8.5px] font-black text-slate-500 font-mono uppercase tracking-widest mb-3">
              Engine Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[9px] text-slate-300 bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/20 hover:text-white px-2.5 py-1 rounded-lg transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics widgets */}
          <div className="mb-8 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
            <div className="text-[8.5px] font-black text-slate-500 font-mono uppercase tracking-widest mb-3.5">
              Developer Metrics
            </div>
            <div className="grid grid-cols-2 gap-3.5 text-center">
              {project.metrics.map((metric, mIdx) => (
                <div key={mIdx} className="p-2 rounded-xl bg-black/30 border border-white/5 flex flex-col justify-between items-center gap-0.5">
                  <span className="text-[8px] text-slate-500 font-mono uppercase font-bold">{metric.label}</span>
                  <span className="text-[10px] font-black text-white font-mono uppercase mt-0.5">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons actions */}
          <div className="flex items-center gap-4 select-none">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-mono font-black tracking-widest text-white uppercase transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
            >
              <Github className="w-3.5 h-3.5" />
              Repository
            </a>

            {project.liveLink !== "#" && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[10px] font-mono font-black tracking-widest text-slate-300 uppercase bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.06] hover:text-white transition-all duration-300 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Project
              </a>
            )}
          </div>

        </div>

      </div>
    </motion.div>
  );
}

// ─── MAIN CONTAINER REDESIGN ───
export default function Projects() {
  const containerRef = useRef(null);
  
  const projectsData: ProjectData[] = [
    {
      number: "01",
      category: "Healthcare Technology",
      title: "MediCompare",
      tagline: "Transparent Healthcare Pricing Platform",
      description: "A healthcare comparison platform that enables users to compare treatment costs, hospitals, and medical procedures across multiple providers, helping patients make informed healthcare decisions.",
      problem: "Patients struggle to find transparent pricing for medical procedures and often end up paying significantly more than necessary.",
      solution: "Built a centralized platform that aggregates hospital and procedure data, allowing instant price comparisons and better decision making.",
      features: [
        "Hospital Search",
        "Procedure Comparison",
        "Cost Transparency",
        "Responsive Design",
        "Advanced Filtering",
        "Supabase Database",
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel"],
      liveLink: "https://medi-compare.netlify.app",
      githubLink: "https://github.com/ANSH25102006",
      metrics: [
        { label: "Database Records", value: "15,000+" },
        { label: "Responsive Pages", value: "20+" },
        { label: "Search Optimized", value: "True" },
        { label: "Production Ready", value: "True" },
      ],
      accentGlow: "rgba(139, 92, 246, 0.2)",
      visual: <MediCompareVisual />
    },
    {
      number: "02",
      category: "AI + Retail Analytics",
      title: "Shop Forecast Pro",
      tagline: "Predicting Retail Trends with Data Intelligence",
      description: "An analytics platform that helps retailers forecast sales trends, inventory demand, and customer behavior using intelligent prediction models and interactive dashboards.",
      problem: "Retail businesses often struggle with inventory planning, leading to overstocking or stock shortages.",
      solution: "Developed a forecasting platform that visualizes sales data and predicts future demand patterns, helping businesses optimize inventory decisions.",
      features: [
        "Demand Forecasting",
        "Sales Analytics",
        "Interactive Dashboards",
        "Inventory Insights",
        "Data Visualization",
        "Business Reporting",
      ],
      techStack: ["React", "Node.js", "Express", "MongoDB", "Chart.js", "Tailwind CSS"],
      liveLink: "#",
      githubLink: "https://github.com/ANSH25102006",
      metrics: [
        { label: "Forecast Tracking", value: "Accuracy" },
        { label: "Analytics Dashboard", value: "Active" },
        { label: "Insights Engine", value: "Optimized" },
        { label: "Real-Time Charts", value: "Rendered" },
      ],
      accentGlow: "rgba(59, 130, 246, 0.2)",
      visual: <ShopForecastProVisual />
    },
    {
      number: "03",
      category: "Education Technology",
      title: "Lumen",
      tagline: "Personalized Digital Twin Study Assistant",
      description: "An adaptive educational analytics tool that tracks users' study sessions, sleeping parameters, and calendar deadlines, processing predictive behavior modeling to highlight focus cycles.",
      problem: "Students struggle to identify how sleep deprivation and deadline load impact their active study concentration cycles.",
      solution: "Engineered a centralized diagnostic tracker that compiles session length and bedtime logs, rendering real-time focus diagnostic correlations.",
      features: [
        "Behavioral Model",
        "Real Analytics",
        "Sleep ↔ Focus tracking",
        "Deadline Radar",
        "Smart Diagnostics",
        "Responsive Layout",
      ],
      techStack: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      liveLink: "#",
      githubLink: "https://github.com/ANSH25102006",
      metrics: [
        { label: "Study Diagnostics", value: "Active" },
        { label: "Personalized Models", value: "ARIMA-v2" },
        { label: "Telemetry Socket", value: "Online" },
        { label: "Architecture", value: "Scalable" },
      ],
      accentGlow: "rgba(6, 182, 212, 0.2)",
      visual: <LumenVisual />
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full py-10">
      
      {/* ─── WATERMARK BACKDROP ─── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[22vw] font-black text-purple-500/[0.008] uppercase tracking-widest leading-none select-none font-mono">
          WORKS
        </span>
      </div>

      {/* ─── SECTION HEADER ─── */}
      <div className="max-w-[1250px] mx-auto px-4 md:px-8 mb-24 select-none relative z-10">
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.35em] text-purple-400 font-extrabold uppercase">
              {"// Portfolio Showcase"}
            </span>
            <div className="h-[1px] w-12 bg-purple-500/30" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase font-mono leading-none mt-2">
            Featured Work
          </h2>
          
          <p className="text-slate-400 text-xs md:text-sm font-mono mt-4 max-w-xl leading-relaxed">
            Building scalable applications and solving real-world problems through full-stack development.
          </p>
        </div>
      </div>

      {/* ─── ALTERNATING SHOWCASE PROJECTS LIST ─── */}
      <div className="flex flex-col gap-36 md:gap-52 max-w-[1250px] mx-auto z-10 relative">
        {projectsData.map((project, idx) => (
          <div key={project.title}>
            <ProjectRow project={project} idx={idx} />
            
            {/* Spacing Divider Line */}
            {idx < projectsData.length - 1 && (
              <div className="w-full mt-36 md:mt-48 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
