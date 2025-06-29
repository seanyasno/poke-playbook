import { isNotNullOrUndefined } from "./object";

/**
 * Checks if a value is a non-empty array.
 *
 * @param {Item[] | null | undefined} array - The array to check.
 * @returns {boolean} - Returns true if the array is non-empty, otherwise false.
 */
export function isNotEmptyArray<Item>(
  array: Item[] | null | undefined
): array is [Item, ...Item[]] {
  return isNotNullOrUndefined(array) && array.length > 0;
}

/**
 * Checks if a value is an empty array.
 *
 * @param {Item[] | null | undefined} array - The array to check.
 * @returns {boolean} - Returns true if the array is empty, otherwise false.
 */
export function isEmptyArray<Item>(
  array: Item[] | null | undefined
): array is [] {
  return isNotNullOrUndefined(array) && array.length === 0;
}

/**
 * Purges null and undefined values from an array.
 *
 * @param {Item[] | null | undefined} array - The array to purge.
 * @returns {Item[]} - Returns a new array with null and undefined values removed.
 */
export function purge<Item>(array: (Item | null | undefined)[]): Item[] {
  return array.filter(isNotNullOrUndefined) as Item[];
}

/**
 * Purges null and undefined values from an array after applying a map function.
 *
 * @param {Item[] | null | undefined} array - The array to purge.
 * @returns {Item[]} - Returns a new array with null and undefined values removed.
 */
export function purgeMap<Item>(array: (Item | null | undefined)[]): Item[] {
  return purge(array.map((item) => item));
}

/**
 * Purges null and undefined values from an array after applying a flatMap function.
 *
 * @param {Item[] | null | undefined} array - The array to purge.
 * @returns {Item[]} - Returns a new array with null and undefined values removed.
 */
export function purgeFlatMap<Item, Result>(
  array: Item[],
  callback: (item: Item) => (Result | null | undefined)[]
): Result[] {
  return purge(array.flatMap(callback));
}

/**
 * Flattens a Pokemon evolution chain into a linear array.
 *
 * @param {any} chain - The evolution chain object from PokeAPI.
 * @returns {Array<{ name: string; id: string }>} - Flattened evolution chain.
 */
export function flattenEvolutionChain(chain: any): Array<{ name: string; id: string }> {
  const result: Array<{ name: string; id: string }> = [];

  const processEvolution = (evolution: any) => {
    if (evolution?.species) {
      const match = evolution.species.url.match(/\/(\d+)\/$/);
      const id = match?.[1] ?? "1";
      
      result.push({
        name: evolution.species.name,
        id,
      });
    }

    if (evolution?.evolves_to && evolution.evolves_to.length > 0) {
      processEvolution(evolution.evolves_to[0]);
    }
  };

  processEvolution(chain);
  return result;
}
