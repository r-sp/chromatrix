import type { ColorSpace, Converter } from "@repo/color/types";
import { isolate, nearest, multiply } from "@repo/color/utils";
import { rgbToCss } from "@repo/color/rgb";

const convertRgb = (input: ColorSpace<"rgb">) => {
  console.time("convert-rgb");

  const gamut = multiply(input, [255, 255, 255]);
  const color = nearest(gamut, 3);
  const css = isolate(color, rgbToCss);

  console.timeLog("convert-rgb", [gamut, css, input]);
  return [gamut, css, input] as Converter<"rgb">;
};

export default convertRgb;
