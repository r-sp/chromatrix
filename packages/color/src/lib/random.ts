import type { ColorMode, ColorSpace } from "../types";
import { colorRange } from "./gamut";

const createPRNG = (value: number): { token: () => number } => {
  let current = value;

  const c = 1664525;
  const t = 1013904223;
  const x = 2 ** 32;

  return {
    token: () => {
      current = (c * current + t) % x;
      return current / x;
    },
  };
};

const createToken = (prng: { token: () => number }, min: number, max: number): number => {
  return prng.token() * (max - min) + min;
};

const randomColor = <T extends ColorMode>(
  mode: T,
  prng: { token: () => number },
): ColorSpace<T> => {
  const [cr, tr, xr] = colorRange[mode];

  const c = createToken(prng, cr[0], cr[1]);
  const t = createToken(prng, tr[0], tr[1]);
  const x = createToken(prng, xr[0], xr[1]);

  return [mode, c, t, x] as ColorSpace<T>;
};

const randomMode = (prng: { token: () => number }): ColorMode => {
  const base: ColorMode[] = ["rgb", "hsl", "hwb", "lab", "lch", "oklab", "oklch"];

  const index = Array.from({ length: base.length }, (_, i) => i);
  const shuffle: number[] = [];

  let i = index.length;
  while (i > 0) {
    const token = Math.floor(createToken(prng, 0, i));
    shuffle.push(index.splice(token, 1)[0] || 0);
    i--;
  }

  let mode: ColorMode = "rgb";
  for (const color of shuffle) {
    mode = base[color] || mode;
  }

  return mode;
};

export { createPRNG, createToken, randomColor, randomMode };
