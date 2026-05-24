import { motion } from "framer-motion";
import HudCard from "./HudCard";

export default function LevelStats({ level, stats, delay = 0 }) {
  const xpPct = (level.xp / level.xpMax) * 100;

  return (
    <HudCard title="PLAYER STATS" delay={delay} className="flex-1">
      <div className="flex-1 flex flex-col justify-start md:justify-center gap-4 sm:gap-8 md:gap-10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 md:gap-8">
          <div className="hud-clip-sm border-2 border-hud-yellow px-4 py-3 sm:px-6 sm:py-4 shadow-glow-yellow shrink-0 self-center sm:self-auto">
            <span className="font-display text-[10px] sm:text-xs text-hud-muted tracking-widest block">
              LEVEL
            </span>
            <span className="font-display text-4xl sm:text-5xl md:text-6xl text-hud-yellow leading-none">
              {level.current}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-xs sm:text-sm font-mono mb-1.5 sm:mb-2 gap-2">
              <span className="text-hud-muted shrink-0">XP</span>
              <span className="text-hud-yellow text-right truncate">
                {level.xp.toLocaleString()} / {level.xpMax.toLocaleString()}
              </span>
            </div>
            <div className="h-2.5 sm:h-3 md:h-4 bg-hud-bg border border-hud-yellow/30 overflow-hidden">
              <motion.div
                className="h-full bg-hud-yellow shadow-glow-yellow"
                initial={{ width: 0 }}
                animate={{ width: `${xpPct}%` }}
                transition={{ duration: 1, delay: delay + 0.2 }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.1 * i }}
              className="hud-clip-sm border border-hud-cyan/30 bg-hud-bg/50 p-3 sm:p-4 md:p-6 text-center"
            >
              <p className="font-display text-xl sm:text-2xl md:text-3xl text-hud-cyan">{stat.value}</p>
              <p className="text-[10px] sm:text-xs md:text-sm text-hud-muted uppercase tracking-wider mt-0.5 sm:mt-1 leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </HudCard>
  );
}
