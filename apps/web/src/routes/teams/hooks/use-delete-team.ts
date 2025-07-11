import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamsApi, apiConfig } from "../../../services/api-client";

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  const teamsApi = new TeamsApi(apiConfig);

  return useMutation({
    mutationFn: async (teamId: string) => {
      await teamsApi.remove(teamId);
      return teamId;
    },
    onSuccess: (deletedTeamId) => {
      // Remove the team from the cache optimistically
      queryClient.setQueryData(["teams", "true"], (oldData: unknown) => {
        if (!oldData || typeof oldData !== "object") return oldData;
        const typedData = oldData as {
          teams: Array<{ id: string }>;
          total: number;
        };
        return {
          ...typedData,
          teams: typedData.teams.filter((team) => team.id !== deletedTeamId),
          total: typedData.total - 1,
        };
      });

      // Invalidate teams list to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["teams"] });

      // Remove individual team from cache
      queryClient.removeQueries({ queryKey: ["teams", deletedTeamId] });
    },
    onError: (error) => {
      console.error("Failed to delete team:", error);
      // If we had optimistic updates, we'd rollback here
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}
