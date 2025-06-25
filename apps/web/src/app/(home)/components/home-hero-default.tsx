"use client";

import { Hero } from "@fastiship/ui";
import React from "react";
import { faker } from "@faker-js/faker";

export const HomeHeroDefault: React.FC = () => {
  faker.seed(6);

  return (
    <Hero
      title={faker.lorem.words(6)}
      description={faker.lorem.words(20)}
      slotsProps={{}}
      cta={{
        label: faker.lorem.words(2),
      }}
      imageProps={{
        src: faker.image.url(),
        alt: "image alt",
        className: "w-full h-full",
        height: 512,
        width: 512,
      }}
    />
  );
};
