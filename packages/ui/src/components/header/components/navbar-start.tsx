import React, { PropsWithChildren } from "react";
import { isNotNullOrUndefined } from "@fastiship/libs";

type NavbarStartProps = PropsWithChildren<{
  label?: React.ReactNode;
  dropdownIcon?: React.ReactElement;
}>;

export const NavbarStart: React.FC<NavbarStartProps> = ({
  children,
  label,
  dropdownIcon,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          {isNotNullOrUndefined(dropdownIcon) ? (
            dropdownIcon
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          )}
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box"
        >
          {childrenArray.map((child) => (
            <li key={crypto.randomUUID()}>{child}</li>
          ))}
        </ul>
      </div>

      {isNotNullOrUndefined(label) && label}
    </div>
  );
};
