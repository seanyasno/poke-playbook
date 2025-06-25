import React, { PropsWithChildren } from "react";

export const IntegrationIcon: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-base-100 shadow-md flex items-center justify-center text-center mx-auto p-5 rounded-full">
      {children}
    </div>
  );
};
