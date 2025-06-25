import React from "react";
import { HeroProps } from "../types";
import { HeroTitle } from "./hero-title";
import { HeroDescription } from "./hero-description";
import { HeroCta } from "./hero-cta";
import { isNotNullOrUndefined } from "@fastiship/libs";
import Image from "next/image";

export const DefaultHeroVariant: React.FC<Omit<HeroProps, "variant">> = ({
  title,
  description,
  cta,
  imageProps,
  slotsProps = {},
}) => {
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <HeroTitle {...slotsProps.title}>{title}</HeroTitle>

        <HeroDescription {...slotsProps.description}>
          {description}
        </HeroDescription>

        <HeroCta {...cta} />
      </div>

      {isNotNullOrUndefined(imageProps) && (
        <div className="lg:w-full">
          <Image style={{ borderRadius: "8px" }} {...imageProps} />
        </div>
      )}
    </section>
  );
};
