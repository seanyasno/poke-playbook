import { useReducer, type ReactNode } from "react";
import {
  type TeamFormState,
  type TeamFormPokemon,
} from "../../../routes/teams/types/team.types.ts";
import {
  TeamFormContext,
  type TeamFormContextType,
} from "./team-form-context.ts";

type TeamFormAction =
  | {
      type: "UPDATE_TEAM_INFO";
      field: "teamName" | "teamDescription";
      value: string;
    }
  | {
      type: "ADD_POKEMON";
      pokemon: Omit<TeamFormPokemon, "position">;
      position: number;
    }
  | { type: "REMOVE_POKEMON"; position: number }
  | { type: "UPDATE_NICKNAME"; position: number; nickname: string }
  | { type: "REORDER_POKEMON"; fromPosition: number; toPosition: number }
  | { type: "RESET_FORM"; state?: Partial<TeamFormState> };

const initialState: TeamFormState = {
  teamName: "",
  teamDescription: "",
  selectedPokemon: [],
};

function teamFormReducer(
  state: TeamFormState,
  action: TeamFormAction,
): TeamFormState {
  switch (action.type) {
    case "UPDATE_TEAM_INFO":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "ADD_POKEMON": {
      // Remove any existing Pokemon at this position first
      const filteredPokemon = state.selectedPokemon.filter(
        (p) => p.position !== action.position,
      );
      return {
        ...state,
        selectedPokemon: [
          ...filteredPokemon,
          { ...action.pokemon, position: action.position },
        ],
      };
    }

    case "REMOVE_POKEMON":
      return {
        ...state,
        selectedPokemon: state.selectedPokemon.filter(
          (p) => p.position !== action.position,
        ),
      };

    case "UPDATE_NICKNAME":
      return {
        ...state,
        selectedPokemon: state.selectedPokemon.map((p) =>
          p.position === action.position
            ? { ...p, nickname: action.nickname }
            : p,
        ),
      };

    case "REORDER_POKEMON": {
      const { fromPosition, toPosition } = action;
      const pokemonToMove = state.selectedPokemon.find(
        (p) => p.position === fromPosition,
      );
      const pokemonAtTarget = state.selectedPokemon.find(
        (p) => p.position === toPosition,
      );

      if (!pokemonToMove) return state;

      const newPokemon = state.selectedPokemon.map((p) => {
        if (p.position === fromPosition) {
          return { ...p, position: toPosition };
        }
        if (pokemonAtTarget && p.position === toPosition) {
          return { ...p, position: fromPosition };
        }
        return p;
      });

      return {
        ...state,
        selectedPokemon: newPokemon,
      };
    }

    case "RESET_FORM":
      return {
        ...initialState,
        ...action.state,
      };

    default:
      return state;
  }
}

type TeamFormProviderProps = {
  children: ReactNode;
  initialState?: Partial<TeamFormState>;
};

export function TeamFormProvider({
  children,
  initialState: providedInitialState,
}: TeamFormProviderProps) {
  const [state, dispatch] = useReducer(teamFormReducer, {
    ...initialState,
    ...providedInitialState,
  });

  const updateTeamInfo = (
    field: "teamName" | "teamDescription",
    value: string,
  ) => {
    dispatch({ type: "UPDATE_TEAM_INFO", field, value });
  };

  const addPokemon = (
    pokemon: Omit<TeamFormPokemon, "position">,
    position: number,
  ) => {
    dispatch({ type: "ADD_POKEMON", pokemon, position });
  };

  const removePokemon = (position: number) => {
    dispatch({ type: "REMOVE_POKEMON", position });
  };

  const updateNickname = (position: number, nickname: string) => {
    dispatch({ type: "UPDATE_NICKNAME", position, nickname });
  };

  const reorderPokemon = (fromPosition: number, toPosition: number) => {
    dispatch({ type: "REORDER_POKEMON", fromPosition, toPosition });
  };

  const resetForm = (initialState?: Partial<TeamFormState>) => {
    dispatch({ type: "RESET_FORM", state: initialState });
  };

  const getEmptySlots = (): number[] => {
    const occupiedPositions = new Set(
      state.selectedPokemon.map((p) => p.position),
    );
    return [1, 2, 3, 4, 5, 6].filter((pos) => !occupiedPositions.has(pos));
  };

  const getPokemonAtPosition = (
    position: number,
  ): TeamFormPokemon | undefined => {
    return state.selectedPokemon.find((p) => p.position === position);
  };

  const value: TeamFormContextType = {
    state,
    updateTeamInfo,
    addPokemon,
    removePokemon,
    updateNickname,
    reorderPokemon,
    resetForm,
    getEmptySlots,
    getPokemonAtPosition,
  };

  return (
    <TeamFormContext.Provider value={value}>
      {children}
    </TeamFormContext.Provider>
  );
}
