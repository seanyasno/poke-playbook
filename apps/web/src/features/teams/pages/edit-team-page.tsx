import { useParams } from "@tanstack/react-router";
import { useTeam } from "../hooks";
import {
  type Team,
  TeamForm,
  type TeamFormData,
  TeamFormProvider,
} from "../../index.ts";
import { withDefault } from "@poke-playbook/libs";

export function EditTeamPage() {
  const { teamId } = useParams({ from: "/teams/$teamId/edit" });
  const { data: team } = useTeam(teamId);

  const defaultValues = buildTeamFormData(team);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-medium text-base-content mb-2 leading-tight">
            {team.name}
          </h1>
          <p className="text-lg text-base-content/60">
            Edit your team details and roster
          </p>
        </div>

        <TeamFormProvider defaultValues={defaultValues}>
          <TeamForm mode="edit" teamId={teamId} />
        </TeamFormProvider>
      </div>
    </div>
  );
}

function buildTeamFormData(team: Team): TeamFormData {
  return {
    teamName: team.name,
    teamDescription: withDefault(team.description, ""),
    selectedPokemon: (team.team_pokemon || []).map((pokemon) => ({
      pokemon_id: pokemon.pokemon_id,
      pokemon_name: pokemon.pokemon_name,
      nickname: withDefault(pokemon.nickname, ""),
      position: pokemon.position,
    })),
  };
}
