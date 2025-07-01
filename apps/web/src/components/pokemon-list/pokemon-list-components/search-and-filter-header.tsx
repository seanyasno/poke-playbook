import React from "react";
import { IoSearch, IoFilter } from "react-icons/io5";
import type { SearchAndFilterHeaderProps } from "../pokemon-list-types";

export const SearchAndFilterHeader: React.FC<SearchAndFilterHeaderProps> = ({ 
  searchValue, 
  onSearchChange, 
  onFilterToggle, 
  filterStats, 
  isTypeFilteringLoading 
}) => (
  <div className="sticky top-0 z-10 bg-base-100 border-b border-base-200 px-6 py-4">
    <div className="flex flex-col gap-4 max-w-4xl mx-auto">
      <div className="flex gap-4 items-center">
        <div className="join flex-1">
          <div className="join-item flex items-center bg-base-200 px-3">
            <IoSearch className="w-5 h-5 text-base-content/70" />
          </div>
          <input
            type="text"
            placeholder="Search for a Pokemon..."
            className="input input-bordered join-item flex-1"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
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