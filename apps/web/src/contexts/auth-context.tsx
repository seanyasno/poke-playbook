import React, { useEffect, useState, useCallback, useMemo } from "react";
import { AuthenticationApi } from "../services/api-client";
import { apiConfig } from "../services/api-client";
import type { AuthContextType, ApiUser, ApiErrorResponse } from "../types/auth";
import { AuthContext } from "../hooks/use-auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const authApi = useMemo(() => new AuthenticationApi(apiConfig), []);

  const checkCurrentUser = useCallback(async () => {
    try {
      const response = await authApi.getCurrentUser();
      setUser(response.data);
    } catch {
      // No valid session, user is not authenticated
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [authApi]);

  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);

  const register = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ) => {
    try {
      const response = await authApi.register({
        email,
        password,
        firstName,
        lastName,
      });

      setUser(response.data.user);
      return { error: null };
    } catch (error: unknown) {
      const errorMessage =
        (error as ApiErrorResponse).response?.data?.message ||
        "Registration failed";
      return { error: { message: errorMessage } };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({
        email,
        password,
      });

      setUser(response.data.user);
      return { error: null };
    } catch (error: unknown) {
      const errorMessage =
        (error as ApiErrorResponse).response?.data?.message || "Login failed";
      return { error: { message: errorMessage } };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      return { error: null };
    } catch (error: unknown) {
      const errorMessage =
        (error as ApiErrorResponse).response?.data?.message || "Logout failed";
      return { error: { message: errorMessage } };
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
