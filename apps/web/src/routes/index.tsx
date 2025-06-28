import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorBoundarySuspense, PokemonList } from "../components";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <ErrorBoundarySuspense>
        <PokemonList />
      </ErrorBoundarySuspense>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
});
