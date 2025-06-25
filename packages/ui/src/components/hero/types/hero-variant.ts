export const HERO_VARIANTS = {
  default: "default",
  overlay: "overlay",
} as const;

export type HeroVariant = (typeof HERO_VARIANTS)[keyof typeof HERO_VARIANTS];
