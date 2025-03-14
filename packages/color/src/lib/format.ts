import type { ColorMode, ColorFormat } from "../types";
import { round } from "../utils";

type CssConfig = "decimal" | "degree" | "percent";

const decimal = (
  mode: string,
  values: [number | string, number | string, number | string],
): string => {
  return `${mode}(${values.join(" ")})`;
};

const degree = (value: number, config?: CssConfig): number | string => {
  if (!config) {
    return value;
  }
  const hasDegree = config === "degree" && `${value}deg`;
  const hasDecimal = config === "decimal" && `${value}deg`;
  return hasDegree || hasDecimal || value;
};

const percentage = (value: number, config?: CssConfig): number | string => {
  if (!config) {
    return value;
  }
  const hasPercent = config === "percent" && `${value}%`;
  const hasDecimal = config === "decimal" && `${value}%`;
  return hasPercent || hasDecimal || value;
};

const formatRgb = (input: ColorFormat<"rgb">): string => {
  let [mode, r, g, b] = input;
  r = round(r * 255, 3);
  g = round(g * 255, 3);
  b = round(b * 255, 3);
  return decimal(mode, [r, g, b]);
};

const formatHsl = (input: ColorFormat<"hsl">, config?: CssConfig): string => {
  let [mode, h, s, l] = input;
  h = round(h, 2);
  s = round(s * 100, 2);
  l = round(l * 100, 2);
  return decimal(mode, [
    degree(h, config),
    percentage(s, config),
    percentage(l, config),
  ]);
};

const formatHwb = (input: ColorFormat<"hwb">, config?: CssConfig): string => {
  let [mode, h, w, b] = input;
  h = round(h, 2);
  w = round(w * 100, 2);
  b = round(b * 100, 2);
  return decimal(mode, [
    degree(h, config),
    percentage(w, config),
    percentage(b, config),
  ]);
};

const formatLab = (input: ColorFormat<"lab">, config?: CssConfig): string => {
  let [mode, l, a, b] = input;
  l = round(l, 3);
  a = round(a, 3);
  b = round(b, 3);
  return decimal(mode, [percentage(l, config), a, b]);
};

const formatLch = (input: ColorFormat<"lch">, config?: CssConfig): string => {
  let [mode, l, c, h] = input;
  l = round(l, 3);
  c = round(c, 3);
  h = round(h, 3);
  return decimal(mode, [percentage(l, config), c, degree(h, config)]);
};

const formatOklab = (
  input: ColorFormat<"oklab">,
  config?: CssConfig,
): string => {
  let [mode, l, a, b] = input;
  l = round(l, 3);
  a = round(a, 3);
  b = round(b, 3);
  return decimal(mode, [percentage(l, config), a, b]);
};

const formatOklch = (
  input: ColorFormat<"oklch">,
  config?: CssConfig,
): string => {
  let [mode, l, c, h] = input;
  l = round(l, 3);
  c = round(c, 3);
  h = round(h, 3);
  return decimal(mode, [percentage(l, config), c, degree(h, config)]);
};

const formatMode: {
  [T in ColorMode]: (input: ColorFormat<T>, config?: CssConfig) => string;
} = {
  rgb: formatRgb,
  hsl: formatHsl,
  hwb: formatHwb,
  lab: formatLab,
  lch: formatLch,
  oklab: formatOklab,
  oklch: formatOklch,
};

const formatCss = <T extends ColorMode>(
  input: ColorFormat<T>,
  config?: CssConfig,
): string => {
  const target = input[0];
  const compose = formatMode[target];
  return compose(input, config);
};

export {
  formatRgb,
  formatHsl,
  formatHwb,
  formatLab,
  formatLch,
  formatOklab,
  formatOklch,
  formatCss,
};
