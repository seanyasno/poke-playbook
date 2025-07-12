import { useFormContext } from "react-hook-form";
import type { TeamFormData } from "../../../types";

export function TeamInfoSection() {
  const { teamName, teamDescription, updateTeamInfo, formState } =
    useTeamInfo();

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
              className={`input input-bordered ${formState.errors.teamName ? "input-error" : ""}`}
              value={teamName}
              onChange={(event) =>
                updateTeamInfo("teamName", event.target.value)
              }
              placeholder="Enter your team name"
              maxLength={255}
            />
            {formState.errors.teamName && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {formState.errors.teamName.message}
                </span>
              </label>
            )}
            <label className="label">
              <span className="label-text-alt">
                {teamName.length}/255 characters
              </span>
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={teamDescription}
              onChange={(event) =>
                updateTeamInfo("teamDescription", event.target.value)
              }
              placeholder="Describe your team strategy, theme, or any notes..."
              maxLength={500}
            />
            <label className="label">
              <span className="label-text-alt">
                {teamDescription.length}/500 characters
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function useTeamInfo() {
  const { setValue, watch, formState } = useFormContext<TeamFormData>();

  const teamName = watch("teamName");
  const teamDescription = watch("teamDescription");

  const updateTeamInfo = (
    field: keyof Pick<TeamFormData, "teamName" | "teamDescription">,
    value: string,
  ) => {
    setValue(field, value);
  };

  return {
    teamName,
    teamDescription,
    updateTeamInfo,
    formState,
  };
}
