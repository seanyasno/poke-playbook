import React from "react";

type IntegrationItemProps = {
  name: string;
  description: string;
  children: React.ReactElement;
};

export const IntegrationItem: React.FC<IntegrationItemProps> = ({
  children,
  name,
  description,
}) => {
  return (
    <div className={"rounded-lg border h-full p-4"}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className="bg-base-200 rounded-full w-16 h-16 p-2.5 flex items-center justify-center">
            {children}
          </div>
          <h4 className={"text-lg font-medium"}>{name}</h4>
        </div>

        <button className="btn shadow-none btn-circle bg-base-200 p-1.5 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-right"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
      <p className={"mt-3 text-sm text-base-content/70 font-medium"}>
        {description}
      </p>
    </div>
  );
};
