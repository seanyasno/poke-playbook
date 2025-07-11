import { Configuration } from "@poke-playbook/api-client";

// Base API configuration with credentials for cookie support
export const apiConfig = new Configuration({
  basePath: import.meta.env.VITE_API_URL || "http://localhost:3100",
  // Enable credentials to send cookies with requests
  baseOptions: {
    withCredentials: true,
  },
});

// Re-export commonly used API classes for convenience
export { AuthenticationApi, TeamsApi } from "@poke-playbook/api-client";
