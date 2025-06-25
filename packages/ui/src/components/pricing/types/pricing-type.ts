export const PRICING_TYPES = {
  fixed: "fixed",
  monthly: "monthly",
  annualMonthly: "annualMonthly",
} as const;

export type PricingType = (typeof PRICING_TYPES)[keyof typeof PRICING_TYPES];
