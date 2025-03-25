import type { ColorFormat, ColorMode } from "./types";

const int = (value: string, radix?: number): number => {
  return Number.parseInt(value, radix);
};

const float = (value: string): number => {
  return Number.parseFloat(value);
};

const clamp = (value: number, min = 0, max = 1): number => {
  return Math.max(min, Math.min(max, value));
};

const round = (value: number, float = 0): number => {
  if (float === 0) {
    return Math.round(value);
  }
  const digit = 10 ** float;
  return Math.round(value * digit) / digit;
};

const nearest = <T extends ColorMode>(input: ColorFormat<T>, float = 0): ColorFormat<T> => {
  let [mode, c, t, x] = input;

  const rgbGamut = 255;
  const hsvGamut = 100;

  if (mode === "rgb") {
    c = round(clamp(c) * rgbGamut, float);
    t = round(clamp(t) * rgbGamut, float);
    x = round(clamp(x) * rgbGamut, float);
  } else if (mode === "hsl" || mode === "hwb") {
    c = round(c, float);
    t = round(clamp(t) * hsvGamut, float);
    x = round(clamp(x) * hsvGamut, float);
  } else {
    c = round(c, float);
    t = round(t, float);
    x = round(x, float);
  }

  return [mode, c, t, x];
};

type UnaryFunction<T, R> = (arg: T) => R;

const compose = <R>(...fns: UnaryFunction<any, any>[]): UnaryFunction<any, R> => {
  return (x: any) => fns.reduceRight((acc, fn) => fn(acc), x) as R;
};

export { int, float, clamp, round, nearest, compose };
