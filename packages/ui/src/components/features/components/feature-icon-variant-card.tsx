import React, { HTMLAttributes } from "react";
import { FeatureIconVariant } from "../types";
import { twMerge } from "tailwind-merge";

type FeatureIconVariantCardProps = HTMLAttributes<HTMLDivElement> &
  FeatureIconVariant;

export const FeatureIconVariantCard = React.forwardRef<
  HTMLDivElement,
  FeatureIconVariantCardProps
>(({ title, description, icon, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "card card-compact bg-base-100 mx-auto border",
        className,
      )}
      {...props}
    >
      <figure className={"mr-auto pl-4 pt-4"}>{icon}</figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className={"text-base-content/80"}>{description}</p>
      </div>
    </div>
  );
});
