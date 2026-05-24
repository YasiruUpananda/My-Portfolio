import { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, CheckCircle2, AlertTriangle, Cpu, ShieldCheck } from "lucide-react";
import HudCard from "./HudCard";

export default function Contact({ profile, delay = 0 }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error
  const [errors, setErrors] = useState({});
  const [logs, setLogs] = useState([
    "SYS_INIT // COMMS_LINK_ONLINE",
    "RESOLVED LOCALHOST TRACE PATH",
    "SECURE_SOCKET: SHIELD-256_ACTIVE",
    "STATUS: AWAITING_PAYLOAD..."
  ]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "SENDER IDENTIFIER REQUIRED";
    if (!formData.email.trim()) {
      newErrors.email = "RETURN PATH REQUIRED";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "INVALID EMAIL STRUCTURE";
    }
    if (!formData.message.trim()) newErrors.message = "MESSAGE PAYLOAD VOID";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setLogs((prev) => [
        ...prev,
        "WARNING: VALIDATION FAILED - CORRUPT COMMS PAYLOAD"
      ]);
      return;
    }

    setStatus("sending");
    setLogs((prev) => [
      ...prev,
      "COMMS: INITIATING HANDSHAKE...",
      "COMMS: ENCRYPTING SENDER DATA...",
      "COMMS: DISPATCHING PACKETS..."
    ]);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed transmission");

      const result = await response.json();
      setStatus("success");
      setLogs((prev) => [
        ...prev,
        "COMMS: TRANSMISSION ACKNOWLEDGED BY HOST",
        `SYS: ${result.message.toUpperCase()}`,
        "STATUS: COMMS LINK SECURED"
      ]);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setLogs((prev) => [
        ...prev,
        "ERROR: PACKET LOSS 100% - CONNECTION TERMINATED"
      ]);
    }
  };

  return (
    <HudCard title="CONTACT ME" subtitle="TRANSMISSION CHANNEL" delay={delay} className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 h-full items-stretch min-h-0 overflow-y-auto">
        
        {/* Left Side: System Telemetry & Info */}
        <div className="flex flex-col gap-4 justify-between h-full min-h-0">
          <div className="space-y-4">
            <div className="bg-hud-bg/40 border border-hud-cyan/15 p-4 hud-clip-sm space-y-3">
              <div className="flex items-center gap-2 text-hud-yellow font-display text-xs tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>COMMS CHANNEL STATUS</span>
              </div>
              
              <div className="space-y-2 font-mono text-[11px] sm:text-xs">
                <div className="flex justify-between items-center border-b border-hud-cyan/10 pb-1">
                  <span className="text-hud-muted">DIRECT CHANNEL</span>
                  <a 
                    href={`mailto:${profile.email}`} 
                    className="text-hud-cyan hover:text-hud-yellow transition-colors"
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex justify-between items-center border-b border-hud-cyan/10 pb-1">
                  <span className="text-hud-muted">SENDER LOCATION</span>
                  <span className="text-white">{profile.location}</span>
                </div>
                <div className="flex justify-between items-center border-b border-hud-cyan/10 pb-1">
                  <span className="text-hud-muted">COMMS STATUS</span>
                  <span className="text-green-400 animate-pulse font-bold">READY TO RECEIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-hud-muted">AVAILABILITY</span>
                  <span className="text-hud-yellow uppercase tracking-widest text-[9px] border border-hud-yellow/30 px-1 bg-hud-yellow/5">
                    {profile.availability}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Simulated Terminal Diagnostic Logs */}
          <div className="flex-1 flex flex-col min-h-[140px] sm:min-h-[180px] bg-black/50 border border-hud-cyan/10 p-3 font-mono text-[10px] sm:text-xs text-hud-cyan/85 overflow-hidden hud-clip-sm">
            <div className="flex items-center justify-between border-b border-hud-cyan/20 pb-1.5 mb-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 animate-pulse text-hud-cyan" />
                <span className="tracking-widest uppercase font-bold text-[9px] sm:text-[10px]">DIAGNOSTIC TELEMETRY</span>
              </div>
              <span className="text-[8px] bg-hud-cyan/10 text-hud-cyan px-1 border border-hud-cyan/30 rounded-xs">SECURE</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 font-mono leading-relaxed select-none">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-1.5 items-start">
                  <span className="text-hud-yellow font-bold shrink-0">&gt;</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Comms Form Console */}
        <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full min-h-0 gap-4">
          <div className="space-y-3 sm:space-y-4">
            {/* Name Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-mono text-[10px] sm:text-xs text-hud-muted tracking-wider uppercase">
                [ SENDER IDENTIFIER ]
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={status === "sending"}
                  placeholder="ENTER YOUR NAME"
                  className={`w-full bg-hud-bg/60 border ${
                    errors.name ? "border-hud-yellow" : "border-hud-cyan/30"
                  } focus:border-hud-cyan focus:ring-1 focus:ring-hud-cyan text-white font-mono text-xs sm:text-sm px-3 py-2 outline-none focus:outline-none transition-all duration-300`}
                />
              </div>
              {errors.name && (
                <span className="text-[10px] font-mono text-hud-yellow tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {errors.name}
                </span>
              )}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-mono text-[10px] sm:text-xs text-hud-muted tracking-wider uppercase">
                [ RETURN COMMS CHANNEL ]
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={status === "sending"}
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  className={`w-full bg-hud-bg/60 border ${
                    errors.email ? "border-hud-yellow" : "border-hud-cyan/30"
                  } focus:border-hud-cyan focus:ring-1 focus:ring-hud-cyan text-white font-mono text-xs sm:text-sm px-3 py-2 outline-none focus:outline-none transition-all duration-300`}
                />
              </div>
              {errors.email && (
                <span className="text-[10px] font-mono text-hud-yellow tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {errors.email}
                </span>
              )}
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="font-mono text-[10px] sm:text-xs text-hud-muted tracking-wider uppercase">
                [ SENSOR PAYLOAD / DATA MESSAGE ]
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={status === "sending"}
                  placeholder="CONSTRUCT COMMS TRANSMISSION..."
                  className={`w-full bg-hud-bg/60 border ${
                    errors.message ? "border-hud-yellow" : "border-hud-cyan/30"
                  } focus:border-hud-cyan focus:ring-1 focus:ring-hud-cyan text-white font-mono text-xs sm:text-sm px-3 py-2 outline-none focus:outline-none transition-all duration-300 resize-none`}
                />
              </div>
              {errors.message && (
                <span className="text-[10px] font-mono text-hud-yellow tracking-wider flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> {errors.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full touch-target flex items-center justify-center gap-2 border font-display text-xs sm:text-sm tracking-[0.2em] font-bold uppercase transition-all duration-300 hud-clip-sm py-3 px-4 ${
                status === "sending"
                  ? "bg-hud-cyan/10 border-hud-cyan/40 text-hud-cyan/50 cursor-not-allowed"
                  : status === "success"
                  ? "bg-green-500/10 border-green-500/50 text-green-400 hover:bg-green-500/20"
                  : status === "error"
                  ? "bg-hud-yellow/10 border-hud-yellow/50 text-hud-yellow hover:bg-hud-yellow/20"
                  : "bg-hud-cyan/10 border-hud-cyan text-hud-cyan hover:bg-hud-cyan hover:text-hud-bg shadow-glow hover:shadow-[0_0_25px_rgba(0,242,255,0.6)] cursor-pointer"
              }`}
            >
              {status === "sending" ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>TRANSMITTED SECURELY</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>DISPATCH SIGNAL</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </HudCard>
  );
}
