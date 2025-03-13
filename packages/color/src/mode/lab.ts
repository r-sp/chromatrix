import type { ColorSpace } from "../types";

const linearize = (c: number): number => {
  return c > 0.008856451679035631
    ? Math.cbrt(c)
    : (903.2962962962963 * c + 16) / 116;
};

const delinearize = (c: number): number => {
  const p = Math.pow(c, 3);
  return p > 0.008856451679035631 ? p : (116 * c - 16) / 903.2962962962963;
};

const xyz50ToLab = (input: ColorSpace<"xyz50">): ColorSpace<"lab"> => {
  let [x, y, z] = input;
  x = linearize(x / 0.9642956764295677);
  y = linearize(y / 1);
  z = linearize(z / 0.8251046025104602);
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b] as ColorSpace<"lab">;
};

const labToXyz50 = (input: ColorSpace<"lab">): ColorSpace<"xyz50"> => {
  let [l, a, b] = input;
  l = (l + 16) / 116;
  a = a / 500 + l;
  b = l - b / 200;
  const x = delinearize(a) * 0.9642956764295677;
  const y = delinearize(l) * 1;
  const z = delinearize(b) * 0.8251046025104602;
  return [x, y, z] as ColorSpace<"xyz50">;
};

export { xyz50ToLab, labToXyz50 };
