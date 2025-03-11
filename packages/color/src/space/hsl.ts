import type { ColorSpace, CssColor } from "../types";

const hsvToHsl = (h: number, s: number, v: number): ColorSpace<"hsl"> => {
  let l = v * (1 - s / 2);
  let sl: number;
  if (l > 0 && l < 1) {
    sl = (v - l) / Math.min(l, 1 - l);
  } else {
    sl = 0;
  }
  return [h, sl, l] as ColorSpace<"hsl">;
};

const hslToHsv = (h: number, s: number, l: number): ColorSpace<"hsv"> => {
  const v = l + s * Math.min(l, 1 - l);
  const sv = v === 0 ? 0 : 2 * (1 - l / v);
  return [h, sv, v] as ColorSpace<"hsv">;
};

const hslToCss = (h: number, s: number, l: number): CssColor<"hsl"> => {
  return `hsl(${h} ${s} ${l})` as CssColor<"hsl">;
};

export { hsvToHsl, hslToHsv, hslToCss };
