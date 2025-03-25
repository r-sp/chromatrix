import type { ColorFormat } from "../types";
import { int } from "../utils";

const rgbToHex = (input: ColorFormat<"rgb">, denote = false): string => {
  const hex = ((1 << 24) | (input[1] << 16) | (input[2] << 8) | input[3]).toString(16).slice(1);
  return denote ? hex : `#${hex}`;
};

const hexToRgb = (input: string): ColorFormat<"rgb"> => {
  const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(input) as
    | [string, string, string, string]
    | null;

  if (!hex) {
    return ["rgb", 0, 0, 0] as ColorFormat<"rgb">;
  }

  const r = int(hex[1], 16);
  const g = int(hex[2], 16);
  const b = int(hex[3], 16);

  return ["rgb", r, g, b] as ColorFormat<"rgb">;
};

export { rgbToHex, hexToRgb };
