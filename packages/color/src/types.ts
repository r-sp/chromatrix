type ColorKind =
  | "rgb"
  | "hsl"
  | "hsv"
  | "hwb"
  | "lab"
  | "lch"
  | "lrgb"
  | "oklab"
  | "oklch"
  | "xyz50"
  | "xyz65";

type ColorSpace<T extends ColorKind> = [T, number, number, number];

type ColorMode = Exclude<ColorKind, "hsv" | "lrgb" | "xyz50" | "xyz65">;

export type { ColorKind, ColorSpace, ColorMode };
