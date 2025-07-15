import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../../routeTree.gen";

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
      mutations: { retry: false },
    },
  });

export const createTestRouter = () =>
  createRouter({
    routeTree,
    defaultPreload: "intent",
    context: {
      queryClient: createTestQueryClient(),
    },
  });
