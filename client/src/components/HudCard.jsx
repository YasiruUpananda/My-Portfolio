import { motion } from "framer-motion";

export default function HudCard({ title, subtitle, children, className = "", delay = 0, fill = false }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className={`relative w-full h-full min-h-0 flex flex-col ${className}`}
    >
      {/* ─── Outer border with clip-path (shadow-glow applies sci-fi cyan glow) ─── */}
      <div className="absolute inset-0 bg-hud-cyan/25 hud-clip shadow-glow pointer-events-none">
        {/* ─── Inner panel background (grid overlay pattern) ─── */}
        <div
          className="absolute inset-[1px] bg-hud-panel/95 hud-clip"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 242, 255, 0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 242, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* ─── Outer Floating Border Segments (Sci-Fi Accents from the Photo) ─── */}
      {/* Stepped Top Accent Line */}
      <svg className="absolute -top-1.5 left-6 right-6 h-2 text-hud-cyan/25 pointer-events-none" viewBox="0 0 100 8" preserveAspectRatio="none">
        <path d="M 0 2 H 35 L 38 6 H 48 L 51 2 H 100" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
      </svg>
      
      {/* Left Outer Accent Line */}
      <div className="absolute top-6 bottom-6 -left-1.5 w-[1px] bg-hud-cyan/20 pointer-events-none">
        <div className="absolute top-0 left-0 w-1.5 h-[1px] bg-hud-cyan/50 -translate-x-[0.25px]" />
        <div className="absolute bottom-0 left-0 w-1.5 h-[1px] bg-hud-cyan/50 -translate-x-[0.25px]" />
      </div>

      {/* Right Outer Accent Line */}
      <div className="absolute top-6 bottom-6 -right-1.5 w-[1px] bg-hud-cyan/20 pointer-events-none">
        <div className="absolute top-0 right-0 w-1.5 h-[1px] bg-hud-cyan/50 translate-x-[0.25px]" />
        <div className="absolute bottom-0 right-0 w-1.5 h-[1px] bg-hud-cyan/50 translate-x-[0.25px]" />
      </div>

      {/* Bottom Outer Accent Line */}
      <div className="absolute left-6 right-6 -bottom-1.5 h-[1px] bg-hud-cyan/20 pointer-events-none">
        <div className="absolute left-0 bottom-0 w-1 h-1.5 border-b border-r border-hud-cyan/40" />
        <div className="absolute right-0 bottom-0 w-1 h-1.5 border-b border-l border-hud-cyan/40" />
      </div>

      {/* ─── Detailed Futuristic Corner Brackets ─── */}
      {/* Top Left: Yellow/Orange Chamfer Corner (Parallel Offset) */}
      <div className="hidden sm:block absolute -top-1 -left-1 w-8 h-8 pointer-events-none z-20 text-hud-yellow">
        <svg className="w-full h-full" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M 0 16 L 16 0" />
          <path d="M 16 0 H 22" strokeWidth="1" />
          <path d="M 0 16 V 22" strokeWidth="1" />
        </svg>
      </div>
      <div className="block sm:hidden absolute -top-0.5 -left-0.5 w-6 h-6 pointer-events-none z-20 text-hud-yellow">
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M 0 10 L 10 0" />
          <path d="M 10 0 H 14" strokeWidth="1" />
          <path d="M 0 10 V 14" strokeWidth="1" />
        </svg>
      </div>

      {/* Top Right: Cyan Square Corner with Dot */}
      <div className="hidden sm:block absolute -top-1 -right-1 w-8 h-8 pointer-events-none z-20 text-hud-cyan">
        <svg className="w-full h-full" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M 16 0 H 32 V 16" />
          <rect x="24" y="4" width="4" height="4" fill="currentColor" opacity="0.5" stroke="none" />
        </svg>
      </div>
      <div className="block sm:hidden absolute -top-0.5 -right-0.5 w-6 h-6 pointer-events-none z-20 text-hud-cyan">
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 12 0 H 24 V 12" />
        </svg>
      </div>

      {/* Bottom Left: Cyan Notch Corner */}
      <div className="hidden sm:block absolute -bottom-1 -left-1 w-8 h-8 pointer-events-none z-20 text-hud-cyan">
        <svg className="w-full h-full" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M 0 16 V 32 H 16" />
          <path d="M 4 28 H 8 V 32" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>
      <div className="block sm:hidden absolute -bottom-0.5 -left-0.5 w-6 h-6 pointer-events-none z-20 text-hud-cyan">
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M 0 12 V 24 H 12" />
        </svg>
      </div>

      {/* Bottom Right: Cyan Chamfer Corner with Double Lines (Parallel Offset) */}
      <div className="hidden sm:block absolute -bottom-1 -right-1 w-8 h-8 pointer-events-none z-20 text-hud-cyan">
        <svg className="w-full h-full" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M 16 32 L 32 16" />
          <path d="M 10 32 H 16" strokeWidth="1" />
          <path d="M 32 10 V 16" strokeWidth="1" />
          <path d="M 18 28 L 28 18" strokeWidth="1.2" opacity="0.6" />
        </svg>
      </div>
      <div className="block sm:hidden absolute -bottom-0.5 -right-0.5 w-6 h-6 pointer-events-none z-20 text-hud-cyan">
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M 14 24 L 24 14" />
          <path d="M 9 24 H 14" strokeWidth="1" />
          <path d="M 24 9 V 14" strokeWidth="1" />
        </svg>
      </div>

      {/* ─── Content Wrapper ─── */}
      <div className="relative flex-1 flex flex-col p-4 sm:p-5 md:p-7 min-h-0 z-10">
        {(title || subtitle) && (
          <header className="mb-4 sm:mb-5 shrink-0 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* ::: Tech Dot Indicators */}
                <div className="flex gap-0.5 items-center">
                  <span className="w-1.5 h-3 bg-hud-cyan rounded-xs" />
                  <span className="w-1 h-3 bg-hud-cyan/60 rounded-xs" />
                  <span className="w-0.5 h-3 bg-hud-cyan/35 rounded-xs" />
                </div>
                {title && (
                  <h2 className="font-display text-xs sm:text-sm tracking-[0.22em] font-bold text-white uppercase leading-none">
                    {title}
                  </h2>
                )}
              </div>

              {/* Yellow/Orange Diagonal Stripes ////// */}
              <div className="flex items-center">
                <div
                  className="w-10 h-2 opacity-80"
                  style={{
                    background: "repeating-linear-gradient(45deg, #ffcc00, #ffcc00 2px, transparent 2px, transparent 6px)",
                  }}
                />
              </div>
            </div>

            {/* Custom high-tech horizontal divider with step notch */}
            <div className="relative w-full h-[2px] bg-hud-cyan/20 mt-2 overflow-visible">
              <div className="absolute left-0 top-0 h-full w-24 bg-hud-cyan/85" />
              <div className="absolute right-8 -top-[3px] w-6 h-[5px] border-r border-b border-hud-cyan/60" />
            </div>

            {subtitle && (
              <p className="text-hud-cyan font-display text-[10px] sm:text-xs md:text-sm tracking-widest mt-1.5 uppercase">
                {subtitle}
              </p>
            )}
          </header>
        )}

        <div
          className={`flex-1 flex flex-col min-h-0 ${
            fill ? "h-full md:overflow-hidden overflow-y-auto pr-0.5 sm:pr-1" : "overflow-y-auto pr-0.5 sm:pr-1"
          }`}
        >
          {children}
        </div>
      </div>
    </motion.section>
  );
}
