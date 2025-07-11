import { Link } from "@tanstack/react-router";
import { type Team } from "../types/team.types";
import { TeamCardMenu } from "./TeamCardMenu";
import { PokemonSprites } from "./PokemonSprites";

type TeamCardProps = {
  team: Team;
};

export function TeamCard({ team }: TeamCardProps) {
  const pokemonCount = team.team_pokemon?.length || 0;
  const createdDate = new Date(team.created_at).toLocaleDateString();

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
      <div className="card-body">
        <div className="flex justify-between items-start mb-2">
          <Link
            to="/teams/$teamId"
            params={{ teamId: team.id }}
            className="card-title text-lg font-bold hover:link"
          >
            {team.name}
          </Link>
          <TeamCardMenu teamId={team.id} teamName={team.name} />
        </div>

        {team.description && (
          <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
            {team.description}
          </p>
        )}

        <PokemonSprites pokemon={team.team_pokemon || []} />

        <div className="flex justify-between items-center text-sm text-base-content/60 mt-4">
          <span>{pokemonCount}/6 Pokémon</span>
          <span>Created {createdDate}</span>
        </div>
      </div>
    </div>
  );
}
