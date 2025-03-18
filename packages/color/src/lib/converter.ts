import { hslToHsv, hsvToHsl } from "../mode/hsl";
import { hsvToRgb, rgbToHsv } from "../mode/hsv";
import { hsvToHwb } from "../mode/hwb";
import { xyz50ToLab } from "../mode/lab";
import { labToLch } from "../mode/lch";
import { rgbToLrgb } from "../mode/lrgb";
import { lrgbToOklab } from "../mode/oklab";
import { oklabToOklch } from "../mode/oklch";
import { lrgbToXyz50 } from "../mode/xyz50";
import type { ColorMode, ColorSpace } from "../types";

const convertRgb: {
  [T in Exclude<ColorMode, "rgb">]: (input: ColorSpace<"rgb">) => ColorSpace<T>;
} = {
  hsl: (input) => {
    const hsv = rgbToHsv(input);
    const hsl = hsvToHsl(hsv);
    return hsl;
  },
  hwb: (input) => {
    const hsv = rgbToHsv(input);
    const hwb = hsvToHwb(hsv);
    return hwb;
  },
  lab: (input) => {
    const lrgb = rgbToLrgb(input);
    const xyz50 = lrgbToXyz50(lrgb);
    const lab = xyz50ToLab(xyz50);
    return lab;
  },
  lch: (input) => {
    const lrgb = rgbToLrgb(input);
    const xyz50 = lrgbToXyz50(lrgb);
    const lab = xyz50ToLab(xyz50);
    const lch = labToLch(lab);
    return lch;
  },
  oklab: (input) => {
    const lrgb = rgbToLrgb(input);
    const oklab = lrgbToOklab(lrgb);
    return oklab;
  },
  oklch: (input) => {
    const lrgb = rgbToLrgb(input);
    const oklab = lrgbToOklab(lrgb);
    const oklch = oklabToOklch(oklab);
    return oklch;
  },
};

const convertHsl: {
  [T in Exclude<ColorMode, "hsl">]: (input: ColorSpace<"hsl">) => ColorSpace<T>;
} = {
  rgb: (input) => {
    const hsv = hslToHsv(input);
    const rgb = hsvToRgb(hsv);
    return rgb;
  },
  hwb: (input) => {
    const hsv = hslToHsv(input);
    const hwb = hsvToHwb(hsv);
    return hwb;
  },
  lab: (input) => {
    const hsv = hslToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    const xyz50 = lrgbToXyz50(lrgb);
    const lab = xyz50ToLab(xyz50);
    return lab;
  },
  lch: (input) => {
    const hsv = hslToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    const xyz50 = lrgbToXyz50(lrgb);
    const lab = xyz50ToLab(xyz50);
    const lch = labToLch(lab);
    return lch;
  },
  oklab: (input) => {
    const hsv = hslToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    const oklab = lrgbToOklab(lrgb);
    return oklab;
  },
  oklch: (input) => {
    const hsv = hslToHsv(input);
    const rgb = hsvToRgb(hsv);
    const lrgb = rgbToLrgb(rgb);
    const oklab = lrgbToOklab(lrgb);
    const oklch = oklabToOklch(oklab);
    return oklch;
  },
};

export { convertRgb, convertHsl };
