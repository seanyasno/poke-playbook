import React from "react";
import { KeyMetric } from "./types";

type KeyMetricsProps = {
  keyMetrics: KeyMetric[];
};

export const KeyMetrics: React.FC<KeyMetricsProps> = ({ keyMetrics }) => {
  return (
    <section>
      <ul
        className={
          "grid grid-cols-2 gap-y-8 gap-x-0 sm:gap-8 md:grid-cols-4 mx-auto max-w-5xl py-24"
        }
      >
        {keyMetrics.map(({ title, description, icon }) => (
          <li
            key={crypto.randomUUID()}
            className={"flex flex-col items-center gap-y-1"}
          >
            <figure
              className={
                "bg-primary-content text-primary p-3 aspect-square items-center justify-center flex rounded-md mb-4"
              }
            >
              {icon}
            </figure>
            <h3 className={"text-3xl font-bold"}>{title}</h3>
            <p className={"text-sm text-base-content/70"}>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
