import React, { useState } from "react";
import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { pokemonQueryOptions, usePokemon } from "../hooks";

// Type color mapping
const typeColors: Record<string, { background: string; text: string }> = {
  fire: { background: "#FF7842", text: "#FFFFFF" },
  water: { background: "#5CACEE", text: "#FFFFFF" },
  grass: { background: "#7ED321", text: "#FFFFFF" },
  electric: { background: "#FFD700", text: "#333333" },
  psychic: { background: "#FF69B4", text: "#FFFFFF" },
  ice: { background: "#87CEEB", text: "#333333" },
  dragon: { background: "#8B00FF", text: "#FFFFFF" },
  dark: { background: "#333333", text: "#FFFFFF" },
  fairy: { background: "#FFB6C1", text: "#333333" },
  normal: { background: "#EEEEEE", text: "#555555" },
  fighting: { background: "#B22222", text: "#FFFFFF" },
  poison: { background: "#9932CC", text: "#FFFFFF" },
  ground: { background: "#DDCC55", text: "#FFFFFF" },
  flying: { background: "#87CEEB", text: "#333333" },
  bug: { background: "#9ACD32", text: "#333333" },
  rock: { background: "#CBB860", text: "#FFFFFF" },
  ghost: { background: "#483D8B", text: "#FFFFFF" },
  steel: { background: "#B0C4DE", text: "#333333" },
};

// Stat color mapping
const getStatColor = (value: number) => {
  if (value < 50) return "#FF6B6B";
  if (value < 100) return "#7ED321";
  return "#4A90E2";
};

// Format height and weight
const formatHeight = (height: number) => `${(height / 10).toFixed(1)}m`;
const formatWeight = (weight: number) => `${(weight / 10).toFixed(1)}kg`;

// Capitalize first letter
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Format stat name
const formatStatName = (name: string) => {
  const statNames: Record<string, string> = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp.Attack",
    "special-defense": "Sp.Defense",
    speed: "Speed",
  };
  return statNames[name] || capitalize(name);
};

const RouteComponent: React.FC = () => {
  const { pokemonId } = useParams({ from: "/pokemons/$pokemonId" });
  const { data: pokemon } = usePokemon(pokemonId);
  const [activeTab, setActiveTab] = useState("About");
  const [isShiny, setIsShiny] = useState(false);

  // Get the best available sprite
  const pokemonImage = isShiny 
    ? (pokemon.sprites.other?.["official-artwork"]?.front_shiny || 
       pokemon.sprites.other?.home?.front_shiny || 
       pokemon.sprites.front_shiny || 
       pokemon.sprites.front_default)
    : (pokemon.sprites.other?.["official-artwork"]?.front_default || 
       pokemon.sprites.other?.home?.front_default || 
       pokemon.sprites.front_default);

  const prevPokemonId = pokemon.id > 1 ? pokemon.id - 1 : null;
  const nextPokemonId = pokemon.id < 1025 ? pokemon.id + 1 : null; // Assuming max 1025 Pokemon

  return (
    <div className="min-h-screen flex justify-center items-center p-8 bg-gradient-to-br from-yellow-200 to-orange-200">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl w-full flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-start">
          <Link
            to="/"
            className="text-gray-600 font-medium flex items-center gap-2 hover:underline"
          >
            ← Pokedex
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pokemon Image Display */}
          <div className="flex flex-col justify-between items-center gap-8 relative">
            {/* Previous Pokemon Nav */}
            {prevPokemonId && (
              <Link
                to="/pokemons/$pokemonId"
                params={{ pokemonId: prevPokemonId.toString() }}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <div className="flex flex-col items-center gap-1 text-sm">
                  <span>←</span>
                  <span>#{prevPokemonId.toString().padStart(3, "0")}</span>
                </div>
              </Link>
            )}

            {/* Pokemon Image */}
            <div className="w-full flex justify-center">
              <img
                src={pokemonImage || "/placeholder-pokemon.png"}
                alt={`${capitalize(pokemon.name)} ${isShiny ? "shiny" : "normal"} render`}
                className="w-80 h-80 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Next Pokemon Nav */}
            {nextPokemonId && (
              <Link
                to="/pokemons/$pokemonId"
                params={{ pokemonId: nextPokemonId.toString() }}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <div className="flex flex-col items-center gap-1 text-sm">
                  <span>→</span>
                  <span>#{nextPokemonId.toString().padStart(3, "0")}</span>
                </div>
              </Link>
            )}
          </div>

          {/* Info Panel */}
          <div className="flex flex-col gap-6">
            {/* Pokemon Title */}
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-gray-800">
                {capitalize(pokemon.name)}
              </h1>
              <span className="text-gray-400 text-lg font-medium">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
              <div className="flex gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: typeColors[type.type.name]?.background || "#EEEEEE",
                      color: typeColors[type.type.name]?.text || "#555555",
                    }}
                  >
                    {capitalize(type.type.name)}
                  </span>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex gap-8">
                {["About", "Moves", "Episodes", "Cards"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "text-gray-800 border-b-2 border-orange-500"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "About" && (
              <div className="flex flex-col gap-6">
                {/* Story Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Story</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {pokemon.name === "voltorb" 
                      ? "It was discovered when Poké Balls were introduced. It is said that there is some connection between this Pokémon and Poké Balls."
                      : "This Pokémon is known for its unique characteristics and abilities in battle."}
                  </p>
                </div>

                {/* Versions */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Versions</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsShiny(false)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        !isShiny
                          ? "bg-gray-100 text-gray-800"
                          : "bg-white text-gray-600 border hover:bg-gray-50"
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => setIsShiny(true)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isShiny
                          ? "bg-gray-100 text-gray-800"
                          : "bg-white text-gray-600 border hover:bg-gray-50"
                      }`}
                    >
                      Shiny
                    </button>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Height</div>
                    <div className="text-lg font-semibold">{formatHeight(pokemon.height)}</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Weight</div>
                    <div className="text-lg font-semibold">{formatWeight(pokemon.weight)}</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Abilities</div>
                    <div className="text-lg font-semibold">
                      {pokemon.abilities
                        .filter(ability => !ability.is_hidden)
                        .map(ability => capitalize(ability.ability.name))
                        .join(", ")}
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-sm text-gray-500 mb-1">Experience</div>
                    <div className="text-lg font-semibold">{pokemon.base_experience}</div>
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Stats</h3>
                  <div className="space-y-3">
                    {pokemon.stats.map((stat) => (
                      <div key={stat.stat.name} className="flex items-center gap-4">
                        <div className="w-20 text-sm font-medium text-gray-600">
                          {formatStatName(stat.stat.name)}
                        </div>
                        <div className="w-12 text-sm font-bold text-gray-800">
                          {stat.base_stat}
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                              backgroundColor: getStatColor(stat.base_stat),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other tab content placeholders */}
            {activeTab !== "About" && (
              <div className="text-center py-12 text-gray-500">
                <p>{activeTab} content coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/pokemons/$pokemonId")({
  component: RouteComponent,
  loader: async ({ context: { queryClient }, params: { pokemonId } }) => {
    const pokemon = await queryClient.ensureQueryData(
      pokemonQueryOptions(pokemonId)
    );

    return { pokemon };
  },
});
