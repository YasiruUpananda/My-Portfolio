import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

export const TECH_ICON_MAP = {
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  react: { Icon: SiReact, color: "#61DAFB" },
  "next.js": { Icon: SiNextdotjs, color: "#ffffff" },
  nextjs: { Icon: SiNextdotjs, color: "#ffffff" },
  "node.js": { Icon: SiNodedotjs, color: "#339933" },
  nodejs: { Icon: SiNodedotjs, color: "#339933" },
  python: { Icon: SiPython, color: "#3776AB" },
  tailwind: { Icon: SiTailwindcss, color: "#06B6D4" },
  tailwindcss: { Icon: SiTailwindcss, color: "#06B6D4" },
  mongodb: { Icon: SiMongodb, color: "#47A248" },
  postgresql: { Icon: SiPostgresql, color: "#4169E1" },
  aws: { Icon: FaAws, color: "#FF9900" },
  docker: { Icon: SiDocker, color: "#2496ED" },
  git: { Icon: SiGit, color: "#F05032" },
};

export function resolveTechIcon(tech) {
  const slug = (tech.icon || tech.name).toLowerCase().trim();
  const normalized = slug.replace(/\s+/g, "");
  return (
    TECH_ICON_MAP[slug] ||
    TECH_ICON_MAP[normalized] ||
    null
  );
}
