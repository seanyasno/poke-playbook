import { createFileRoute } from "@tanstack/react-router";
import { TeamsListPage } from "@/features";

export const Route = createFileRoute("/teams/")({
  component: TeamsListPage,
});
