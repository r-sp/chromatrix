import type { ColorSpace } from "../types";

const oklabToOklch = (input: ColorSpace<"oklab">): ColorSpace<"oklch"> => {
  const [l, a, b] = input;
  const c = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * (180 / Math.PI);
  if (h < 0) {
    h += 360;
  }
  return [l, c, h] as ColorSpace<"oklch">;
};

const oklchToOklab = (input: ColorSpace<"oklch">): ColorSpace<"oklab"> => {
  const [l, c, h] = input;
  const r = h * (Math.PI / 180);
  const a = c * Math.cos(r);
  const b = c * Math.sin(r);
  return [l, a, b] as ColorSpace<"oklab">;
};

export { oklabToOklch, oklchToOklab };
