import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
// Mock function for actions
const mockFn = () => console.log("Action triggered");

// Mock the dependencies
const MockLink: React.FC<{
  to: string;
  params: { pokemonId: string };
  children: React.ReactNode;
  className?: string;
}> = ({ to, params, children, className }) => (
  <a
    href={`${to.replace("$pokemonId", params.pokemonId)}`}
    className={className}
    onClick={mockFn}
  >
    {children}
  </a>
);

// Wrapper component that provides mocked dependencies
const PokemonCardWrapper: React.FC<{
  pokemonName: string;
  mockPokemonData?: any;
}> = ({ pokemonName, mockPokemonData }) => {
  // Mock the usePokemon hook
  const mockUsePokemon = () => ({
    data: mockPokemonData || {
      id: 1,
      name: pokemonName,
      sprites: {
        other: {
          "official-artwork": {
            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`,
          },
        },
      },
      types: [
        {
          type: {
            name: "normal",
          },
        },
      ],
    },
  });

  // Mock the useMousePosition hook
  const mockUseMousePosition = () => ({
    mousePosition: { x: 0, y: 0 },
    setMousePosition: mockFn,
    handleMouseMove: mockFn,
  });

  // Create a version of PokemonCard with mocked dependencies
  const PokemonCardWithMocks: React.FC = () => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const { data: pokemon } = mockUsePokemon();
    const { mousePosition, setMousePosition, handleMouseMove } =
      mockUseMousePosition();

    const primaryImage =
      pokemon.sprites?.other?.["official-artwork"]?.front_default ??
      pokemon.sprites?.other?.home?.front_default ??
      pokemon.sprites?.front_default;

    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 p-8">
        <MockLink
          to="/pokemons/$pokemonId"
          params={{ pokemonId: pokemon.id.toString() }}
          className="block"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition()}
            className="relative w-80 h-92 group cursor-pointer"
            style={{
              transform: `rotateX(${(mousePosition.y - 192) / 25}deg) rotateY(${(mousePosition.x - 160) / 25}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.1s ease-out",
            }}
          >
            <div className="card w-full h-full bg-base-100 shadow-md drop-shadow-md backdrop-blur-sm overflow-hidden">
              <div className="relative h-56 flex items-center justify-center overflow-hidden">
                {primaryImage && (
                  <div className="relative transform-gpu">
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
                <div className="absolute top-4 right-4 bg-base-100/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-base-content border border-base-300 shadow-sm">
                  #{pokemon.id.toString().padStart(3, "0")}
                </div>
              </div>
              <div className="card-body relative z-10">
                <h2 className="card-title text-3xl capitalize tracking-wide justify-center mb-2">
                  {pokemon.name}
                </h2>
                <div className="card-actions justify-center">
                  {pokemon.types?.map((typeInfo: any) => (
                    <div
                      key={typeInfo.type.name}
                      className="badge badge-lg font-bold capitalize badge-primary"
                    >
                      {typeInfo.type.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MockLink>
      </div>
    );
  };

  return <PokemonCardWithMocks />;
};

const meta: Meta<typeof PokemonCardWrapper> = {
  title: "Components/PokemonCard",
  component: PokemonCardWrapper,
  parameters: {
    layout: "fullscreen",
    actions: { argTypesRegex: "^on[A-Z].*" },
  },
  argTypes: {
    pokemonName: {
      control: "text",
      description: "Name of the Pokemon to display",
    },
    mockPokemonData: {
      control: "object",
      description: "Mock Pokemon data to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Pikachu: Story = {
  args: {
    pokemonName: "pikachu",
    mockPokemonData: {
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
            name: "electric",
          },
        },
      ],
    },
  },
};

export const Charizard: Story = {
  args: {
    pokemonName: "charizard",
    mockPokemonData: {
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
            name: "fire",
          },
        },
        {
          type: {
            name: "flying",
          },
        },
      ],
    },
  },
};

export const Blastoise: Story = {
  args: {
    pokemonName: "blastoise",
    mockPokemonData: {
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
            name: "water",
          },
        },
      ],
    },
  },
};

export const Venusaur: Story = {
  args: {
    pokemonName: "venusaur",
    mockPokemonData: {
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
            name: "grass",
          },
        },
        {
          type: {
            name: "poison",
          },
        },
      ],
    },
  },
};
