import { TeamForm, TeamFormProvider } from "../components";
import { TEAM_FORM_MODES } from "../types";

export const CreateTeamPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Team</h1>
      <TeamFormProvider>
        <TeamForm mode={TEAM_FORM_MODES.CREATE} />
      </TeamFormProvider>
    </div>
  );
};
