import { Optional } from "./types";

/**
 * Checks if a value is null or undefined.
 *
 * @param {Optional<Type>} value - The value to check.
 * @returns {boolean} - Returns true if the value is null or undefined, otherwise false.
 */
export function isNullOrUndefined<Type>(
  value: Optional<Type>,
): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Checks if a value is null or undefined.
 *
 * @param {Optional<Type>} value - The value to check.
 * @returns {boolean} - Returns true if the value is null or undefined, otherwise false.
 */
export function isNotNullOrUndefined<Type>(
  value: Optional<Type>,
): value is Type {
  return !isNullOrUndefined(value);
}
