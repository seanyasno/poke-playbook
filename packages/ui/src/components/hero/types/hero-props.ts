import React from "react";
import { HeroTitleProps } from "../components/hero-title";
import { HeroDescription } from "../components/hero-description";
import { HeroCtaProps } from "../components/hero-cta";
import Image from "next/image";
import { HeroVariant } from "./hero-variant";

export type HeroProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  slotsProps?: {
    title?: HeroTitleProps;
    description?: Omit<
      React.ComponentProps<typeof HeroDescription>,
      "children"
    >;
  };
  cta?: HeroCtaProps;
  imageProps: React.ComponentProps<typeof Image>;
  variant?: HeroVariant;
};
