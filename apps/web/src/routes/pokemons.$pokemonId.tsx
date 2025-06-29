import React, { useState } from "react";
import { createFileRoute, useParams } from "@tanstack/react-router";
import {
  pokemonEvolutionQueryOptions,
  pokemonQueryOptions,
  usePokemon,
  usePokemonEvolution,
  usePokemonNavigation,
  usePokemonImage,
} from "../hooks";
import {
  typeGradients,
  typeShadowColors,
} from "../components/pokemon-card/pokemon-card-constants";
import {
  PokemonHeader,
  PokemonImageDisplay,
  PokemonEvolutionSection,
  PokemonStats,
  PokemonInfoGrid,
  PokemonVersionToggle,
} from "../components/pokemon-detail";
import { withDefault, flattenEvolutionChain } from "@poke-playbook/libs";
import type { PokemonType } from "../types";

const RouteComponent: React.FC = () => {
  const { pokemonId } = useParams({ from: "/pokemons/$pokemonId" });
  const { data: pokemon } = usePokemon(pokemonId);
  const { data: evolutionChain } = usePokemonEvolution(pokemonId);
  const [isShiny, setIsShiny] = useState(false);

  const { prevPokemonId, nextPokemonId } = usePokemonNavigation(pokemon);
  const pokemonImage = usePokemonImage(pokemon, isShiny);

  const evolutionPokemons = evolutionChain?.chain
    ? flattenEvolutionChain(evolutionChain.chain)
    : [];

  const primaryType: PokemonType = withDefault(
    pokemon.types?.[0]?.type?.name,
    "normal"
  );
  const typeGradient = withDefault(
    typeGradients[primaryType],
    typeGradients.normal
  );
  const shadowColor = withDefault(
    typeShadowColors[primaryType],
    typeShadowColors.normal
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 md:py-10 md:px-20">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${typeGradient} opacity-5 pointer-events-none`}
      />

      <div className="flex flex-col gap-8">
        <PokemonImageDisplay
          pokemon={pokemon}
          pokemonImage={pokemonImage}
          isShiny={isShiny}
          shadowColor={shadowColor}
          prevPokemonId={prevPokemonId}
          nextPokemonId={nextPokemonId}
        />

        <PokemonEvolutionSection evolutionPokemons={evolutionPokemons} />
      </div>

      <div className="flex flex-col gap-6">
        <PokemonHeader pokemon={pokemon} shadowColor={shadowColor} />

        <div className="flex flex-col gap-6">
          <PokemonVersionToggle isShiny={isShiny} onToggle={setIsShiny} />

          <PokemonInfoGrid pokemon={pokemon} />

          <PokemonStats pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/pokemons/$pokemonId")({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { pokemonId } }) => {
    const pokemon = await queryClient.ensureQueryData(
      pokemonQueryOptions(pokemonId)
    );
    const evolution = await queryClient.ensureQueryData(
      pokemonEvolutionQueryOptions(pokemonId)
    );

    return { pokemon, evolution };
  },
});
