import { PRICING_TYPES } from "./pricing-type";

export type MonthlyPricing = {
  price: number;
  priceAnchor?: number;
  pricingType: typeof PRICING_TYPES.monthly;
  recurringMethodLabel: string;
};
