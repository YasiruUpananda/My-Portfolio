import { motion } from "framer-motion";

const SEGMENTS = 10;

export default function SegmentedBar({ score, delay = 0, large = false }) {
  const filled = Math.round((score / 100) * SEGMENTS);
  const size = large ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "h-2 w-2";

  return (
    <div className={`flex gap-1 ${large ? "gap-1.5" : "gap-0.5"}`}>
      {Array.from({ length: SEGMENTS }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: delay + i * 0.03 }}
          className={`${size} hud-clip-sm ${
            i < filled
              ? "bg-hud-yellow shadow-[0_0_4px_rgba(255,204,0,0.8)]"
              : "bg-hud-bg border border-hud-cyan/20"
          }`}
        />
      ))}
    </div>
  );
}
