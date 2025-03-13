import type { ColorSpace } from "../types";

const clamp = (value: number): number => {
  return value > 1 ? 1 : value < 0 ? 0 : value;
};

const linearize = (c: number): number => {
  const abs = Math.abs(c);
  if (abs <= 0.04045) {
    return c / 12.92;
  }
  return (Math.sign(c) || 1) * Math.pow((abs + 0.055) / 1.055, 2.4);
};

const delinearize = (c: number): number => {
  const abs = Math.abs(c);
  if (abs > 0.0031308) {
    return (Math.sign(c) || 1) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055);
  }
  return clamp(c * 12.92);
};

const rgbToLrgb = (input: ColorSpace<"rgb">) => {
  let [r, g, b] = input;
  r = linearize(r);
  g = linearize(g);
  b = linearize(b);
  return [r, g, b] as ColorSpace<"lrgb">;
};

const lrgbToRgb = (input: ColorSpace<"lrgb">) => {
  let [r, g, b] = input;
  r = delinearize(r);
  g = delinearize(g);
  b = delinearize(b);
  return [r, g, b] as ColorSpace<"rgb">;
};

export { rgbToLrgb, lrgbToRgb };
