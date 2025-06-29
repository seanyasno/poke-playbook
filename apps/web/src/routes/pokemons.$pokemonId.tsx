import React from "react";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { pokemonQueryOptions, usePokemon } from "../hooks";

const RouteComponent: React.FC = () => {
  const { pokemonId } = useParams({ from: "/pokemons/$pokemonId" });
  const { data: pokemon } = usePokemon(pokemonId);

  return <div>Hello {pokemon.name} {pokemon.id}</div>;
};

export const Route = createFileRoute("/pokemons/$pokemonId")({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { pokemonId } }) => {
    const pokemon = await queryClient.ensureQueryData(
      pokemonQueryOptions(pokemonId)
    );

    return { pokemon };
  },
});
