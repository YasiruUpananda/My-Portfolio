import {
  Monitor,
  Server,
  Database,
  Cloud,
  Network,
  Cog,
  FlaskConical,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import HudCard from "./HudCard";

const iconMap = {
  monitor: Monitor,
  server: Server,
  database: Database,
  cloud: Cloud,
  network: Network,
  cog: Cog,
  test: FlaskConical,
  wrench: Wrench,
};

export default function Skills({ skills, delay = 0 }) {
  return (
    <HudCard title="GEAR // SKILLS" delay={delay} className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 flex-1 content-start auto-rows-min">
        {skills.map((skill, i) => {
          const Icon = iconMap[skill.icon] || Wrench;
          return (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + i * 0.05 }}
              className="flex gap-2.5 sm:gap-3 p-2.5 sm:p-3 md:p-4 border border-hud-cyan/20 bg-hud-bg/40 hud-clip-sm"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 border border-hud-cyan/40 flex items-center justify-center text-hud-cyan">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="font-display text-xs sm:text-sm text-hud-cyan tracking-wide truncate">
                    {skill.category}
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-hud-yellow shrink-0">
                    LVL {skill.level}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-hud-muted mt-0.5 line-clamp-2 sm:line-clamp-none">
                  {skill.techs.join(" · ")}
                </p>
                <div className="mt-1.5 sm:mt-2 h-1 sm:h-1.5 bg-hud-bg overflow-hidden">
                  <motion.div
                    className="h-full bg-hud-cyan shadow-[0_0_6px_rgba(0,242,255,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.6, delay: delay + i * 0.05 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </HudCard>
  );
}
