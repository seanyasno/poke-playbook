import React from "react";
import { TeamMember } from "./types";
import { SectionTitle } from "../section-title/section-title";
import { isNotEmptyString } from "@fastiship/libs";

type OurTeamProps = {
  teamMembers: TeamMember[];
  sectionTitle?: string;
  title: string;
  description?: string;
};

export const OurTeam: React.FC<OurTeamProps> = ({
  teamMembers,
  sectionTitle,
  title,
  description,
}) => {
  return (
    <section className={"bg-base-200"}>
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col items-center">
        {isNotEmptyString(sectionTitle) && (
          <SectionTitle>{sectionTitle}</SectionTitle>
        )}

        <h2 className="font-bold text-3xl lg:text-5xl tracking-tight">
          {title}
        </h2>

        {isNotEmptyString(description) && (
          <h3 className="tracking-tight text-xl mt-8">{description}</h3>
        )}

        <ul className="grid max-w-xs mt-12 md:max-w-2xl lg:max-w-5xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(({ name, src, role }) => (
            <li
              key={crypto.randomUUID()}
              className="p-5 avatar bg-base-100 flex flex-col gap-y-1 items-center rounded-xl aspect-square justify-center"
            >
              <div className="w-28 rounded-full">
                <img src={src} />
              </div>

              <h3 className={"text-md font-semibold mt-4"}>{name}</h3>
              <p className={"text-sm text-base-content/50"}>{role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
