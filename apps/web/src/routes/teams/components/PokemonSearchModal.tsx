import { useState } from "react";
import { useTeamForm } from "../hooks/use-team-form";
import { usePokemonSearch } from "../hooks/use-pokemon-search";

type PokemonSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  targetSlot: number | null;
};

export function PokemonSearchModal({
  isOpen,
  onClose,
  targetSlot,
}: PokemonSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { addPokemon } = useTeamForm();
  const { data: pokemonData, isLoading, error } = usePokemonSearch(searchTerm);

  const handlePokemonSelect = (pokemon: { name: string; url: string }) => {
    if (targetSlot) {
      // Extract Pokemon ID from URL (e.g., "https://pokeapi.co/api/v2/pokemon/1/" -> 1)
      const pokemonId = parseInt(pokemon.url.split("/").slice(-2, -1)[0]);

      addPokemon(
        {
          pokemon_id: pokemonId,
          pokemon_name: pokemon.name,
          nickname: "", // Start with empty nickname
        },
        targetSlot,
      );

      onClose();
      setSearchTerm(""); // Reset search term
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-11/12 max-w-4xl h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">
            Select Pokémon for Slot {targetSlot}
          </h3>
          <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="form-control mb-4">
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="input input-bordered"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
}
