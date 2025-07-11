import { createFileRoute } from "@tanstack/react-router";
import { TeamsListPage } from "./components/TeamsListPage";

export const Route = createFileRoute("/teams/")({
  component: TeamsListPage,
});
