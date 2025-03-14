import type { ColorMode } from "../types";

const colorGamut: {
  [T in ColorMode]: [[number, number], [number, number], [number, number]];
} = {
  rgb: [
    [0, 255],
    [0, 255],
    [0, 255],
  ],
  hsl: [
    [0, 360],
    [0, 100],
    [0, 100],
  ],
  hwb: [
    [0, 360],
    [0, 100],
    [0, 100],
  ],
  lab: [
    [0, 100],
    [-100, 100],
    [-100, 100],
  ],
  lch: [
    [0, 100],
    [0, 150],
    [0, 360],
  ],
  oklab: [
    [0, 1],
    [-0.4, 0.4],
    [-0.4, 0.4],
  ],
  oklch: [
    [0, 1],
    [0, 0.4],
    [0, 360],
  ],
};

const colorRange: {
  [T in ColorMode]: [[number, number], [number, number], [number, number]];
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
};

export { colorGamut, colorRange };
