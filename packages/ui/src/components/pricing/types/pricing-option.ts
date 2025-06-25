import { AnnualMonthlyPricing } from "./annual-monthly-pricing";
import { MonthlyPricing } from "./monthly-pricing";
import { FixedPricing } from "./fixed-pricing";

export type PricingOption =
  | FixedPricing
  | MonthlyPricing
  | AnnualMonthlyPricing;
