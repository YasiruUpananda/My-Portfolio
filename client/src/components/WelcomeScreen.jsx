import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Layers,
  Trophy,
  Briefcase,
  Cpu,
  CalendarDays,
  Terminal,
  Award,
} from "lucide-react";

// ─── Boot log lines ───
const BOOT_LINES = [
  { prefix: "BOOT", text: "Initializing portfolio system...", delay: 0 },
  { prefix: "OK", text: "Loading core modules", delay: 400 },
  { prefix: "OK", text: "Establishing neural link", delay: 700 },
  { prefix: "OK", text: "Mounting character data", delay: 1000 },
  { prefix: "OK", text: "Calibrating HUD interface", delay: 1300 },
  { prefix: "OK", text: "Connecting to server... CONNECTED", delay: 1700 },
  { prefix: "READY", text: "All systems operational", delay: 2200 },
];

const BOOT_DURATION = 2800; // ms total

// ─── Boot Sequence ───
function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reveal lines on schedule
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });

    // Progress bar
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / BOOT_DURATION) * 100);
      setProgress(pct);
      if (elapsed < BOOT_DURATION) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 300);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <motion.div
      className="h-[100dvh] flex flex-col items-center justify-center px-6"
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.35 }}
    >
      {/* Terminal box */}
      <div className="w-full max-w-lg">
        <div className="font-mono text-[10px] sm:text-xs text-hud-cyan/50 mb-2 tracking-widest">
          ◆ PORTFOLIO SYSTEM v1.0
        </div>
        <div className="border border-hud-cyan/30 bg-hud-panel/80 p-4 sm:p-6 hud-clip space-y-1.5">
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2 font-mono text-[11px] sm:text-xs leading-relaxed"
            >
              <span
                className={
                  line.prefix === "READY"
                    ? "text-hud-yellow"
                    : line.prefix === "BOOT"
                    ? "text-hud-cyan"
                    : "text-green-400"
                }
              >
                [{line.prefix}]
              </span>
              <span className="text-hud-muted">{line.text}</span>
            </motion.div>
          ))}

          {/* Blinking cursor */}
          <span className="inline-block w-1.5 h-3.5 bg-hud-cyan/70 animate-[typewriter-blink_0.8s_step-end_infinite] ml-1" />
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1.5 w-full bg-hud-bg border border-hud-cyan/20 overflow-hidden">
          <div
            className="h-full bg-hud-cyan transition-none shadow-[0_0_8px_rgba(0,242,255,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 font-mono text-[9px] sm:text-[10px] text-hud-muted tracking-wider">
          <span>LOADING SYSTEMS</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── HUD Frame corner brackets (large, decorative) ───
function HudFrame() {
  const corner =
    "absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-hud-cyan";
  return (
    <div className="absolute inset-2 sm:inset-3 md:inset-4 pointer-events-none z-10">
      <div className={`${corner} top-0 left-0 border-t-2 border-l-2`} />
      <div className={`${corner} top-0 right-0 border-t-2 border-r-2`} />
      <div className={`${corner} bottom-0 left-0 border-b-2 border-l-2`} />
      <div className={`${corner} bottom-0 right-0 border-b-2 border-r-2`} />

      {/* Top/bottom edge accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-hud-cyan/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-hud-cyan/50 to-transparent" />
      {/* Left/right edge accents */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-24 sm:h-32 w-px bg-gradient-to-b from-transparent via-hud-cyan/40 to-transparent" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-24 sm:h-32 w-px bg-gradient-to-b from-transparent via-hud-cyan/40 to-transparent" />
    </div>
  );
}

// ─── Header Bar ───
function HeaderBar({ name }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.4 }}
      className="flex items-center justify-between px-1 sm:px-2 shrink-0"
    >
      {/* Left — Logo + Name */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-7 h-7 sm:w-8 sm:h-8 hud-clip-sm border border-hud-cyan/60 flex items-center justify-center">
          <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-hud-cyan" />
        </div>
        <div>
          <p className="font-display text-[10px] sm:text-xs text-hud-cyan tracking-wider leading-none">
            {name}
          </p>
          <p className="font-mono text-[8px] sm:text-[9px] text-hud-muted tracking-widest mt-0.5">
            PORTFOLIO SYSTEM v1.0
          </p>
        </div>
      </div>

      {/* Center — System Status */}
      <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] sm:text-[10px] tracking-wider">
        <span className="text-hud-muted">◆</span>
        <span className="text-hud-muted uppercase">System Status</span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
        <span className="text-green-400 uppercase">Online</span>
      </div>

      {/* Right — empty spacer for balance (or decorative) */}
      <div className="w-20 sm:w-28" />
    </motion.div>
  );
}

// ─── Left Navigation Icons ───
function LeftNav() {
  const items = [
    { icon: Code2, title: "EXPLORE", sub: "PROJECTS" },
    { icon: Layers, title: "UPGRADE", sub: "SKILLS" },
    { icon: Trophy, title: "ACHIEVE", sub: "GOALS" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="hidden md:flex flex-col gap-4 lg:gap-5 justify-center"
    >
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 + i * 0.1 }}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 lg:w-10 lg:h-10 hud-clip-sm border border-hud-cyan/40 flex items-center justify-center">
            <item.icon className="w-4 h-4 lg:w-5 lg:h-5 text-hud-cyan/70" />
          </div>
          <div>
            <p className="font-display text-[10px] lg:text-xs text-white tracking-wider leading-none">
              {item.title}
            </p>
            <p className="font-mono text-[8px] lg:text-[9px] text-hud-muted tracking-widest mt-0.5">
              {item.sub}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Player Profile Panel ───
function PlayerProfile({ level, reputation }) {
  const xpPct = Math.round((level.xp / level.xpMax) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="hidden md:flex flex-col w-44 lg:w-48"
    >
      <div className="border border-hud-cyan/30 bg-hud-panel/80 hud-clip-sm p-3 lg:p-4">
        {/* Title */}
        <p className="font-mono text-[8px] lg:text-[9px] text-hud-cyan tracking-widest mb-3 flex items-center gap-1.5">
          <span className="text-hud-yellow">◆</span> PLAYER PROFILE
        </p>

        {/* Level */}
        <div className="text-center mb-3">
          <p className="font-mono text-[8px] text-hud-muted tracking-wider">LEVEL</p>
          <p className="font-display text-2xl lg:text-3xl text-hud-yellow glow-text-yellow leading-none mt-0.5">
            {level.current}
          </p>
        </div>

        {/* XP Bar */}
        <div className="mb-3">
          <p className="font-mono text-[8px] text-hud-muted tracking-wider mb-1">XP</p>
          <div className="h-1.5 bg-hud-bg border border-hud-cyan/20 overflow-hidden">
            <motion.div
              className="h-full bg-hud-cyan shadow-[0_0_6px_rgba(0,242,255,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${xpPct}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className="font-mono text-[8px] text-hud-muted mt-1 text-right">
            {level.xp.toLocaleString()} / {level.xpMax.toLocaleString()}
          </p>
        </div>

        {/* Reputation */}
        <div>
          <p className="font-mono text-[8px] text-hud-muted tracking-wider">REPUTATION</p>
          <p className="font-display text-[10px] lg:text-xs text-hud-yellow tracking-wider mt-0.5">
            {reputation.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Center Hero ───
function CenterHero({ name, onStart }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 sm:gap-3 md:gap-4">
      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.4 }}
        className="font-display text-[10px] sm:text-xs md:text-sm text-hud-cyan tracking-[0.2em] sm:tracking-[0.3em]"
      >
        //// WELCOME TO ////
      </motion.p>

      {/* Big name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14, duration: 0.5, ease: "easeOut" }}
        className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-hud-yellow glow-text-yellow leading-[1.1] tracking-wider"
      >
        {name}
      </motion.h1>

      {/* Sub-subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.4 }}
        className="font-display text-[10px] sm:text-sm md:text-base text-hud-cyan tracking-[0.15em] sm:tracking-[0.2em]"
      >
        INTERACTIVE PORTFOLIO
      </motion.p>

      {/* Start Game Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="mt-3 sm:mt-5 md:mt-6 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3
          font-display text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em]
          text-hud-cyan hud-clip-sm
          border-2 border-hud-cyan/60
          bg-hud-cyan/5
          glow-border-cyan
          animate-[glow-pulse_3s_ease-in-out_infinite]
          hover:bg-hud-cyan/15 hover:border-hud-cyan
          active:bg-hud-cyan/25
          transition-colors cursor-pointer
          flex items-center gap-2 sm:gap-3"
      >
        START GAME
        <span className="text-base sm:text-lg">›</span>
      </motion.button>
    </div>
  );
}

// ─── Stats Bar ───
function StatsBar({ stats, achievements }) {
  const statIcons = [Briefcase, Cpu, CalendarDays, Terminal, Award];
  const allStats = [
    ...stats,
    { label: "Achievements", value: `${achievements?.length || 0}+` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="flex justify-center gap-3 sm:gap-5 md:gap-8 flex-wrap shrink-0"
    >
      {allStats.map((stat, i) => {
        const Icon = statIcons[i] || Terminal;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.07 }}
            className="flex flex-col items-center gap-1 sm:gap-1.5"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 hud-clip-sm border border-hud-cyan/35 bg-hud-panel/60 flex items-center justify-center">
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-hud-cyan/60" />
            </div>
            <p className="font-mono text-[7px] sm:text-[8px] md:text-[9px] text-hud-muted tracking-wider uppercase text-center leading-tight">
              {stat.label}
            </p>
            <p className="font-display text-[10px] sm:text-xs md:text-sm text-hud-yellow leading-none">
              {stat.value}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── Footer Bar ───
function FooterBar({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.4 }}
      className="flex justify-between items-center px-1 sm:px-2 shrink-0"
    >
      <p className="font-mono text-[8px] sm:text-[10px] text-hud-muted tracking-wider">
        ◄ PRESS{" "}
        <span
          className="inline-block px-1.5 py-0.5 border border-hud-cyan/40 text-hud-cyan text-[7px] sm:text-[8px] mx-0.5 align-middle cursor-pointer hover:bg-hud-cyan/10 transition-colors"
          onClick={onStart}
        >
          ENTER
        </span>{" "}
        TO BEGIN
      </p>
      <p className="font-mono text-[8px] sm:text-[10px] text-hud-muted tracking-wider">
        FULLSCREEN{" "}
        <span
          className="inline-block px-1.5 py-0.5 border border-hud-cyan/40 text-hud-cyan text-[7px] sm:text-[8px] mx-0.5 align-middle cursor-pointer hover:bg-hud-cyan/10 transition-colors"
          onClick={() => {
            document.documentElement.requestFullscreen?.().catch(() => {});
          }}
        >
          F11
        </span>
      </p>
    </motion.div>
  );
}

// ─── Welcome Screen (Phase 2) ───
function WelcomeHUD({ data, onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="relative h-[100dvh] flex flex-col p-3 sm:p-5 md:p-6 lg:p-8 overflow-y-auto md:overflow-hidden"
    >
      <HudFrame />

      {/* Header */}
      <HeaderBar name={data.profile.name} />

      {/* Middle: Left Nav + Center Hero + Right Panel */}
      <div className="flex-1 min-h-0 flex items-center justify-center gap-6 lg:gap-10 xl:gap-14 px-2 sm:px-4 md:px-8 lg:px-14">
        <LeftNav />
        <CenterHero name={data.profile.name} onStart={onStart} />
        <PlayerProfile level={data.level} reputation={data.reputation} />
      </div>

      {/* Bottom Stats */}
      <div className="flex flex-col gap-3 sm:gap-4 shrink-0">
        <StatsBar stats={data.stats} achievements={data.achievements} />
        <FooterBar onStart={onStart} />
      </div>
    </motion.div>
  );
}

// ─── Main Export ───
export default function WelcomeScreen({ data, onStart }) {
  const [phase, setPhase] = useState("boot"); // "boot" | "welcome"

  const handleBootComplete = useCallback(() => {
    setPhase("welcome");
  }, []);

  // Keyboard listener
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (phase === "welcome") {
          onStart();
        } else if (phase === "boot") {
          // Skip boot
          setPhase("welcome");
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase, onStart]);

  return (
    <div className="relative h-[100dvh] scanlines overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "boot" ? (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        ) : (
          <WelcomeHUD key="welcome" data={data} onStart={onStart} />
        )}
      </AnimatePresence>
    </div>
  );
}
