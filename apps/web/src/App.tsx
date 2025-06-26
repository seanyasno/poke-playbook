import { usePokemons } from "./hooks";

export const App: React.FC = () => {
  const { data: pokemons } = usePokemons(5);

  console.log(pokemons?.results?.[0]);

  return <div className="min-h-screen bg-base-100">pokemons</div>;
}