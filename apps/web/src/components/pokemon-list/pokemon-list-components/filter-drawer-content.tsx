import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { usePokemonTypes, usePokemonGames } from "@/hooks";
import type { SearchParams } from "@/types";

type FilterDrawerContentProps = {
  searchParams: SearchParams;
  onApplyFilters: (filters: Partial<SearchParams>) => void;
  onClose: () => void;
};

export const FilterDrawerContent: React.FC<FilterDrawerContentProps> = ({
  searchParams,
  onApplyFilters,
  onClose,
}) => {
  const { data: typesData } = usePokemonTypes();
  const { data: gamesData } = usePokemonGames();

  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    searchParams.types ?? [],
  );
  const [selectedGame, setSelectedGame] = useState<string>(
    searchParams.game ?? "",
  );

  const handleApply = () => {
    onApplyFilters({
      types: selectedTypes.length > 0 ? selectedTypes : undefined,
      game: selectedGame ?? undefined,
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedTypes([]);
    setSelectedGame("");
    onApplyFilters({
      types: undefined,
      game: undefined,
    });
    onClose();
  };

  const handleTypeToggle = (typeName: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeName)
        ? prev.filter((t) => t !== typeName)
        : [...prev, typeName],
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          className="btn btn-ghost btn-sm btn-circle"
          onClick={onClose}
          aria-label="Close filters"
        >
          <IoClose className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 space-y-6">
        <div>
          <label className="label">
            <span className="label-text font-semibold">Filter by Game</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="">All Games</option>
            {gamesData?.results?.map((game) => (
              <option key={game.name} value={game.name}>
                {game.name.charAt(0).toUpperCase() + game.name.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Filter by Types</span>
          </label>
          <div className="text-sm text-base-content/70 mb-2">
            Select multiple types to find Pokemon with ALL selected types
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
            {typesData?.results?.map((type) => (
              <label key={type.name} className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={selectedTypes.includes(type.name)}
                  onChange={() => handleTypeToggle(type.name)}
                />
                <span className="label-text capitalize ml-2">{type.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-base-300 mt-auto">
        <button className="btn btn-primary flex-1" onClick={handleApply}>
          Apply
        </button>
        <button className="btn btn-ghost flex-1" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};
