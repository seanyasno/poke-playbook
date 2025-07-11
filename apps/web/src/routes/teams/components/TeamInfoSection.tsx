import { useTeamForm } from "../hooks/use-team-form";

type TeamInfoSectionProps = {
  errors: Record<string, string>;
};

export function TeamInfoSection({ errors }: TeamInfoSectionProps) {
  const { state, updateTeamInfo } = useTeamForm();

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title mb-4">Team Information</h2>

        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Team Name *</span>
            </label>
            <input
              type="text"
              className={`input input-bordered ${errors.teamName ? "input-error" : ""}`}
              value={state.teamName}
              onChange={(e) => updateTeamInfo("teamName", e.target.value)}
              placeholder="Enter your team name"
              maxLength={255}
            />
            {errors.teamName && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.teamName}
                </span>
              </label>
            )}
            <label className="label">
              <span className="label-text-alt">
                {state.teamName.length}/255 characters
              </span>
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={state.teamDescription}
              onChange={(e) =>
                updateTeamInfo("teamDescription", e.target.value)
              }
              placeholder="Describe your team strategy, theme, or any notes..."
              maxLength={500}
            />
            <label className="label">
              <span className="label-text-alt">
                {state.teamDescription.length}/500 characters
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
