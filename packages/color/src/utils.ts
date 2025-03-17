import type { ColorMode, ColorSpace } from "./types";

const clamp = (value: number, min = 0, max = 1) => {
  return value > max ? max : value < min ? min : value;
};

const round = (value: number, float = 0): number => {
  if (float === 0) {
    return Math.round(value);
  }
  const digit = 10 ** float;
  return Math.round(value * digit) / digit;
};

const nearest = <T extends ColorMode>(input: ColorSpace<T>, float = 0): ColorSpace<T> => {
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

export { clamp, round, nearest };
