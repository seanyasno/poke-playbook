import { usePokemon } from "../hooks";
import { useState, useRef } from "react";

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

// Type gradient mappings for backgrounds
const typeGradients: Record<string, string> = {
  fire: "from-red-400 via-orange-500 to-yellow-500",
  water: "from-blue-400 via-cyan-500 to-blue-600",
  grass: "from-green-400 via-emerald-500 to-green-600",
  electric: "from-yellow-300 via-yellow-400 to-amber-500",
  psychic: "from-pink-400 via-purple-500 to-indigo-600",
  ice: "from-blue-200 via-cyan-300 to-blue-400",
  dragon: "from-indigo-500 via-purple-600 to-pink-600",
  dark: "from-gray-700 via-gray-800 to-black",
  normal: "from-gray-300 via-gray-400 to-gray-500",
};

// Type shadow colors for the splash effect
const typeShadowColors: Record<string, string> = {
  fire: "rgba(239, 68, 68, 0.4)",
  water: "rgba(59, 130, 246, 0.4)",
  grass: "rgba(34, 197, 94, 0.4)",
  electric: "rgba(250, 204, 21, 0.4)",
  psychic: "rgba(236, 72, 153, 0.4)",
  ice: "rgba(147, 197, 253, 0.4)",
  dragon: "rgba(99, 102, 241, 0.4)",
  dark: "rgba(75, 85, 99, 0.4)",
  normal: "rgba(156, 163, 175, 0.4)",
  fighting: "rgba(185, 28, 28, 0.4)",
  poison: "rgba(147, 51, 234, 0.4)",
  ground: "rgba(217, 119, 6, 0.4)",
  flying: "rgba(99, 102, 241, 0.4)",
  bug: "rgba(101, 163, 13, 0.4)",
  rock: "rgba(120, 53, 15, 0.4)",
  ghost: "rgba(109, 40, 217, 0.4)",
  steel: "rgba(107, 114, 128, 0.4)",
  fairy: "rgba(244, 114, 182, 0.4)",
};

export const PokemonCard: React.FC<{ pokemonName: string }> = ({
  pokemonName,
}) => {
  const { data: pokemon, isLoading, error } = usePokemon(pokemonName);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  if (isLoading) {
    return (
      <div className="w-80 h-96 bg-white rounded-2xl shadow-lg animate-pulse border border-gray-200">
        <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-300 rounded w-16"></div>
            <div className="h-6 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="w-80 h-96 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
        <p className="text-gray-500">Failed to load Pokemon</p>
      </div>
    );
  }

  const primaryImage = 
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.other?.home?.front_default ||
    pokemon.sprites?.front_default;

  const primaryType = pokemon.types?.[0]?.type?.name || 'normal';
  const typeGradient = typeGradients[primaryType] || typeGradients.normal;
  const shadowColor = typeShadowColors[primaryType] || typeShadowColors.normal;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      className="relative w-80 h-96 group cursor-pointer"
      style={{
        transform: `rotateX(${(mousePosition.y - 192) / 25}deg) rotateY(${(mousePosition.x - 160) / 25}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Main Card */}
      <div className="relative w-full h-full bg-white rounded-2xl border border-gray-200 backdrop-blur-sm overflow-hidden">
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
                  filter: 'brightness(1.05) contrast(1.05) saturate(1.1)',
                }}
              />
            </div>
          )}
          
          {/* Pokemon ID Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-700 border border-gray-200 shadow-sm">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 relative z-10">
          {/* Pokemon Name */}
          <h2 className="text-3xl font-bold text-gray-800 capitalize mb-4 tracking-wide">
            {pokemon.name}
          </h2>

          {/* Pokemon Types */}
          <div className="flex gap-2">
            {pokemon.types?.map((typeInfo) => (
              <span
                key={typeInfo.type.name}
                className={`
                  px-4 py-2 rounded-full text-white text-sm font-bold capitalize
                  shadow-lg
                  ${typeColors[typeInfo.type.name] || "bg-gray-400"}
                `}
                style={{
                  boxShadow: `0 4px 20px ${shadowColor}`,
                  transform: 'translateZ(10px)',
                }}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom subtle glow */}
        <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${typeGradient} opacity-10`} />
      </div>

      {/* Colored Splash Shadow */}
      <div 
        className="absolute inset-0 rounded-2xl blur-2xl scale-110 -z-10 transition-all duration-300"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 80%, ${shadowColor}, transparent)`,
          transform: 'translateY(15px) translateZ(-50px) scale(1.1)',
          opacity: mousePosition.x || mousePosition.y ? 0.8 : 0.4,
        }}
      />
      
      {/* Mask Shadow */}
      <div 
        className="absolute inset-0 bg-black/5 rounded-2xl blur-sm scale-98 -z-20"
        style={{
          transform: 'translateY(8px) translateZ(-60px)',
        }}
      />
    </div>
  );
};
