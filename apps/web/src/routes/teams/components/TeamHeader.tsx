import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { type Team } from "../types/team.types";
import { DeleteTeamDialog } from "./DeleteTeamDialog";

type TeamHeaderProps = {
  team: Team;
};

export function TeamHeader({ team }: TeamHeaderProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const createdDate = new Date(team.created_at).toLocaleDateString();
  const updatedDate = new Date(team.updated_at).toLocaleDateString();
  const pokemonCount = team.team_pokemon?.length || 0;

  return (
    <>
      <div className="hero bg-base-200 rounded-lg">
        <div className="hero-content text-center py-12">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4">{team.name}</h1>

            {team.description && (
              <p className="text-lg text-base-content/70 mb-6">
                {team.description}
              </p>
            )}

            <div className="flex justify-center gap-4 text-sm text-base-content/60 mb-6">
              <span>{pokemonCount}/6 Pokémon</span>
              <span>•</span>
              <span>Created {createdDate}</span>
              {createdDate !== updatedDate && (
                <>
                  <span>•</span>
                  <span>Updated {updatedDate}</span>
                </>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <Link
                to="/teams/$teamId/edit"
                params={{ teamId: team.id }}
                className="btn btn-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Edit Team
              </Link>

              <button
                className="btn btn-error btn-outline"
                onClick={() => setShowDeleteDialog(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                Delete Team
              </button>

              <Link to="/teams" className="btn btn-ghost">
                Back to Teams
              </Link>
            </div>
          </div>
        </div>
      </div>

      <DeleteTeamDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        teamId={team.id}
        teamName={team.name}
      />
    </>
  );
}
