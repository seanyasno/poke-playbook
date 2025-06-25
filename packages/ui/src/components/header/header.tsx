import { NavbarStart } from "./components/navbar-start";
import { NavbarCenter } from "./components/navbar-center";
import { NavbarEnd, NavbarEndProps } from "./components/navbar-end";
import { isNotNullOrUndefined } from "@fastiship/libs";
import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type HeaderProps = HTMLAttributes<HTMLElement> & {
  action?: NavbarEndProps;
  navProps?: HTMLAttributes<HTMLElement>;
  label?: React.ReactNode;
  labelProps?: HTMLAttributes<HTMLElement>;
};

export const Header: React.FC<HeaderProps> = React.forwardRef<
  HTMLDivElement,
  HeaderProps
>(({ children, action, navProps, label, ...props }, ref) => {
  return (
    <header ref={ref} {...props}>
      <nav
        {...navProps}
        className={twMerge("navbar bg-base-200", navProps?.className)}
      >
        <NavbarStart label={label}>{children}</NavbarStart>

        <NavbarCenter>{children}</NavbarCenter>

        {isNotNullOrUndefined(action) && (
          <NavbarEnd label={action.label} onClick={action.onClick} />
        )}
      </nav>
    </header>
  );
});
