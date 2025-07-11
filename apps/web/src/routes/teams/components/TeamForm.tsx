import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTeamForm } from "../hooks/use-team-form";
import { useCreateTeam } from "../hooks/use-create-team";
import { useUpdateTeam } from "../hooks/use-update-team";
import { TeamInfoSection } from "./TeamInfoSection";
import { PokemonSelector } from "./PokemonSelector";
import { type CreateTeamRequest } from "../types/team.types";

type TeamFormProps = {
  mode: "create" | "edit";
  teamId?: string;
};

export function TeamForm({ mode, teamId }: TeamFormProps) {
  const { state } = useTeamForm();
  const createTeamMutation = useCreateTeam();
  const updateTeamMutation = useUpdateTeam();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isLoading =
    createTeamMutation.isPending || updateTeamMutation.isPending;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!state.teamName.trim()) {
      newErrors.teamName = "Team name is required";
    } else if (state.teamName.length > 255) {
      newErrors.teamName = "Team name must be 255 characters or less";
    }

    if (state.selectedPokemon.length === 0) {
      newErrors.pokemon = "At least one Pokémon is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const teamData: CreateTeamRequest = {
      name: state.teamName.trim(),
      description: state.teamDescription.trim() || undefined,
      pokemon: state.selectedPokemon.map((p) => ({
        pokemon_id: p.pokemon_id,
        pokemon_name: p.pokemon_name,
        nickname: p.nickname.trim() || undefined,
        position: p.position,
      })),
    };

    try {
      if (mode === "create") {
        await createTeamMutation.mutateAsync(teamData);
      } else if (mode === "edit" && teamId) {
        await updateTeamMutation.mutateAsync({ teamId, data: teamData });
      }
    } catch (error) {
      console.error("Failed to save team:", error);
      setErrors({ submit: "Failed to save team. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      <TeamInfoSection errors={errors} />

      <div className="divider"></div>

      <PokemonSelector />

      {errors.pokemon && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errors.pokemon}</span>
        </div>
      )}

      {errors.submit && (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errors.submit}</span>
        </div>
      )}

      <div className="flex justify-end gap-4 pt-6">
        <Link to="/teams" className="btn btn-ghost">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              {mode === "create" ? "Creating..." : "Updating..."}
            </>
          ) : mode === "create" ? (
            "Create Team"
          ) : (
            "Update Team"
          )}
        </button>
      </div>
    </form>
  );
}
