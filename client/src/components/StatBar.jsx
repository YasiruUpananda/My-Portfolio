import { motion } from "framer-motion";

export default function StatBar({ label, value, max = 100, color = "cyan", delay = 0, large = false }) {
  const pct = Math.min(100, (value / max) * 100);
  const fillClass = color === "yellow" ? "bg-hud-yellow" : "bg-hud-cyan";
  const glowClass =
    color === "yellow" ? "shadow-[0_0_8px_rgba(255,204,0,0.6)]" : "shadow-[0_0_8px_rgba(0,242,255,0.6)]";

  return (
    <div className={`space-y-1 ${large ? "space-y-2" : ""}`}>
      <div className={`flex justify-between font-mono ${large ? "text-sm" : "text-[11px]"}`}>
        <span className="text-hud-muted uppercase tracking-wide">{label}</span>
        <span className={color === "yellow" ? "text-hud-yellow" : "text-hud-cyan"}>
          {typeof value === "number" && max === 100 ? `${value}%` : value}
        </span>
      </div>
      <div 
        className={`bg-hud-bg/80 border border-hud-cyan/20 overflow-hidden ${large ? "h-2.5" : "h-1.5"}`}
        style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%)" }}
      >
        <motion.div
          className={`h-full ${fillClass} ${glowClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
