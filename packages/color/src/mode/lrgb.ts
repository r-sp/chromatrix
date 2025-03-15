import type { ColorSpace } from "../types";

const clamp = (value: number): number => {
  return value > 1 ? 1 : value < 0 ? 0 : value;
};

const linearize = (c: number): number => {
  const abs = Math.abs(c);
  if (abs <= 0.04045) {
    return c / 12.92;
  }
  return (Math.sign(c) || 1) * ((abs + 0.055) / 1.055) ** 2.4;
};

const delinearize = (c: number): number => {
  const abs = Math.abs(c);
  if (abs > 0.0031308) {
    return (Math.sign(c) || 1) * (1.055 * abs ** (1 / 2.4) - 0.055);
  }
  return clamp(c * 12.92);
};

const rgbToLrgb = (input: ColorSpace<"rgb">) => {
  const [, r, g, b] = input;

  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);

  return ["lrgb", lr, lg, lb] as ColorSpace<"lrgb">;
};

const lrgbToRgb = (input: ColorSpace<"lrgb">) => {
  const [, lr, lg, lb] = input;

  const r = delinearize(lr);
  const g = delinearize(lg);
  const b = delinearize(lb);

  return ["rgb", r, g, b] as ColorSpace<"rgb">;
};

export { rgbToLrgb, lrgbToRgb };
