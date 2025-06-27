import { usePokemon } from "../../hooks";
import { useRef } from "react";
import {
  typeColors,
  typeGradients,
  typeShadowColors,
} from "./pokemon-card-constants";
import { isNotNullOrUndefined, isNullOrUndefined, withDefault } from "@poke-playbook/libs";
import { useMousePosition } from "../../hooks/use-mouse-position";
import type { PokemonType } from "../../types";

type PokemonCardProps = {
  pokemonName: string;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemonName }) => {
  const {
    data: pokemon,
    isLoading: isLoadingPokemon,
    isError: isErrorLoadingPokemon,
  } = usePokemon(pokemonName);
  const cardRef = useRef<HTMLDivElement>(null);
  const { mousePosition, setMousePosition, handleMouseMove } =
    useMousePosition(cardRef);

  if (isLoadingPokemon) {
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

  if (isErrorLoadingPokemon || isNullOrUndefined(pokemon)) {
    return (
      <div className="w-80 h-96 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
        <p className="text-gray-500">Failed to load Pokemon</p>
      </div>
    );
  }

  const primaryImage =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.other?.home?.front_default ||
    pokemon.sprites?.front_default;

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

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
      className="relative w-80 h-96 group cursor-pointer"
      style={{
        transform: `rotateX(${(mousePosition.y - 192) / 25}deg) rotateY(${(mousePosition.x - 160) / 25}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
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
          {isNotNullOrUndefined(primaryImage) && (
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
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-700 border border-gray-200 shadow-sm">
            #{pokemon.id.toString().padStart(3, "0")}
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
                  ${withDefault(typeColors[typeInfo.type.name], "bg-gray-400")}
                `}
                style={{
                  boxShadow: `0 4px 20px ${shadowColor}`,
                  transform: "translateZ(10px)",
                }}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom subtle glow */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${typeGradient} opacity-10`}
        />
      </div>
    </div>
  );
};
