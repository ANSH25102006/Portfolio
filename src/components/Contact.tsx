"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, Phone, Terminal, ShieldAlert } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";

// --- SUBCOMPONENT: LOCATION RADAR GRID CANVAS ---
function LocationRadarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Coordinate variables
    let angle = 0;
    const center = { x: width / 2, y: height / 2 };
    
    // Ansh Location Coordinates ( দিল্লি - Delhi, India )
    const beacon = { 
      x: center.x + 35, 
      y: center.y - 20, 
      label: "DELHI, INDIA", 
      latLong: "28.6139° N, 77.2090° E" 
    };

    // Static points for other geographical highlights
    const points = [
      { x: center.x - 60, y: center.y + 40, label: "MUMBAI" },
      { x: center.x + 80, y: center.y + 80, label: "BENGALURU" },
      { x: center.x - 90, y: center.y - 70, label: "DUBAI" },
      { x: center.x + 110, y: center.y - 90, label: "TOKYO" },
    ];

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      center.x = width / 2;
      center.y = height / 2;
      beacon.x = center.x + 35;
      beacon.y = center.y - 20;
      
      // Update relative points
      points[0] = { x: center.x - 60, y: center.y + 40, label: "MUMBAI" };
      points[1] = { x: center.x + 80, y: center.y + 80, label: "BENGALURU" };
      points[2] = { x: center.x - 90, y: center.y - 70, label: "DUBAI" };
      points[3] = { x: center.x + 110, y: center.y - 90, label: "TOKYO" };
    };

    window.addEventListener("resize", resize);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Grid Overlay
      ctx.strokeStyle = "rgba(139, 92, 246, 0.04)"; // violet grid
      ctx.lineWidth = 1;
      const gridSize = 32;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Radar Rings
      const maxRadius = Math.min(width, height) * 0.45;
      ctx.lineWidth = 1;
      
      for (let r = 1; r <= 3; r++) {
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 / r})`; // fading blue circles
        ctx.beginPath();
        ctx.arc(center.x, center.y, (maxRadius / 3) * r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Draw Axis Lines
      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)";
      ctx.beginPath();
      ctx.moveTo(center.x, 0);
      ctx.lineTo(center.x, height);
      ctx.moveTo(0, center.y);
      ctx.lineTo(width, center.y);
      ctx.stroke();

      // 4. Draw Secondary Nodes
      points.forEach((pt) => {
        ctx.fillStyle = "rgba(100, 116, 139, 0.25)";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(100, 116, 139, 0.4)";
        ctx.font = "7px Courier New";
        ctx.fillText(pt.label, pt.x + 8, pt.y + 3);
      });

      // 5. Draw Radar Scanning Sweep Line
      angle += 0.015;
      const scanX = center.x + maxRadius * Math.cos(angle);
      const scanY = center.y + maxRadius * Math.sin(angle);

      const grad = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, maxRadius);
      grad.addColorStop(0, "rgba(139, 92, 246, 0.05)");
      grad.addColorStop(1, "rgba(59, 130, 246, 0.0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.arc(center.x, center.y, maxRadius, angle - 0.2, angle);
      ctx.lineTo(center.x, center.y);
      ctx.fill();

      // Draw sweeping sweep line
      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(scanX, scanY);
      ctx.stroke();

      // 6. Draw Delhi Beacon Node (Pulsing and Glowing)
      const pulse = Math.abs(Math.sin(Date.now() * 0.0035));
      
      // Outer pulse halo
      ctx.fillStyle = `rgba(139, 92, 246, ${0.15 - pulse * 0.12})`;
      ctx.beginPath();
      ctx.arc(beacon.x, beacon.y, 8 + pulse * 14, 0, Math.PI * 2);
      ctx.fill();

      // Inner pulse halo
      ctx.fillStyle = `rgba(59, 130, 246, ${0.35 - pulse * 0.2})`;
      ctx.beginPath();
      ctx.arc(beacon.x, beacon.y, 4 + pulse * 6, 0, Math.PI * 2);
      ctx.fill();

      // Core Node Dot
      ctx.fillStyle = "#a855f7"; // violet neon
      ctx.beginPath();
      ctx.arc(beacon.x, beacon.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Beacon Marker Border Box
      ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
      ctx.lineWidth = 1;
      ctx.strokeRect(beacon.x + 10, beacon.y - 18, 110, 26);
      
      // Beacon Text labels
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 8px monospace";
      ctx.fillText(beacon.label, beacon.x + 15, beacon.y - 8);

      ctx.fillStyle = "#a855f7";
      ctx.font = "7px monospace";
      ctx.fillText(beacon.latLong, beacon.x + 15, beacon.y + 4);

      // Connecting line from beacon dot to label box
      ctx.strokeStyle = "rgba(168, 85, 247, 0.3)";
      ctx.beginPath();
      ctx.moveTo(beacon.x, beacon.y);
      ctx.lineTo(beacon.x + 10, beacon.y - 10);
      ctx.stroke();

      // 7. Radar Status Text Watermark
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.font = "7px monospace";
      ctx.fillText("LOCATOR: Delhi Radar v3.1", 15, height - 15);
      
      const ping = Math.floor(25 + Math.random() * 8);
      ctx.fillText(`PING: ${ping}ms // STATUS: ONLINE`, width - 150, height - 15);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="w-full h-full relative min-h-[300px] flex items-center justify-center bg-[#030611] rounded-2xl border border-white/[0.04] overflow-hidden select-none">
      <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10">
        <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
        <span className="text-[7.5px] font-bold text-purple-400 uppercase tracking-widest font-mono">
          GEO_LOCATOR LOCK ACTIVE
        </span>
      </div>
      <canvas ref={canvasRef} className="w-full h-full block absolute inset-0" />
    </div>
  );
}

// --- MAIN CONTACT COMPONENT ---
export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [formState, setFormState] = useState<"input" | "sending" | "success">("input");

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
      newErrors.name = "Identifier payload required.";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Destination address required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid transmission route.";
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message payload empty.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState("sending");

    // Simulate sending payload
    setTimeout(() => {
      setFormState("success");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  const handleReset = () => {
    setFormState("input");
  };

  return (
    <div className="w-full font-mono text-xs text-slate-350 select-text">
      {/* Contact Description */}
      <div className="mb-8">
        <p className="text-xs md:text-sm text-slate-400 font-mono leading-relaxed select-text">
          Direct communication interface. Dispatch your transmission packages to connect with Ansh.
        </p>
      </div>

      {/* Grid Layout: Form Left, Canvas Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
        
        {/* Left Column: Form Wrapper (Column span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 bg-[#0c0f1d]/50 border border-white/[0.04] rounded-2xl relative overflow-hidden backdrop-blur-xl">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] pointer-events-none" />

          {formState === "success" ? (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-16 h-full"
              >
                <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 animate-pulse">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">
                  Transmission Complete
                </h3>
                <p className="text-[10.5px] text-slate-400 max-w-xs leading-relaxed mb-6">
                  Message successfully delivered to coordinates. Ansh will process and respond to your payload shortly.
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-purple-600/15 border border-purple-500/35 hover:bg-purple-600/25 hover:border-purple-500/60 text-[9px] text-purple-400 font-extrabold uppercase tracking-widest cursor-pointer transition-all"
                >
                  Return to Dispatcher
                </button>
              </motion.div>
            </AnimatePresence>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex items-center gap-1.5 text-slate-350 select-none pb-2 border-b border-white/[0.04]">
                <Terminal className="w-3.5 h-3.5 text-purple-500" />
                <span className="font-extrabold text-[9.5px] tracking-wider uppercase text-slate-400">SMTP TRANSMISSION PROTOCOL</span>
              </div>

              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Sender Name
                </label>
                <div className="flex items-center border-b border-white/10 focus-within:border-purple-500/50 py-1 transition-colors">
                  <span className="text-slate-600 mr-2 select-none">›</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={formState === "sending"}
                    className="bg-transparent border-none outline-none text-purple-300 placeholder-slate-700 w-full text-[11px] font-mono focus:ring-0"
                    placeholder="Enter identifier..."
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

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Email Address
                </label>
                <div className="flex items-center border-b border-white/10 focus-within:border-purple-500/50 py-1 transition-colors">
                  <span className="text-slate-600 mr-2 select-none">›</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={formState === "sending"}
                    className="bg-transparent border-none outline-none text-purple-300 placeholder-slate-700 w-full text-[11px] font-mono focus:ring-0"
                    placeholder="Enter routing node..."
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

              {/* Message Input */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] font-extrabold tracking-widest text-slate-500 uppercase">
                  Message Payload
                </label>
                <div className="flex items-start border-b border-white/10 focus-within:border-purple-500/50 py-1 transition-colors">
                  <span className="text-slate-600 mr-2 select-none mt-0.5">›</span>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={formState === "sending"}
                    className="bg-transparent border-none outline-none text-purple-300 placeholder-slate-700 w-full text-[11px] font-mono resize-none focus:ring-0"
                    placeholder="Type message text payload..."
                  />
                </div>
                {errors.message && (
                  <span className="text-red-400 font-extrabold text-[8px] mt-1 uppercase flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3 shrink-0" />
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState === "sending"}
                className="w-full mt-2 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 font-mono text-[10px] font-bold tracking-widest text-white shadow-[0_0_15px_rgba(168,85,247,0.2)] disabled:opacity-50 transition-all duration-300 uppercase cursor-pointer flex items-center justify-center gap-2 border border-purple-500/30"
              >
                {formState === "sending" ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    DISPATCHING PAYLOAD...
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    RUN TRANSMISSION
                  </>
                )}
              </button>
            </form>
          )}

          {/* Social channels underneath form */}
          <div className="flex flex-col gap-3 mt-6 pt-5 border-t border-white/[0.04]">
            <span className="text-[7.5px] font-black text-slate-500 tracking-wider uppercase">DIRECT CHANNELS // NETWORKS</span>
            <div className="flex items-center gap-4">
              <a
                href="mailto:anshpandey2510@gmail.com"
                className="flex items-center gap-1.5 hover:text-purple-400 transition-colors text-[10px]"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>anshpandey2510@gmail.com</span>
              </a>
              <span className="text-slate-800">|</span>
              <a
                href="tel:9599582379"
                className="flex items-center gap-1.5 hover:text-purple-400 transition-colors text-[10px]"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>+91 9599582379</span>
              </a>
            </div>
            
            <div className="flex gap-2.5 mt-2">
              <a
                href="https://github.com/ANSH25102006"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/5 text-slate-400 hover:text-purple-400 hover:border-purple-400/35 flex items-center justify-center transition-all duration-300"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ansh-pandey251"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/5 text-slate-400 hover:text-purple-400 hover:border-purple-400/35 flex items-center justify-center transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Radar Locator (Column span 5) */}
        <div className="lg:col-span-5 w-full flex">
          <LocationRadarCanvas />
        </div>

      </div>
    </div>
  );
}
