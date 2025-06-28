import React, { useMemo, useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { usePokemonsInfinite } from "../hooks";
import { PokemonCard } from "./pokemon-card";
import { isNotEmptyArray, isNullOrUndefined, purge } from "@poke-playbook/libs";

export const PokemonList: React.FC = () => {
  const {
    status,
    data,
    error,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePokemonsInfinite();

  const parentRef = useRef<HTMLDivElement>(null);

  // Flatten all Pokemon from all pages
  const allPokemons = useMemo(() => {
    if (!data?.pages) return [];
    return purge(data.pages.flatMap((page: any) => page.results || []));
  }, [data]);

  // Calculate how many cards fit per row based on screen size
  const getItemsPerRow = () => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width >= 1280) return 4; // xl
    if (width >= 1024) return 3; // lg
    if (width >= 640) return 2; // sm
    return 1; // mobile
  };

  const itemsPerRow = getItemsPerRow();
  const cardHeight = 384; // h-96 = 384px
  const gap = 32; // gap-8
  const rowHeight = cardHeight + gap;

  // Calculate total rows needed
  const totalRows = Math.ceil(allPokemons.length / itemsPerRow);

  // Add extra row for loading indicator if there's more to load
  const virtualCount = hasNextPage ? totalRows + 1 : totalRows;

  const virtualizer = useVirtualizer({
    count: virtualCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 2,
  });

  // Load more data when approaching the end
  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) return;

    if (
      lastItem.index >= totalRows - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    totalRows,
    virtualizer.getVirtualItems(),
  ]);

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

  if (isError || isNullOrUndefined(data) || !isNotEmptyArray(data?.pages)) {
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
      <div
        ref={parentRef}
        className="h-screen overflow-auto"
        style={{ contain: 'strict' }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index >= totalRows;
            
            if (isLoaderRow) {
              return (
                <div
                  key={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div className="flex justify-center items-center h-full">
                    {isFetchingNextPage ? (
                      <div className="loading loading-spinner loading-lg"></div>
                    ) : hasNextPage ? (
                      <div className="text-base-content/70">Loading more...</div>
                    ) : (
                      <div className="text-base-content/70">All Pokemon loaded!</div>
                    )}
                  </div>
                </div>
              );
            }

            // Calculate which Pokemon to show in this row
            const startIndex = virtualRow.index * itemsPerRow;
            const endIndex = Math.min(startIndex + itemsPerRow, allPokemons.length);
            const rowPokemons = allPokemons.slice(startIndex, endIndex);

            return (
              <div
                key={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center h-full px-4">
                  {rowPokemons.map((pokemon: any) => (
                    <div key={pokemon.name} className="w-80 h-96">
                      <PokemonCard pokemonName={pokemon.name} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
