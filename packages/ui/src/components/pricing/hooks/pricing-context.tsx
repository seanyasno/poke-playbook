import { BillingOption } from "../types";
import React, { createContext, PropsWithChildren } from "react";
import { isNullOrUndefined, raise } from "@fastiship/libs";

type PricingContextProps = {
  billingOption?: BillingOption;
};

export const PricingContext = createContext<PricingContextProps | undefined>(
  undefined,
);

export function usePricingContext() {
  const context = React.useContext(PricingContext);
  if (isNullOrUndefined(context)) {
    raise("usePricingContext must be used within a PricingProvider");
  }

  return context;
}

export const PricingProvider: React.FC<
  PropsWithChildren<PricingContextProps>
> = ({ children, billingOption }) => {
  return (
    <PricingContext.Provider value={{ billingOption }}>
      {children}
    </PricingContext.Provider>
  );
};
