import { useParams } from "@tanstack/react-router";
import { useTeam } from "../hooks/use-team";
import { TeamHeader } from "./TeamHeader";
import { PokemonRoster } from "./PokemonRoster";

export function ViewTeamPage() {
  const { teamId } = useParams({ from: "/teams/$teamId/" });
  const { data: team } = useTeam(teamId);

  return (
    <div className="container mx-auto px-4 py-8">
      <TeamHeader team={team} />
      <div className="mt-8">
        <PokemonRoster pokemon={team.team_pokemon || []} />
      </div>
    </div>
  );
}
