import React from "react";

export type NavbarEndProps = {
  label: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const NavbarEnd: React.FC<NavbarEndProps> = ({ label, ...props }) => {
  return (
    <div className="navbar-end">
      <button className="btn btn-primary" {...props}>
        {label}
      </button>
    </div>
  );
};
