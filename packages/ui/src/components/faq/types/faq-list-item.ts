import { FaqItemProps } from "../components/faq-item";

export type FaqListItem = Pick<FaqItemProps, "title" | "children">;
