"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

export const NextThemProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
