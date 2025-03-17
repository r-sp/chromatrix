import type { ColorSpace } from "../types";
import { lrgbToOklab, oklabToLrgb } from "./oklab";

const oklabToOklch = (input: ColorSpace<"oklab">): ColorSpace<"oklch"> => {
  const [, l, a, b] = input;

  const x = a * a;
  const y = b * b;
  const c = Math.sqrt(x + y);

  const d = 180 / Math.PI;
  let h = Math.atan2(b, a) * d;

  if (h < 0) {
    h += 360;
  }

  return ["oklch", l, c, h];
};

const oklchToOklab = (input: ColorSpace<"oklch">): ColorSpace<"oklab"> => {
  const [, l, c, h] = input;

  const d = Math.PI / 180;
  const r = h * d;
  const a = c * Math.cos(r);
  const b = c * Math.sin(r);

  return ["oklab", l, a, b];
};

const lrgbToOklch = (input: ColorSpace<"lrgb">): ColorSpace<"oklch"> => {
  const oklab = lrgbToOklab(input);
  return oklabToOklch(oklab);
};

const oklchToLrgb = (input: ColorSpace<"oklch">): ColorSpace<"lrgb"> => {
  const oklab = oklchToOklab(input);
  return oklabToLrgb(oklab);
};

export { oklabToOklch, oklchToOklab, lrgbToOklch, oklchToLrgb };
