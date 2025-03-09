import type { ColorSpace, CssColor } from "../types";

const hsvToHwb = (h: number, s: number, v: number): ColorSpace<"hwb"> => {
  const w = (1 - s) * v;
  const b = 1 - v;
  return [h, w, b] as ColorSpace<"hwb">;
};

const hwbToHsv = (h: number, w: number, b: number): ColorSpace<"hsv"> => {
  const v = 1 - b;
  let s: number;
  if (v === 0) {
    s = 0;
  } else {
    s = 1 - w / v;
  }
  return [h, s, v] as ColorSpace<"hsv">;
};

const hwbToCss = (h: number, w: number, b: number): CssColor<"hwb"> => {
  return `hwb(${h} ${w} ${b})` as CssColor<"hwb">;
};

export { hsvToHwb, hwbToHsv, hwbToCss };
