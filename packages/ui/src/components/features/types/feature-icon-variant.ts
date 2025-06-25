import { FEATURE_VARIANTS } from "./feature-variant";

export type FeatureIconVariant = {
  variant: typeof FEATURE_VARIANTS.icon;
  title: string;
  description: string;
  icon: React.ReactNode;
};
