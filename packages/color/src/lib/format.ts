import type { ColorFormat, ColorMode } from "../types";

const formatCss = <T extends ColorMode>(input: ColorFormat<T>): string => {
  const [mode, c, t, x] = input;

  return `${mode}(${c} ${t} ${x})`;
};

export { formatCss };
