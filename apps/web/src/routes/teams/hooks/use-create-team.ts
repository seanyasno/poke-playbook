import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { TeamsApi, apiConfig } from "../../../constants/api-client.ts";
import {
  CreateTeamRequestSchema,
  type CreateTeamRequest,
  TeamSchema,
} from "../types/team.types";

export function useCreateTeam() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const teamsApi = new TeamsApi(apiConfig);

  return useMutation({
    mutationFn: async (data: CreateTeamRequest) => {
      const validatedData = CreateTeamRequestSchema.parse(data);
      const response = await teamsApi.create(validatedData);

      if (!response.data) {
        throw new Error("Failed to create team: No data returned from server");
      }

      return TeamSchema.parse(response.data);
    },
    onSuccess: (team) => {
      // Invalidate teams list to show the new team
      queryClient.invalidateQueries({ queryKey: ["teams"] });

      // Navigate to the new team page
      navigate({
        to: "/teams/$teamId",
        params: { teamId: team.id },
      });
    },
    onError: (error) => {
      console.error("Failed to create team:", error);
    },
  });
}
