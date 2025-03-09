import type { ColorSpace } from "../types";
import { absolute, signature, power } from "../utils";

const linearize = (c: number): number => {
  const abs = absolute(c);
  if (abs <= 0.04045) {
    return c / 12.92;
  }
  return (signature(c) || 1) * power((abs + 0.055) / 1.055, 2.4);
};

const rgbToLrgb = (r: number, g: number, b: number): ColorSpace<"lrgb"> => {
  r = linearize(r);
  g = linearize(g);
  b = linearize(b);
  return [r, g, b] as ColorSpace<"lrgb">;
};

const delinearize = (c: number): number => {
  const abs = absolute(c);
  if (abs > 0.0031308) {
    return (signature(c) || 1) * (1.055 * power(abs, 1 / 2.4) - 0.055);
  }
  return c * 12.92;
};

const lrgbToRgb = (r: number, g: number, b: number): ColorSpace<"rgb"> => {
  r = delinearize(r);
  g = delinearize(g);
  b = delinearize(b);
  return [r, g, b] as ColorSpace<"rgb">;
};

export { rgbToLrgb, lrgbToRgb };
