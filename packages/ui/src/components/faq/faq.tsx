import { FaqItem } from "./components/faq-item";
import { FaqListItem } from "./types";
import React, { PropsWithChildren } from "react";
import { isNotEmptyString, NotEmptyArray } from "@fastiship/libs";
import { SectionTitle } from "../section-title/section-title";
import { Accordion } from "react-daisyui";

export type FaqProps = React.HTMLAttributes<HTMLElement> &
  PropsWithChildren<{
    sectionTitle?: string;
    title?: string;
    items: NotEmptyArray<FaqListItem>;
    itemProps?: React.ComponentProps<typeof Accordion>;
  }>;

export const Faq: React.FC<FaqProps> = ({
  sectionTitle = "FAQ",
  title = "Frequently Asked Questions",
  items,
  itemProps,
  children,
  ...props
}) => {
  return (
    <section id="faq" className={"p-20"} {...props}>
      {isNotEmptyString(sectionTitle) && (
        <div className={"w-full justify-center flex"}>
          <SectionTitle>{sectionTitle}</SectionTitle>
        </div>
      )}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content mb-2">
            {title}
          </p>

          {children}
        </div>

        <ul className="basis-1/2 gap-y-2 flex-wrap flex divide-y">
          {items.map((item) => (
            <li key={crypto.randomUUID()} className={"w-full"}>
              <FaqItem {...item} {...itemProps} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
