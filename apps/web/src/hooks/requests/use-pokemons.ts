import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { pokemonApi } from "../../constants";
import type { PaginatedPokemonSummaryList } from "pokeapi-client";

export function usePokemons(
  limit?: number,
  offset?: number,
  query?: string,
  queryOptions?: UseQueryOptions<
    PaginatedPokemonSummaryList,
    Error,
    PaginatedPokemonSummaryList,
    string[]
  >
) {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const response = await pokemonApi.apiV2PokemonList(limit, offset, query);

      return response.data;
    },
    ...queryOptions,
  });
}
