import { isString } from "@fastiship/libs";
import { twMerge } from "tailwind-merge";
import React from "react";

export type HeroTitleProps = React.ComponentProps<"h1">;

export const HeroTitle: React.FC<HeroTitleProps> = ({
  children,
  className,
  ...props
}) => {
  if (isString(children)) {
    return (
      <h1
        {...props}
        className={twMerge(
          "font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4",
          className,
        )}
      >
        {children}
      </h1>
    );
  }

  return children;
};
