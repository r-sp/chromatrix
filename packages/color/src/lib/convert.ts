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
import type { ColorMode, ColorSpace } from "../types";

const conversionRgb: {
  [T in Exclude<ColorMode, "rgb">]: (input: ColorSpace<"rgb">) => ColorSpace<T>;
} = {
  hsl: (input) => {
    const hsv = rgbToHsv(input);
    return hsvToHsl(hsv);
  },
  hwb: (input) => {
    const hsv = rgbToHsv(input);
    return hsvToHwb(hsv);
  },
  lab: (input) => {
    const lrgb = rgbToLrgb(input);
    const xyz50 = lrgbToXyz50(lrgb);
    return xyz50ToLab(xyz50);
  },
  lch: (input) => {
    const lrgb = rgbToLrgb(input);
    const xyz50 = lrgbToXyz50(lrgb);
    const lab = xyz50ToLab(xyz50);
    return labToLch(lab);
  },
  oklab: (input) => {
    const lrgb = rgbToLrgb(input);
    return lrgbToOklab(lrgb);
  },
  oklch: (input) => {
    const lrgb = rgbToLrgb(input);
    const oklab = lrgbToOklab(lrgb);
    return oklabToOklch(oklab);
  },
};

const conversionHsl: {
  [T in Exclude<ColorMode, "hsl">]: (input: ColorSpace<"hsl">) => ColorSpace<T>;
} = {
  rgb: (input) => {
    const hsv = hslToHsv(input);
    return hsvToRgb(hsv);
  },
  hwb: (input) => {
    const hsv = hslToHsv(input);
    return hsvToHwb(hsv);
  },
  lab: (input) => {
    const hsv = hslToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    const xyz50 = lrgbToXyz50(lrgb);
    return xyz50ToLab(xyz50);
  },
  lch: (input) => {
    const hsv = hslToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    const xyz50 = lrgbToXyz50(lrgb);
    const lab = xyz50ToLab(xyz50);
    return labToLch(lab);
  },
  oklab: (input) => {
    const hsv = hslToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    return lrgbToOklab(lrgb);
  },
  oklch: (input) => {
    const hsv = hslToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    const oklab = lrgbToOklab(lrgb);
    return oklabToOklch(oklab);
  },
};

const conversionHwb: {
  [T in Exclude<ColorMode, "hwb">]: (input: ColorSpace<"hwb">) => ColorSpace<T>;
} = {
  rgb: (input) => {
    const hsv = hwbToHsv(input);
    return hsvToRgb(hsv);
  },
  hsl: (input) => {
    const hsv = hwbToHsv(input);
    return hsvToHsl(hsv);
  },
  lab: (input) => {
    const hsv = hwbToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    const xyz50 = lrgbToXyz50(lrgb);
    return xyz50ToLab(xyz50);
  },
  lch: (input) => {
    const hsv = hwbToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    const xyz50 = lrgbToXyz50(lrgb);
    const lab = xyz50ToLab(xyz50);
    return labToLch(lab);
  },
  oklab: (input) => {
    const hsv = hwbToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    return lrgbToOklab(lrgb);
  },
  oklch: (input) => {
    const hsv = hwbToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    const oklab = lrgbToOklab(lrgb);
    return oklabToOklch(oklab);
  },
};

const conversionLab: {
  [T in Exclude<ColorMode, "lab">]: (input: ColorSpace<"lab">) => ColorSpace<T>;
} = {
  rgb: (input) => {
    const xyz50 = labToXyz50(input);
    const lrgb = xyz50ToLrgb(xyz50);
    return lrgbToRgb(lrgb);
  },
  hsl: (input) => {
    const xyz50 = labToXyz50(input);
    const lrgb = xyz50ToLrgb(xyz50);
    const rgb = lrgbToRgb(lrgb);
    const hsv = rgbToHsv(rgb);
    return hsvToHsl(hsv);
  },
  hwb: (input) => {
    const xyz50 = labToXyz50(input);
    const lrgb = xyz50ToLrgb(xyz50);
    const rgb = lrgbToRgb(lrgb);
    const hsv = rgbToHsv(rgb);
    return hsvToHwb(hsv);
  },
  lch: labToLch,
  oklab: (input) => {
    const xyz50 = labToXyz50(input);
    const xyz65 = xyz50ToXyz65(xyz50);
    const lrgb = xyz65ToLrgb(xyz65);
    return lrgbToOklab(lrgb);
  },
  oklch: (input) => {
    const xyz50 = labToXyz50(input);
    const xyz65 = xyz50ToXyz65(xyz50);
    const lrgb = xyz65ToLrgb(xyz65);
    const oklab = lrgbToOklab(lrgb);
    return oklabToOklch(oklab);
  },
};

const conversionLch: {
  [T in Exclude<ColorMode, "lch">]: (input: ColorSpace<"lch">) => ColorSpace<T>;
} = {
  rgb: (input) => {
    const lab = lchToLab(input);
    const xyz50 = labToXyz50(lab);
    const lrgb = xyz50ToLrgb(xyz50);
    return lrgbToRgb(lrgb);
  },
  hsl: (input) => {
    const lab = lchToLab(input);
    const xyz50 = labToXyz50(lab);
    const lrgb = xyz50ToLrgb(xyz50);
    const rgb = lrgbToRgb(lrgb);
    const hsv = rgbToHsv(rgb);
    return hsvToHsl(hsv);
  },
  hwb: (input) => {
    const lab = lchToLab(input);
    const xyz50 = labToXyz50(lab);
    const lrgb = xyz50ToLrgb(xyz50);
    const rgb = lrgbToRgb(lrgb);
    const hsv = rgbToHsv(rgb);
    return hsvToHwb(hsv);
  },
  lab: lchToLab,
  oklab: (input) => {
    const lab = lchToLab(input);
    const xyz50 = labToXyz50(lab);
    const xyz65 = xyz50ToXyz65(xyz50);
    const lrgb = xyz65ToLrgb(xyz65);
    return lrgbToOklab(lrgb);
  },
  oklch: (input) => {
    const lab = lchToLab(input);
    const xyz50 = labToXyz50(lab);
    const xyz65 = xyz50ToXyz65(xyz50);
    const lrgb = xyz65ToLrgb(xyz65);
    const oklab = lrgbToOklab(lrgb);
    return oklabToOklch(oklab);
  },
};

const conversionOklab: {
  [T in Exclude<ColorMode, "oklab">]: (input: ColorSpace<"oklab">) => ColorSpace<T>;
} = {
  rgb: (input) => {
    const lrgb = oklabToLrgb(input);
    return lrgbToRgb(lrgb);
  },
  hsl: (input) => {
    const lrgb = oklabToLrgb(input);
    const rgb = lrgbToRgb(lrgb);
    const hsv = rgbToHsv(rgb);
    return hsvToHsl(hsv);
  },
  hwb: (input) => {
    const lrgb = oklabToLrgb(input);
    const rgb = lrgbToRgb(lrgb);
    const hsv = rgbToHsv(rgb);
    return hsvToHwb(hsv);
  },
  lab: (input) => {
    const lrgb = oklabToLrgb(input);
    const xyz65 = lrgbToXyz65(lrgb);
    const xyz50 = xyz65ToXyz50(xyz65);
    return xyz50ToLab(xyz50);
  },
  lch: (input) => {
    const lrgb = oklabToLrgb(input);
    const xyz65 = lrgbToXyz65(lrgb);
    const xyz50 = xyz65ToXyz50(xyz65);
    const lab = xyz50ToLab(xyz50);
    return labToLch(lab);
  },
  oklch: oklabToOklch,
};

const conversionOklch: {
  [T in Exclude<ColorMode, "oklch">]: (input: ColorSpace<"oklch">) => ColorSpace<T>;
} = {
  rgb: (input) => {
    const oklab = oklchToOklab(input);
    const lrgb = oklabToLrgb(oklab);
    return lrgbToRgb(lrgb);
  },
  hsl: (input) => {
    const oklab = oklchToOklab(input);
    const lrgb = oklabToLrgb(oklab);
    const rgb = lrgbToRgb(lrgb);
    const hsv = rgbToHsv(rgb);
    return hsvToHsl(hsv);
  },
  hwb: (input) => {
    const oklab = oklchToOklab(input);
    const lrgb = oklabToLrgb(oklab);
    const rgb = lrgbToRgb(lrgb);
    const hsv = rgbToHsv(rgb);
    return hsvToHwb(hsv);
  },
  lab: (input) => {
    const oklab = oklchToOklab(input);
    const lrgb = oklabToLrgb(oklab);
    const xyz65 = lrgbToXyz65(lrgb);
    const xyz50 = xyz65ToXyz50(xyz65);
    return xyz50ToLab(xyz50);
  },
  lch: (input) => {
    const oklab = oklchToOklab(input);
    const lrgb = oklabToLrgb(oklab);
    const xyz65 = lrgbToXyz65(lrgb);
    const xyz50 = xyz65ToXyz50(xyz65);
    const lab = xyz50ToLab(xyz50);
    return labToLch(lab);
  },
  oklab: oklchToOklab,
};

const conversionColor: {
  [T in ColorMode]: {
    [I in Exclude<ColorMode, T>]: (input: ColorSpace<T>) => ColorSpace<I>;
  };
} = {
  rgb: conversionRgb,
  hsl: conversionHsl,
  hwb: conversionHwb,
  lab: conversionLab,
  lch: conversionLch,
  oklab: conversionOklab,
  oklch: conversionOklch,
};

const convertColor = <T extends ColorMode, I extends Exclude<ColorMode, T>>(
  input: ColorSpace<T>,
  output: I,
): ColorSpace<I> => {
  return conversionColor[input[0]][output](input) as ColorSpace<I>;
};

export { convertColor };
