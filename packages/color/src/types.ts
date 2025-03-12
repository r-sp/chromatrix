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

type ColorFormat<T extends ColorMode> = [T, number, number, number] & {
  readonly mode: T;
};

type CssColor<T extends ColorKind> = string & {
  readonly mode: T;
};

interface CssDecimal {
  rgb: "default";
  hsl: "degree" | "percent" | "percent-degree";
  hwb: "degree" | "percent" | "percent-degree";
  lab: "percent";
  lch: "degree" | "percent" | "percent-degree";
  oklab: "percent";
  oklch: "degree" | "percent" | "percent-degree";
}

type CssConfig<T extends ColorMode> = CssDecimal[T];

export type {
  ColorKind,
  ColorSpace,
  ColorMode,
  ColorFormat,
  CssColor,
  CssConfig,
};
