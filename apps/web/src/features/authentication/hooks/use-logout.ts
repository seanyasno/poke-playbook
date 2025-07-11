import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AuthError } from "../../../types";
import { authApi } from "../../../constants";

export function useLogout(
  options: UseMutationOptions<{ error: AuthError | null }, Error>,
) {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await authApi.logout();

      return { error: null };
    },
    ...options,
  });
}
