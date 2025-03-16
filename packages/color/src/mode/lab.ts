import type { ColorSpace } from "../types";
import { lrgbToXyz50, xyz50ToLrgb } from "./xyz50";

const linearize = (c: number): number => {
  return c > 0.008856451679035631 ? Math.cbrt(c) : (903.2962962962963 * c + 16) / 116;
};

const delinearize = (c: number): number => {
  const p = c ** 3;
  return p > 0.008856451679035631 ? p : (116 * c - 16) / 903.2962962962963;
};

const xyz50ToLab = (input: ColorSpace<"xyz50">): ColorSpace<"lab"> => {
  const [, x, y, z] = input;

  const lx = linearize(x / 0.9642956764295677);
  const ly = linearize(y / 1);
  const lz = linearize(z / 0.8251046025104602);

  const l = 116 * ly - 16;
  const a = 500 * (lx - ly);
  const b = 200 * (ly - lz);

  return ["lab", l, a, b] as ColorSpace<"lab">;
};

const labToXyz50 = (input: ColorSpace<"lab">): ColorSpace<"xyz50"> => {
  const [, l, a, b] = input;

  const dl = (l + 16) / 116;
  const da = a / 500 + l;
  const db = l - b / 200;

  const x = delinearize(da) * 0.9642956764295677;
  const y = delinearize(dl) * 1;
  const z = delinearize(db) * 0.8251046025104602;

  return ["xyz50", x, y, z] as ColorSpace<"xyz50">;
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
