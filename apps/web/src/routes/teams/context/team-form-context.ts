import { createContext } from "react";
import { type TeamFormState, type TeamFormPokemon } from "../types/team.types";

export type TeamFormContextType = {
  state: TeamFormState;
  updateTeamInfo: (
    field: "teamName" | "teamDescription",
    value: string,
  ) => void;
  addPokemon: (
    pokemon: Omit<TeamFormPokemon, "position">,
    position: number,
  ) => void;
  removePokemon: (position: number) => void;
  updateNickname: (position: number, nickname: string) => void;
  reorderPokemon: (fromPosition: number, toPosition: number) => void;
  resetForm: (initialState?: Partial<TeamFormState>) => void;
  getEmptySlots: () => number[];
  getPokemonAtPosition: (position: number) => TeamFormPokemon | undefined;
};

export const TeamFormContext = createContext<TeamFormContextType | undefined>(
  undefined,
);
