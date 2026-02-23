import { StyleTemplate } from "@/lib/types";

import artistic from "./artistic.json";
import illustration from "./illustration.json";
import design from "./design.json";
import practical from "./practical.json";
import theme from "./theme.json";

export const allStyles: StyleTemplate[] = [
  ...(artistic as StyleTemplate[]),
  ...(illustration as StyleTemplate[]),
  ...(design as StyleTemplate[]),
  ...(practical as StyleTemplate[]),
  ...(theme as StyleTemplate[]),
];
