import { Link } from "@tanstack/react-router";
import type { TeamPokemon } from "@/features";

type PokemonCardProps = {
  pokemon: TeamPokemon;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
      <figure className="px-6 pt-6">
        <div className="w-32 h-32 bg-base-200 rounded-full flex items-center justify-center overflow-hidden relative">
          <div className="badge badge-primary absolute top-2 left-2 z-10">
            {pokemon.position}
          </div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_id}.png`}
            alt={pokemon.pokemon_name}
            className="w-28 h-28 object-contain"
            onError={(e) => {
              e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_id}.png`;
            }}
          />
        </div>
      </figure>

      <div className="card-body text-center">
        <div className="text-sm text-base-content/60 mb-1">
          {pokemon.pokemon_name} #
          {pokemon.pokemon_id.toString().padStart(3, "0")}
        </div>

        <h3 className="card-title text-lg justify-center mb-2">
          {pokemon.nickname || pokemon.pokemon_name}
        </h3>

        <div className="text-xs text-base-content/50">
          Added {new Date(pokemon.created_at).toLocaleDateString()}
        </div>

        <div className="card-actions justify-center mt-4">
          <Link
            to="/pokemons/$pokemonId"
            params={{ pokemonId: pokemon.pokemon_id.toString() }}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
