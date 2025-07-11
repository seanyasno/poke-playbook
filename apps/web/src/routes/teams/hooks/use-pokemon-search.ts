import { useQuery } from "@tanstack/react-query";
import { pokemonApi } from "../../../constants";
import { useDebouncedValue } from "../../../hooks";

export function usePokemonSearch(searchTerm: string, limit = 20) {
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  return useQuery({
    queryKey: ["pokemon-search", debouncedSearchTerm, limit],
    queryFn: async () => {
      if (!debouncedSearchTerm.trim()) {
        // Return first 20 Pokemon if no search term
        const response = await pokemonApi.apiV2PokemonList(limit, 0);
        return response.data;
      }

      // Search with the term
      const response = await pokemonApi.apiV2PokemonList(
        limit,
        0,
        debouncedSearchTerm,
      );
      return response.data;
    },
    enabled: true, // Always enabled, will return default list when no search term
  });
}
