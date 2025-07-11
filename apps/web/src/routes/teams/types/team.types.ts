import { z } from "zod";

export const TeamPokemonSchema = z.object({
  id: z.string(),
  pokemon_id: z.number(),
  pokemon_name: z.string(),
  nickname: z.string().nullable(),
  position: z.number(),
  created_at: z.string(),
});

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  user_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  team_pokemon: z.array(TeamPokemonSchema).optional(),
});

export const TeamsListSchema = z.object({
  teams: z.array(TeamSchema),
  total: z.number(),
  limit: z.number(),
  offset: z.number(),
});

export const CreateTeamRequestSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  pokemon: z
    .array(
      z.object({
        pokemon_id: z.number().int().positive(),
        pokemon_name: z.string().min(1),
        nickname: z.string().optional(),
        position: z.number().int().min(1).max(6),
      }),
    )
    .max(6)
    .default([]),
});

export const TeamFormSchema = z.object({
  teamName: z
    .string()
    .min(1, "Team name is required")
    .max(255, "Team name too long"),
  teamDescription: z.string(),
  selectedPokemon: z
    .array(
      z.object({
        pokemon_id: z.number(),
        pokemon_name: z.string(),
        nickname: z.string(),
        position: z.number(),
      }),
    )
    .max(6),
});

export type TeamPokemon = z.infer<typeof TeamPokemonSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type TeamsList = z.infer<typeof TeamsListSchema>;
export type CreateTeamRequest = z.infer<typeof CreateTeamRequestSchema>;
export type TeamFormData = z.infer<typeof TeamFormSchema>;

export type TeamFormPokemon = {
  pokemon_id: number;
  pokemon_name: string;
  nickname: string;
  position: number;
};

export type TeamFormState = {
  teamName: string;
  teamDescription: string;
  selectedPokemon: TeamFormPokemon[];
};
