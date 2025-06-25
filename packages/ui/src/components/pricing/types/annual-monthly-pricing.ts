import { FixedPricing } from "./fixed-pricing";
import { PRICING_TYPES } from "./pricing-type";

export type AnnualMonthlyPricing = {
  monthly: Omit<FixedPricing, "pricingType">;
  annual: Omit<FixedPricing, "pricingType">;
  recurringMethodLabel: string;
  pricingType: typeof PRICING_TYPES.annualMonthly;
};
