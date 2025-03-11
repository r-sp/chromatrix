import type { ColorSpace, CssColor } from "../types";

const oklabToOklch = (l: number, a: number, b: number): ColorSpace<"oklch"> => {
  const c = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * (180 / Math.PI);
  if (h < 0) {
    h += 360;
  }
  return [l, c, h] as ColorSpace<"oklch">;
};

const oklchToOklab = (l: number, c: number, h: number): ColorSpace<"oklab"> => {
  const r = h * (Math.PI / 180);
  const a = c * Math.cos(r);
  const b = c * Math.sin(r);
  return [l, a, b] as ColorSpace<"oklab">;
};

const oklchToCss = (l: number, c: number, h: number): CssColor<"oklch"> => {
  return `oklch(${l} ${c} ${h})` as CssColor<"oklch">;
};

export { oklabToOklch, oklchToOklab, oklchToCss };
