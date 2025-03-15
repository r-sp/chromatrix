import type { ColorSpace } from "../types";

const lrgbToOklab = (input: ColorSpace<"lrgb">): ColorSpace<"oklab"> => {
  const [, lr, lg, lb] = input;

  const L = Math.cbrt(0.41222147079999993 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const M = Math.cbrt(0.2119034981999999 * lr + 0.6806995450999999 * lg + 0.1073969566 * lb);
  const S = Math.cbrt(0.08830246189999998 * lr + 0.2817188376 * lg + 0.6299787005000002 * lb);

  const l = 0.2104542553 * L + 0.793617785 * M - 0.0040720468 * S;
  const a = 1.9779984951 * L - 2.428592205 * M + 0.4505937099 * S;
  const b = 0.0259040371 * L + 0.7827717662 * M - 0.808675766 * S;

  return ["oklab", l, a, b] as ColorSpace<"oklab">;
};

const oklabToLrgb = (input: ColorSpace<"oklab">): ColorSpace<"lrgb"> => {
  const [, l, a, b] = input;

  const L =
    (l * 0.99999999845051981432 + 0.39633779217376785678 * a + 0.21580375806075880339 * b) ** 3;
  const M =
    (l * 1.0000000088817607767 - 0.1055613423236563494 * a - 0.063854174771705903402 * b) ** 3;
  const S =
    (l * 1.0000000546724109177 - 0.089484182094965759684 * a - 1.2914855378640917399 * b) ** 3;

  const lr = +4.076741661347994 * L - 3.307711590408193 * M + 0.230969928729428 * S;
  const lg = -1.2684380040921763 * L + 2.6097574006633715 * M - 0.3413193963102197 * S;
  const lb = -0.004196086541837188 * L - 0.7034186144594493 * M + 1.7076147009309444 * S;

  return ["lrgb", lr, lg, lb] as ColorSpace<"lrgb">;
};

export { lrgbToOklab, oklabToLrgb };
