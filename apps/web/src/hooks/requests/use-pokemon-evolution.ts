import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { evolutionApi, pokemonApi } from "../../constants";
import type { EvolutionChainDetail } from "pokeapi-client";

export function pokemonEvolutionQueryOptions(pokemonNameOrId: string) {
  return queryOptions({
    queryKey: ["pokemon-evolution", pokemonNameOrId],
    queryFn: async () => {
      // First get the Pokemon data to get the species URL
      const pokemonResponse = await pokemonApi.apiV2PokemonRetrieve(pokemonNameOrId);
      const speciesUrl = pokemonResponse.data.species.url;
      
      // Extract species ID from URL
      const speciesId = speciesUrl.split('/').filter(Boolean).pop();
      
      // Get the species data to find evolution chain URL
      const speciesResponse = await pokemonApi.apiV2PokemonSpeciesRetrieve(speciesId!);
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
      
      // Extract evolution chain ID from URL
      const evolutionChainId = evolutionChainUrl.split('/').filter(Boolean).pop();
      
      // Finally get the evolution chain data
      const response = await evolutionApi.apiV2EvolutionChainRetrieve(evolutionChainId!);

      return response.data;
    },
  });
}

export function usePokemonEvolution(
  pokemonNameOrId: string,
  queryOptions?: UseSuspenseQueryOptions<
    EvolutionChainDetail,
    Error,
    EvolutionChainDetail,
    string[]
  >
) {
  return useSuspenseQuery({
    ...pokemonEvolutionQueryOptions(pokemonNameOrId),
    ...queryOptions,
  });
}
