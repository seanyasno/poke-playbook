import {
  queryOptions,
  useSuspenseQuery,
  type UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { TeamsApi, apiConfig } from "../../../constants/api-client.ts";
import { TeamsListSchema, type TeamsList } from "../types/team.types";

export function teamsQueryOptions(includePokemons = true) {
  return queryOptions({
    queryKey: ["teams", includePokemons.toString()],
    queryFn: async () => {
      const teamsApi = new TeamsApi(apiConfig);
      const response = await teamsApi.findAll(includePokemons);
      return TeamsListSchema.parse(response.data);
    },
  });
}

export function useTeams(
  includePokemons = true,
  queryOptions?: UseSuspenseQueryOptions<TeamsList, Error, TeamsList, string[]>,
) {
  return useSuspenseQuery({
    ...teamsQueryOptions(includePokemons),
    ...queryOptions,
  });
}
