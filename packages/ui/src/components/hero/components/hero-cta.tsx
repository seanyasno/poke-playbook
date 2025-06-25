import { twMerge } from "tailwind-merge";
import { isNullOrUndefined } from "@fastiship/libs";
import React from "react";

export type HeroCtaProps = {
  className?: string;
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const HeroCta: React.FC<HeroCtaProps> = ({
  className,
  label,
  onClick,
}) => {
  if (isNullOrUndefined(label)) {
    return null;
  }

  return (
    <button
      className={twMerge("btn btn-primary shadow", className)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
