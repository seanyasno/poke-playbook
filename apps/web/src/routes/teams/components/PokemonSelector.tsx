import { useState } from "react";
import { useTeamForm } from "../hooks/use-team-form";
import { PokemonSlot } from "./PokemonSlot";
import { PokemonSearchModal } from "./PokemonSearchModal";

export function PokemonSelector() {
  const { state } = useTeamForm();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const handleSlotClick = (position: number) => {
    setSelectedSlot(position);
    setIsSearchModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSearchModalOpen(false);
    setSelectedSlot(null);
  };

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h2 className="card-title">Team Pokémon</h2>
          <div className="text-sm text-base-content/60">
            {state.selectedPokemon.length}/6 Pokémon
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((position) => (
            <PokemonSlot
              key={position}
              position={position}
              onSlotClick={handleSlotClick}
            />
          ))}
        </div>

        <PokemonSearchModal
          isOpen={isSearchModalOpen}
          onClose={handleCloseModal}
          targetSlot={selectedSlot}
        />
      </div>
    </div>
  );
}
