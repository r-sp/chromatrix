import type { ColorKind, ColorSpace, CssColor, ExcludeKind } from "./types";

const extract = <T extends ColorKind, V extends ExcludeKind<T>>(
  input: ColorSpace<T>,
  fn: (c: number, t: number, x: number) => ColorSpace<V>,
) => {
  return fn(input[0], input[1], input[2]);
};

const isolate = <T extends ColorKind>(
  input: ColorSpace<T>,
  fn: (c: number, t: number, x: number) => CssColor<T>,
) => {
  return fn(input[0], input[1], input[2]);
};

const { round, pow, min, max, abs, sign, cbrt } = Math;
const power = pow;
const minimal = min;
const maximal = max;
const absolute = abs;
const signature = sign;
const cuberoot = cbrt;

const normalize = (value: number, float: number = 0): number => {
  if (float === 0) {
    return round(value);
  }
  const digit = pow(10, float);
  return round(value * digit) / digit;
};

const nearest = <T extends ColorKind>(
  input: ColorSpace<T>,
  float: number = 0,
): ColorSpace<T> => {
  const c = normalize(input[0], float);
  const t = normalize(input[1], float);
  const x = normalize(input[2], float);
  return [c, t, x] as ColorSpace<T>;
};

const resize = (input: number, scale: number) => {
  return scale !== 0 ? input * scale : input;
};

const multiply = <T extends ColorKind>(
  input: ColorSpace<T>,
  scale: [number, number, number],
): ColorSpace<T> => {
  const c = resize(input[0], scale[0]);
  const t = resize(input[1], scale[1]);
  const x = resize(input[2], scale[2]);
  return [c, t, x] as ColorSpace<T>;
};

const clamp = (value: number, min: number = 0, max: number = 1): number => {
  return value > max ? max : value < min ? min : value;
};

export {
  extract,
  isolate,
  nearest,
  multiply,
  minimal,
  maximal,
  absolute,
  signature,
  cuberoot,
  power,
  clamp,
};
