import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { TeamsApi, apiConfig } from "../../../services/api-client";
import {
  CreateTeamRequestSchema,
  type CreateTeamRequest,
  TeamSchema,
} from "../types/team.types";

export function useUpdateTeam() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const teamsApi = new TeamsApi(apiConfig);

  return useMutation({
    mutationFn: async ({
      teamId,
      data,
    }: {
      teamId: string;
      data: CreateTeamRequest;
    }) => {
      const validatedData = CreateTeamRequestSchema.parse(data);
      const response = await teamsApi.update(teamId, validatedData);

      if (!response.data) {
        throw new Error("Failed to update team: No data returned from server");
      }

      return TeamSchema.parse(response.data);
    },
    onSuccess: (team) => {
      // Invalidate teams list to show updated team
      queryClient.invalidateQueries({ queryKey: ["teams"] });

      // Update the individual team cache
      queryClient.setQueryData(["teams", team.id], team);

      // Navigate back to the team page
      navigate({
        to: "/teams/$teamId",
        params: { teamId: team.id },
      });
    },
    onError: (error) => {
      console.error("Failed to update team:", error);
    },
  });
}
