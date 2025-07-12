import React, { useState, type PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext, useLogin, useLogout, useRegister } from "../hooks";
import type { AuthResponseDtoUser } from "@poke-playbook/api-client";
import { authApi } from "../../../constants";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthResponseDtoUser | null>(null);

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
