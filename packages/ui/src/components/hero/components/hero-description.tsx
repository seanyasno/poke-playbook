import { isNullOrUndefined, isString } from "@fastiship/libs";
import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type HeroDescriptionProps = PropsWithChildren<{
  className?: string;
}>;

export const HeroDescription: React.FC<HeroDescriptionProps> = ({
  children,
  className,
}) => {
  if (isNullOrUndefined(children)) {
    return null;
  }

  if (isString(children)) {
    return <p className={twMerge("text-lg base-100", className)}>{children}</p>;
  }

  return children;
};
