import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { ErrorBoundarySuspense, PokemonList } from "@/components";
import { SearchParamsSchema } from "@/types";

const Index: React.FC = () => {
  return (
    <ErrorBoundarySuspense>
      <PokemonList />
    </ErrorBoundarySuspense>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: zodSearchValidator(SearchParamsSchema),
});
