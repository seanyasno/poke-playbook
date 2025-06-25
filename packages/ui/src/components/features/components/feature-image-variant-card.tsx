import React, { HTMLAttributes } from "react";
import { FeatureImageVariant } from "../types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type FeatureImageVariantCardProps = HTMLAttributes<HTMLDivElement> &
  FeatureImageVariant;

export const FeatureImageVariantCard = React.forwardRef<
  HTMLDivElement,
  FeatureImageVariantCardProps
>(({ src, title, description, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge("card card-compact bg-base-100 mx-auto", className)}
      {...props}
    >
      <figure className={"h-44"}>
        <Image width={400} height={400} src={src} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className={"text-base-content/80"}>{description}</p>
      </div>
    </div>
  );
});
