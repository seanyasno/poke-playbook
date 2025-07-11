import { type TeamPokemon } from "../types/team.types";
import { PokemonCard } from "./PokemonCard";

type PokemonRosterProps = {
  pokemon: TeamPokemon[];
};

export function PokemonRoster({ pokemon }: PokemonRosterProps) {
  // Sort Pokemon by position and fill empty slots
  const sortedPokemon = [...pokemon].sort((a, b) => a.position - b.position);
  const pokemonSlots = Array.from({ length: 6 }, (_, index) => {
    const position = index + 1;
    return sortedPokemon.find((p) => p.position === position) || null;
  });

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🏃‍♂️</div>
        <h2 className="text-2xl font-bold mb-2">Team is Empty</h2>
        <p className="text-base-content/60">
          This team doesn't have any Pokémon yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Team Roster</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemonSlots.map((pokemon, index) => {
          const position = index + 1;

          if (!pokemon) {
            return (
              <div
                key={position}
                className="card bg-base-200 border-2 border-dashed border-base-content/20"
              >
                <div className="card-body items-center justify-center py-12">
                  <div className="badge badge-outline mb-2">
                    Slot {position}
                  </div>
                  <div className="text-base-content/40">Empty</div>
                </div>
              </div>
            );
          }

          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
}
