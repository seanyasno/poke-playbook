import { FEATURE_VARIANTS } from "./feature-variant";

export type FeatureImageVariant = {
  variant: typeof FEATURE_VARIANTS.image;
  title: string;
  description: string;
  src: string;
};
