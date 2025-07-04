import { useMutation } from "@tanstack/react-query";
import { isNotNullOrUndefined } from "@poke-playbook/libs";

type AuthMutationFn<T = unknown> = (
  data: T,
) => Promise<{ error?: { message: string } | null }>;

export const useAuthMutation = <T = unknown>(
  submitFn: AuthMutationFn<T>,
  onSuccess?: (result: { error?: { message: string } | null }) => void,
  onError?: (error: Error) => void
) => {
  return useMutation({
    mutationFn: submitFn,
    onSuccess: (result) => {
      if (isNotNullOrUndefined(result.error)) {
        return;
      }
      onSuccess?.(result);
    },
    onError: (error: Error) => {
      console.error("Auth form error:", error);
      onError?.(error);
    },
  });
}; 