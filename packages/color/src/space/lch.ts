import type { ColorSpace, CssColor } from "../types";

const labToLch = (l: number, a: number, b: number): ColorSpace<"lch"> => {
  const c = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * (180 / Math.PI);
  if (h < 0) {
    h += 360;
  }
  return [l, c, h] as ColorSpace<"lch">;
};

const lchToLab = (l: number, c: number, h: number): ColorSpace<"lab"> => {
  const r = h * (Math.PI / 180);
  const a = c * Math.cos(r);
  const b = c * Math.sin(r);
  return [l, a, b] as ColorSpace<"lab">;
};

const lchToCss = (l: number, c: number, h: number): CssColor<"lch"> => {
  return `lch(${l} ${c} ${h})` as CssColor<"lch">;
};

export { labToLch, lchToLab, lchToCss };
