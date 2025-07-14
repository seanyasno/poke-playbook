import { useParams } from "@tanstack/react-router";
import { useTeam } from "@/features";
import { TeamHeader, PokemonRoster } from "./components";
import { withDefault } from "@poke-playbook/libs";

export const ViewTeamPage: React.FC = () => {
  const { teamId } = useParams({ from: "/teams/$teamId/" });
  const { data: team } = useTeam(teamId);

  return (
    <div className="container mx-auto px-4 py-8">
      <TeamHeader team={team} />
      <div className="mt-8">
        <PokemonRoster pokemon={withDefault(team.team_pokemon, [])} />
      </div>
    </div>
  );
};
