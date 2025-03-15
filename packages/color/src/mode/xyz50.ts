import type { ColorSpace } from "../types";

const lrgbToXyz50 = (input: ColorSpace<"lrgb">): ColorSpace<"xyz50"> => {
  const [, lr, lg, lb] = input;

  const x = 0.436065742824811 * lr + 0.3851514688337912 * lg + 0.14307845442264197 * lb;
  const y = 0.22249319175623702 * lr + 0.7168870538238823 * lg + 0.06061979053616537 * lb;
  const z = 0.013923904500943465 * lr + 0.09708128566574634 * lg + 0.7140993584005155 * lb;

  return ["xyz50", x, y, z] as ColorSpace<"xyz50">;
};

const xyz50ToLrgb = (input: ColorSpace<"xyz50">): ColorSpace<"lrgb"> => {
  const [, x, y, z] = input;

  const lr = x * 3.1341359569958707 - y * 1.6173863321612538 - 0.4906619460083532 * z;
  const lg = x * -0.978795502912089 + y * 1.916254567259524 + 0.03344273116131949 * z;
  const lb = x * 0.07195537988411677 - y * 0.2289768264158322 + 1.405386058324125 * z;

  return ["lrgb", lr, lg, lb] as ColorSpace<"lrgb">;
};

export { lrgbToXyz50, xyz50ToLrgb };
