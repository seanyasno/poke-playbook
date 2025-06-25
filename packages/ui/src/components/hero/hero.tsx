"use client";

import { raiseNotReachable } from "@fastiship/libs";
import React from "react";
import { HERO_VARIANTS } from "./types";
import { HeroProps } from "./types";
import { DefaultHeroVariant } from "./components/default-hero-variant";
import { OverlayHeroVariant } from "./components/overlay-hero-variant";

export const Hero: React.FC<HeroProps> = ({
  variant = HERO_VARIANTS.default,
  ...restProps
}) => {
  const props = { variant, ...restProps };

  return getHero(props);
};

function getHero(props: HeroProps) {
  const { variant: _variant, ...restProps } = props;

  switch (props.variant) {
    case undefined:
    case HERO_VARIANTS.default:
      return <DefaultHeroVariant {...restProps} />;
    case HERO_VARIANTS.overlay:
      return <OverlayHeroVariant {...restProps} />;
    default:
      return raiseNotReachable(props.variant);
  }
}
