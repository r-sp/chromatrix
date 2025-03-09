import type { ColorSpace, Converter } from "@repo/color/types";
import { extract, isolate, nearest } from "@repo/color/utils";
import { rgbToLrgb, lrgbToRgb } from "@repo/color/lrgb";
import { lrgbToXyz50, xyz50ToLrgb } from "@repo/color/xyz50";
import { xyz50ToLab, labToXyz50, labToCss } from "@repo/color/lab";

const convertLab = (input: ColorSpace<"rgb">) => {
  console.time("convert-lab");

  const lrgb = extract(input, rgbToLrgb);
  const xyz50 = extract(lrgb, lrgbToXyz50);
  const lab = extract(xyz50, xyz50ToLab);
  const color = nearest(lab, 3);
  const css = isolate(color, labToCss);

  const lab_xyz50 = extract(lab, labToXyz50);
  const xyz50_lrgb = extract(lab_xyz50, xyz50ToLrgb);
  const lrgb_rgb = extract(xyz50_lrgb, lrgbToRgb);

  console.timeLog("convert-lab", [lab, css, lrgb_rgb]);
  return [lab, css, lrgb_rgb] as Converter<"lab">;
};

export default convertLab;
