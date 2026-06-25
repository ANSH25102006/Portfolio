"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mail, Terminal as TerminalIcon, Send, CheckCircle2, ShieldAlert, Trophy } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

type FormState = "input" | "validating" | "connecting" | "sending" | "success";

interface LogMessage {
  text: string;
  type: "info" | "success" | "error" | "process";
}

interface ContactCard {
  name: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  accent: string;
  glow: string;
}

export default function ContactTerminal() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<FormState>("input");
  const [logs, setLogs] = useState<LogMessage[]>([]);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Username payload required.";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email destination required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid routing address format.";
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message contents empty.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const executeTransmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState("validating");
    setLogs([
      { text: "$ send_message --to ansh", type: "info" },
      { text: "[VALIDATING] Verifying routing coordinates...", type: "process" }
    ]);

    await delay(700);
    setLogs((prev) => [...prev, { text: "[RESOLVED] Credentials validated successfully.", type: "success" }]);
    
    await delay(400);
    setFormState("connecting");
    setLogs((prev) => [
      ...prev,
      { text: "[CONNECTING] Resolving socket address ssl://ansh.secure.net:443...", type: "process" }
    ]);
    
    await delay(700);
    setLogs((prev) => [
      ...prev,
      { text: "[HANDSHAKE] Transferring security keys... SSL connection active.", type: "success" }
    ]);

    await delay(500);
    setFormState("sending");
    setLogs((prev) => [
      ...prev,
      { text: "[TRANSMITTING] Compressing message payload envelopes...", type: "process" },
      { text: `[DISPATCH] Header: from <${formData.email}>, payloadSize: ${formData.message.length} bytes.`, type: "info" }
    ]);

    await delay(850);
    
    setFormState("success");
    setLogs((prev) => [
      ...prev,
      { text: "[DISPATCH] Stream buffer transmission complete.", type: "success" },
      { text: "Message Sent Successfully ✓", type: "success" }
    ]);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({ name: "", email: "", message: "" });
    setLogs([]);
    setFormState("input");
  };

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const contactCards: ContactCard[] = [
    {
      name: "Email",
      value: "anshpandey2510@gmail.com",
      href: "mailto:anshpandey2510@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      accent: "#3b82f6",
      glow: "rgba(59,130,246,0.15)",
    },
    {
      name: "LinkedIn",
      value: "Ansh Pandey",
      href: "https://www.linkedin.com/in/ansh-pandey251",
      icon: <Linkedin className="w-5 h-5" />,
      accent: "#06b6d4",
      glow: "rgba(6,182,212,0.15)",
    },
    {
      name: "GitHub",
      value: "ANSH25102006",
      href: "https://github.com/ANSH25102006",
      icon: <Github className="w-5 h-5" />,
      accent: "#a855f7",
      glow: "rgba(168,85,247,0.15)",
    },
    {
      name: "LeetCode",
      value: "ANSH25102006",
      href: "https://leetcode.com/u/ANSH25102006/",
      icon: <Trophy className="w-5 h-5" />,
      accent: "#f59e0b",
      glow: "rgba(245,158,11,0.15)",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8">
      
      {/* 1. Contact Description */}
      <p className="text-xs md:text-sm text-slate-400 font-mono leading-relaxed select-text">
        I&apos;m always open to discussing new ideas, projects or opportunities. Feel free to connect via any channels or run a transmission below.
      </p>

      {/* 2. Glassmorphic Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {contactCards.map((card) => (
          <a
            key={card.name}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-5 rounded-2xl border border-white/[0.06] bg-[#050a14]/65 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#071124]/85 select-text overflow-hidden"
            style={{
              boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${card.accent}40`;
              e.currentTarget.style.boxShadow = `0 15px 35px rgba(0,0,0,0.5), 0 0 30px ${card.glow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.45)";
            }}
          >
            {/* Visual glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="flex items-center gap-3.5 mb-3.5">
              <div
                className="p-2 rounded-xl bg-white/5 border border-white/5 group-hover:scale-105 transition-transform duration-300"
                style={{ color: card.accent, borderColor: `${card.accent}20` }}
              >
                {card.icon}
              </div>
              <span className="text-[10px] font-mono text-slate-500 font-extrabold uppercase tracking-widest">
                {card.name}
              </span>
            </div>

            <div className="text-[10px] text-slate-200 font-mono font-bold truncate">
              {card.value}
            </div>

            {/* Accent accent stripe */}
            <div
              className="absolute top-0 bottom-0 left-0 w-[2.5px] opacity-35 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: card.accent }}
            />
          </a>
        ))}
      </div>

      {/* 3. Secure Terminal Form */}
      <div className="w-full bg-[#050505]/95 rounded-2xl border border-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.65)] overflow-hidden font-mono text-[11px] min-h-[380px] flex flex-col justify-between select-text mt-2">
        {/* macOS Terminal title bar */}
        <div className="h-10 bg-slate-950/80 border-b border-white/5 flex items-center px-4 justify-between select-none">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={handleReset} title="Clear terminal" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 text-[9px] text-slate-500 font-extrabold uppercase tracking-widest">
            <TerminalIcon className="w-3.5 h-3.5 text-blue-500" />
            <span>ansh@AnshOS-Contact: ~</span>
          </div>
          <div className="w-12" />
        </div>

        <div className="flex-grow p-5 flex flex-col justify-between gap-5 overflow-hidden">
          {/* Terminal Header Prompt */}
          <div className="text-[10px] text-slate-500 font-bold select-none border-b border-white/[0.03] pb-2">
            <span>{"// SECURE TRANSMISSION CHANNEL HOST V2.1.4"}</span>
          </div>

          {formState === "input" ? (
            /* Form Input state */
            <form onSubmit={executeTransmission} className="flex-grow flex flex-col justify-between gap-4">
              <div className="flex items-center gap-1.5 text-slate-350 select-none">
                <span className="text-blue-500 font-bold">$</span>
                <span className="font-extrabold text-white">send_message --to ansh</span>
              </div>

              <div className="flex flex-col gap-4 flex-grow justify-center">
                {/* Name */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-20 font-bold text-slate-500 uppercase tracking-widest text-[9.5px]">Name:</label>
                  <div className="flex-grow flex flex-col">
                    <div className="flex items-center border-b border-white/10 focus-within:border-blue-500/50 py-1 transition-colors">
                      <span className="text-slate-600 mr-2 select-none font-bold">›</span>
                      <input
                        ref={nameInputRef}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-transparent border-none outline-none text-emerald-400 placeholder-slate-800 w-full text-[11px]"
                        placeholder="Ansh credentials..."
                        autoComplete="off"
                      />
                    </div>
                    {errors.name && (
                      <span className="text-red-400 font-extrabold text-[8px] mt-1 uppercase flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 shrink-0" />
                        {errors.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="sm:w-20 font-bold text-slate-500 uppercase tracking-widest text-[9.5px]">Email:</label>
                  <div className="flex-grow flex flex-col">
                    <div className="flex items-center border-b border-white/10 focus-within:border-blue-500/50 py-1 transition-colors">
                      <span className="text-slate-600 mr-2 select-none font-bold">›</span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-transparent border-none outline-none text-emerald-400 placeholder-slate-800 w-full text-[11px]"
                        placeholder="route@dest.domain..."
                        autoComplete="off"
                      />
                    </div>
                    {errors.email && (
                      <span className="text-red-400 font-extrabold text-[8px] mt-1 uppercase flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 shrink-0" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col sm:flex-row items-start gap-2">
                  <label className="sm:w-20 font-bold text-slate-500 uppercase tracking-widest text-[9.5px] mt-1.5">Message:</label>
                  <div className="flex-grow flex flex-col w-full">
                    <div className="flex items-start border-b border-white/10 focus-within:border-blue-500/50 py-1 transition-colors">
                      <span className="text-slate-600 mr-2 select-none font-bold mt-0.5">›</span>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-transparent border-none outline-none text-emerald-400 placeholder-slate-800 w-full text-[11px] resize-none"
                        placeholder="Write message contents here..."
                      />
                    </div>
                    {errors.message && (
                      <span className="text-red-400 font-extrabold text-[8px] mt-1 uppercase flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 shrink-0" />
                        {errors.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold text-white tracking-widest transition-all duration-300 uppercase cursor-pointer flex items-center justify-center gap-2 border border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0 self-end text-[10px]"
              >
                <Send className="w-3.5 h-3.5" />
                Run Transmission
              </button>
            </form>
          ) : (
            /* Transmission processing */
            <div className="flex-grow flex flex-col justify-between overflow-hidden">
              <div ref={scrollRef} className="flex-grow overflow-y-auto window-scroll pr-1 flex flex-col gap-2.5 max-h-[190px]">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    {log.type === "info" && (
                      <>
                        <span className="text-blue-500 font-bold">~</span>
                        <span className="text-slate-350">{log.text}</span>
                      </>
                    )}
                    {log.type === "process" && (
                      <>
                        <span className="text-yellow-500 font-bold">[...]</span>
                        <span className="text-slate-400 animate-pulse">{log.text}</span>
                      </>
                    )}
                    {log.type === "success" && (
                      <>
                        <span className="text-emerald-400 font-bold">[OK]</span>
                        <span className="text-emerald-400">{log.text}</span>
                      </>
                    )}
                    {log.type === "error" && (
                      <>
                        <span className="text-red-400 font-bold">[ERR]</span>
                        <span className="text-red-400">{log.text}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {formState === "success" && (
                <div className="flex flex-col items-center justify-center text-center py-6 animate-pulse select-none shrink-0 border border-emerald-500/10 bg-emerald-500/5 rounded-xl mt-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
                  <span className="text-emerald-400 font-extrabold text-[12px] uppercase tracking-wider block">
                    Message Sent Successfully ✓
                  </span>
                  <button
                    onClick={handleReset}
                    className="mt-3 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/35 text-[8.5px] text-emerald-400 font-bold rounded cursor-pointer uppercase transition-all"
                  >
                    Return to terminal
                  </button>
                </div>
              )}

              {formState !== "success" && (
                <div className="flex items-center justify-center py-8 shrink-0">
                  <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mr-2" />
                  <span className="text-[10px] text-slate-500 tracking-wider uppercase font-bold">TRANSMITTING PACKETS...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Terminal footer statistics */}
        <div className="h-6 bg-slate-950/80 border-t border-white/5 flex items-center px-4 justify-between select-none text-[8.5px] text-slate-600 font-bold uppercase tracking-wider">
          <span>Channel: Secure SMTP</span>
          <span>Packets: {formState === "success" ? "100%" : formState === "input" ? "0%" : "50%"}</span>
        </div>
      </div>

    </div>
  );
}
