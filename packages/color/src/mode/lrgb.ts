import type { ColorSpace } from "../types";

const linearize = (c: number): number => {
  const abs = Math.abs(c);
  return abs < 0.04045 ? c / 12.92 : (Math.sign(c) || 1) * ((abs + 0.055) / 1.055) ** 2.4;
};

const delinearize = (c: number): number => {
  const abs = Math.abs(c);
  return abs > 0.0031308 ? (Math.sign(c) || 1) * (1.055 * abs ** (1 / 2.4) - 0.055) : c * 12.92;
};

const rgbToLrgb = (input: ColorSpace<"rgb">): ColorSpace<"lrgb"> => {
  const [, r, g, b] = input;

  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);

  return ["lrgb", lr, lg, lb];
};

const lrgbToRgb = (input: ColorSpace<"lrgb">): ColorSpace<"rgb"> => {
  const [, lr, lg, lb] = input;

  const r = delinearize(lr);
  const g = delinearize(lg);
  const b = delinearize(lb);

  return ["rgb", r, g, b];
};

export { rgbToLrgb, lrgbToRgb };
