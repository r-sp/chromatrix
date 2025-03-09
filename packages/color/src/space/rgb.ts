import type { ColorSpace, CssColor } from "../types";

const rgbToHex = (
  r: number,
  g: number,
  b: number,
  denote: boolean = true,
): CssColor<"rgb"> => {
  let hex: string, s: number;
  s = 1 << 24;
  r = r << 16;
  g = g << 8;
  hex = (s | r | g | b).toString(16).slice(1);
  return denote ? (hex as CssColor<"rgb">) : (`#${hex}` as CssColor<"rgb">);
};

const hexToRgb = (input: string): ColorSpace<"rgb"> => {
  const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(input) as
    | [string, string, string, string]
    | null;
  if (!hex) return [0, 0, 0] as ColorSpace<"rgb">;
  const r = parseInt(hex[1], 16);
  const g = parseInt(hex[2], 16);
  const b = parseInt(hex[3], 16);
  return [r, g, b] as ColorSpace<"rgb">;
};

const rgbToCss = (r: number, g: number, b: number): CssColor<"rgb"> => {
  return `rgb(${r} ${g} ${b})` as CssColor<"rgb">;
};

export { rgbToHex, hexToRgb, rgbToCss };
