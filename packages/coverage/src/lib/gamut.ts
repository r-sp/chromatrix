import { lrgbToOklab, lrgbToXyz50, rgbToLrgb, xyz50ToLab } from "@repo/color/fn";
import type { ColorFn, ColorSpace } from "@repo/color/types";
import { compose } from "@repo/color/utils";

const rgbToLab: ColorFn<"rgb", "lab"> = (input) => {
  const [r, g, x] = input;
  let [l, a, b] = compose<ColorSpace<"lab">>(xyz50ToLab, lrgbToXyz50, rgbToLrgb)(input);

  if (r === x && x === g) {
    a = b = 0;
  }

  return [l, a, b] as ColorSpace<"lab">;
};

const rgbToOklab: ColorFn<"rgb", "oklab"> = (input) => {
  const [r, g, x] = input;
  let [l, a, b] = compose<ColorSpace<"oklab">>(lrgbToOklab, rgbToLrgb)(input);

  if (r === x && x === g) {
    a = b = 0;
  }

  return [l, a, b] as ColorSpace<"oklab">;
};

export { rgbToLab, rgbToOklab };
