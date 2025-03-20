import type { ColorFn, ColorSpace } from "../types";

const linearize = (c: number): number => {
  const abs = Math.abs(c);
  return abs < 0.04045 ? c / 12.92 : (Math.sign(c) || 1) * ((abs + 0.055) / 1.055) ** 2.4;
};

const delinearize = (c: number): number => {
  const abs = Math.abs(c);
  return abs > 0.0031308 ? (Math.sign(c) || 1) * (1.055 * abs ** (1 / 2.4) - 0.055) : c * 12.92;
};

const rgbToLrgb: ColorFn<"rgb", "lrgb"> = (input) => {
  const [r, g, b] = input;

  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);

  return [lr, lg, lb] as ColorSpace<"lrgb">;
};

const lrgbToRgb: ColorFn<"lrgb", "rgb"> = (input) => {
  const [lr, lg, lb] = input;

  const r = delinearize(lr);
  const g = delinearize(lg);
  const b = delinearize(lb);

  return [r, g, b] as ColorSpace<"rgb">;
};

export { rgbToLrgb, lrgbToRgb };
