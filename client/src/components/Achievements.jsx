import { Trophy, Medal, Code2, Cloud } from "lucide-react";
import { motion } from "framer-motion";
import HudCard from "./HudCard";

const iconMap = {
  trophy: Trophy,
  medal: Medal,
  code: Code2,
  cloud: Cloud,
};

export default function Achievements({ achievements, delay = 0 }) {
  return (
    <HudCard title="ACHIEVEMENTS" delay={delay} className="flex-1">
      <ul className="flex-1 flex flex-col justify-start md:justify-center gap-3 sm:gap-5 md:gap-6">
        {achievements.map((item, i) => {
          const Icon = iconMap[item.icon] || Trophy;
          return (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + i * 0.06 }}
              className="flex gap-3 sm:gap-4 items-start"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 border border-hud-yellow/50 flex items-center justify-center text-hud-yellow">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <h3 className="font-display text-xs sm:text-sm md:text-base text-hud-yellow tracking-wide break-words">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[10px] sm:text-xs md:text-sm text-hud-muted shrink-0">
                    {item.year}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs md:text-sm text-hud-muted mt-0.5 sm:mt-1">
                  {item.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </HudCard>
  );
}
