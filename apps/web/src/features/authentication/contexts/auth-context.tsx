import React, { useState, type PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext, useLogin, useLogout, useRegister } from "../hooks";
import { type AuthResponseDtoUserUser } from "@poke-playbook/api-client";
import { authApi } from "@/constants";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthResponseDtoUserUser | null>(null);

  const { isLoading } = useQuery({
    queryKey: ["auth-context"],
    queryFn: async () => {
      try {
        const {
          data: { user },
        } = await authApi.getCurrentUser();
        setUser(user);
      } catch {
        setUser(null);
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { mutateAsync: login } = useLogin({
    onSuccess: ({ data }) => {
      setUser(data.user.user);
    },
  });

  const { mutateAsync: register } = useRegister({
    onSuccess: ({ data }) => {
      setUser(data.user.user);
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
