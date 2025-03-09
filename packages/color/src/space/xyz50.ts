import type { ColorSpace } from "../types";

const lrgbToXyz50 = (r: number, g: number, b: number): ColorSpace<"xyz50"> => {
  const matrix: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
  ] = [
    [0.436065742824811, 0.3851514688337912, 0.14307845442264197],
    [0.22249319175623702, 0.7168870538238823, 0.06061979053616537],
    [0.013923904500943465, 0.09708128566574634, 0.7140993584005155],
  ];
  const x = matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b;
  const y = matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b;
  const z = matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b;
  return [x, y, z] as ColorSpace<"xyz50">;
};

const xyz50ToLrgb = (x: number, y: number, z: number): ColorSpace<"lrgb"> => {
  const matrix: [
    [number, number, number],
    [number, number, number],
    [number, number, number],
  ] = [
    [3.1341359569958707, 1.6173863321612538, 0.4906619460083532],
    [-0.978795502912089, 1.916254567259524, 0.03344273116131949],
    [0.07195537988411677, 0.2289768264158322, 1.405386058324125],
  ];
  const r = x * matrix[0][0] - y * matrix[0][1] - matrix[0][2] * z;
  const g = x * matrix[1][0] + y * matrix[1][1] + matrix[1][2] * z;
  const b = x * matrix[2][0] - y * matrix[2][1] + matrix[2][2] * z;
  return [r, g, b] as ColorSpace<"lrgb">;
};

export { lrgbToXyz50, xyz50ToLrgb };
