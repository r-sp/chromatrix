import type { ColorSpace, ColorMode, ColorFormat } from "../types";
import { hsvToHsl, hslToHsv } from "../mode/hsl";
import { hsvToHwb, hwbToHsv } from "../mode/hwb";
import { xyz50ToLab, labToXyz50 } from "../mode/lab";
import { labToLch, lchToLab } from "../mode/lch";
import { lrgbToOklab, oklabToLrgb } from "../mode/oklab";
import { oklabToOklch, oklchToOklab } from "../mode/oklch";
import { rgbToHsv, hsvToRgb } from "../mode/hsv";
import { rgbToLrgb, lrgbToRgb } from "../mode/lrgb";
import { lrgbToXyz50, xyz50ToLrgb } from "../mode/xyz50";

type BaseColor = [
  ColorSpace<"rgb">,
  ColorSpace<"hsv">,
  ColorSpace<"lrgb">,
  ColorSpace<"xyz50">,
];

const composeRgb = (input: BaseColor): ColorFormat<"rgb"> => {
  return ["rgb", ...input[0]] as ColorFormat<"rgb">;
};

const composeHsl = (input: BaseColor): ColorFormat<"hsl"> => {
  const hsl = hsvToHsl(input[1]);
  return ["hsl", ...hsl] as ColorFormat<"hsl">;
};

const composeHwb = (input: BaseColor): ColorFormat<"hwb"> => {
  const hwb = hsvToHwb(input[1]);
  return ["hwb", ...hwb] as ColorFormat<"hwb">;
};

const composeLab = (input: BaseColor): ColorFormat<"lab"> => {
  const lab = xyz50ToLab(input[3]);
  return ["lab", ...lab] as ColorFormat<"lab">;
};

const composeLch = (input: BaseColor): ColorFormat<"lch"> => {
  const lab = xyz50ToLab(input[3]);
  const lch = labToLch(lab);
  return ["lch", ...lch] as ColorFormat<"lch">;
};

const composeOklab = (input: BaseColor): ColorFormat<"oklab"> => {
  const oklab = lrgbToOklab(input[2]);
  return ["oklab", ...oklab] as ColorFormat<"oklab">;
};

const composeOklch = (input: BaseColor): ColorFormat<"oklch"> => {
  const oklab = lrgbToOklab(input[2]);
  const oklch = oklabToOklch(oklab);
  return ["oklch", ...oklch] as ColorFormat<"oklch">;
};

const composeMode: {
  [T in ColorMode]: (input: BaseColor) => ColorFormat<T>;
} = {
  rgb: composeRgb,
  hsl: composeHsl,
  hwb: composeHwb,
  lab: composeLab,
  lch: composeLch,
  oklab: composeOklab,
  oklch: composeOklch,
};

const convertRgb = <T extends Exclude<ColorMode, "rgb">>(
  input: ColorSpace<"rgb">,
  output: T,
): ColorFormat<T> => {
  const hsv = rgbToHsv(input);
  const lrgb = rgbToLrgb(input);
  const xyz50 = lrgbToXyz50(lrgb);
  const compose = composeMode[output];
  return compose([input, hsv, lrgb, xyz50]);
};

const convertHsl = <T extends Exclude<ColorMode, "hsl">>(
  input: ColorSpace<"hsl">,
  output: T,
): ColorFormat<T> => {
  const hsv = hslToHsv(input);
  const rgb = hsvToRgb(hsv);
  const lrgb = rgbToLrgb(rgb);
  const xyz50 = lrgbToXyz50(lrgb);
  const compose = composeMode[output];
  return compose([rgb, hsv, lrgb, xyz50]);
};

const convertHwb = <T extends Exclude<ColorMode, "hwb">>(
  input: ColorSpace<"hwb">,
  output: T,
): ColorFormat<T> => {
  const hsv = hwbToHsv(input);
  const rgb = hsvToRgb(hsv);
  const lrgb = rgbToLrgb(rgb);
  const xyz50 = lrgbToXyz50(lrgb);
  const compose = composeMode[output];
  return compose([rgb, hsv, lrgb, xyz50]);
};

const convertLab = <T extends Exclude<ColorMode, "lab">>(
  input: ColorSpace<"lab">,
  output: T,
): ColorFormat<T> => {
  const xyz50 = labToXyz50(input);
  const lrgb = xyz50ToLrgb(xyz50);
  const rgb = lrgbToRgb(lrgb);
  const hsv = rgbToHsv(rgb);
  const compose = composeMode[output];
  return compose([rgb, hsv, lrgb, xyz50]);
};

const convertLch = <T extends Exclude<ColorMode, "lch">>(
  input: ColorSpace<"lch">,
  output: T,
): ColorFormat<T> => {
  const lab = lchToLab(input);
  const xyz50 = labToXyz50(lab);
  const lrgb = xyz50ToLrgb(xyz50);
  const rgb = lrgbToRgb(lrgb);
  const hsv = rgbToHsv(rgb);
  const compose = composeMode[output];
  return compose([rgb, hsv, lrgb, xyz50]);
};

const convertOklab = <T extends Exclude<ColorMode, "oklab">>(
  input: ColorSpace<"oklab">,
  output: T,
): ColorFormat<T> => {
  const lrgb = oklabToLrgb(input);
  const xyz50 = lrgbToXyz50(lrgb);
  const rgb = lrgbToRgb(lrgb);
  const hsv = rgbToHsv(rgb);
  const compose = composeMode[output];
  return compose([rgb, hsv, lrgb, xyz50]);
};

const convertOklch = <T extends Exclude<ColorMode, "oklch">>(
  input: ColorSpace<"oklch">,
  output: T,
): ColorFormat<T> => {
  const oklab = oklchToOklab(input);
  const lrgb = oklabToLrgb(oklab);
  const xyz50 = lrgbToXyz50(lrgb);
  const rgb = lrgbToRgb(lrgb);
  const hsv = rgbToHsv(rgb);
  const compose = composeMode[output];
  return compose([rgb, hsv, lrgb, xyz50]);
};

const convertMode: {
  [T in ColorMode]: <I extends Exclude<ColorMode, T>>(
    input: ColorSpace<T>,
    output: I,
  ) => ColorFormat<I>;
} = {
  rgb: convertRgb,
  hsl: convertHsl,
  hwb: convertHwb,
  lab: convertLab,
  lch: convertLch,
  oklab: convertOklab,
  oklch: convertOklch,
};

const convertColor = <T extends ColorMode, I extends Exclude<ColorMode, T>>(
  input: ColorFormat<T>,
  output: I,
): ColorFormat<I> => {
  const compose = convertMode[input[0]]<I>;
  return compose(input.slice(1) as ColorSpace<T>, output);
};

const hueMode: {
  [T in ColorMode]: (
    input: ColorFormat<T>,
  ) => ColorFormat<"hsl" | "hwb" | "lch" | "oklch">;
} = {
  rgb: (input) => convertColor(input, "hsl"),
  hsl: (color) => color,
  hwb: (color) => color,
  lab: (input) => convertColor(input, "lch"),
  lch: (color) => color,
  oklab: (input) => convertColor(input, "oklch"),
  oklch: (color) => color,
};

const convertHue = <T extends ColorMode>(
  input: ColorFormat<T>,
): ColorFormat<"hsl" | "hwb" | "lch" | "oklch"> => {
  const compose = hueMode[input[0]];
  return compose(input);
};

export {
  convertRgb,
  convertHsl,
  convertHwb,
  convertLab,
  convertLch,
  convertOklab,
  convertOklch,
  convertColor,
  convertHue,
};
