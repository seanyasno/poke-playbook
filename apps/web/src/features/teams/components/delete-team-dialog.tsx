import { useDeleteTeam } from "../hooks";

type DeleteTeamDialogProps = {
  isOpen: boolean;
  onClose?: () => void;
  teamId: string;
  teamName: string;
};

export const DeleteTeamDialog: React.FC<DeleteTeamDialogProps> = ({
  isOpen,
  onClose,
  teamId,
  teamName,
}) => {
  const deleteTeamMutation = useDeleteTeam();

  const handleDelete = async () => {
    try {
      await deleteTeamMutation.mutateAsync(teamId);
      onClose?.();
    } catch (error) {
      console.error("Failed to delete team:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Delete Team</h3>
        <p className="mb-6">
          Are you sure you want to delete "{teamName}"? This action cannot be
          undone.
        </p>

        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={onClose}
            disabled={deleteTeamMutation.isPending}
          >
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={handleDelete}
            disabled={deleteTeamMutation.isPending}
          >
            {deleteTeamMutation.isPending ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Deleting...
              </>
            ) : (
              "Delete Team"
            )}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};
