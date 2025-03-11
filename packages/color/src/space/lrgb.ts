import type { ColorSpace } from "../types";

const linearize = (c: number): number => {
  const abs = Math.abs(c);
  if (abs <= 0.04045) {
    return c / 12.92;
  }
  return (Math.sign(c) || 1) * Math.pow((abs + 0.055) / 1.055, 2.4);
};

const rgbToLrgb = (r: number, g: number, b: number): ColorSpace<"lrgb"> => {
  r = linearize(r);
  g = linearize(g);
  b = linearize(b);
  return [r, g, b] as ColorSpace<"lrgb">;
};

const delinearize = (c: number): number => {
  const abs = Math.abs(c);
  if (abs > 0.0031308) {
    return (Math.sign(c) || 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
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
