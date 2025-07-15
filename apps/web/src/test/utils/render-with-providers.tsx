import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { AllTheProviders } from "./providers";

export const renderWithProviders = (
  ui: ReactElement,
  options?: RenderOptions,
) => {
  return {
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};
