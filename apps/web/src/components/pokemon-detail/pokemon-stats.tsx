import { formatStatName } from "@poke-playbook/libs";
import type { PokemonDetail } from "../../types";

type PokemonStatsProps = {
  pokemon: PokemonDetail;
};

const getStatColor = (value: number) => {
  if (value < 50) return "#FF6B6B";
  if (value < 100) return "#7ED321";
  return "#4A90E2";
};

export function PokemonStats({ pokemon }: PokemonStatsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Stats</h3>
      <div className="stats stats-vertical w-full shadow">
        {pokemon.stats.map((stat) => (
          <div key={stat.stat.name} className="stat">
            <div className="stat-title">{formatStatName(stat.stat.name)}</div>
            <div className="stat-value text-lg">{stat.base_stat}</div>
            <div className="stat-desc">
              <progress
                className="progress w-full"
                value={stat.base_stat}
                max="255"
                style={{
                  accentColor: getStatColor(stat.base_stat),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 