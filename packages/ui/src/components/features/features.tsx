import React from "react";
import { Feature } from "./types";
import { isNotEmptyString, raiseNotReachable } from "@fastiship/libs";
import { FEATURE_VARIANTS } from "./types";
import { FeatureIconVariantCard } from "./components/feature-icon-variant-card";
import { FeatureImageVariantCard } from "./components/feature-image-variant-card";
import { SectionTitle } from "../section-title/section-title";

type FeaturesProps<FeatureType extends Feature> = {
  sectionTitle?: React.ReactNode;
  title: string;
  description?: string;
  features: FeatureType[];
};

export function Features<FeatureType extends Feature>({
  sectionTitle = "Features",
  title,
  description,
  features,
}: FeaturesProps<FeatureType>) {
  return (
    <section className="py-24 px-8 bg-base-200">
      <div className="flex flex-col text-center items-center w-full mb-14">
        <SectionTitle>{sectionTitle}</SectionTitle>

        <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
          {title}
        </h2>

        {isNotEmptyString(description) && (
          <p className="text-base-content mt-4">{description}</p>
        )}
      </div>

      <div className="grid max-w-xs md:max-w-2xl lg:max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(getFeature)}
      </div>
    </section>
  );
}

function getFeature(feature: Feature) {
  switch (feature.variant) {
    case FEATURE_VARIANTS.image:
      return <FeatureImageVariantCard key={crypto.randomUUID()} {...feature} />;
    case FEATURE_VARIANTS.icon:
      return <FeatureIconVariantCard key={crypto.randomUUID()} {...feature} />;
    default:
      return raiseNotReachable(feature);
  }
}
