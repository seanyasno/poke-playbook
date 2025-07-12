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
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">
            Select Pokémon for Slot {targetSlot}
          </h3>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            <IoClose className="h-6 w-6" />
          </button>
        </div>

        <div className="form-control mb-4">
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="input input-bordered"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <span>Failed to load Pokémon. Please try again.</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pokemonData?.results?.map(
                (pokemon: { name: string; url: string }) => {
                  const pokemonId = parseInt(
                    pokemon.url.split("/").slice(-2, -1)[0],
                  );

                  return (
                    <div
                      key={pokemon.name}
                      className="card bg-base-100 shadow hover:shadow-lg cursor-pointer transition-shadow"
                      onClick={() => handlePokemonSelect(pokemon)}
                    >
                      <figure className="px-4 pt-4">
                        <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center overflow-hidden">
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                            alt={pokemon.name}
                            className="w-16 h-16 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
                            }}
                          />
                        </div>
                      </figure>
                      <div className="card-body p-4 pt-2 text-center">
                        <h3 className="text-sm font-medium capitalize">
                          {pokemon.name}
                        </h3>
                        <div className="text-xs text-base-content/60">
                          #{pokemonId.toString().padStart(3, "0")}
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          )}
        </div>

        <div className="modal-action mt-4">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
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
