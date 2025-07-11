import { TeamFormProvider } from "../context/TeamFormContext";
import { TeamForm } from "./TeamForm";

export function CreateTeamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Team</h1>
      <TeamFormProvider>
        <TeamForm mode="create" />
      </TeamFormProvider>
    </div>
  );
}
