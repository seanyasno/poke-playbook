import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { withDefault } from "@poke-playbook/libs";
import { pokemonApi } from "../constants";
import type { PokemonSummary } from "pokeapi-client";
import type { SearchParamsSchema } from "../types";
import type { z } from "zod";

type SearchParams = z.infer<typeof SearchParamsSchema>;

interface UseAdvancedPokemonFilterParams {
  allPokemons: PokemonSummary[];
  searchParams: SearchParams;
}

export function useAdvancedPokemonFilter({ 
  allPokemons, 
  searchParams 
}: UseAdvancedPokemonFilterParams) {
  // Fetch Pokemon data for selected types
  const typeQueries = useQueries({
    queries: withDefault(searchParams.types, []).map(typeName => ({
      queryKey: ["pokemon-by-type", typeName],
      queryFn: async () => {
        const response = await pokemonApi.apiV2TypeRetrieve(typeName);
        return response.data;
      },
      staleTime: 1000 * 60 * 30, // 30 minutes
      enabled: !!(searchParams.types && searchParams.types.length > 0),
    })),
  });

  // Extract Pokemon names from type queries
  const pokemonsByType = useMemo(() => {
    const typePokemonSets = typeQueries
      .filter(query => query.data)
      .map(query => 
        new Set(
          withDefault(query.data?.pokemon, [])
            .filter(p => p?.pokemon?.name)
            .map(p => p.pokemon!.name)
            .filter((name): name is string => Boolean(name))
        )
      );

    if (typePokemonSets.length === 0) {
      return null;
    }

    // Find intersection of all type sets (Pokemon that have ALL selected types)
    if (typePokemonSets.length === 1) {
      return typePokemonSets[0];
    }

    // Find intersection of multiple type sets
    const [firstSet, ...restSets] = typePokemonSets;
    const intersection = new Set<string>();
    
    for (const pokemon of firstSet) {
      if (restSets.every(set => set.has(pokemon))) {
        intersection.add(pokemon);
      }
    }

    return intersection;
  }, [typeQueries]);

  // Determine if type filtering is loading
  const isTypeFilteringLoading = useMemo(() => {
    return (searchParams.types && searchParams.types.length > 0) && 
           typeQueries.some(query => query.isLoading);
  }, [searchParams.types, typeQueries]);

  // Apply all filters
  const filteredPokemons = useMemo(() => {
    let filtered = [...allPokemons];

    // Step 1: Apply text search filter
    if (searchParams.search) {
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchParams.search!.toLowerCase())
      );
    }

    // Step 2: Apply type filter
    if (pokemonsByType && searchParams.types && searchParams.types.length > 0) {
      filtered = filtered.filter(pokemon => pokemonsByType.has(pokemon.name));
    }

    // Step 3: Apply game filter (simplified - in real implementation you'd need game-specific Pokemon data)
    // This would require additional API calls to get Pokemon available in specific games
    if (searchParams.game) {
      // For now, this is a placeholder - you'd need to implement game-specific filtering
      // by fetching game version data and cross-referencing with Pokemon availability
      console.log(`Game filter for ${searchParams.game} would be applied here`);
    }

    return filtered;
  }, [allPokemons, searchParams, pokemonsByType]);

  // Calculate filter stats
  const filterStats = useMemo(() => {
    const totalCount = allPokemons.length;
    const filteredCount = filteredPokemons.length;
    const hasActiveFilters = !!(
      searchParams.search ?? 
      (searchParams.types && searchParams.types.length > 0) ?? 
      searchParams.game
    );

    return {
      totalCount,
      filteredCount,
      hasActiveFilters,
      reductionPercentage: hasActiveFilters 
        ? Math.round(((totalCount - filteredCount) / totalCount) * 100)
        : 0,
    };
  }, [allPokemons.length, filteredPokemons.length, searchParams]);

  return {
    filteredPokemons,
    isTypeFilteringLoading,
    filterStats,
    pokemonsByType,
  };
} 