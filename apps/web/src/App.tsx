import { PokemonList } from "./components";
import { ErrorBoundarySuspense } from "./components/error-boundary-suspense";

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <ErrorBoundarySuspense>
        <PokemonList />
      </ErrorBoundarySuspense>
    </div>
  );
};
