"use client";

import {
  AnnualMonthlyPricing,
  BILLING_OPTIONS,
  Pricing,
  PRICING_TYPES,
} from "@fastiship/ui";
import { PricingItem } from "@fastiship/ui/src/components/pricing/components/pricing-item";
import { faker } from "@faker-js/faker";

export const HomePricing: React.FC = () => {
  faker.seed(6);

  return (
    <Pricing
      sectionTitle={"Pricing"}
      title={faker.company.catchPhrase()}
      description={faker.company.buzzPhrase()}
      defaultBillingOption={BILLING_OPTIONS.annually}
    >
      <PricingItem
        plan={{
          name: faker.commerce.productName(),
          description: faker.company.buzzPhrase(),
          pricing: {
            pricingType: PRICING_TYPES.annualMonthly,
            annual: {
              price: 99,
              priceAnchor: 149,
            },
            monthly: {
              price: 149,
            },
            recurringMethodLabel: "per month",
          } satisfies AnnualMonthlyPricing,
          features: [
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
          ],
        }}
        actionLabel={faker.commerce.productAdjective()}
        onActionClick={(plan) => console.log(plan.name)}
        actionDescription={faker.company.catchPhrase()}
      />

      <PricingItem
        plan={{
          isFeatured: true,
          name: faker.commerce.productName(),
          description: faker.company.buzzPhrase(),
          pricing: {
            pricingType: PRICING_TYPES.annualMonthly,
            annual: {
              price: 149,
              priceAnchor: 179,
            },
            monthly: {
              price: 179,
            },
            recurringMethodLabel: "per month",
          } satisfies AnnualMonthlyPricing,
          features: [
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
          ],
        }}
        actionLabel={faker.commerce.productAdjective()}
        onActionClick={(plan) => console.log(plan.name)}
        actionDescription={faker.company.catchPhrase()}
      />

      <PricingItem
        plan={{
          name: faker.commerce.productName(),
          description: faker.company.buzzPhrase(),
          pricing: {
            pricingType: PRICING_TYPES.annualMonthly,
            annual: {
              price: 299,
              priceAnchor: 349,
            },
            monthly: {
              price: 349,
            },
            recurringMethodLabel: "per month",
          } satisfies AnnualMonthlyPricing,
          features: [
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
          ],
        }}
        actionLabel={faker.commerce.productAdjective()}
        onActionClick={(plan) => console.log(plan.name)}
        actionDescription={faker.company.catchPhrase()}
      />
    </Pricing>
  );
};
