import type { ColorSpace } from "../types";
import { labToXyz50, xyz50ToLab } from "./lab";
import { lrgbToXyz50, xyz50ToLrgb } from "./xyz50";

const labToLch = (input: ColorSpace<"lab">): ColorSpace<"lch"> => {
  const [, l, a, b] = input;

  const x = a * a;
  const y = b * b;
  const c = Math.sqrt(x + y);

  const d = 180 / Math.PI;
  let h = Math.atan2(b, a) * d;

  if (h < 0) {
    h += 360;
  }

  return ["lch", l, c, h];
};

const lchToLab = (input: ColorSpace<"lch">): ColorSpace<"lab"> => {
  const [, l, c, h] = input;

  const d = Math.PI / 180;
  const r = h * d;
  const a = c * Math.cos(r);
  const b = c * Math.sin(r);

  return ["lab", l, a, b];
};

const lrgbToLch = (input: ColorSpace<"lrgb">): ColorSpace<"lch"> => {
  const xyz50 = lrgbToXyz50(input);
  const lab = xyz50ToLab(xyz50);
  return labToLch(lab);
};

const lchToLrgb = (input: ColorSpace<"lch">): ColorSpace<"lrgb"> => {
  const lab = lchToLab(input);
  const xyz50 = labToXyz50(lab);
  return xyz50ToLrgb(xyz50);
};

export { labToLch, lchToLab, lrgbToLch, lchToLrgb };
