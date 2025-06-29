import { Link } from "@tanstack/react-router";
import { capitalize } from "@poke-playbook/libs";
import type { PokemonDetail } from "../../types";

type PokemonImageDisplayProps = {
  pokemon: PokemonDetail;
  pokemonImage: string | null;
  isShiny: boolean;
  shadowColor: string;
  prevPokemonId: number | null;
  nextPokemonId: number | null;
};

export function PokemonImageDisplay({
  pokemon,
  pokemonImage,
  isShiny,
  shadowColor,
  prevPokemonId,
  nextPokemonId,
}: PokemonImageDisplayProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-4 relative">
      {prevPokemonId && (
        <Link
          to="/pokemons/$pokemonId"
          params={{ pokemonId: prevPokemonId.toString() }}
          className="btn btn-ghost btn-circle absolute left-0 top-1/2 -translate-y-1/2"
        >
          <div className="flex flex-col items-center gap-1 text-sm">
            <span>←</span>
            <span>#{prevPokemonId.toString().padStart(3, "0")}</span>
          </div>
        </Link>
      )}

      <div className="w-full flex justify-center">
        <div className="relative">
          <img
            src={pokemonImage || "/placeholder-pokemon.png"}
            alt={`${capitalize(pokemon.name)} ${isShiny ? "shiny" : "normal"} render`}
            className="w-80 h-80 object-contain transition-all duration-300 hover:scale-105"
            style={{
              filter: `drop-shadow(0 0 20px ${shadowColor})`,
            }}
          />
        </div>
      </div>

      {nextPokemonId && (
        <Link
          to="/pokemons/$pokemonId"
          params={{ pokemonId: nextPokemonId.toString() }}
          className="btn btn-ghost btn-circle absolute right-0 top-1/2 -translate-y-1/2"
        >
          <div className="flex flex-col items-center gap-1 text-sm">
            <span>→</span>
            <span>#{nextPokemonId.toString().padStart(3, "0")}</span>
          </div>
        </Link>
      )}
    </div>
  );
} 