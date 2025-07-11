import { useState } from "react";
import { useTeamForm } from "../hooks/use-team-form";

type PokemonSlotProps = {
  position: number;
  onSlotClick: (position: number) => void;
};

export function PokemonSlot({ position, onSlotClick }: PokemonSlotProps) {
  const { getPokemonAtPosition, removePokemon, updateNickname } = useTeamForm();
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  const pokemon = getPokemonAtPosition(position);

  const handleNicknameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditingNickname(false);
  };

  const handleNicknameChange = (value: string) => {
    updateNickname(position, value);
  };

  if (!pokemon) {
    return (
      <div
        className="card bg-base-200 hover:bg-base-300 cursor-pointer transition-colors min-h-[160px] flex items-center justify-center border-2 border-dashed border-base-content/20"
        onClick={() => onSlotClick(position)}
      >
        <div className="text-center">
          <div className="text-4xl text-base-content/30 mb-2">+</div>
          <div className="text-sm text-base-content/50">Slot {position}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="badge badge-primary badge-sm">{position}</div>
          <button
            className="btn btn-ghost btn-xs btn-square"
            onClick={() => removePokemon(position)}
            title="Remove Pokémon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-2 overflow-hidden">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_id}.png`}
              alt={pokemon.pokemon_name}
              className="w-14 h-14 object-contain"
              onError={(e) => {
                e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_id}.png`;
              }}
            />
          </div>

          <div className="text-xs text-center text-base-content/60 mb-1">
            {pokemon.pokemon_name}
          </div>

          {isEditingNickname ? (
            <form onSubmit={handleNicknameSubmit} className="w-full">
              <input
                type="text"
                className="input input-xs input-bordered w-full text-center"
                value={pokemon.nickname}
                onChange={(e) => handleNicknameChange(e.target.value)}
                onBlur={() => setIsEditingNickname(false)}
                autoFocus
                maxLength={50}
              />
            </form>
          ) : (
            <button
              className="text-sm font-medium text-center hover:link w-full truncate"
              onClick={() => setIsEditingNickname(true)}
              title={pokemon.nickname || "Click to add nickname"}
            >
              {pokemon.nickname || "Add nickname"}
            </button>
          )}
        </div>

        <button
          className="btn btn-ghost btn-xs mt-2"
          onClick={() => onSlotClick(position)}
        >
          Change
        </button>
      </div>
    </div>
  );
}
