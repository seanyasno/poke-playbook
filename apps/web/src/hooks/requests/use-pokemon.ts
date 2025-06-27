import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { pokemonApi } from "../../constants";
import {
  PokemonDetailSchema,
  type PokemonDetail,
} from "../../types/pokemon-detail-schema";

export function usePokemon(
  pokemonNameOrId: string,
  queryOptions?: UseQueryOptions<PokemonDetail, Error, PokemonDetail, string[]>
) {
  return useQuery({
    ...queryOptions,
    queryKey: ["pokemon", pokemonNameOrId],
    queryFn: async () => {
      const response = await pokemonApi.apiV2PokemonRetrieve(pokemonNameOrId);

      return PokemonDetailSchema.parse(response.data);
    },
  });
}
