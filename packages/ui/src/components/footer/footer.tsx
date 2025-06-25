import React, { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Footer: React.FC<HTMLAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  HTMLAttributes<HTMLElement>
>(({ children, className, ...props }, ref) => {
  return (
    <footer
      ref={ref}
      className={twMerge(
        "bg-base-200 border-t mx-auto px-16 md:px-28 py-12 md:py-24 flex flex-col md:flex-row gap-x-32 gap-y-10 text-center md:text-left",
        className,
      )}
      {...props}
    >
      {children}
    </footer>
  );
});
