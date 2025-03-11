import type { ColorSpace, Converter } from "../types";
import { isolate, nearest, multiply } from "@repo/color/utils";
import { rgbToCss } from "@repo/color/fn";

const convertRgb = (input: ColorSpace<"rgb">) => {
  const gamut = multiply(input, [255, 255, 255]);
  const color = nearest(gamut, 3);
  const css = isolate(color, rgbToCss);

  return [gamut, css, input] as Converter<"rgb">;
};

export default convertRgb;
