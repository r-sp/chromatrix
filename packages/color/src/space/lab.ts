import type { ColorSpace, CssColor } from "../types";
import { cuberoot, power } from "../utils";

const linearize = (c: number): number => {
  return c > 0.008856451679035631
    ? cuberoot(c)
    : (903.2962962962963 * c + 16) / 116;
};

const xyz50ToLab = (x: number, y: number, z: number): ColorSpace<"lab"> => {
  x = linearize(x / 0.9642956764295677);
  y = linearize(y / 1);
  z = linearize(z / 0.8251046025104602);
  const l = 116 * y - 16;
  const a = 500 * (x - y);
  const b = 200 * (y - z);
  return [l, a, b] as ColorSpace<"lab">;
};

const delinearize = (c: number): number => {
  return power(c, 3) > 0.008856451679035631
    ? power(c, 3)
    : (116 * c - 16) / 903.2962962962963;
};

const labToXyz50 = (l: number, a: number, b: number): ColorSpace<"xyz50"> => {
  l = (l + 16) / 116;
  a = a / 500 + l;
  b = l - b / 200;
  const x = delinearize(a) * 0.9642956764295677;
  const y = delinearize(l) * 1;
  const z = delinearize(b) * 0.8251046025104602;
  return [x, y, z] as ColorSpace<"xyz50">;
};

const labToCss = (l: number, a: number, b: number): CssColor<"lab"> => {
  return `lab(${l} ${a} ${b})` as CssColor<"lab">;
};

export { xyz50ToLab, labToXyz50, labToCss };
