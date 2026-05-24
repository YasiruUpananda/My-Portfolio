import { motion } from "framer-motion";
import HudCard from "./HudCard";
import { resolveTechIcon } from "../data/techIcons";

export default function TechStack({ techStack, delay = 0 }) {
  return (
    <HudCard title="TECH STACK" delay={delay} className="flex-1">
      <div className="flex-1 flex items-start md:items-center justify-center min-h-0 py-1">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-4 w-full">
          {techStack.map((tech, i) => {
            const resolved = resolveTechIcon(tech);
            const Icon = resolved?.Icon;
            const brandColor = tech.color || resolved?.color || "#00f2ff";

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + i * 0.03 }}
                className="aspect-square hud-clip-sm border border-hud-cyan/35 bg-hud-bg/60
                  flex flex-col items-center justify-center gap-1 sm:gap-1.5
                  hover:shadow-glow transition-shadow p-2 sm:p-2.5"
                title={tech.name}
              >
                {Icon ? (
                  <Icon
                    className="w-15 h-15 sm:w-11 sm:h-11 md:w-12 md:h-12 shrink-1"
                    style={{ color: brandColor }}
                    aria-hidden
                  />
                ) : (
                  <span
                    className="font-display text-2xl sm:text-3xl font-bold leading-none"
                    style={{ color: brandColor }}
                  >
                    {tech.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span className="text-[10px] sm:text-xs md:text-sm text-hud-muted text-center leading-tight px-0.5 line-clamp-2">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </HudCard>
  );
}
