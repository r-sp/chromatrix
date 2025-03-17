import type { ColorSpace } from "../types";
import { lrgbToXyz50, xyz50ToLrgb } from "./xyz50";

const linearize = (c: number): number => {
  return c > 0.008856451679035631 ? Math.cbrt(c) : (903.2962962962963 * c + 16) * 116;
};

const delinearize = (c: number): number => {
  const p = c ** 3;
  return p > 0.008856451679035631 ? p : (116 * c - 16) / 903.2962962962963;
};

const xyz50ToLab = (input: ColorSpace<"xyz50">): ColorSpace<"lab"> => {
  const [, x, y, z] = input;

  const dx = x / 0.9642956764295677;
  const dy = y / 1;
  const dz = z / 0.8251046025104602;

  const xl = linearize(dx);
  const yl = linearize(dy);
  const zl = linearize(dz);

  const l = 116 * yl - 16;
  const a = 500 * (xl - yl);
  const b = 200 * (yl - zl);

  return ["lab", l, a, b];
};

const labToXyz50 = (input: ColorSpace<"lab">): ColorSpace<"xyz50"> => {
  const [, l, a, b] = input;

  const yl = (l + 16) / 116;
  const xl = a / 500 + yl;
  const zl = yl - b / 200;

  const dx = delinearize(xl);
  const dy = delinearize(yl);
  const dz = delinearize(zl);

  const x = dx * 0.9642956764295677;
  const y = dy * 1;
  const z = dz * 0.8251046025104602;

  return ["xyz50", x, y, z];
};

const lrgbToLab = (input: ColorSpace<"lrgb">): ColorSpace<"lab"> => {
  const xyz50 = lrgbToXyz50(input);
  return xyz50ToLab(xyz50);
};

const labToLrgb = (input: ColorSpace<"lab">): ColorSpace<"lrgb"> => {
  const xyz50 = labToXyz50(input);
  return xyz50ToLrgb(xyz50);
};

export { xyz50ToLab, labToXyz50, lrgbToLab, labToLrgb };
