import { usePokemon } from "../hooks";

// Type color mapping for Pokemon types
const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500", 
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

export const PokemonCard: React.FC<{ pokemonName: string }> = ({
  pokemonName,
}) => {
  const { data: pokemon, isLoading, error } = usePokemon(pokemonName);

  if (isLoading) {
    return (
      <div className="w-80 h-96 bg-white rounded-xl shadow-lg animate-pulse">
        <div className="h-48 bg-gray-200 rounded-t-xl"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="w-80 h-96 bg-white rounded-xl shadow-lg flex items-center justify-center">
        <p className="text-gray-500">Failed to load Pokemon</p>
      </div>
    );
  }

  const primaryImage = 
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.other?.home?.front_default ||
    pokemon.sprites?.front_default;

  return (
    <div className="w-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center overflow-hidden">
        {primaryImage && (
          <img
            src={primaryImage}
            alt={pokemon.name}
            className="w-32 h-32 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        )}
        {/* Pokemon ID Badge */}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-600">
          #{pokemon.id.toString().padStart(3, '0')}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Pokemon Name */}
        <h2 className="text-2xl font-bold text-gray-800 capitalize mb-3">
          {pokemon.name}
        </h2>

        {/* Pokemon Types */}
        <div className="flex gap-2 mb-4">
          {pokemon.types?.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className={`
                px-3 py-1 rounded-full text-white text-sm font-medium capitalize
                ${typeColors[typeInfo.type.name] || "bg-gray-400"}
              `}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-gray-500 text-xs uppercase tracking-wide">Height</div>
            <div className="font-semibold text-gray-800">
              {pokemon.height ? (pokemon.height / 10).toFixed(1) : '?'}m
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="text-gray-500 text-xs uppercase tracking-wide">Weight</div>
            <div className="font-semibold text-gray-800">
              {pokemon.weight ? (pokemon.weight / 10).toFixed(1) : '?'}kg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
