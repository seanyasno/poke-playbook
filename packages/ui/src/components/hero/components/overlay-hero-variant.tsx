import React from "react";
import { HeroProps } from "../types";
import { HeroTitle } from "./hero-title";
import { HeroDescription } from "./hero-description";
import { HeroCta } from "./hero-cta";

export const OverlayHeroVariant: React.FC<Omit<HeroProps, "variant">> = ({
  title,
  description,
  cta,
  imageProps,
  slotsProps = {},
}) => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${imageProps.src})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="flex flex-col max-w-md gap-8 items-center">
          {/*<h1 className="mb-5 text-5xl font-bold">{title}</h1>*/}
          {/*<div className="flex">*/}
          <HeroTitle {...slotsProps.title}>{title}</HeroTitle>
          {/*</div>*/}
          {/*<div className="flex">*/}
          <HeroDescription {...slotsProps.description}>
            {description}
          </HeroDescription>
          {/*</div>*/}
          {/*<p className="mb-5">{description}</p>*/}
          {/*<button className="btn btn-primary">{cta?.label}</button>*/}
          <HeroCta {...cta} className={"max-w-xs w-full"} />
        </div>
      </div>
    </div>
  );
};
