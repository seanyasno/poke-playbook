import React, { HTMLAttributes } from "react";
import { isString } from "@fastiship/libs";
import { twMerge } from "tailwind-merge";

type FooterSectionProps = HTMLAttributes<HTMLElement> & {
  label: React.ReactNode;
  labelProps?: HTMLAttributes<HTMLDivElement>;
  containerProps?: HTMLAttributes<HTMLDivElement>;
};

export const FooterSection: React.FC<FooterSectionProps> = React.forwardRef<
  HTMLElement,
  FooterSectionProps
>(
  (
    { children, className, label, labelProps, containerProps, ...props },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={twMerge("flex md:flex-1 flex-col gap-y-2", className)}
        {...props}
      >
        {isString(label) ? (
          <div
            {...labelProps}
            className={twMerge(
              "footer-title font-semibold text-base-content tracking-widest text-sm",
              labelProps?.className,
            )}
          >
            {label}
          </div>
        ) : (
          label
        )}

        <div
          {...containerProps}
          className={twMerge(
            "flex flex-col justify-center items-center md:items-start gap-2 text-sm",
            containerProps?.className,
          )}
        >
          {children}
        </div>
      </section>
    );
  },
);
