import type { ColorSpace } from "../types";
import { hsvToRgb, rgbToHsv } from "./hsv";
import { lrgbToRgb, rgbToLrgb } from "./lrgb";

const hsvToHsl = (input: ColorSpace<"hsv">): ColorSpace<"hsl"> => {
  const [, h, s, v] = input;

  const l = v * (1 - s / 2);
  let sl: number;

  if (l > 0 && l < 1) {
    sl = (v - l) / Math.min(l, 1 - l);
  } else {
    sl = 0;
  }

  return ["hsl", h, sl, l];
};

const hslToHsv = (input: ColorSpace<"hsl">): ColorSpace<"hsv"> => {
  const [, h, s, l] = input;

  const v = l + s * Math.min(l, 1 - l);

  const sv = v === 0 ? 0 : 2 * (1 - l / v);

  return ["hsv", h, sv, v];
};

const lrgbToHsl = (input: ColorSpace<"lrgb">): ColorSpace<"hsl"> => {
  const rgb = lrgbToRgb(input);
  const hsv = rgbToHsv(rgb);
  return hsvToHsl(hsv);
};

const hslToLrgb = (input: ColorSpace<"hsl">): ColorSpace<"lrgb"> => {
  const hsv = hslToHsv(input);
  const rgb = hsvToRgb(hsv);
  return rgbToLrgb(rgb);
};

export { hsvToHsl, hslToHsv, lrgbToHsl, hslToLrgb };
