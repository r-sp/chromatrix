import type { ColorMode, ColorFormat } from "../types";
import { colorRange } from "./gamut";

const createPRNG = (value: number): { token: () => number } => {
  let current = value;

  const c = 1664525;
  const t = 1013904223;
  const x = Math.pow(2, 32);

  return {
    token: () => {
      current = (c * current + t) % x;
      return current / x;
    },
  };
};

const createToken = (
  prng: { token: () => number },
  min: number,
  max: number,
): number => {
  return prng.token() * (max - min) + min;
};

const randomColor = <T extends ColorMode>(
  mode: T,
  prng: { token: () => number },
): ColorFormat<T> => {
  const [cr, tr, xr] = colorRange[mode];

  const c = createToken(prng, cr[0], cr[1]);
  const t = createToken(prng, tr[0], tr[1]);
  const x = createToken(prng, xr[0], xr[1]);

  return [mode, c, t, x] as ColorFormat<T>;
};

export { createPRNG, createToken, randomColor };
