import React from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../hooks";
import { isNotNullOrUndefined } from "@poke-playbook/libs";

export const AppBar: React.FC = () => {
  const { user, logout, loading } = useAuth();

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <div className="navbar bg-base-100 px-10">
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold text-primary">
          Pokédex
        </Link>

        {isNotNullOrUndefined(user) && (
          <div className="hidden md:flex ml-8 gap-6">
            <Link
              to="/"
              className="link link-hover text-base-content/80 hover:text-base-content"
              activeProps={{ className: "text-primary font-medium" }}
            >
              Pokédex
            </Link>
            <Link
              to="/teams"
              className="link link-hover text-base-content/80 hover:text-base-content"
              activeProps={{ className: "text-primary font-medium" }}
            >
              My Teams
            </Link>
          </div>
        )}
      </div>

      <div className="navbar-end">
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : isNotNullOrUndefined(user) ? (
          <div className="flex items-center gap-4">
            <div className="text-sm text-base-content/70">
              Welcome, {user.email}
            </div>
            <button className="btn btn-outline btn-sm" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
