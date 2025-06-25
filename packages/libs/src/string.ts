import { isNotNullOrUndefined } from "./object";

/**
 * Checks if a value is a string.
 *
 * @param {unknown} item - The value to check.
 * @returns {boolean} - Returns true if the value is a string, otherwise false.
 */
export function isString(item: unknown): item is string {
  return typeof item === "string";
}

/**
 * Checks if a value is a non-empty string.
 *
 * @param {string | null | undefined} item - The value to check.
 * @returns {boolean} - Returns true if the value is a non-empty string, otherwise false.
 */
export function isNotEmptyString(
  item: string | null | undefined,
): item is string {
  return isNotNullOrUndefined(item) && item.trim() !== "";
}

/**
 * Checks if a value is an empty string.
 *
 * @param {string | null | undefined} item - The value to check.
 * @returns {boolean} - Returns true if the value is an empty string, otherwise false.
 */
export function isEmptyString(
  item: string | null | undefined,
): item is null | undefined {
  return !isNotEmptyString(item);
}
