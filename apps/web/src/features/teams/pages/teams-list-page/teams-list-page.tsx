import { Link } from "@tanstack/react-router";
import { TeamGrid, EmptyTeamsState } from "./components";
import { useTeams } from "./hooks";

export function TeamsListPage() {
  const { data: teamsData } = useTeams(true);

  const hasTeams = teamsData.teams.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Teams</h1>
        <Link to="/teams/new" className="btn btn-primary">
          Create New Team
        </Link>
      </div>

      {hasTeams ? <TeamGrid teams={teamsData.teams} /> : <EmptyTeamsState />}
    </div>
  );
}
