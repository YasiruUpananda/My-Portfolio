import { ChevronDown } from "lucide-react";

export default function FullscreenSlide({ id, children, showHint = true }) {
  return (
    <section
      id={id}
      className="fullscreen-slide snap-start snap-always flex flex-col"
    >
      <div className="flex-1 min-h-0 h-full w-full max-w-4xl mx-auto flex flex-col pb-14 md:pb-0">
        {children}
      </div>
      {showHint && (
        <div className="shrink-0 hidden sm:flex justify-center pb-1 pt-1">
          <ChevronDown className="w-5 h-5 text-hud-cyan/40 animate-bounce" aria-hidden />
        </div>
      )}
    </section>
  );
}
