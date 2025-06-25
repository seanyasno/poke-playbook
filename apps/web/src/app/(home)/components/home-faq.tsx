"use client";

import React from "react";
import { faker } from "@faker-js/faker";
import { Faq } from "@fastiship/ui";

export const HomeFaq: React.FC = () => {
  faker.seed(6);

  return (
    <Faq
      items={[
        {
          title: faker.lorem.sentence(),
          children: <p>{faker.lorem.paragraph()}</p>,
        },
        {
          title: faker.lorem.sentence(),
          children: <p>{faker.lorem.paragraph()}</p>,
        },
        {
          title: faker.lorem.sentence(),
          children: <p>{faker.lorem.paragraph()}</p>,
        },
        {
          title: faker.lorem.sentence(),
          children: <p>{faker.lorem.paragraph()}</p>,
        },
      ]}
    >
      <h2>{faker.lorem.sentence()}</h2>
      <p>{faker.lorem.paragraph()}</p>
    </Faq>
  );
};
