import { Link } from "@tanstack/react-router";
import { capitalize } from "@poke-playbook/libs";

type EvolutionPokemon = {
  name: string;
  id: string;
};

type PokemonEvolutionSectionProps = {
  evolutionPokemons: EvolutionPokemon[];
  shadowColor: string;
};

export function PokemonEvolutionSection({
  evolutionPokemons,
  shadowColor,
}: PokemonEvolutionSectionProps) {
  if (evolutionPokemons.length <= 1) {
    return null;
  }

  return (
    <div className="card-body">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {evolutionPokemons.map((evolutionPokemon, index) => (
          <div key={evolutionPokemon.id} className="flex items-center">
            <Link
              to="/pokemons/$pokemonId"
              params={{ pokemonId: evolutionPokemon.id }}
              className="block group"
            >
              <div className="card card-compact bg-white hover:shadow-lg transition-all duration-300 shadow-sm border border-gray-100 group-hover:scale-105">
                <div className="card-body items-center text-center">
                  <div className="avatar">
                    <div className="w-16 rounded-full ring ring-gray-200 ring-offset-2">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionPokemon.id}.png`}
                        alt={evolutionPokemon.name}
                        className="transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionPokemon.id}.png`;
                        }}
                        style={{
                          filter: `drop-shadow(0 2px 8px ${shadowColor})`,
                        }}
                      />
                    </div>
                  </div>
                  <h4 className="text-xs font-semibold text-gray-800 capitalize">
                    {capitalize(evolutionPokemon.name)}
                  </h4>
                  <p className="text-xs text-gray-500">
                    #{evolutionPokemon.id.padStart(3, "0")}
                  </p>
                </div>
              </div>
            </Link>

            {index < evolutionPokemons.length - 1 && (
              <div className="flex items-center mx-2">
                <div className="divider divider-horizontal">→</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
