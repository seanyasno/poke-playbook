import { useContext } from "react";
import { TeamFormContext } from "../../../features/teams/contexts/team-form-context.ts";

export const useTeamForm = () => {
  const context = useContext(TeamFormContext);
  if (context === undefined) {
    throw new Error("useTeamForm must be used within a TeamFormProvider");
  }
  return context;
};
