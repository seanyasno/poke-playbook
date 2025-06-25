"use client";

import React from "react";
import { OurTeam, TeamMember } from "@fastiship/ui";
import { faker } from "@faker-js/faker";

export const HomeOurTeam: React.FC = () => {
  faker.seed(6);

  const teamMembers: TeamMember[] = [
    {
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      src: faker.image.avatarLegacy(),
    },
    {
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      src: faker.image.avatarLegacy(),
    },
    {
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      src: faker.image.avatarLegacy(),
    },
    {
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      src: faker.image.avatarLegacy(),
    },
    {
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      src: faker.image.avatarLegacy(),
    },
    {
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      src: faker.image.avatarLegacy(),
    },
  ];

  return (
    <OurTeam
      teamMembers={teamMembers}
      sectionTitle={"Team"}
      title={"Meet Our Team"}
      description={"We are a team of professionals"}
    />
  );
};
