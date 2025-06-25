"use client";

import { TrustedBrands } from "@fastiship/ui";
import {
  LargeMicrosoftIcon,
  LargeNetflixIcon,
  LargeSpotifyIcon,
  LargeGoogleIcon,
} from "@/icons";

export const HomeTrustedBrands: React.FC = () => {
  return (
    <TrustedBrands label={"Trusted by the world's most Popular Brands"}>
      <LargeGoogleIcon height={100} />
      <LargeMicrosoftIcon height={100} />
      <LargeSpotifyIcon height={100} />
      <LargeNetflixIcon height={100} />
    </TrustedBrands>
  );
};
