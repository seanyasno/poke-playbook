import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const SectionTitle = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={twMerge(
        "font-medium badge badge-outline badge-primary p-4 bg-primary/10 mb-8",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
});
