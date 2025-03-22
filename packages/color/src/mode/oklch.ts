import type { ColorFn, ColorSpace } from "../types";

const oklabToOklch: ColorFn<"oklab", "oklch"> = (input) => {
  const l = input[0];
  const a = input[1];
  const b = input[2];

  const x = a * a;
  const y = b * b;
  const c = Math.sqrt(x + y);

  const d = 180 / Math.PI;
  let h = Math.atan2(b, a) * d;

  if (h < 0) {
    h += 360;
  }

  return [l, c, h] as ColorSpace<"oklch">;
};

const oklchToOklab: ColorFn<"oklch", "oklab"> = (input) => {
  const l = input[0];
  const c = input[1];
  const h = input[2];

  const d = Math.PI / 180;
  const r = h * d;
  const a = c * Math.cos(r);
  const b = c * Math.sin(r);

  return [l, a, b] as ColorSpace<"oklab">;
};

export { oklabToOklch, oklchToOklab };
