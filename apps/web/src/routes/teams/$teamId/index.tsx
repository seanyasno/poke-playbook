import { createFileRoute } from "@tanstack/react-router";
import { ViewTeamPage } from "../components/ViewTeamPage";

export const Route = createFileRoute("/teams/$teamId/")({
  component: ViewTeamPage,
});
