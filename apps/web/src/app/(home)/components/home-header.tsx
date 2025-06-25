import { Header } from "@fastiship/ui";
import React from "react";

export const HomeHeader: React.FC = () => {
  return (
    <Header
      label={<a className="btn btn-ghost text-xl">Fastiship</a>}
      action={{
        label: "Action",
      }}
    >
      <a>Item 1</a>
      <details>
        <summary>Parent</summary>
        <ul className="p-2">
          <li>
            <a>Submenu 1</a>
          </li>
          <li>
            <a>Submenu 2</a>
          </li>
        </ul>
      </details>
      <a>Item 3</a>
    </Header>
  );
};
