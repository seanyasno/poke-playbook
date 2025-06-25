/**
 * Throws an error with the provided message.
 *
 * @param {string} message - The message to be included in the error.
 * @throws {Error} Will throw an error with the provided message.
 */
export function raise(message: string): never {
  throw new Error(message);
}

/**
 * Throws an error indicating that unreachable code was reached.
 *
 * @param {never} type - The value that was unexpectedly encountered.
 * @throws {Error} Will throw an error indicating that unreachable code was reached.
 */
export function raiseNotReachable(type: never): never {
  raise(`Unreachable code reached with value: ${type}`);
}
