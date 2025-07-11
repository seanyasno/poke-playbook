import { type TeamPokemon } from "../types/team.types";

type PokemonSpritesProps = {
  pokemon: TeamPokemon[];
};

export function PokemonSprites({ pokemon }: PokemonSpritesProps) {
  const sortedPokemon = [...pokemon].sort((a, b) => a.position - b.position);
  const displayPokemon = sortedPokemon.slice(0, 4); // Show max 4 sprites
  const remainingCount = Math.max(0, pokemon.length - 4);

  if (pokemon.length === 0) {
    return (
      <div className="flex items-center justify-center h-16 bg-base-200 rounded-lg">
        <span className="text-sm text-base-content/50">No Pokémon yet</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 h-16">
      {displayPokemon.map((p) => (
        <div
          key={p.id}
          className="w-12 h-12 bg-base-200 rounded-full flex items-center justify-center overflow-hidden"
          title={p.nickname || p.pokemon_name}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.pokemon_id}.png`}
            alt={p.pokemon_name}
            className="w-10 h-10 object-contain"
            onError={(e) => {
              e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.pokemon_id}.png`;
            }}
          />
        </div>
      ))}

      {remainingCount > 0 && (
        <div className="w-12 h-12 bg-base-300 rounded-full flex items-center justify-center">
          <span className="text-xs font-medium text-base-content/70">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
}
