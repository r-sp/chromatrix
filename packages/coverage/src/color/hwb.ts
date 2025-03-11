import type { ColorSpace, Converter } from "../types";
import { extract, isolate, nearest, multiply } from "@repo/color/utils";
import { rgbToHsv, hsvToRgb } from "@repo/color/fn";
import { hsvToHwb, hwbToHsv, hwbToCss } from "@repo/color/fn";

const convertHwb = (input: ColorSpace<"rgb">) => {
  const hsv = extract(input, rgbToHsv);
  const hwb = extract(hsv, hsvToHwb);
  const gamut = multiply(hwb, [0, 100, 100]);
  const color = nearest(gamut, 3);
  const css = isolate(color, hwbToCss);

  const hwb_hsv = extract(hwb, hwbToHsv);
  const hsv_rgb = extract(hwb_hsv, hsvToRgb);

  return [gamut, css, hsv_rgb] as Converter<"hwb">;
};

export default convertHwb;
