import type { ColorSpace, Converter } from "@repo/color/types";
import { extract, isolate, nearest, multiply } from "@repo/color/utils";
import { rgbToHsv, hsvToRgb } from "@repo/color/hsv";
import { hsvToHsl, hslToHsv, hslToCss } from "@repo/color/hsl";

const convertHsl = (input: ColorSpace<"rgb">) => {
  console.time("convert-hsl");

  const hsv = extract(input, rgbToHsv);
  const hsl = extract(hsv, hsvToHsl);
  const gamut = multiply(hsl, [0, 100, 100]);
  const color = nearest(gamut, 3);
  const css = isolate(color, hslToCss);

  const hsl_hsv = extract(hsl, hslToHsv);
  const hsv_rgb = extract(hsl_hsv, hsvToRgb);

  console.timeLog("convert-hsl", [gamut, css, hsv_rgb]);
  return [gamut, css, hsv_rgb] as Converter<"hsl">;
};

export default convertHsl;
