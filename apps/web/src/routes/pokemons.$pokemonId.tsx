import React, { useState } from "react";
import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { pokemonEvolutionQueryOptions, pokemonQueryOptions, usePokemon, usePokemonEvolution } from "../hooks";
import { typeGradients, typeShadowColors, typeBadgeVariants } from "../components/pokemon-card/pokemon-card-constants";
import { withDefault } from "@poke-playbook/libs";
import type { PokemonType } from "../types";

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

// Helper function to extract Pokemon ID from species URL
const extractPokemonIdFromUrl = (url: string): string => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : "1";
};

// Helper function to flatten evolution chain
const flattenEvolutionChain = (chain: any): Array<{ name: string; id: string }> => {
  const result: Array<{ name: string; id: string }> = [];
  
  const processEvolution = (evolution: any) => {
    if (evolution?.species) {
      result.push({
        name: evolution.species.name,
        id: extractPokemonIdFromUrl(evolution.species.url)
      });
    }
    
    if (evolution?.evolves_to && evolution.evolves_to.length > 0) {
      // For simplicity, we'll take the first evolution path
      processEvolution(evolution.evolves_to[0]);
    }
  };
  
  processEvolution(chain);
  return result;
};

const RouteComponent: React.FC = () => {
  const { pokemonId } = useParams({ from: "/pokemons/$pokemonId" });
  const { data: pokemon } = usePokemon(pokemonId);
  const { data: evolutionChain } = usePokemonEvolution(pokemonId);
  const [activeTab, setActiveTab] = useState("About");
  const [isShiny, setIsShiny] = useState(false);

  // Process evolution chain
  const evolutionPokemons = evolutionChain?.chain ? flattenEvolutionChain(evolutionChain.chain) : [];

  // Get primary type for styling
  const primaryType: PokemonType = withDefault(
    pokemon.types?.[0]?.type?.name,
    "normal"
  );
  const typeGradient = withDefault(
    typeGradients[primaryType],
    typeGradients.normal
  );
  const shadowColor = withDefault(
    typeShadowColors[primaryType],
    typeShadowColors.normal
  );

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
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl w-full flex flex-col gap-8 relative overflow-hidden">
        {/* Subtle Background Glow based on primary type */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${typeGradient} opacity-5 pointer-events-none`}
        />
                {/* Header */}
        <div className="flex justify-start relative z-10">
          <Link
            to="/"
            className="text-gray-600 font-medium flex items-center gap-2 hover:underline"
          >
            ← Pokedex
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
           {/* Pokemon Image Display */}
                      <div className="flex flex-col gap-8">
             {/* Pokemon Image Section */}
             <div className="flex flex-col justify-center items-center gap-4 relative">
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
                 <div className="relative">
                   <img
                     src={pokemonImage || "/placeholder-pokemon.png"}
                     alt={`${capitalize(pokemon.name)} ${isShiny ? "shiny" : "normal"} render`}
                     className="w-80 h-80 object-contain transition-all duration-300 hover:scale-105"
                     style={{
                       filter: `drop-shadow(0 0 20px ${shadowColor})`,
                     }}
                   />
                 </div>
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

             {/* Evolution Section */}
             {evolutionPokemons.length > 1 && (
               <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                 <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Evolutions</h3>
                 <div className="flex flex-wrap justify-center items-center gap-4">
                   {evolutionPokemons.map((evolutionPokemon, index) => (
                     <React.Fragment key={evolutionPokemon.id}>
                       {/* Evolution Card */}
                       <Link
                         to="/pokemons/$pokemonId"
                         params={{ pokemonId: evolutionPokemon.id }}
                         className="block group"
                       >
                         <div className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 min-w-[100px] shadow-sm border border-gray-100 group-hover:scale-105">
                           <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center shadow-inner">
                             <img
                               src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutionPokemon.id}.png`}
                               alt={evolutionPokemon.name}
                               className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                               onError={(e) => {
                                 const target = e.target as HTMLImageElement;
                                 target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evolutionPokemon.id}.png`;
                               }}
                               style={{
                                 filter: `drop-shadow(0 2px 8px ${shadowColor})`,
                               }}
                             />
                           </div>
                           <h4 className="text-xs font-semibold text-gray-800 capitalize mb-1">
                             {evolutionPokemon.name}
                           </h4>
                           <p className="text-xs text-gray-500">
                             #{evolutionPokemon.id.padStart(3, "0")}
                           </p>
                         </div>
                       </Link>

                       {/* Evolution Connector */}
                       {index < evolutionPokemons.length - 1 && (
                         <div className="flex items-center">
                           <div className="flex flex-col items-center">
                             <div className="w-8 h-0.5 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300"></div>
                             <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-gray-400 mt-1"></div>
                           </div>
                         </div>
                       )}
                     </React.Fragment>
                   ))}
                 </div>
               </div>
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
                  <div
                    key={type.type.name}
                    className={`badge badge-lg font-bold capitalize ${withDefault(typeBadgeVariants[type.type.name as PokemonType], "badge-ghost")}`}
                    style={{
                      boxShadow: `0 4px 20px ${shadowColor}`,
                      transform: "translateZ(10px)",
                    }}
                  >
                    {type.type.name}
                  </div>
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
    const evolution = await queryClient.ensureQueryData(
      pokemonEvolutionQueryOptions(pokemonId)
    );
    
    return { pokemon, evolution };
  },
});
