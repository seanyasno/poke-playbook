"use client";

import React from "react";
import { Integrations } from "@fastiship/ui";
import { faker } from "@faker-js/faker";
import {
  AmazonIcon,
  GithubIcon,
  GoogleDriveIcon,
  MetaIcon,
  OpenAiIcon,
  SlackIcon,
  WhatsappIcon,
  XIcon,
} from "@/icons";

export const HomeIntegrations: React.FC = () => {
  faker.seed(6);

  return (
    <Integrations
      title={"Quick Integrations"}
      description={faker.company.buzzPhrase()}
      cardTitle={"Effortless expert Saas integrations, just a snap away."}
      cardDescription={
        "Elevate efficiency with our SaaS platform's seamless integration feature. Connect tools effortlessly for a unified digital workspace."
      }
      cta={"Quick Connect"}
      cardIcons={[
        <AmazonIcon />,
        <SlackIcon />,
        <OpenAiIcon />,
        <MetaIcon />,
        <WhatsappIcon />,
        <XIcon />,
      ]}
      integrationsItems={[
        {
          title: "Slack",
          description:
            "Streamline project discussions, share updates, and boost real-time collaboration effortlessly.",
          icon: <SlackIcon />,
        },
        {
          title: "Google Drive",
          description:
            "File management, Enhance collaboration, and Elevate your productivity with the convenience of this integrated solution.",
          icon: <GoogleDriveIcon />,
        },
        {
          title: "Github",
          description:
            "Streamline version control, collaboration, and project management with ease. Embrace the power of seamless GitHub integration.",
          icon: <GithubIcon />,
        },
      ]}
    />
  );
};
