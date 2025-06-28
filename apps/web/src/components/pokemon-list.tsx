import React, { useMemo, useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useItemsPerRowWindowChange, usePokemonsInfinite } from "../hooks";
import { PokemonCard } from "./pokemon-card";
import {
  isNotEmptyArray,
  isNullOrUndefined,
  purgeFlatMap,
} from "@poke-playbook/libs";

export const PokemonList: React.FC = () => {
  const {
    data,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePokemonsInfinite();

  const parentRef = useRef<HTMLDivElement>(null);

  const allPokemons = useMemo(() => {
    if (isNullOrUndefined(data?.pages)) {
      return [];
    }

    return purgeFlatMap(data.pages, (page) => page.results || []);
  }, [data]);

  const itemsPerRow = useItemsPerRowWindowChange({
    xl: 4,
    lg: 3,
    sm: 2,
    mobile: 1,
  });

  const cardHeight = 384; // h-96 = 384px
  const gap = 32; // gap-8
  const rowHeight = cardHeight + gap;

  const totalRows = Math.ceil(allPokemons.length / itemsPerRow);
  const virtualCount = hasNextPage ? totalRows + 1 : totalRows;

  const virtualizer = useVirtualizer({
    count: virtualCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 2,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();

    if (isNullOrUndefined(lastItem)) {
      return;
    }

    if (lastItem.index >= totalRows - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, totalRows, virtualItems]);

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
        style={{ contain: "strict" }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualItems.map((virtualRow) => {
            const isLoaderRow = virtualRow.index >= totalRows;

            if (isLoaderRow) {
              return (
                <div
                  key={virtualRow.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div className="flex justify-center items-center h-full">
                    {isFetchingNextPage && (
                      <div className="loading loading-spinner loading-lg"></div>
                    )}

                    {!isFetchingNextPage && hasNextPage && (
                      <div className="text-base-content/70">
                        Loading more...
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            const startIndex = virtualRow.index * itemsPerRow;
            const endIndex = Math.min(
              startIndex + itemsPerRow,
              allPokemons.length
            );
            const rowPokemons = allPokemons.slice(startIndex, endIndex);

            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center h-full px-4">
                  {rowPokemons.map(({ name }) => (
                    <div key={name} className="w-80 h-96">
                      <PokemonCard pokemonName={name} />
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
