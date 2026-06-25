"use client";

import React, { useState, useMemo } from "react";
import { Database, Search, ShieldCheck, ExternalLink, FileCode, Award } from "lucide-react";

interface CertificateRecord {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verified: boolean;
  verifyUrl: string;
  details: string;
  issuerKey: "harvard" | "jpmorgan" | "google" | "meta" | "freecodecamp" | "udemy";
  credentialId: string;
}

const certificates: CertificateRecord[] = [
    {
      id: "cs50",
      title: "CS50: Introduction to Computer Science",
      issuer: "Harvard University // edX",
      date: "Nov 2024",
      verified: true,
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      details: "Rigorous computer science fundamentals course covering algorithm implementations, Big O notation complexity analysis, memory layouts in C, structures, SQL databases schemas, and Web development servers configurations.",
      issuerKey: "harvard",
      credentialId: "CS50-HARVARD-8A2F9C"
    },
    {
      id: "jpmc_se",
      title: "Software Engineering Job Simulation",
      issuer: "J.P. Morgan Chase & Co. // Forage",
      date: "Feb 2025",
      verified: true,
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      details: "Simulated software work tasks covering interface data feeds manipulation, React component state management, Perspective analytics charting layouts refactoring, and Python data stream setups.",
      issuerKey: "jpmorgan",
      credentialId: "FORAGE-JPMC-SE-49B1A"
    },
    {
      id: "meta_frontend",
      title: "Meta Front-End Developer specialization",
      issuer: "Meta // Coursera",
      date: "Oct 2024",
      verified: true,
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      details: "Professional certification covering HTML5 layout forms, CSS flexbox grids, TypeScript core logic, React SPA routing, UI design wireframes prototyping, and testing packages config.",
      issuerKey: "meta",
      credentialId: "COURSERA-META-FE-71C28"
    },
    {
      id: "google_it",
      title: "Google Python IT Automation",
      issuer: "Google // Coursera",
      date: "Jun 2024",
      verified: true,
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      details: "Comprehensive study covering Python script execution, automated file system operations, regex syntax lookups, package updates checks, and Git version control branching structures.",
      issuerKey: "google",
      credentialId: "COURSERA-GOOG-PY-082DE"
    },
    {
      id: "fcc_responsive",
      title: "Responsive Web Design Certification",
      issuer: "freeCodeCamp.org",
      date: "Apr 2024",
      verified: true,
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      details: "Hands-on projects solving layout styling requirements: HTML5 typography nodes, CSS grid alignment layers, absolute viewport queries, flex blocks, and color schemes customization.",
      issuerKey: "freecodecamp",
      credentialId: "FCC-RESPONSIVE-WEB-29A"
    },
    {
      id: "udemy_fullstack",
      title: "Complete Full-Stack Web Bootcamp",
      issuer: "Udemy Academy",
      date: "Sep 2024",
      verified: true,
      verifyUrl: "https://docs.google.com/document/d/1T0xiLyAFQPJCU6rR3u9H0fSq_chkk3VlVOvcwMXdWYk/edit",
      details: "Full stack training mapping Frontend grids styling to NodeJS/Express backend, SQL database models query pipelines, REST services endpoints construction, and deployment.",
      issuerKey: "udemy",
      credentialId: "UDEMY-FULLSTACK-DE-91024"
    }
  ];

export default function CredentialsDatabase() {
  const [activeIssuer, setActiveIssuer] = useState<"all" | "harvard" | "jpmorgan" | "google" | "meta" | "freecodecamp" | "udemy">("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>("cs50");

  // Filtering calculations
  const filtered = useMemo(() => {
    return certificates.filter((item) => {
      const matchIssuer = activeIssuer === "all" || item.issuerKey === activeIssuer;
      const matchSearch = 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.issuer.toLowerCase().includes(search.toLowerCase()) ||
        item.credentialId.toLowerCase().includes(search.toLowerCase());
      return matchIssuer && matchSearch;
    });
  }, [activeIssuer, search]);

  const selectedRecord = useMemo(() => {
    return certificates.find(c => c.id === selectedId) || filtered[0] || certificates[0];
  }, [selectedId, filtered]);

  return (
    <div className="font-mono text-xs text-slate-350 flex flex-col gap-4 select-text h-full min-h-[440px]">
      
      {/* Database Search header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-white tracking-wider text-[11px] uppercase">CREDENTIALS // DOCUMENT_DB</span>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 w-full sm:max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[10px] text-white placeholder-slate-600 font-mono"
            placeholder="Search credentials..."
          />
        </div>
      </div>

      {/* Dual Pane Explorer Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-grow overflow-hidden">
        
        {/* 1. Left Sidebar Organizations */}
        <div className="md:col-span-3 border-r border-white/5 pr-3 flex flex-col gap-4">
          <div>
            <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">{"// ISSUERS"}</span>
            <div className="flex flex-col gap-1">
              {(
                [
                  { id: "all", name: "All Documents", count: certificates.length },
                  { id: "harvard", name: "Harvard University", count: certificates.filter(c => c.issuerKey === "harvard").length },
                  { id: "jpmorgan", name: "J.P. Morgan Chase", count: certificates.filter(c => c.issuerKey === "jpmorgan").length },
                  { id: "meta", name: "Meta (Coursera)", count: certificates.filter(c => c.issuerKey === "meta").length },
                  { id: "google", name: "Google (Coursera)", count: certificates.filter(c => c.issuerKey === "google").length },
                  { id: "freecodecamp", name: "freeCodeCamp", count: certificates.filter(c => c.issuerKey === "freecodecamp").length },
                  { id: "udemy", name: "Udemy Academy", count: certificates.filter(c => c.issuerKey === "udemy").length }
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveIssuer(item.id);
                    // Select first available item in category
                    const matched = certificates.find(c => item.id === "all" || c.issuerKey === item.id);
                    if (matched) setSelectedId(matched.id);
                  }}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-left text-[9px] font-bold cursor-pointer transition-colors ${
                    activeIssuer === item.id 
                      ? "bg-white/10 text-white" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className={`w-3.5 h-3.5 ${activeIssuer === item.id ? "text-blue-400" : "text-slate-500"}`} />
                    <span className="truncate max-w-[90px]">{item.name}</span>
                  </div>
                  <span className="text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-slate-500 font-bold">{item.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Middle Column: Table Document Registry */}
        <div className="md:col-span-4 border-r border-white/5 pr-3 overflow-y-auto max-h-[380px] window-scroll">
          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">{"// REGISTRY_LIST"}</span>
          <div className="flex flex-col gap-1.5">
            {filtered.length > 0 ? (
              filtered.map((item) => {
                const isSelected = selectedId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`px-3 py-2 rounded-lg border text-left cursor-pointer transition-colors duration-200 ${
                      isSelected 
                        ? "bg-blue-600/15 border-blue-500/40 text-white" 
                        : "bg-white/[0.01] border-white/5 hover:bg-white/[0.02] hover:border-white/10"
                    }`}
                  >
                    <span className="font-bold text-[10px] block leading-tight">{item.title}</span>
                    <span className="text-[8px] text-slate-500 block mt-1 uppercase font-bold">{item.issuer}</span>
                  </div>
                );
              })
            ) : (
              <div className="py-4 text-center text-slate-500">Empty registry matching filters.</div>
            )}
          </div>
        </div>

        {/* 3. Right Column: High Fidelity Document Preview Panel */}
        <div className="md:col-span-5 border border-white/5 bg-white/[0.01] p-4 rounded-xl flex flex-col justify-between overflow-y-auto max-h-[380px] window-scroll">
          {selectedRecord ? (
            <div className="flex flex-col gap-4">
              
              {/* Graphical Document Mockup Frame */}
              <div className="relative aspect-[1.414/1] w-full border border-white/10 bg-black/40 rounded-lg flex flex-col items-center justify-between p-4 overflow-hidden relative shadow-inner">
                {/* Background decorative seals */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-blue-500/5 rounded-full border border-dashed border-blue-500/10 pointer-events-none" />
                
                {/* Certificate Frame Header */}
                <div className="w-full text-center shrink-0">
                  <span className="text-[6px] tracking-widest text-slate-500 uppercase block font-black">CERTIFICATE OF ACHIEVEMENT</span>
                  <div className="w-8 h-[1px] bg-blue-500/30 mx-auto mt-1" />
                </div>

                {/* Certificate Recipient / Details */}
                <div className="w-full text-center my-auto flex flex-col items-center justify-center gap-1.5">
                  <span className="text-[7px] text-slate-500">Awarded to:</span>
                  <span className="text-white font-extrabold text-[11px] font-sans tracking-wide">ANSH PANDEY</span>
                  <div className="text-[8px] text-slate-350 font-bold max-w-[200px] leading-tight break-words truncate">
                    {selectedRecord.title}
                  </div>
                </div>

                {/* Certificate Seal & Date signatures */}
                <div className="w-full flex items-end justify-between text-[6px] text-slate-500 shrink-0 font-sans border-t border-white/5 pt-1.5">
                  <div>
                    <span>ISSUED: </span>
                    <span className="font-bold text-slate-400 font-mono">{selectedRecord.date}</span>
                  </div>
                  <Award className="w-5 h-5 text-blue-500/40" />
                  <div>
                    <span>ID: </span>
                    <span className="font-bold text-slate-400 font-mono">{selectedRecord.credentialId}</span>
                  </div>
                </div>

                {/* Security border overlays */}
                <div className="absolute inset-1.5 border border-white/5 pointer-events-none rounded" />
              </div>

              {/* Certificate Metadata Information */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-[8px] text-slate-500 font-extrabold uppercase mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Credentials manifest</span>
                </div>
                
                <p className="text-[10px] text-slate-400 leading-relaxed bg-black/25 border border-white/5 p-3 rounded font-sans">
                  {selectedRecord.details}
                </p>

                <div className="grid grid-cols-2 gap-y-1.5 pt-2 text-[9px] border-t border-white/5">
                  <div className="text-slate-500">CREDENTIAL_UUID:</div>
                  <div className="text-slate-200 font-bold font-mono text-right">{selectedRecord.credentialId}</div>
                  
                  <div className="text-slate-500">AUTHORITY:</div>
                  <div className="text-slate-200 font-bold text-right truncate">{selectedRecord.issuer}</div>
                  
                  <div className="text-slate-500">DATE:</div>
                  <div className="text-slate-200 font-bold text-right">{selectedRecord.date}</div>
                </div>
              </div>

              {/* Action dispatch button */}
              <div className="pt-3 border-t border-white/5 mt-auto">
                <a
                  href={selectedRecord.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 font-bold text-[9px] tracking-wider text-white shadow-[0_0_12px_rgba(59,130,246,0.25)] hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all cursor-pointer uppercase"
                >
                  VERIFY ONLINE
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          ) : (
            <div className="py-8 text-center text-slate-500 flex flex-col justify-center h-full">
              Select a credential registry entry to inspect.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
