import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { authApi } from "@/constants";
import type { AuthError } from "@/types";
import type { AuthResponseDto } from "@poke-playbook/api-client";

export function useLogin(
  options?: UseMutationOptions<
    { error: AuthError | null; data: AuthResponseDto },
    Error,
    { email: string; password: string }
  >,
) {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data } = await authApi.login({ email, password });

      return {
        error: null,
        data,
      };
    },
    ...options,
  });
}
