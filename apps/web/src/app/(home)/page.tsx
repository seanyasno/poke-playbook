import React from "react";
import {
  HomeFeaturesImageVariant,
  HomeFooter,
  HomeHeader,
  HomeHeroDefault,
  HomePricing,
  HomeOurTeam,
  HomeKeyMetrics,
  HomeIntegrations,
  HomeTrustedBrands,
} from "./components";
import { HomeFaq } from "./components/home-faq";

export default function Page(): React.ReactElement {
  return (
    <>
      <HomeHeader />

      <main>
        <HomeHeroDefault />
        <HomeIntegrations />
        <HomeTrustedBrands />
        <HomeFeaturesImageVariant />
        <HomeKeyMetrics />
        <HomePricing />
        <HomeFaq />
        <HomeOurTeam />
      </main>

      <HomeFooter />
    </>
  );
}
