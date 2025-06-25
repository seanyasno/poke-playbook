import React from "react";
import { isNotEmptyString, isString } from "@fastiship/libs";
import { SectionTitle } from "../section-title/section-title";
import { IntegrationItem } from "./components/integration-item";
import { IntegrationIcon } from "./components/integration-icon";

type IntegrationsProps = {
  sectionTitle?: string;
  title: string;
  description?: string;
  cardTitle: string;
  cardDescription: string;
  cta: React.ReactNode;
  cardIcons: React.ReactElement[];
  integrationsItems: {
    title: string;
    description: string;
    icon: React.ReactElement;
  }[];
};

export const Integrations: React.FC<IntegrationsProps> = ({
  sectionTitle = "Integrations",
  title,
  description,
  cardTitle,
  cardDescription,
  cta,
  cardIcons,
  integrationsItems,
}) => {
  return (
    <section className={"p-10"}>
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

      <div className={"flex flex-col mx-auto max-w-5xl gap-y-6"}>
        <div className="grid grid-cols-1 md:grid-cols-2 bg-base-200 p-10 md:p-20 gap-12 rounded-lg">
          <div className="flex flex-col justify-between">
            <div className={"flex flex-col gap-y-4"}>
              <h3 className={"text-2xl font-semibold"}>{cardTitle}</h3>
              <p className={"text-base-content/80"}>{cardDescription}</p>
            </div>

            <div>
              {isString(cta) ? (
                <button className="btn btn-primary mt-4">{cta}</button>
              ) : (
                cta
              )}
            </div>
          </div>

          <ul className="grid grid-cols-3 md:grid-cols-3 gap-8 lg:gap-12 justify-center">
            {cardIcons.map((cardIcon) => (
              <li key={crypto.randomUUID()}>
                <IntegrationIcon>{cardIcon}</IntegrationIcon>
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrationsItems.map(({ title, description, icon }) => (
            <li key={crypto.randomUUID()}>
              <IntegrationItem name={title} description={description}>
                {icon}
              </IntegrationItem>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
