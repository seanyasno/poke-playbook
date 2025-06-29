import type { PokemonDetail } from "../types";

const MAX_POKEMON_ID = 1025;

export function usePokemonNavigation(pokemon: PokemonDetail) {
  const prevPokemonId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextPokemonId = pokemon.id < MAX_POKEMON_ID ? pokemon.id + 1 : null;

  return {
    prevPokemonId,
    nextPokemonId,
  };
} 