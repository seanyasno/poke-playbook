import type {
  AuthResponseDtoUser,
  AuthResponseDto,
} from "@poke-playbook/api-client";

export type AuthError = {
  message: string;
};

export type AuthContextType = {
  user: AuthResponseDtoUser | null;
  loading: boolean;
  login: (props: {
    email: string;
    password: string;
  }) => Promise<{ error: AuthError | null; data: AuthResponseDto }>;
  register: (props: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => Promise<{ error: AuthError | null; data: AuthResponseDto }>;
  logout: () => Promise<{ error: AuthError | null }>;
};
