import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "fastiship/fastiship-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "fastiship/get-hello",
          label: "getHello",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "fastiship/create-user",
          label: "createUser",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
