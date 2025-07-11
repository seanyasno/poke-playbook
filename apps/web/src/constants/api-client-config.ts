import { AuthenticationApi } from "@poke-playbook/api-client";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const authApi = new AuthenticationApi({
  basePath: import.meta.env.VITE_API_URL || "http://localhost:3100",
  baseOptions: {
    withCredentials: true,
  },
});
