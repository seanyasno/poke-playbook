import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { type Team, DeleteTeamDialog } from "@/features";
import { IoPencil, IoTrash } from "react-icons/io5";
import { withDefault } from "@poke-playbook/libs";

type TeamHeaderProps = {
  team: Team;
};

export const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const createdDate = new Date(team.created_at).toLocaleDateString();
  const updatedDate = new Date(team.updated_at).toLocaleDateString();
  const pokemonCount = withDefault(team.team_pokemon?.length, 0);

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
                <IoPencil className="w-4 h-4" />
                Edit Team
              </Link>

              <button
                className="btn btn-error btn-outline"
                onClick={() => setShowDeleteDialog(true)}
              >
                <IoTrash className="w-4 h-4" />
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
};
