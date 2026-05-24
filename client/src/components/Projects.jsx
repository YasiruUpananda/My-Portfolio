import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import HudCard from "./HudCard";

export default function Projects({ projects, delay = 0 }) {
  return (
    <HudCard title="WEAPONS // PROJECTS" delay={delay} className="flex-1">
      <div className="flex-1 flex flex-col gap-3 sm:gap-4 md:gap-5 min-h-0">
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + i * 0.08 }}
            className="group flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 border border-hud-cyan/25 bg-hud-bg/50 hud-clip-sm
              hover:border-hud-cyan/60 hover:shadow-glow active:bg-hud-cyan/5 transition-all shrink-0"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full sm:w-28 md:w-32 h-28 sm:h-24 object-cover hud-clip-sm border border-hud-cyan/30 shrink-0"
            />
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-display text-xs sm:text-sm md:text-base text-hud-yellow tracking-wide break-words">
                  {project.title}
                </h3>
                <ExternalLink className="w-4 h-4 text-hud-cyan opacity-50 group-hover:opacity-100 shrink-0 mt-0.5" />
              </div>
              <p className="text-[11px] sm:text-xs md:text-sm text-hud-muted mt-1 line-clamp-3 sm:line-clamp-2 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] sm:text-[10px] md:text-xs font-mono px-1.5 sm:px-2 py-0.5 border border-hud-cyan/30 text-hud-cyan"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </HudCard>
  );
}
