import React from "react";
import { Link } from "@tanstack/react-router";

export const AppBar: React.FC = () => {
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
        <button 
          className="btn btn-primary" 
          disabled
        >
          Login
        </button>
      </div>
    </div>
  );
}; 