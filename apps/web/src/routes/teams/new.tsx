import { createFileRoute } from "@tanstack/react-router";
import { CreateTeamPage } from "./components/CreateTeamPage";

export const Route = createFileRoute("/teams/new")({
  component: CreateTeamPage,
});
