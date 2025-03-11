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

type ColorSpace<T extends ColorKind> = [number, number, number] & {
  readonly mode: T;
};

type ColorMode = Exclude<ColorKind, "hsv" | "lrgb" | "xyz50">;

type CssColor<T extends ColorKind> = string & {
  readonly mode: T;
};

export type { ColorKind, ColorSpace, ColorMode, CssColor };
