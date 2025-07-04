import { useMemo } from "react";
import { withDefault } from "@poke-playbook/libs";
import type { PokemonSummary } from "pokeapi-client";
import type { SearchParamsSchema } from "../types";
import type { z } from "zod";
import { usePokemonTypesQueries } from "./requests/use-pokemon-types-queries";

type SearchParams = z.infer<typeof SearchParamsSchema>;

interface UseAdvancedPokemonFilterParams {
  allPokemons: PokemonSummary[];
  searchParams: SearchParams;
}

export function useAdvancedPokemonFilter({
  allPokemons,
  searchParams,
}: UseAdvancedPokemonFilterParams) {
  const typeQueries = usePokemonTypesQueries(searchParams.types);

  const pokemonsByType = useMemo(() => {
    const typePokemonSets = typeQueries
      .filter((query) => query.data)
      .map(
        (query) =>
          new Set(
            withDefault(query.data?.pokemon, [])
              .filter((p) => p?.pokemon?.name)
              .map((p) => p.pokemon!.name)
              .filter((name): name is string => Boolean(name)),
          ),
      );

    if (typePokemonSets.length === 0) {
      return null;
    }

    if (typePokemonSets.length === 1) {
      return typePokemonSets[0];
    }
    const [firstSet, ...restSets] = typePokemonSets;
    const intersection = new Set<string>();

    for (const pokemon of firstSet) {
      if (restSets.every((set) => set.has(pokemon))) {
        intersection.add(pokemon);
      }
    }

    return intersection;
  }, [typeQueries]);

  const isTypeFilteringLoading = useMemo(() => {
    return (
      searchParams.types &&
      searchParams.types.length > 0 &&
      typeQueries.some((query) => query.isLoading)
    );
  }, [searchParams.types, typeQueries]);

  const filteredPokemons = useMemo(() => {
    let filtered = [...allPokemons];

    if (searchParams.search) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchParams.search!.toLowerCase()),
      );
    }

    if (pokemonsByType && searchParams.types && searchParams.types.length > 0) {
      filtered = filtered.filter((pokemon) => pokemonsByType.has(pokemon.name));
    }

    return filtered;
  }, [allPokemons, searchParams, pokemonsByType]);

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
