import React, { useRef, useMemo, useEffect, Suspense } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { PokemonCard } from "./pokemon-card";
import { usePokemonsInfinite, useItemsPerRowWindowChange } from "../hooks";
import {
  purgeFlatMap,
  isNullOrUndefined,
} from "@poke-playbook/libs";

// Loading fallback for individual Pokemon cards
const PokemonCardSkeleton = () => (
  <div className="w-80 h-96 bg-base-200 rounded-2xl animate-pulse">
    <div className="h-48 bg-base-300 rounded-t-2xl"></div>
    <div className="p-6">
      <div className="h-6 bg-base-300 rounded w-3/4 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-base-300 rounded w-16"></div>
        <div className="h-6 bg-base-300 rounded w-16"></div>
      </div>
    </div>
  </div>
);

export const PokemonList: React.FC = () => {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePokemonsInfinite();

  const parentRef = useRef<HTMLDivElement>(null);

  const allPokemons = useMemo(() => {
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

  return (
    <div className="mx-auto">
      <div
        ref={parentRef}
        className="h-screen overflow-auto px-6"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center h-full">
                  {rowPokemons.map(({ name }) => (
                    <div key={name} className="w-80 h-96">
                      <Suspense fallback={<PokemonCardSkeleton />}>
                        <PokemonCard pokemonName={name} />
                      </Suspense>
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
