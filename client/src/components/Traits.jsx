import HudCard from "./HudCard";
import StatBar from "./StatBar";

export default function Traits({ traits, delay = 0 }) {
  return (
    <HudCard title="TRAITS" delay={delay} className="flex-1">
      <ul className="flex-1 flex flex-col justify-start md:justify-center gap-3 sm:gap-5 md:gap-6">
        {traits.map((trait, i) => (
          <li key={trait.name}>
            <StatBar
              label={trait.name}
              value={trait.score}
              color="yellow"
              delay={delay + i * 0.08}
              large
            />
          </li>
        ))}
      </ul>
    </HudCard>
  );
}

