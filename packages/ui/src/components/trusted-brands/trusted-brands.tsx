import React from "react";

type TrustedBrandsProps = {
  label: React.ReactNode;
  children: React.ReactNode[];
};

export const TrustedBrands: React.FC<TrustedBrandsProps> = ({
  children,
  label,
}) => {
  return (
    <section className={"justify-center text-center gap-6 flex flex-col p-8"}>
      <h2 className="font-bold text-3xl lg:text-2xl tracking-tight">{label}</h2>

      <div
        className={
          "justify-center grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2"
        }
      >
        {children.map((child) => (
          <div key={crypto.randomUUID()} className={"flex w-40 mx-auto"}>
            {child}
          </div>
        ))}
      </div>
    </section>
  );
};
