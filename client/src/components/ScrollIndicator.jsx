import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "stats", label: "Stats" },
  { id: "reputation", label: "Rep" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "tech", label: "Tech" },
  { id: "traits", label: "Traits" },
  { id: "achievements", label: "Achieve" },
  { id: "abilities", label: "Abilities" },
  { id: "contact", label: "Contact" },
];

export default function ScrollIndicator() {
  const [active, setActive] = useState("profile");

  useEffect(() => {
    const slides = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!slides.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { root: document.querySelector(".snap-container"), threshold: [0.35, 0.55, 0.75] }
    );

    slides.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed z-50 flex gap-1.5 sm:gap-2
        bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2
        max-w-[calc(100vw-1.5rem)] overflow-x-auto no-scrollbar px-2 py-1.5"
      aria-label="Section navigation"
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          title={s.label}
          aria-label={s.label}
          aria-current={active === s.id ? "true" : undefined}
          className={`touch-target shrink-0 flex items-center justify-center hud-clip-sm border transition-all
            w-9 h-9 sm:w-10 sm:h-10
            ${
              active === s.id
                ? "bg-hud-cyan border-hud-cyan shadow-glow"
                : "bg-hud-panel/80 border-hud-cyan/40 active:bg-hud-cyan/20"
            }`}
        >
          <span className="sr-only">{s.label}</span>
          <span
            className={`font-mono text-[8px] uppercase ${
              active === s.id ? "text-hud-bg" : "text-hud-cyan"
            }`}
          >
            {s.label.slice(0, 3)}
          </span>
        </a>
      ))}
    </nav>
  );
}
