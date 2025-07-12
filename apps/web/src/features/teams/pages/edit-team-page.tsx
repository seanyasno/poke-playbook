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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Team: {team.name}</h1>
      <TeamFormProvider defaultValues={defaultValues}>
        <TeamForm mode="edit" teamId={teamId} />
      </TeamFormProvider>
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
