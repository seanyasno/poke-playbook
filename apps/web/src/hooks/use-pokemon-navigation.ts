import type { PokemonDetail } from "../types";
import { usePokemonNavigationQueries } from "./requests/use-pokemon-navigation-queries";

const MAX_POKEMON_ID = 1025;

export function usePokemonNavigation(pokemon: PokemonDetail) {
  const prevPokemonId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextPokemonId = pokemon.id < MAX_POKEMON_ID ? pokemon.id + 1 : null;

  const pokemonQueries = usePokemonNavigationQueries(
    prevPokemonId,
    nextPokemonId,
  );
  const [prevPokemonQuery, nextPokemonQuery] = pokemonQueries;

  return {
    prevPokemonId,
    nextPokemonId,
    prevPokemonName: prevPokemonQuery.data?.name,
    nextPokemonName: nextPokemonQuery.data?.name,
  };
}
