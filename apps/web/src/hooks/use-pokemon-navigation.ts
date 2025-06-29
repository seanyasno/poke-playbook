import { useQueries } from "@tanstack/react-query";
import { pokemonApi } from "../constants";
import { PokemonDetailSchema } from "../types/pokemon-detail-schema";
import type { PokemonDetail } from "../types";

const MAX_POKEMON_ID = 1025;

export function usePokemonNavigation(pokemon: PokemonDetail) {
  const prevPokemonId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextPokemonId = pokemon.id < MAX_POKEMON_ID ? pokemon.id + 1 : null;

  const pokemonQueries = useQueries({
    queries: [
      {
        queryKey: ["pokemon", prevPokemonId?.toString()],
        queryFn: async () => {
          const response = await pokemonApi.apiV2PokemonRetrieve(prevPokemonId!.toString());
          return PokemonDetailSchema.parse(response.data);
        },
        enabled: !!prevPokemonId,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
      {
        queryKey: ["pokemon", nextPokemonId?.toString()],
        queryFn: async () => {
          const response = await pokemonApi.apiV2PokemonRetrieve(nextPokemonId!.toString());
          return PokemonDetailSchema.parse(response.data);
        },
        enabled: !!nextPokemonId,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    ],
  });

  const [prevPokemonQuery, nextPokemonQuery] = pokemonQueries;

  return {
    prevPokemonId,
    nextPokemonId,
    prevPokemonName: prevPokemonQuery.data?.name,
    nextPokemonName: nextPokemonQuery.data?.name,
  };
} 