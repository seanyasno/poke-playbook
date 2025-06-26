import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { PokemonDetail } from "pokeapi-client";
import { pokemonApi } from "../../constants";

export function usePokemon(
  pokemonNameOrId: string,
  queryOptions: UseQueryOptions<PokemonDetail, Error, PokemonDetail, string[]>
) {
  return useQuery({
    ...queryOptions,
    queryKey: ["pokemon", pokemonNameOrId],
    queryFn: async () => {
      const response = await pokemonApi.apiV2PokemonRetrieve(pokemonNameOrId);

      return response.data;
    },
  });
}
