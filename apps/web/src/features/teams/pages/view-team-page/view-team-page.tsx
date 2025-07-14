import { useParams } from "@tanstack/react-router";
import { useTeam } from "@/features";
import { TeamHeader, PokemonRoster } from "./components";
import { withDefault } from "@poke-playbook/libs";

export const ViewTeamPage: React.FC = () => {
  const { teamId } = useParams({ from: "/teams/$teamId/" });
  const { data: team } = useTeam(teamId);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <TeamHeader team={team} />
        <div className="mt-12">
          <PokemonRoster pokemon={withDefault(team.team_pokemon, [])} />
        </div>
      </div>
    </div>
  );
};
