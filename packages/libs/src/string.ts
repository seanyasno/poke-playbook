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

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats Pokemon height from decimeters to meters.
 *
 * @param {number} height - Height in decimeters.
 * @returns {string} - Formatted height string.
 */
export function formatHeight(height: number): string {
  return `${(height / 10).toFixed(1)}m`;
}

/**
 * Formats Pokemon weight from hectograms to kilograms.
 *
 * @param {number} weight - Weight in hectograms.
 * @returns {string} - Formatted weight string.
 */
export function formatWeight(weight: number): string {
  return `${(weight / 10).toFixed(1)}kg`;
}

/**
 * Formats Pokemon stat names for display.
 *
 * @param {string} name - The stat name.
 * @returns {string} - The formatted stat name.
 */
export function formatStatName(name: string): string {
  const statNames: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp.Attack",
    "special-defense": "Sp.Defense",
    speed: "Speed",
  };
  return statNames[name] || capitalize(name);
}

/**
 * Extracts Pokemon ID from PokeAPI URL.
 *
 * @param {string} url - The PokeAPI URL.
 * @returns {string} - The extracted Pokemon ID.
 */
export function extractPokemonIdFromUrl(url: string): string {
  const match = url.match(/\/(\d+)\/$/);
  return match?.[1] ?? "1";
}
