import type { ColorSpace, Converter } from "../types";
import { isolate, nearest, multiply } from "@repo/color/utils";
import { rgbToHex, hexToRgb } from "@repo/color/fn";

const convertHex = (input: ColorSpace<"rgb">) => {
  const gamut = multiply(input, [255, 255, 255]);
  const color = nearest(gamut);
  const css = isolate(color, (c, t, x) => rgbToHex(c, t, x, false));
  const hex = hexToRgb(css);

  return [hex, css, input] as Converter<"rgb">;
};

export default convertHex;
