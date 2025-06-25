import type { Metadata } from "next";
// import "./globals.css";
import "../globals.css";
import "../../../styles.css";
import { getStrapiMedia, getStrapiURL } from "./utils/api-helpers";
import { fetchAPI } from "./utils/fetch-api";

import { HomeFooter, HomeHeader } from "../(home)/components";

const FALLBACK_SEO = {
  title: "Strapi Starter Next Blog",
  description: "Strapi Starter Next Blog",
};

async function getGlobal(): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "navbar.links",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
  };

  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getGlobal();

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const global = await getGlobal();
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { navbar, footer } = global.data.attributes;

  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data.attributes.url,
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data.attributes.url,
  );

  return (
    <html lang={params.lang} data-theme={"light"}>
      <body>
        <HomeHeader />
        {/*<Navbar*/}
        {/*  links={navbar.links}*/}
        {/*  logoUrl={navbarLogoUrl}*/}
        {/*  logoText={navbar.navbarLogo.logoText}*/}
        {/*/>*/}

        <main className="min-h-screen">{children}</main>

        <HomeFooter />
      </body>
    </html>
  );
}
