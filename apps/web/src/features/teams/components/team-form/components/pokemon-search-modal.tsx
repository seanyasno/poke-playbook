import { useState } from "react";
import { usePokemonSlots } from "../../../hooks";
import { IoClose } from "react-icons/io5";
import { useDebouncedValue } from "../../../../../hooks";
import { useQuery } from "@tanstack/react-query";
import { pokemonApi } from "../../../../../constants";
import { isEmptyString } from "@poke-playbook/libs";

type PokemonSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  targetSlot: number | null;
};

export const PokemonSearchModal: React.FC<PokemonSearchModalProps> = ({
  isOpen,
  onClose,
  targetSlot,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { addPokemon } = usePokemonSlots();
  const { data: pokemonData, isLoading, error } = usePokemonSearch(searchTerm);

  const handlePokemonSelect = (pokemon: { name: string; url: string }) => {
    if (targetSlot) {
      const pokemonId = parseInt(pokemon.url.split("/").slice(-2, -1)[0]);

      addPokemon(
        {
          pokemon_id: pokemonId,
          pokemon_name: pokemon.name,
          nickname: "",
        },
        targetSlot,
      );

      onClose();
      setSearchTerm("");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative bg-base-100 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <h3 className="text-xl font-medium text-base-content">
            Select Pokémon for slot {targetSlot}
          </h3>
          <button
            className="p-2 hover:bg-base-200 rounded-lg transition-colors"
            onClick={onClose}
          >
            <IoClose className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 border-b border-base-300">
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="w-full px-3 py-3 border border-base-300 rounded-lg bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : error ? (
            <div className="p-4 rounded-lg bg-error/10 border border-error/20">
              <span className="text-error">
                Failed to load Pokémon. Please try again.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {pokemonData?.results?.map(
                (pokemon: { name: string; url: string }) => {
                  const pokemonId = parseInt(
                    pokemon.url.split("/").slice(-2, -1)[0],
                  );

                  return (
                    <button
                      key={pokemon.name}
                      className="p-4 bg-base-100 border border-base-300 rounded-lg hover:bg-base-200/30 transition-colors text-center"
                      onClick={() => handlePokemonSelect(pokemon)}
                    >
                      <div className="w-16 h-16 mx-auto mb-3 bg-base-200/50 rounded-full flex items-center justify-center overflow-hidden">
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                          alt={pokemon.name}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
                          }}
                        />
                      </div>
                      <h3 className="text-sm font-medium capitalize text-base-content mb-1">
                        {pokemon.name}
                      </h3>
                      <div className="text-xs text-base-content/50">
                        #{pokemonId.toString().padStart(3, "0")}
                      </div>
                    </button>
                  );
                },
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t border-base-300">
          <button
            className="text-base-content/60 hover:text-base-content transition-colors px-3 py-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

function usePokemonSearch(searchTerm: string, limit = 20) {
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  return useQuery({
    queryKey: ["pokemon-search", debouncedSearchTerm, limit],
    queryFn: async () => {
      if (isEmptyString(debouncedSearchTerm.trim())) {
        const response = await pokemonApi.apiV2PokemonList(limit, 0);

        return response.data;
      }

      const response = await pokemonApi.apiV2PokemonList(
        limit,
        0,
        debouncedSearchTerm,
      );

      return response.data;
    },
    enabled: true,
  });
}
