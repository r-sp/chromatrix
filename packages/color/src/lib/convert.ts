import { hslToHsv, hsvToHsl } from "../mode/hsl";
import { hsvToRgb, rgbToHsv } from "../mode/hsv";
import { hsvToHwb, hwbToHsv } from "../mode/hwb";
import { labToXyz50, xyz50ToLab } from "../mode/lab";
import { labToLch, lchToLab } from "../mode/lch";
import { lrgbToRgb, rgbToLrgb } from "../mode/lrgb";
import { lrgbToOklab, oklabToLrgb } from "../mode/oklab";
import { oklabToOklch, oklchToOklab } from "../mode/oklch";
import { lrgbToXyz50, xyz50ToLrgb } from "../mode/xyz50";
import { lrgbToXyz65, xyz50ToXyz65, xyz65ToLrgb, xyz65ToXyz50 } from "../mode/xyz65";
import type { ColorFn, ColorFormat, ColorMode, ColorSpace } from "../types";
import { compose } from "../utils";

const converter: {
  [T in ColorMode]: {
    [R in Exclude<ColorMode, T>]: ColorFn<T, R>;
  };
} = {
  rgb: {
    hsl: compose(hsvToHsl, rgbToHsv),
    hwb: compose(hsvToHwb, rgbToHsv),
    lab: compose(xyz50ToLab, lrgbToXyz50, rgbToLrgb),
    lch: compose(labToLch, xyz50ToLab, lrgbToXyz50, rgbToLrgb),
    oklab: compose(lrgbToOklab, rgbToLrgb),
    oklch: compose(oklabToOklch, lrgbToOklab, rgbToLrgb),
  },
  hsl: {
    rgb: compose(hsvToRgb, hslToHsv),
    hwb: compose(hsvToHwb, hslToHsv),
    lab: compose(xyz50ToLab, lrgbToXyz50, rgbToLrgb, hsvToRgb, hslToHsv),
    lch: compose(labToLch, xyz50ToLab, lrgbToXyz50, rgbToLrgb, hsvToRgb, hslToHsv),
    oklab: compose(lrgbToOklab, rgbToLrgb, hsvToRgb, hslToHsv),
    oklch: compose(oklabToOklch, lrgbToOklab, rgbToLrgb, hsvToRgb, hslToHsv),
  },
  hwb: {
    rgb: compose(hsvToRgb, hwbToHsv),
    hsl: compose(hsvToHsl, hwbToHsv),
    lab: compose(xyz50ToLab, lrgbToXyz50, rgbToLrgb, hsvToRgb, hwbToHsv),
    lch: compose(labToLch, xyz50ToLab, lrgbToXyz50, rgbToLrgb, hsvToRgb, hwbToHsv),
    oklab: compose(lrgbToOklab, rgbToLrgb, hsvToRgb, hwbToHsv),
    oklch: compose(oklabToOklch, lrgbToOklab, rgbToLrgb, hsvToRgb, hwbToHsv),
  },
  lab: {
    rgb: compose(lrgbToRgb, xyz50ToLrgb, labToXyz50),
    hsl: compose(hsvToHsl, rgbToHsv, lrgbToRgb, xyz50ToLrgb, labToXyz50),
    hwb: compose(hsvToHwb, rgbToHsv, lrgbToRgb, xyz50ToLrgb, labToXyz50),
    lch: labToLch,
    oklab: compose(lrgbToOklab, xyz65ToLrgb, xyz50ToXyz65, labToXyz50),
    oklch: compose(oklabToOklch, lrgbToOklab, xyz65ToLrgb, xyz50ToXyz65, labToXyz50),
  },
  lch: {
    rgb: compose(lrgbToRgb, xyz50ToLrgb, labToXyz50, lchToLab),
    hsl: compose(hsvToHsl, rgbToHsv, lrgbToRgb, xyz50ToLrgb, labToXyz50, lchToLab),
    hwb: compose(hsvToHwb, rgbToHsv, lrgbToRgb, xyz50ToLrgb, labToXyz50, lchToLab),
    lab: lchToLab,
    oklab: compose(lrgbToOklab, xyz65ToLrgb, xyz50ToXyz65, labToXyz50, lchToLab),
    oklch: compose(oklabToOklch, lrgbToOklab, xyz65ToLrgb, xyz50ToXyz65, labToXyz50, lchToLab),
  },
  oklab: {
    rgb: compose(lrgbToRgb, oklabToLrgb),
    hsl: compose(hsvToHsl, rgbToHsv, lrgbToRgb, oklabToLrgb),
    hwb: compose(hsvToHwb, rgbToHsv, lrgbToRgb, oklabToLrgb),
    lab: compose(xyz50ToLab, xyz65ToXyz50, lrgbToXyz65, oklabToLrgb),
    lch: compose(labToLch, xyz50ToLab, xyz65ToXyz50, lrgbToXyz65, oklabToLrgb),
    oklch: oklabToOklch,
  },
  oklch: {
    rgb: compose(lrgbToRgb, oklabToLrgb, oklchToOklab),
    hsl: compose(hsvToHsl, rgbToHsv, lrgbToRgb, oklabToLrgb, oklchToOklab),
    hwb: compose(hsvToHwb, rgbToHsv, lrgbToRgb, oklabToLrgb, oklchToOklab),
    lab: compose(xyz50ToLab, xyz65ToXyz50, lrgbToXyz65, oklabToLrgb, oklchToOklab),
    lch: compose(labToLch, xyz50ToLab, xyz65ToXyz50, lrgbToXyz65, oklabToLrgb, oklchToOklab),
    oklab: oklchToOklab,
  },
};

const convertColor = <T extends ColorMode, R extends Exclude<ColorMode, T>>(
  input: ColorFormat<T>,
  output: R,
): ColorFormat<R> => {
  const [mode, ...value] = input;
  const color = converter[mode][output];

  return [output, ...color(value as ColorSpace<T>)] as ColorFormat<R>;
};

export { converter, convertColor };
