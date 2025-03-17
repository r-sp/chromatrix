import type { ColorSpace } from "../types";

const rgbToHex = (input: ColorSpace<"rgb">) => {
  const [, r, g, b] = input;
  return ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
};

const hexToRgb = (input: string): ColorSpace<"rgb"> => {
  const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(input) as
    | [string, string, string, string]
    | null;

  if (!hex) {
    return ["rgb", 0, 0, 0];
  }

  const r = Number.parseInt(hex[1], 16);
  const g = Number.parseInt(hex[2], 16);
  const b = Number.parseInt(hex[3], 16);

  return ["rgb", r, g, b];
};

export { rgbToHex, hexToRgb };
