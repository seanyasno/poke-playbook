import React, { useRef, useEffect } from "react";
import { IoFilter } from "react-icons/io5";
import type { SearchAndFilterHeaderProps } from "../pokemon-list-types";

export const SearchAndFilterHeader: React.FC<SearchAndFilterHeaderProps> = ({ 
  searchValue, 
  onSearchChange, 
  onFilterToggle, 
  filterStats, 
  isTypeFilteringLoading 
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="sticky top-0 z-10 bg-base-100 border-b border-base-200 px-6 py-4">
      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        <div className="flex gap-4 items-center">
          <label className="input input-bordered flex items-center gap-2 flex-1">
            <svg 
              className="h-4 w-4 opacity-70" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              ref={searchInputRef}
              type="search"
              className="grow"
              placeholder="Search for a Pokemon..."
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
            />
            <kbd className="kbd kbd-sm">⌘</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
          <button
            className="btn btn-square btn-outline"
            onClick={onFilterToggle}
            aria-label="Open filters"
          >
            <IoFilter className="w-5 h-5" />
          </button>
        </div>
        
        {filterStats.hasActiveFilters && (
          <div className="flex items-center gap-2 text-sm">
            {isTypeFilteringLoading && (
              <div className="loading loading-spinner loading-sm"></div>
            )}
            <span className="text-base-content/70">
              Showing {filterStats.filteredCount} of {filterStats.totalCount} Pokemon
              {filterStats.reductionPercentage > 0 && (
                <span className="text-primary ml-1">
                  ({filterStats.reductionPercentage}% filtered)
                </span>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}; 