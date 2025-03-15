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
  | "xyz50";

type ColorSpace<T extends ColorKind> = [T, number, number, number];

type ColorMode = Exclude<ColorKind, "hsv" | "lrgb" | "xyz50">;

export type { ColorKind, ColorSpace, ColorMode };
