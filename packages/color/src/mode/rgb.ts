import type { ColorSpace } from "../types";

const rgbToHex = (input: ColorSpace<"rgb">) => {
  return ((1 << 24) | (input[0] << 16) | (input[1] << 8) | input[2]).toString(16).slice(1);
};

const hexToRgb = (input: string): ColorSpace<"rgb"> => {
  const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(input) as [string, string, string, string] | null;

  if (!hex) {
    return [0, 0, 0] as ColorSpace<"rgb">;
  }

  const r = Number.parseInt(hex[1], 16);
  const g = Number.parseInt(hex[2], 16);
  const b = Number.parseInt(hex[3], 16);

  return [r, g, b] as ColorSpace<"rgb">;
};

export { rgbToHex, hexToRgb };
