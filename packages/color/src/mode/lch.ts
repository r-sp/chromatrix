import type { ColorSpace } from "../types";

const labToLch = (input: ColorSpace<"lab">): ColorSpace<"lch"> => {
  const [l, a, b] = input;
  const c = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * (180 / Math.PI);
  if (h < 0) {
    h += 360;
  }
  return [l, c, h] as ColorSpace<"lch">;
};

const lchToLab = (input: ColorSpace<"lch">): ColorSpace<"lab"> => {
  const [l, c, h] = input;
  const r = h * (Math.PI / 180);
  const a = c * Math.cos(r);
  const b = c * Math.sin(r);
  return [l, a, b] as ColorSpace<"lab">;
};

export { labToLch, lchToLab };
