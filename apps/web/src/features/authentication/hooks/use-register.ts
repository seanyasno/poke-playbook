import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authApi } from "@/constants";
import type { AuthError } from "@/types";
import type { AuthResponseDto } from "@poke-playbook/api-client";

export function useRegister(
  options?: UseMutationOptions<
    { error: AuthError | null; data: AuthResponseDto },
    Error,
    { email: string; password: string }
  >,
) {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async ({
      email,
      password,
      firstName,
      lastName,
    }: {
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    }) => {
      const { data } = await authApi.register({
        email,
        password,
        firstName,
        lastName,
      });

      return {
        error: null,
        data,
      };
    },
    ...options,
  });
}
