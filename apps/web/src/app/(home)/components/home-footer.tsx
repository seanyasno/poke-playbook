import React from "react";
import { Footer, FooterSection } from "@fastiship/ui";
import Link from "next/link";

export const HomeFooter: React.FC = () => {
  return (
    <Footer>
      <FooterSection
        label={
          <Link
            href="/#"
            aria-current="page"
            className="mb-2 font-extrabold text-primary"
          >
            Some name here
          </Link>
        }
      >
        <p className="text-sm text-base-content/80">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum deleniti
          fugiat molestias nam sapiente.
        </p>

        <p className="text-sm text-base-content/60">
          Copyright © {new Date().getFullYear()} - All rights reserved
        </p>
      </FooterSection>

      <FooterSection label={"LINKS"}>
        <Link href="/#pricing" className="link link-hover">
          Pricing
        </Link>
        <Link href="/blogs" className="link link-hover">
          Blog
        </Link>
        <Link href="/#" target="_blank" className="link link-hover">
          Affiliates
        </Link>
      </FooterSection>

      <FooterSection label={"LEGAL"}>
        <Link href="/tos" className="link link-hover">
          Terms of services
        </Link>
        <Link href="/privacy-policy" className="link link-hover">
          Privacy policy
        </Link>
      </FooterSection>
    </Footer>
  );
};
