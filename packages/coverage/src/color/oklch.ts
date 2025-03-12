import type { ColorSpace, Converter } from "../types";
import { extract, isolate, nearest } from "@repo/color/utils";
import { rgbToLrgb, lrgbToRgb } from "@repo/color/fn";
import { lrgbToOklab, oklabToLrgb } from "@repo/color/fn";
import { oklabToOklch, oklchToOklab, oklchToCss } from "@repo/color/fn";

const convertOklch = (input: ColorSpace<"rgb">) => {
  const lrgb = extract(input, rgbToLrgb);
  const oklab = extract(lrgb, lrgbToOklab);
  const oklch = extract(oklab, oklabToOklch);
  const color = nearest(oklch, 3);
  const css = isolate(color, oklchToCss);

  const oklch_oklab = extract(oklch, oklchToOklab);
  const oklab_lrgb = extract(oklch_oklab, oklabToLrgb);
  const lrgb_rgb = extract(oklab_lrgb, lrgbToRgb);

  return [oklch, css, lrgb_rgb] as Converter<"oklch">;
};

export default convertOklch;
