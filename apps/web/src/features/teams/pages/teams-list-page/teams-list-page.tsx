import { Link } from "@tanstack/react-router";
import { TeamGrid, EmptyTeamsState } from "./components";
import { useTeams } from "./hooks";

export function TeamsListPage() {
  const { data: teamsData } = useTeams(true);

  const hasTeams = teamsData.teams.length > 0;

  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-medium text-base-content mb-2 leading-tight">
              Teams
            </h1>
            <p className="text-lg text-base-content/60">
              Manage your Pokémon teams
            </p>
          </div>

          <Link to="/teams/new" className="btn btn-primary">
            Create team
          </Link>
        </div>

        {hasTeams ? <TeamGrid teams={teamsData.teams} /> : <EmptyTeamsState />}
      </div>
    </div>
  );
}
