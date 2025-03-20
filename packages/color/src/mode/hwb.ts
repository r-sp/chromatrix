import type { ColorFn, ColorSpace } from "../types";

const hsvToHwb: ColorFn<"hsv", "hwb"> = (input) => {
  const [h, s, v] = input;

  const w = (1 - s) * v;
  const b = 1 - v;

  return [h, w, b] as ColorSpace<"hwb">;
};

const hwbToHsv: ColorFn<"hwb", "hsv"> = (input) => {
  const [h, w, b] = input;

  const v = 1 - b;
  let s: number;

  if (v === 0) {
    s = 0;
  } else {
    s = 1 - w / v;
  }

  return [h, s, v] as ColorSpace<"hsv">;
};

export { hsvToHwb, hwbToHsv };
