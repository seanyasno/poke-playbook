import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import type { Team } from "../../../types";

// Mock components to avoid dependencies
const MockTeamCardMenu = ({
  teamId,
  teamName,
}: {
  teamId: string;
  teamName: string;
}) => (
  <div className="dropdown dropdown-end">
    <button tabIndex={0} className="btn btn-ghost btn-sm">
      ⋯
    </button>
  </div>
);

const MockPokemonSprites = ({ pokemon }: { pokemon: any[] }) => (
  <div className="flex -space-x-2 overflow-hidden">
    {pokemon.slice(0, 6).map((p, index) => (
      <div
        key={index}
        className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center text-xs font-medium"
      >
        {p.pokemon_name[0].toUpperCase()}
      </div>
    ))}
    {Array.from({ length: 6 - pokemon.length }).map((_, index) => (
      <div
        key={`empty-${index}`}
        className="w-10 h-10 bg-base-200 rounded-full border-2 border-dashed border-base-300"
      />
    ))}
  </div>
);

const MockTeamCard: React.FC<{ team: Team }> = ({ team }) => {
  const pokemonCount = team.team_pokemon?.length || 0;
  const createdDate = new Date(team.created_at).toLocaleDateString();

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <div className="max-w-sm mx-auto">
        <div className="block p-6 bg-base-100 border border-base-300 rounded-lg hover:bg-base-200/30 transition-colors group cursor-pointer">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium text-base-content group-hover:text-primary transition-colors line-clamp-1">
              {team.name}
            </h3>
            <div onClick={(e) => e.preventDefault()}>
              <MockTeamCardMenu teamId={team.id} teamName={team.name} />
            </div>
          </div>

          {team.description && (
            <p className="text-sm text-base-content/70 mb-4 line-clamp-2 leading-relaxed">
              {team.description}
            </p>
          )}

          <MockPokemonSprites pokemon={team.team_pokemon || []} />

          <div className="flex justify-between items-center text-xs text-base-content/50 mt-4 pt-3 border-t border-base-300">
            <span>{pokemonCount} of 6 Pokémon</span>
            <span>Created {createdDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockTeamCard> = {
  title: "Features/Teams/TeamCard",
  component: MockTeamCard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyTeam: Story = {
  args: {
    team: {
      id: "1",
      name: "My First Team",
      description: "A team for beginners exploring the Pokémon world",
      user_id: "user-1",
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z",
      team_pokemon: [],
    },
  },
};

export const PartialTeam: Story = {
  args: {
    team: {
      id: "2",
      name: "Electric Squad",
      description:
        "A powerful team focused on Electric-type Pokémon with high speed and special attack stats",
      user_id: "user-1",
      created_at: "2024-01-10T08:15:00Z",
      updated_at: "2024-01-12T14:22:00Z",
      team_pokemon: [
        {
          id: "tp-1",
          pokemon_id: 25,
          pokemon_name: "pikachu",
          nickname: "Sparky",
          position: 1,
          created_at: "2024-01-10T08:15:00Z",
        },
        {
          id: "tp-2",
          pokemon_id: 26,
          pokemon_name: "raichu",
          nickname: null,
          position: 2,
          created_at: "2024-01-10T08:16:00Z",
        },
        {
          id: "tp-3",
          pokemon_id: 135,
          pokemon_name: "jolteon",
          nickname: "Lightning",
          position: 3,
          created_at: "2024-01-10T08:17:00Z",
        },
      ],
    },
  },
};

export const FullTeam: Story = {
  args: {
    team: {
      id: "3",
      name: "Champion Squad",
      description:
        "My ultimate team for challenging the Elite Four and Pokemon League Champions",
      user_id: "user-1",
      created_at: "2024-01-05T12:00:00Z",
      updated_at: "2024-01-14T16:45:00Z",
      team_pokemon: [
        {
          id: "tp-4",
          pokemon_id: 6,
          pokemon_name: "charizard",
          nickname: "Blaze",
          position: 1,
          created_at: "2024-01-05T12:00:00Z",
        },
        {
          id: "tp-5",
          pokemon_id: 9,
          pokemon_name: "blastoise",
          nickname: "Aqua",
          position: 2,
          created_at: "2024-01-05T12:01:00Z",
        },
        {
          id: "tp-6",
          pokemon_id: 3,
          pokemon_name: "venusaur",
          nickname: "Forest",
          position: 3,
          created_at: "2024-01-05T12:02:00Z",
        },
        {
          id: "tp-7",
          pokemon_id: 25,
          pokemon_name: "pikachu",
          nickname: "Thunder",
          position: 4,
          created_at: "2024-01-05T12:03:00Z",
        },
        {
          id: "tp-8",
          pokemon_id: 143,
          pokemon_name: "snorlax",
          nickname: "Tank",
          position: 5,
          created_at: "2024-01-05T12:04:00Z",
        },
        {
          id: "tp-9",
          pokemon_id: 150,
          pokemon_name: "mewtwo",
          nickname: "Psychic",
          position: 6,
          created_at: "2024-01-05T12:05:00Z",
        },
      ],
    },
  },
};

export const LongTeamName: Story = {
  args: {
    team: {
      id: "4",
      name: "Super Ultra Legendary Mega Evolution Championship Team",
      description: null,
      user_id: "user-1",
      created_at: "2024-01-20T14:30:00Z",
      updated_at: "2024-01-20T14:30:00Z",
      team_pokemon: [
        {
          id: "tp-10",
          pokemon_id: 149,
          pokemon_name: "dragonite",
          nickname: "Dragon",
          position: 1,
          created_at: "2024-01-20T14:30:00Z",
        },
      ],
    },
  },
};
