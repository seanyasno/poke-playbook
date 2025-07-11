import { useParams } from "@tanstack/react-router";
import { useTeam } from "../hooks/use-team";
import { TeamFormProvider } from "../context/TeamFormContext";
import { TeamForm } from "./TeamForm";
import { type TeamFormState } from "../types/team.types";

export function EditTeamPage() {
  const { teamId } = useParams({ from: "/teams/$teamId/edit" });
  const { data: team } = useTeam(teamId);

  // Convert team data to form state
  const initialFormState: TeamFormState = {
    teamName: team.name,
    teamDescription: team.description || "",
    selectedPokemon: (team.team_pokemon || []).map((p) => ({
      pokemon_id: p.pokemon_id,
      pokemon_name: p.pokemon_name,
      nickname: p.nickname || "",
      position: p.position,
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Team: {team.name}</h1>
      <TeamFormProvider initialState={initialFormState}>
        <TeamForm mode="edit" teamId={teamId} />
      </TeamFormProvider>
    </div>
  );
}
