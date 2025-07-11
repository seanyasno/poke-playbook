import { createFileRoute } from "@tanstack/react-router";
import { EditTeamPage } from "../components/EditTeamPage";

export const Route = createFileRoute("/teams/$teamId/edit")({
  component: EditTeamPage,
});
