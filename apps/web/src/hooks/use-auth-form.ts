import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isNotNullOrUndefined } from "@poke-playbook/libs";
import { z } from "zod";
import { useAuthMutation } from "./requests/use-auth-mutation";

type AuthFormConfig<TSchema extends z.ZodTypeAny> = {
  schema: TSchema;
  submitFn: (
    data: z.infer<TSchema>,
  ) => Promise<{ error?: { message: string } | null }>;
  redirectTo?: string;
  redirectDelay?: number;
  onSuccess?: () => void;
};

export const useAuthForm = <TSchema extends z.ZodTypeAny>({
  schema,
  submitFn,
  redirectTo = "/",
  redirectDelay = 0,
  onSuccess,
}: AuthFormConfig<TSchema>) => {
  const navigate = useNavigate();

  type FormData = z.infer<TSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useAuthMutation<FormData>(
    submitFn,
    () => {
      onSuccess?.();

      if (redirectDelay > 0) {
        setTimeout(() => {
          navigate({ to: redirectTo });
        }, redirectDelay);
      } else {
        navigate({ to: redirectTo });
      }
    }
  );

  const handleSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return {
    ...form,
    loading: mutation.isPending,
    error: mutation.data?.error?.message ?? mutation.error?.message ?? null,
    success: mutation.isSuccess && !isNotNullOrUndefined(mutation.data?.error),
    onSubmit: form.handleSubmit(handleSubmit),
  };
};
