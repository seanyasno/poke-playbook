import React from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks";

export const AppBar: React.FC = () => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="navbar bg-base-100 px-10">
      <div className="navbar-start">
        <Link 
          to="/" 
          className="text-xl font-bold text-primary"
        >
          Pokédex
        </Link>
      </div>
      
      <div className="navbar-end">
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : user ? (
          <div className="flex items-center gap-4">
            <div className="text-sm text-base-content/70">
              Welcome, {user.email}
            </div>
            <button 
              className="btn btn-outline btn-sm" 
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link 
              to="/login"
              className="btn btn-ghost btn-sm"
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="btn btn-primary btn-sm"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}; 