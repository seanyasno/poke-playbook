import React from "react";
import {
  isNotEmptyArray,
  isNotEmptyString,
  isNotNullOrUndefined,
  raiseNotReachable,
} from "@fastiship/libs";
import {
  BILLING_OPTIONS,
  BillingOption,
  Plan,
  PricingOption,
  PRICING_TYPES,
} from "../types";
import { twMerge } from "tailwind-merge";
import { usePricingContext } from "../hooks/pricing-context";

export type PricingItemProps = {
  plan: Plan;
  actionLabel: string;
  actionDescription?: string;
  onActionClick?: (plan: Plan) => void;
  currencyFormatOptions?: Intl.NumberFormatOptions & { style: "currency" };
  featureIcon?: React.ReactElement;
};

export const PricingItem: React.FC<PricingItemProps> = ({
  plan,
  actionLabel,
  actionDescription,
  onActionClick,
  currencyFormatOptions,
  featureIcon,
}) => {
  const { billingOption } = usePricingContext();
  const { isFeatured, name, description, pricing, features } = plan;
  const pricingAnchor = getPriceAnchor(pricing, billingOption);
  const price = getPrice(pricing, billingOption);
  const priceLabel = getPriceLabel(pricing);

  const currencyFormatter = new Intl.NumberFormat(
    "en-US",
    currencyFormatOptions ?? {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    },
  );

  const handleClick = () => {
    onActionClick?.(plan);
  };

  return (
    <div className="relative w-full max-w-sm">
      <div
        className={twMerge(
          "flex flex-col h-full gap-5 lg:gap-8 bg-base-100 p-8 rounded-lg border",
          isFeatured && "border border-primary shadow-lg lg:scale-105",
        )}
      >
        <div className="gap-4">
          <p className="text-lg lg:text-xl font-bold">{name}</p>

          {isNotEmptyString(description) && (
            <p className="text-base-content/80 mt-2">{description}</p>
          )}
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-2">
            {isNotNullOrUndefined(pricingAnchor) && (
              <span className="text-lg my-auto text-base-content/80 line-through">
                {currencyFormatter.format(pricingAnchor)}
              </span>
            )}

            <div className={"flex items-baseline gap-x-2.5"}>
              <p className={`text-5xl tracking-tight font-extrabold`}>
                {currencyFormatter.format(price)}
              </p>

              {isNotEmptyString(priceLabel) && (
                <span className="text-base-content/80">{priceLabel}</span>
              )}
            </div>
          </div>

          <div className="divider my-6"></div>

          {isNotEmptyArray(features) && (
            <ul className="space-y-2 leading-relaxed text-base flex-1">
              {features.map((feature) => (
                <li
                  key={crypto.randomUUID()}
                  className="flex items-center gap-x-2"
                >
                  {isNotNullOrUndefined(featureIcon) ? (
                    featureIcon
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-[18px] h-[18px] opacity-80 shrink-0"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}

                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-2">
          <button
            className={twMerge(
              "btn btn-outline btn-primary w-full",
              isFeatured && "btn-primary btn-active",
            )}
            onClick={handleClick}
          >
            {actionLabel}
          </button>

          {isNotEmptyString(actionDescription) && (
            <p className="text-sm text-center text-base-content/60">
              {actionDescription}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

function getPriceAnchor(
  pricing: PricingOption,
  billingOptions?: BillingOption,
) {
  switch (pricing.pricingType) {
    case PRICING_TYPES.fixed:
      return pricing.priceAnchor;
    case PRICING_TYPES.monthly:
      return pricing.priceAnchor;
    case PRICING_TYPES.annualMonthly:
      return billingOptions === BILLING_OPTIONS.annually
        ? pricing.annual.priceAnchor
        : pricing.monthly.priceAnchor;
    default:
      return raiseNotReachable(pricing);
  }
}

function getPrice(pricing: PricingOption, billingOptions?: BillingOption) {
  switch (pricing.pricingType) {
    case PRICING_TYPES.fixed:
      return pricing.price;
    case PRICING_TYPES.monthly:
      return pricing.price;
    case PRICING_TYPES.annualMonthly:
      return billingOptions === BILLING_OPTIONS.annually
        ? pricing.annual.price
        : pricing.monthly.price;
    default:
      return raiseNotReachable(pricing);
  }
}

function getPriceLabel(pricing: PricingOption) {
  switch (pricing.pricingType) {
    case PRICING_TYPES.fixed:
      return undefined;
    case PRICING_TYPES.monthly:
    case PRICING_TYPES.annualMonthly:
      return pricing.recurringMethodLabel;
    default:
      return raiseNotReachable(pricing);
  }
}
