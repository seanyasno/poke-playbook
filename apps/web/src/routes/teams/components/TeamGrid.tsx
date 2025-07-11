import { TeamCard } from "./TeamCard";
import { type Team } from "../types/team.types";

type TeamGridProps = {
  teams: Team[];
};

export function TeamGrid({ teams }: TeamGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}
