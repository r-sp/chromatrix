import type { ColorSpace, Converter } from "@repo/color/types";
import { isolate, nearest, multiply } from "@repo/color/utils";
import { rgbToHex, hexToRgb } from "@repo/color/rgb";

const convertHex = (input: ColorSpace<"rgb">) => {
  console.time("convert-hex");

  const gamut = multiply(input, [255, 255, 255]);
  const color = nearest(gamut);
  const css = isolate(color, (c, t, x) => rgbToHex(c, t, x, false));
  const hex = hexToRgb(css);

  console.timeLog("convert-hex", [hex, css, input]);
  return [hex, css, input] as Converter<"rgb">;
};

export default convertHex;
