import type { ColorSpace, ColorMode } from "./types";

const color: {
  [Key in ColorMode | "default"]: [
    [number, number],
    [number, number],
    [number, number],
  ];
} = {
  rgb: [
    [0, 1],
    [0, 1],
    [0, 1],
  ],
  hsl: [
    [0, 360],
    [0.48, 0.96],
    [0.32, 0.72],
  ],
  hwb: [
    [0, 360],
    [0, 0.36],
    [0, 0.24],
  ],
  lab: [
    [20, 80],
    [-100, 100],
    [-100, 100],
  ],
  lch: [
    [48, 96],
    [70, 140],
    [0, 360],
  ],
  oklab: [
    [0.2, 0.8],
    [-0.4, 0.4],
    [-0.4, 0.4],
  ],
  oklch: [
    [0.2, 0.8],
    [0.2, 0.4],
    [0, 360],
  ],
  default: [
    [0, 255],
    [0, 255],
    [0, 255],
  ],
};

const range = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

const randomColor = <T extends ColorMode>(mode: T): ColorSpace<T> => {
  const gamut = color[mode] || color.default;
  const c = range(gamut[0][0], gamut[0][1]);
  const t = range(gamut[1][0], gamut[1][1]);
  const x = range(gamut[2][0], gamut[2][1]);
  return [c, t, x] as ColorSpace<T>;
};

export { randomColor };
