import type { ColorSpace, ColorMode, CssColor } from "@repo/color/types";

type Converter<T extends ColorMode> = [
  ColorSpace<T>,
  CssColor<T>,
  ColorSpace<"rgb">,
];

export type { ColorSpace, Converter };
