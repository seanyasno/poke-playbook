import { Link } from "@tanstack/react-router";
import { TeamForm, TeamFormProvider } from "../components";
import { TEAM_FORM_MODES } from "../types";
import { useAuth } from "@/features";

export const CreateTeamPage: React.FC = () => {
  const { user, loading } = useAuth();

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-24">
        <h2 className="text-2xl font-medium mb-4">Sign in required</h2>
        <p className="text-base-content/60 mb-6">
          You need to be signed in to create teams.
        </p>
        <Link to="/login" className="btn btn-primary">
          Sign in
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-medium text-base-content mb-2 leading-tight">
            Create team
          </h1>
          <p className="text-lg text-base-content/60">
            Build your perfect Pokémon team
          </p>
        </div>

        <TeamFormProvider>
          <TeamForm mode={TEAM_FORM_MODES.CREATE} />
        </TeamFormProvider>
      </div>
    </div>
  );
};
