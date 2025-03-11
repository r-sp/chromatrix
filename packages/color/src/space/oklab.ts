import type { ColorSpace, CssColor } from "../types";

const lrgbToOklab = (r: number, g: number, b: number): ColorSpace<"oklab"> => {
  const matrix: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number],
  ] = [
    [0.41222147079999993, 0.5363325363, 0.0514459929],
    [0.2119034981999999, 0.6806995450999999, 0.1073969566],
    [0.08830246189999998, 0.2817188376, 0.6299787005000002],
    [0.2104542553, 0.793617785, 0.0040720468],
    [1.9779984951, 2.428592205, 0.4505937099],
    [0.0259040371, 0.7827717662, 0.808675766],
  ];
  const L = Math.cbrt(matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b);
  const M = Math.cbrt(matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b);
  const S = Math.cbrt(matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b);
  const c = matrix[3][0] * L + matrix[3][1] * M - matrix[3][2] * S;
  const t = matrix[4][0] * L - matrix[4][1] * M + matrix[4][2] * S;
  const x = matrix[5][0] * L + matrix[5][1] * M - matrix[5][2] * S;
  return [c, t, x] as ColorSpace<"oklab">;
};

const oklabToLrgb = (l: number, a: number, b: number): ColorSpace<"lrgb"> => {
  const matrix: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number],
    [number, number, number],
  ] = [
    [0.99999999845051981432, 0.39633779217376785678, 0.21580375806075880339],
    [1.0000000088817607767, 0.1055613423236563494, 0.063854174771705903402],
    [1.0000000546724109177, 0.089484182094965759684, 1.2914855378640917399],
    [+4.076741661347994, 3.307711590408193, 0.230969928729428],
    [-1.2684380040921763, 2.6097574006633715, 0.3413193963102197],
    [-0.004196086541837188, 0.7034186144594493, 1.7076147009309444],
  ];
  const L = Math.pow(l * matrix[0][0] + matrix[0][1] * a + matrix[0][2] * b, 3);
  const M = Math.pow(l * matrix[1][0] - matrix[1][1] * a - matrix[1][2] * b, 3);
  const S = Math.pow(l * matrix[2][0] - matrix[2][1] * a - matrix[2][2] * b, 3);
  const c = matrix[3][0] * L - matrix[3][1] * M + matrix[3][2] * S;
  const t = matrix[4][0] * L + matrix[4][1] * M - matrix[4][2] * S;
  const x = matrix[5][0] * L - matrix[5][1] * M + matrix[5][2] * S;
  return [c, t, x] as ColorSpace<"lrgb">;
};

const oklabToCss = (l: number, a: number, b: number): CssColor<"oklab"> => {
  return `oklab(${l} ${a} ${b})` as CssColor<"oklab">;
};

export { lrgbToOklab, oklabToLrgb, oklabToCss };
