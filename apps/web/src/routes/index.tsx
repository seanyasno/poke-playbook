import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorBoundarySuspense, PokemonList } from "../components";

const Index: React.FC = () => {
  return (
    <ErrorBoundarySuspense>
      <PokemonList />
    </ErrorBoundarySuspense>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
