export const BILLING_OPTIONS = {
  monthly: "monthly",
  annually: "annually",
} as const;

export type BillingOption =
  (typeof BILLING_OPTIONS)[keyof typeof BILLING_OPTIONS];
