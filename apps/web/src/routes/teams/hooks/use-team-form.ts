import { useContext } from "react";
import { TeamFormContext } from "../context/team-form-context";

export const useTeamForm = () => {
  const context = useContext(TeamFormContext);
  if (context === undefined) {
    throw new Error("useTeamForm must be used within a TeamFormProvider");
  }
  return context;
};
