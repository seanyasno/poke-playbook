import React, { useState } from "react";
import { PricingItemProps } from "./components/pricing-item";
import {
  isNotEmptyString,
  isNotNullOrUndefined,
  raiseNotReachable,
} from "@fastiship/libs";
import { BILLING_OPTIONS, BillingOption } from "./types";
import { PricingProvider } from "./hooks/pricing-context";
import { SectionTitle } from "../section-title/section-title";

type PricingProps = {
  sectionTitle?: string;
  title: string;
  description?: string;
  defaultBillingOption?: BillingOption;
  children?:
    | React.ReactElement<PricingItemProps>
    | React.ReactElement<PricingItemProps>[];
};

export const Pricing = React.forwardRef<HTMLDivElement, PricingProps>(
  (
    { sectionTitle, title, description, defaultBillingOption, children },
    ref,
  ) => {
    const [currentBillingOption, setCurrentBillingOption] =
      useState(defaultBillingOption);

    const handleBillingOptionChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const { checked } = event.target;
      setCurrentBillingOption(
        checked ? BILLING_OPTIONS.annually : BILLING_OPTIONS.monthly,
      );
    };

    return (
      <PricingProvider billingOption={currentBillingOption}>
        <section ref={ref} className="bg-base-200 overflow-hidden" id="pricing">
          <div className="py-24 px-8 max-w-7xl mx-auto">
            <div className="flex flex-col text-center items-center w-full mb-14">
              {isNotEmptyString(sectionTitle) && (
                <SectionTitle>{sectionTitle}</SectionTitle>
              )}

              <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
                {title}
              </h2>

              {isNotEmptyString(description) && (
                <h3 className="tracking-tight text-xl mt-8">{description}</h3>
              )}
            </div>

            {isNotNullOrUndefined(currentBillingOption) && (
              <div className={"flex justify-center mb-20 gap-x-4"}>
                <p className={"capitalize text-base-content font-base"}>
                  {BILLING_OPTIONS.monthly}
                </p>

                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={getBillingOptionCheckedValue(currentBillingOption)}
                  onChange={handleBillingOptionChange}
                />

                <p className={"capitalize text-base-content font-base"}>
                  {BILLING_OPTIONS.annually}
                </p>
              </div>
            )}

            <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
              {children}
            </div>
          </div>
        </section>
      </PricingProvider>
    );
  },
);

function getBillingOptionCheckedValue(billingOption: BillingOption): boolean {
  switch (billingOption) {
    case BILLING_OPTIONS.monthly:
      return false;
    case BILLING_OPTIONS.annually:
      return true;
    default:
      return raiseNotReachable(billingOption);
  }
}
