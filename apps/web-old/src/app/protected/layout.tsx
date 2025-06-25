import { getServerSession } from "next-auth/next";
import React from "react";
import { authOptions } from "../../config/auth-options";

interface ProtectedLayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return (
      <html lang="en" data-theme={"light"}>
        <body>
          <div>This is protected and you do not have access to it.</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" data-theme={"light"}>
      <body>{children}</body>
    </html>
  );
};

export default ProtectedLayout;
