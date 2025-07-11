// Import types directly from the generated API client
import type {
  AuthResponseDtoUser,
  AuthResponseDto,
} from "@poke-playbook/api-client";

// Use the generated types for consistency
export type ApiUser = AuthResponseDtoUser;
export type AuthResponse = AuthResponseDto;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthError {
  message: string;
}

export interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export type AuthContextType = {
  user: ApiUser | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ error: AuthError | null }>;
  register: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<{ error: AuthError | null }>;
};
