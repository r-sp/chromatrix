import type { ColorSpace } from "../types";
import { hsvToRgb, rgbToHsv } from "./hsv";
import { lrgbToRgb, rgbToLrgb } from "./lrgb";

const hsvToHwb = (input: ColorSpace<"hsv">): ColorSpace<"hwb"> => {
  const [, hue, s, v] = input;

  const w = (1 - s) * v;
  const b = 1 - v;

  return ["hwb", hue, w, b];
};

const hwbToHsv = (input: ColorSpace<"hwb">): ColorSpace<"hsv"> => {
  const [, h, w, b] = input;

  const v = 1 - b;
  let s: number;

  if (v === 0) {
    s = 0;
  } else {
    s = 1 - w / v;
  }

  return ["hsv", h, s, v];
};

const lrgbToHwb = (input: ColorSpace<"lrgb">): ColorSpace<"hwb"> => {
  const rgb = lrgbToRgb(input);
  const hsv = rgbToHsv(rgb);
  return hsvToHwb(hsv);
};

const hwbToLrgb = (input: ColorSpace<"hwb">): ColorSpace<"lrgb"> => {
  const hsv = hwbToHsv(input);
  const rgb = hsvToRgb(hsv);
  return rgbToLrgb(rgb);
};

export { hsvToHwb, hwbToHsv, lrgbToHwb, hwbToLrgb };
