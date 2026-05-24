import { Brain, Zap, Users, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import HudCard from "./HudCard";

const iconMap = {
  brain: Brain,
  zap: Zap,
  users: Users,
  lightbulb: Lightbulb,
};

export default function SpecialAbilities({ abilities, delay = 0 }) {
  return (
    <HudCard title="SPECIAL ABILITIES" delay={delay} className="flex-1">
      <ul className="flex-1 flex flex-col justify-start md:justify-center gap-3 sm:gap-4 md:gap-5">
        {abilities.map((ability, i) => {
          const Icon = iconMap[ability.icon] || Zap;
          return (
            <motion.li
              key={ability.title}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + i * 0.06 }}
              className="flex gap-3 sm:gap-4 p-3 sm:p-4 border-l-2 border-hud-yellow/60 bg-hud-bg/30"
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-hud-yellow shrink-0 mt-0.5" />
              <div className="min-w-0">
                <h3 className="font-display text-[10px] sm:text-xs md:text-sm text-hud-yellow tracking-widest">
                  {ability.title}
                </h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-hud-muted mt-0.5 sm:mt-1 leading-relaxed">
                  {ability.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </HudCard>
  );
}
