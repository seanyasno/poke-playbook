"use client";

import React from "react";
import {
  Feature,
  FEATURE_VARIANTS,
  FeatureImageVariant,
  Features,
} from "@fastiship/ui";
import { faker } from "@faker-js/faker";

export const HomeFeaturesImageVariant: React.FC = () => {
  faker.seed(6);

  const features: Feature[] = [
    {
      src: faker.image.url(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      variant: FEATURE_VARIANTS.image,
    },
    {
      src: faker.image.url(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      variant: FEATURE_VARIANTS.image,
    },
    {
      src: faker.image.url(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      variant: FEATURE_VARIANTS.image,
    },
    {
      src: faker.image.url(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      variant: FEATURE_VARIANTS.image,
    },
    {
      src: faker.image.url(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      variant: FEATURE_VARIANTS.image,
    },
    {
      src: faker.image.url(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      variant: FEATURE_VARIANTS.image,
    },
  ] satisfies FeatureImageVariant[];

  return (
    <Features
      title={faker.commerce.productName()}
      description={faker.commerce.productDescription()}
      features={features}
    />
  );
};
