import {
  AnnualMonthlyPricing,
  FixedPricing,
  MonthlyPricing,
  PricingOption,
  PRICING_TYPES,
} from "../types";

export function isFixedPricing(
  pricing: PricingOption,
): pricing is FixedPricing {
  return pricing.pricingType === PRICING_TYPES.fixed;
}

export function isMonthlyPricing(
  pricing: PricingOption,
): pricing is MonthlyPricing {
  return pricing.pricingType === PRICING_TYPES.monthly;
}

export function isAnnualMonthlyPricing(
  pricing: PricingOption,
): pricing is AnnualMonthlyPricing {
  return pricing.pricingType === PRICING_TYPES.annualMonthly;
}
