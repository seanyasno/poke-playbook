import React, { useState, useMemo, type PropsWithChildren } from "react";
import { AuthenticationApi } from "../services/api-client";
import { apiConfig } from "../services/api-client";
import { AuthContext } from "../hooks";
import { useQuery } from "@tanstack/react-query";
import { useLogin, useLogout, useRegister } from "../features";
import type { AuthResponseDtoUser } from "@poke-playbook/api-client";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthResponseDtoUser | null>(null);
  const authApi = useMemo(() => new AuthenticationApi(apiConfig), []);

  const { isLoading } = useQuery({
    queryKey: ["auth-context"],
    queryFn: async () => {
      try {
        const { data: userResponse } = await authApi.getCurrentUser();
        setUser(userResponse);
      } catch {
        setUser(null);
      }
    },
  });

  const { mutateAsync: login } = useLogin({
    onSuccess: ({ data }) => {
      setUser(data.user);
    },
  });

  const { mutateAsync: register } = useRegister({
    onSuccess: ({ data }) => {
      setUser(data.user);
    },
  });

  const { mutateAsync: logout } = useLogout({
    onSuccess: () => {
      setUser(null);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
