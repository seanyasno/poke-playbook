import type { Meta, StoryObj } from "@storybook/react";
import React, { useRef } from "react";
import {
  typeGradients,
  typeShadowColors,
  typeBadgeVariants,
} from "./pokemon-card-constants";
import { withDefault } from "@poke-playbook/libs";
import type { PokemonType } from "@/types";

type MockPokemon = {
  id: number;
  name: string;
  sprites?: {
    other?: {
      "official-artwork"?: {
        front_default?: string;
      };
      home?: {
        front_default?: string;
      };
    };
    front_default?: string;
  };
  types?: {
    type: {
      name: PokemonType;
    };
  }[];
};

const MockPokemonCard: React.FC<{ pokemon: MockPokemon }> = ({ pokemon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mousePosition = { x: 0, y: 0 };

  const primaryImage =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ??
    pokemon.sprites?.other?.home?.front_default ??
    pokemon.sprites?.front_default;

  const primaryType: PokemonType = withDefault(
    pokemon.types?.[0]?.type?.name,
    "normal",
  );
  const typeGradient = withDefault(
    typeGradients[primaryType],
    typeGradients.normal,
  );
  const shadowColor = withDefault(
    typeShadowColors[primaryType],
    typeShadowColors.normal,
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-8">
      <div
        ref={cardRef}
        className="relative w-80 h-92 group cursor-pointer"
        style={{
          transform: `rotateX(${(mousePosition.y - 192) / 25}deg) rotateY(${(mousePosition.x - 160) / 25}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Main Card */}
        <div className="card w-full h-full bg-base-100 shadow-md drop-shadow-md backdrop-blur-sm overflow-hidden">
          {/* Subtle Background Glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${typeGradient} opacity-5`}
          />

          {/* Pokemon Image Container with 3D Effect */}
          <div className="relative h-56 flex items-center justify-center overflow-hidden">
            {/* Pokemon Image with 3D transforms */}
            {primaryImage && (
              <div
                className="relative transform-gpu"
                style={{
                  transform: `translateZ(20px) rotateY(${(mousePosition.x - 160) / 15}deg)`,
                }}
              >
                <img
                  src={primaryImage}
                  alt={pokemon.name}
                  className="w-40 h-40 object-contain transition-all duration-300 group-hover:scale-110"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(0, 0, 0, 0.5))",
                  }}
                />
              </div>
            )}

            {/* Pokemon ID Badge */}
            <div className="absolute top-4 right-4 bg-base-100/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-base-content border border-base-300 shadow-sm">
              #{pokemon.id.toString().padStart(3, "0")}
            </div>
          </div>

          {/* Card Content */}
          <div className="card-body relative z-10">
            {/* Pokemon Name */}
            <h2 className="card-title text-3xl capitalize tracking-wide justify-center mb-2">
              {pokemon.name}
            </h2>

            {/* Pokemon Types */}
            <div className="card-actions justify-center">
              {pokemon.types?.map((typeInfo) => (
                <div
                  key={typeInfo.type.name}
                  className={`badge badge-lg font-bold capitalize ${withDefault(typeBadgeVariants[typeInfo.type.name], "badge-ghost")}`}
                  style={{
                    boxShadow: `0 4px 20px ${shadowColor}`,
                    transform: "translateZ(10px)",
                  }}
                >
                  {typeInfo.type.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof MockPokemonCard> = {
  title: "Components/PokemonCard",
  component: MockPokemonCard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Pikachu: Story = {
  args: {
    pokemon: {
      id: 25,
      name: "pikachu",
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
          },
        },
      },
      types: [
        {
          type: {
            name: "electric" as PokemonType,
          },
        },
      ],
    },
  },
};

export const Charizard: Story = {
  args: {
    pokemon: {
      id: 6,
      name: "charizard",
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
          },
        },
      },
      types: [
        {
          type: {
            name: "fire" as PokemonType,
          },
        },
        {
          type: {
            name: "flying" as PokemonType,
          },
        },
      ],
    },
  },
};

export const Blastoise: Story = {
  args: {
    pokemon: {
      id: 9,
      name: "blastoise",
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
          },
        },
      },
      types: [
        {
          type: {
            name: "water" as PokemonType,
          },
        },
      ],
    },
  },
};

export const Venusaur: Story = {
  args: {
    pokemon: {
      id: 3,
      name: "venusaur",
      sprites: {
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
          },
        },
      },
      types: [
        {
          type: {
            name: "grass" as PokemonType,
          },
        },
        {
          type: {
            name: "poison" as PokemonType,
          },
        },
      ],
    },
  },
};
