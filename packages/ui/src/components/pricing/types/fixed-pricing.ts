import { PRICING_TYPES } from "./pricing-type";

export type FixedPricing = {
  price: number;
  priceAnchor?: number;
  pricingType: typeof PRICING_TYPES.fixed;
};
