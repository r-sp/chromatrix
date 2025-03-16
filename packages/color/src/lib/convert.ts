import { hslToHsv, hslToLrgb, hsvToHsl, lrgbToHsl } from "../mode/hsl";
import { hsvToRgb, rgbToHsv } from "../mode/hsv";
import { hsvToHwb, hwbToHsv, hwbToLrgb, lrgbToHwb } from "../mode/hwb";
import { labToLrgb, lrgbToLab } from "../mode/lab";
import { labToLch, lchToLab, lchToLrgb, lrgbToLch } from "../mode/lch";
import { lrgbToRgb, rgbToLrgb } from "../mode/lrgb";
import { lrgbToOklab, oklabToLrgb } from "../mode/oklab";
import { lrgbToOklch, oklabToOklch, oklchToLrgb, oklchToOklab } from "../mode/oklch";
import type { ColorMode, ColorSpace } from "../types";

const conversionColor: {
  [T in ColorMode]: {
    [I in Exclude<ColorMode, T>]: (input: ColorSpace<T>) => ColorSpace<I>;
  };
} = {
  rgb: {
    hsl: (input) => hsvToHsl(rgbToHsv(input)),
    hwb: (input) => hsvToHwb(rgbToHsv(input)),
    lab: (input) => lrgbToLab(rgbToLrgb(input)),
    lch: (input) => lrgbToLch(rgbToLrgb(input)),
    oklab: (input) => lrgbToOklab(rgbToLrgb(input)),
    oklch: (input) => lrgbToOklch(rgbToLrgb(input)),
  },
  hsl: {
    rgb: (input) => hsvToRgb(hslToHsv(input)),
    hwb: (input) => hsvToHwb(hslToHsv(input)),
    lab: (input) => lrgbToLab(hslToLrgb(input)),
    lch: (input) => lrgbToLch(hslToLrgb(input)),
    oklab: (input) => lrgbToOklab(hslToLrgb(input)),
    oklch: (input) => lrgbToOklch(hslToLrgb(input)),
  },
  hwb: {
    rgb: (input) => hsvToRgb(hwbToHsv(input)),
    hsl: (input) => hsvToHsl(hwbToHsv(input)),
    lab: (input) => lrgbToLab(hwbToLrgb(input)),
    lch: (input) => lrgbToLch(hwbToLrgb(input)),
    oklab: (input) => lrgbToOklab(hwbToLrgb(input)),
    oklch: (input) => lrgbToOklch(hwbToLrgb(input)),
  },
  lab: {
    rgb: (input) => lrgbToRgb(labToLrgb(input)),
    hsl: (input) => lrgbToHsl(labToLrgb(input)),
    hwb: (input) => lrgbToHwb(labToLrgb(input)),
    lch: (input) => labToLch(input),
    oklab: (input) => lrgbToOklab(labToLrgb(input)),
    oklch: (input) => lrgbToOklch(labToLrgb(input)),
  },
  lch: {
    rgb: (input) => lrgbToRgb(lchToLrgb(input)),
    hsl: (input) => lrgbToHsl(lchToLrgb(input)),
    hwb: (input) => lrgbToHwb(lchToLrgb(input)),
    lab: (input) => lchToLab(input),
    oklab: (input) => lrgbToOklab(lchToLrgb(input)),
    oklch: (input) => lrgbToOklch(lchToLrgb(input)),
  },
  oklab: {
    rgb: (input) => lrgbToRgb(oklabToLrgb(input)),
    hsl: (input) => lrgbToHsl(oklabToLrgb(input)),
    hwb: (input) => lrgbToHwb(oklabToLrgb(input)),
    lab: (input) => lrgbToLab(oklabToLrgb(input)),
    lch: (input) => lrgbToLch(oklabToLrgb(input)),
    oklch: (input) => oklabToOklch(input),
  },
  oklch: {
    rgb: (input) => lrgbToRgb(oklchToLrgb(input)),
    hsl: (input) => lrgbToHsl(oklchToLrgb(input)),
    hwb: (input) => lrgbToHwb(oklchToLrgb(input)),
    lab: (input) => lrgbToLab(oklchToLrgb(input)),
    lch: (input) => lrgbToLch(oklchToLrgb(input)),
    oklab: (input) => oklchToOklab(input),
  },
};

const convertColor = <T extends ColorMode, I extends Exclude<ColorMode, T>>(
  input: ColorSpace<T>,
  output: I,
): ColorSpace<I> => {
  return conversionColor[input[0]][output](input) as ColorSpace<I>;
};

export { convertColor };
