import { z } from "zod";
import { PokemonTypeSchema } from "./pokemon-type-schema";

export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.record(z.string(), z.string().or(z.any())),
  types: z.array(
    z.object({
      type: z.object({
        name: PokemonTypeSchema,
      }),
    })
  ),
});

export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;
