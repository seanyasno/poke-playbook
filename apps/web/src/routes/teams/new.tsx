import { createFileRoute } from "@tanstack/react-router";
import { CreateTeamPage } from "@/features";

export const Route = createFileRoute("/teams/new")({
  component: CreateTeamPage,
});
