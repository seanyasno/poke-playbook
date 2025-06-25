import React, { PropsWithChildren } from "react";

export const NavbarCenter: React.FC<PropsWithChildren> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        {childrenArray.map((child) => (
          <li key={crypto.randomUUID()}>{child}</li>
        ))}
      </ul>
    </div>
  );
};
