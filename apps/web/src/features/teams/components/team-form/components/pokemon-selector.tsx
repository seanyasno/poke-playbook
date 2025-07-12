import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { usePokemonSlots } from "../../../hooks";
import { PokemonSlot } from "./pokemon-slot.tsx";
import { PokemonSearchModal } from "./pokemon-search-modal.tsx";
import { isNotNullOrUndefined } from "@poke-playbook/libs";

export function PokemonSelector() {
  const { selectedPokemon, reorderPokemon } = usePokemonSlots();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleSlotClick = (position: number) => {
    setSelectedSlot(position);
    setIsSearchModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSearchModalOpen(false);
    setSelectedSlot(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (isNotNullOrUndefined(over) && active.id !== over.id) {
      const fromPosition = Number(active.id);
      const toPosition = Number(over.id);
      reorderPokemon(fromPosition, toPosition);
    }
  };

  const sortableItems = [1, 2, 3, 4, 5, 6].map((position) =>
    position.toString(),
  );

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex justify-between items-center mb-6">
          <h2 className="card-title">Team Pokémon</h2>
          <div className="text-sm text-base-content/60">
            {selectedPokemon.length}/6 Pokémon
          </div>
        </div>

        <div className="mb-2 text-sm text-base-content/60 text-center">
          💡 Drag and drop Pokémon to reorder them
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sortableItems} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((position) => (
                <PokemonSlot
                  key={position}
                  position={position}
                  onSlotClick={handleSlotClick}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <PokemonSearchModal
          isOpen={isSearchModalOpen}
          onClose={handleCloseModal}
          targetSlot={selectedSlot}
        />
      </div>
    </div>
  );
}
