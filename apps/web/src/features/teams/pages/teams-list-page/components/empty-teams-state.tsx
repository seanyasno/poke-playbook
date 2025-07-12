import { Link } from "@tanstack/react-router";
import { IoPeople } from "react-icons/io5";

export const EmptyTeamsState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6">
        <IoPeople className="w-24 h-24 text-base-content/20" />
      </div>

      <h2 className="text-2xl font-bold mb-2">No teams yet</h2>
      <p className="text-base-content/60 mb-8 max-w-md">
        Start building your dream Pokémon teams! Create your first team to begin
        your journey.
      </p>

      <Link to="/teams/new" className="btn btn-primary btn-lg">
        Create Your First Team
      </Link>
    </div>
  );
};
