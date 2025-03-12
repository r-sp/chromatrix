import type { ColorSpace, Converter } from "../types";
import { extract, isolate, nearest } from "@repo/color/utils";
import { rgbToLrgb, lrgbToRgb } from "@repo/color/fn";
import { lrgbToXyz50, xyz50ToLrgb } from "@repo/color/fn";
import { xyz50ToLab, labToXyz50 } from "@repo/color/fn";
import { labToLch, lchToLab, lchToCss } from "@repo/color/fn";

const convertLch = (input: ColorSpace<"rgb">) => {
  const lrgb = extract(input, rgbToLrgb);
  const xyz50 = extract(lrgb, lrgbToXyz50);
  const lab = extract(xyz50, xyz50ToLab);
  const lch = extract(lab, labToLch);
  const color = nearest(lch, 3);
  const css = isolate(color, lchToCss);

  const lch_lab = extract(lch, lchToLab);
  const lab_xyz50 = extract(lch_lab, labToXyz50);
  const xyz50_lrgb = extract(lab_xyz50, xyz50ToLrgb);
  const lrgb_rgb = extract(xyz50_lrgb, lrgbToRgb);

  return [lch, css, lrgb_rgb] as Converter<"lch">;
};

export default convertLch;
