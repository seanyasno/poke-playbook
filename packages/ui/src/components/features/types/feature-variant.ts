export const FEATURE_VARIANTS = {
  icon: "icon",
  image: "image",
} as const;

export type FeatureVariant =
  (typeof FEATURE_VARIANTS)[keyof typeof FEATURE_VARIANTS];
