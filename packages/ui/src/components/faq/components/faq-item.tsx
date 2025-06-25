"use client";

import { PropsWithChildren } from "react";
import { Accordion } from "react-daisyui";
import React from "react";

export type FaqItemProps = React.ComponentProps<typeof Accordion> &
  PropsWithChildren<{
    title: string;
  }>;

export const FaqItem: React.FC<FaqItemProps> = ({
  children,
  title,
  ...props
}) => {
  return (
    <Accordion icon={"arrow"} {...props}>
      <Accordion.Title className={"font-semibold"}>{title}</Accordion.Title>
      <Accordion.Content {...props}>{children}</Accordion.Content>
    </Accordion>
  );
};
