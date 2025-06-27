import React from "react";
import { usePokemons } from "../hooks";
import { PokemonCard } from "./pokemon-card";
import { isNotEmptyArray, isNullOrUndefined } from "@poke-playbook/libs";

export const PokemonList: React.FC = () => {
  const { data: pokemons, isLoading, isError } = usePokemons();

  if (isLoading) {
    return (
      <div className="mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-80 h-96 bg-base-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || isNullOrUndefined(pokemons) || !isNotEmptyArray(pokemons?.results)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="alert alert-error max-w-md mx-auto">
            <span>Failed to load Pokémon. Please try again!</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center">
        {pokemons.results.map((pokemon) => (
          <div key={pokemon.name} className="w-80 h-96">
            <PokemonCard pokemonName={pokemon.name} />
          </div>
        ))}
      </div>
    </div>
  );
};
