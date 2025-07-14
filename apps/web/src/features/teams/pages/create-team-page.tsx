import { TeamForm, TeamFormProvider } from "../components";
import { TEAM_FORM_MODES } from "../types";

export const CreateTeamPage: React.FC = () => {
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
