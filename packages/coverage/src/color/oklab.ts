import type { ColorSpace, Converter } from "../types";
import { extract, isolate, nearest } from "@repo/color/utils";
import { rgbToLrgb, lrgbToRgb } from "@repo/color/fn";
import { lrgbToOklab, oklabToLrgb, oklabToCss } from "@repo/color/fn";

const convertOklab = (input: ColorSpace<"rgb">) => {
  const lrgb = extract(input, rgbToLrgb);
  const oklab = extract(lrgb, lrgbToOklab);
  const color = nearest(oklab, 3);
  const css = isolate(color, oklabToCss);

  const oklab_lrgb = extract(oklab, oklabToLrgb);
  const lrgb_rgb = extract(oklab_lrgb, lrgbToRgb);

  return [oklab, css, lrgb_rgb] as Converter<"oklab">;
};

export default convertOklab;
