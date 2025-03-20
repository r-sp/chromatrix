import type { ColorFormat, ColorMode } from "./types";

const clamp = (value: number, min = 0, max = 1): number => {
  return value > max ? max : value < min ? min : value;
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

  if (mode === "rgb") {
    c = clamp(c);
    t = clamp(t);
    x = clamp(x);
    c *= 255;
    t *= 255;
    x *= 255;
  } else if (mode === "hsl" || mode === "hwb") {
    t = clamp(t);
    x = clamp(x);
    t *= 100;
    x *= 100;
  }

  c = round(c, float);
  t = round(t, float);
  x = round(x, float);

  return [mode, c, t, x];
};

type UnaryFunction<T, R> = (arg: T) => R;

const compose = <R>(...fns: UnaryFunction<any, any>[]): UnaryFunction<any, R> => {
  return (x: any) => fns.reduceRight((acc, fn) => fn(acc), x) as R;
};

export { clamp, round, nearest, compose };
