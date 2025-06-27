import { isNotNullOrUndefined } from "./object";

/**
 * Checks if a value is a non-empty array.
 *
 * @param {Item[] | null | undefined} array - The array to check.
 * @returns {boolean} - Returns true if the array is non-empty, otherwise false.
 */
export function isNotEmptyArray<Item>(
  array: Item[] | null | undefined,
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
  array: Item[] | null | undefined,
): array is [] {
  return isNotNullOrUndefined(array) && array.length === 0;
}
