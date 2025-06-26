import { PokemonCard } from "./components";
import { usePokemons } from "./hooks";

export const App: React.FC = () => {
  const { data: pokemons } = usePokemons(5);

  return (
    <div className="min-h-screen bg-base-100">
      {pokemons?.results?.map((pokemon) => (
        <PokemonCard pokemonName={pokemon.name} />
      ))}
    </div>
  );
};
