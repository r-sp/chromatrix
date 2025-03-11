import type { ColorSpace, Converter } from "../types";
import { extract, isolate, nearest, multiply } from "@repo/color/utils";
import { rgbToHsv, hsvToRgb } from "@repo/color/fn";
import { hsvToHsl, hslToHsv, hslToCss } from "@repo/color/fn";

const convertHsl = (input: ColorSpace<"rgb">) => {
  const hsv = extract(input, rgbToHsv);
  const hsl = extract(hsv, hsvToHsl);
  const gamut = multiply(hsl, [0, 100, 100]);
  const color = nearest(gamut, 3);
  const css = isolate(color, hslToCss);

  const hsl_hsv = extract(hsl, hslToHsv);
  const hsv_rgb = extract(hsl_hsv, hsvToRgb);

  return [gamut, css, hsv_rgb] as Converter<"hsl">;
};

export default convertHsl;
