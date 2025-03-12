import type { ColorSpace, ColorMode, CssConfig } from "./types";
import { hsvToHsl, hslToHsv } from "./space/hsl";
import { hsvToHwb, hwbToHsv } from "./space/hwb";
import { rgbToHsv, hsvToRgb } from "./space/hsv";
import { rgbToLrgb, lrgbToRgb } from "./space/lrgb";
import { lrgbToXyz50, xyz50ToLrgb } from "./space/xyz50";
import { xyz50ToLab, labToXyz50 } from "./space/lab";
import { labToLch, lchToLab } from "./space/lch";
import { lrgbToOklab, oklabToLrgb } from "./space/oklab";
import { oklabToOklch, oklchToOklab } from "./space/oklch";
import { extract, nearest, multiply } from "./utils";

const converter = <T extends ColorMode>(
  input: [
    ColorSpace<"rgb">,
    ColorSpace<"hsv">,
    ColorSpace<"lrgb">,
    ColorSpace<"xyz50">,
  ],
  output: T,
): ColorSpace<T> => {
  const [rgb, hsv, lrgb, xyz50] = input;
  switch (output) {
    case "rgb": {
      return rgb as ColorSpace<T>;
    }
    case "hsl": {
      return extract(hsv, hsvToHsl) as ColorSpace<T>;
    }
    case "hwb": {
      return extract(hsv, hsvToHwb) as ColorSpace<T>;
    }
    case "lab": {
      return extract(xyz50, xyz50ToLab) as ColorSpace<T>;
    }
    case "lch": {
      const lab = extract(xyz50, xyz50ToLab);
      return extract(lab, labToLch) as ColorSpace<T>;
    }
    case "oklab": {
      return extract(lrgb, lrgbToOklab) as ColorSpace<T>;
    }
    case "oklch": {
      const oklab = extract(lrgb, lrgbToOklab);
      return extract(oklab, oklabToOklch) as ColorSpace<T>;
    }
  }
};

const convertColor = <I extends ColorMode, O extends Exclude<ColorMode, I>>(
  input: ColorSpace<I>,
  mode: I,
  target: O,
): ColorSpace<O> => {
  switch (mode) {
    case "rgb": {
      const rgb = input as ColorSpace<"rgb">;
      const hsv = extract(rgb, rgbToHsv);
      const lrgb = extract(rgb, rgbToLrgb);
      const xyz50 = extract(lrgb, lrgbToXyz50);
      return converter([rgb, hsv, lrgb, xyz50], target);
    }
    case "hsl": {
      const hsv = extract(input as ColorSpace<"hsl">, hslToHsv);
      const rgb = extract(hsv, hsvToRgb);
      const lrgb = extract(rgb, rgbToLrgb);
      const xyz50 = extract(lrgb, lrgbToXyz50);
      return converter([rgb, hsv, lrgb, xyz50], target);
    }
    case "hwb": {
      const hsv = extract(input as ColorSpace<"hwb">, hwbToHsv);
      const rgb = extract(hsv, hsvToRgb);
      const lrgb = extract(rgb, rgbToLrgb);
      const xyz50 = extract(lrgb, lrgbToXyz50);
      return converter([rgb, hsv, lrgb, xyz50], target);
    }
    case "lab": {
      const xyz50 = extract(input as ColorSpace<"lab">, labToXyz50);
      const lrgb = extract(xyz50, xyz50ToLrgb);
      const rgb = extract(lrgb, lrgbToRgb);
      const hsv = extract(rgb, rgbToHsv);
      return converter([rgb, hsv, lrgb, xyz50], target);
    }
    case "lch": {
      const lab = extract(input as ColorSpace<"lch">, lchToLab);
      const xyz50 = extract(lab, labToXyz50);
      const lrgb = extract(xyz50, xyz50ToLrgb);
      const rgb = extract(lrgb, lrgbToRgb);
      const hsv = extract(rgb, rgbToHsv);
      return converter([rgb, hsv, lrgb, xyz50], target);
    }
    case "oklab": {
      const lrgb = extract(input as ColorSpace<"oklab">, oklabToLrgb);
      const xyz50 = extract(lrgb, lrgbToXyz50);
      const rgb = extract(lrgb, lrgbToRgb);
      const hsv = extract(rgb, rgbToHsv);
      return converter([rgb, hsv, lrgb, xyz50], target);
    }
    case "oklch": {
      const oklab = extract(input as ColorSpace<"oklch">, oklchToOklab);
      const lrgb = extract(oklab, oklabToLrgb);
      const xyz50 = extract(lrgb, lrgbToXyz50);
      const rgb = extract(lrgb, lrgbToRgb);
      const hsv = extract(rgb, rgbToHsv);
      return converter([rgb, hsv, lrgb, xyz50], target);
    }
  }
};

const convertCss = <T extends ColorMode>(
  input: ColorSpace<T>,
  mode: T,
  config?: CssConfig<T>,
): string => {
  const degreeOnly = "degree";
  const percentOnly = "percent";
  const percentAndDegree = "percent-degree";
  const degree = (value: string | number): string | number => {
    return config === degreeOnly || config === percentAndDegree
      ? `${value}deg`
      : value;
  };
  const percent = (value: string | number): string | number => {
    return config === percentOnly || config === percentAndDegree
      ? `${value}%`
      : value;
  };
  const decimal = (
    value: string,
    c: string | number,
    t: string | number,
    x: string | number,
  ): string => {
    return `${value}(${c} ${t} ${x})`;
  };
  switch (mode) {
    case "rgb": {
      const gamut = multiply(input, [255, 255, 255]);
      const color = nearest(gamut, 3);
      let [c, t, x] = color;
      return decimal(mode, c, t, x);
    }
    case "hsl":
    case "hwb": {
      const gamut = multiply(input, [0, 100, 100]);
      const color = nearest(gamut, 2);
      let [c, t, x] = color;
      return decimal(mode, degree(c), percent(t), percent(x));
    }
    case "lch":
    case "oklch": {
      const color = nearest(input, 3);
      let [c, t, x] = color;
      return decimal(mode, percent(c), t, degree(x));
    }
    case "lab":
    case "oklab": {
      const color = nearest(input, 3);
      let [c, t, x] = color;
      return decimal(mode, percent(c), t, x);
    }
  }
};

export { convertColor, convertCss };
