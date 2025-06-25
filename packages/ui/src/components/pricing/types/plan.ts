import { PricingOption } from "./pricing-option";

export type Plan = {
  isFeatured?: boolean;
  name: string;
  description: string;
  pricing: PricingOption;
  features: string[];
};
