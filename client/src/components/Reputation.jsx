import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import HudCard from "./HudCard";
import StatBar from "./StatBar";
import { useIsMobile } from "../hooks/useIsMobile";

export default function Reputation({ reputation, delay = 0 }) {
  const isMobile = useIsMobile();

  return (
    <HudCard title="REPUTATION" delay={delay} className="flex-1">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 min-h-0 items-center">
        {/* Left Column: Title, Tagline and Progress Bars */}
        <div className="flex flex-col justify-center h-full space-y-4 sm:space-y-6 md:pr-4 py-1">
          <div className="space-y-1">
            <h3 className="font-display text-lg sm:text-xl md:text-2xl font-extrabold text-hud-yellow tracking-wider leading-none">
              {reputation.title}
            </h3>
            <p className="font-body text-xs sm:text-sm text-hud-muted tracking-wide leading-relaxed">
              {reputation.description || "Clean Code. Smart Solutions."}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {reputation.metrics.map((m, i) => (
              <StatBar key={m.name} label={m.name} value={m.value} delay={delay + i * 0.08} large />
            ))}
          </div>
        </div>

        {/* Right Column: Radar Chart */}
        <div className="h-full min-h-[180px] sm:min-h-[240px] md:min-h-[300px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={reputation.radar} cx="50%" cy="50%" outerRadius={isMobile ? "60%" : "72%"}>
              <PolarGrid stroke="rgba(0, 242, 255, 0.2)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: "#6b7a99",
                  fontSize: isMobile ? 9 : 11,
                  fontFamily: "Rajdhani",
                  fontWeight: "bold",
                }}
              />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="#ffcc00"
                fill="#ffcc00"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </HudCard>
  );
}
