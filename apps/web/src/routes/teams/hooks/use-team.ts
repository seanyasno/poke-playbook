import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { TeamsApi, apiConfig } from "../../../services/api-client";
import { TeamSchema, type Team } from "../types/team.types";

export function teamQueryOptions(teamId: string) {
  return queryOptions({
    queryKey: ["teams", teamId],
    queryFn: async () => {
      const teamsApi = new TeamsApi(apiConfig);
      // Note: We need to implement a findOne endpoint in the API
      // For now, we'll fetch all teams and filter
      const response = await teamsApi.findAll(true);
      const teamsData = response.data;
      const team = teamsData.teams.find((t) => t.id === teamId);

      if (!team) {
        throw new Error("Team not found");
      }

      return TeamSchema.parse(team);
    },
  });
}

export function useTeam(
  teamId: string,
  queryOptions?: UseSuspenseQueryOptions<Team, Error, Team, string[]>,
) {
  return useSuspenseQuery({
    ...teamQueryOptions(teamId),
    ...queryOptions,
  });
}
