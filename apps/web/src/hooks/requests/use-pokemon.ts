import {
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { pokemonApi } from "../../constants";
import {
  PokemonDetailSchema,
  type PokemonDetail,
} from "../../types/pokemon-detail-schema";

export function usePokemon(
  pokemonNameOrId: string,
  queryOptions?: UseSuspenseQueryOptions<PokemonDetail, Error, PokemonDetail, string[]>
) {
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: ["pokemon", pokemonNameOrId],
    queryFn: async () => {
      const response = await pokemonApi.apiV2PokemonRetrieve(pokemonNameOrId);

      return PokemonDetailSchema.parse(response.data);
    },
  });
}
