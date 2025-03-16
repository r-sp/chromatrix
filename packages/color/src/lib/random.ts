import type { ColorMode, ColorSpace } from "../types";
import { convertColor } from "./convert";
import { colorKind, colorRange } from "./gamut";

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
  const index = Array.from({ length: colorKind.length }, (_, i) => i);
  const shuffle: number[] = [];

  let i = index.length;
  while (i > 0) {
    const token = Math.floor(createToken(prng, 0, i));
    shuffle.push(index.splice(token, 1)[0] || 0);
    i--;
  }

  let mode: ColorMode = "rgb";
  for (const color of shuffle) {
    mode = colorKind[color] || mode;
  }

  return mode;
};

const shuffleColor = (prng: { token: () => number }): [
  {
    [T in ColorMode]: ColorSpace<T>;
  },
  ColorMode,
] => {
  const mode = randomMode(prng);
  const current = randomColor(mode, prng);
  let color: { [I in ColorMode]: ColorSpace<I> };

  switch (mode) {
    case "rgb": {
      const rgb = current as ColorSpace<"rgb">;
      color = {
        rgb: rgb,
        hsl: convertColor(rgb, "hsl"),
        hwb: convertColor(rgb, "hwb"),
        lab: convertColor(rgb, "lab"),
        lch: convertColor(rgb, "lch"),
        oklab: convertColor(rgb, "oklab"),
        oklch: convertColor(rgb, "oklch"),
      };
      break;
    }
    case "hsl": {
      const hsl = current as ColorSpace<"hsl">;
      color = {
        rgb: convertColor(hsl, "rgb"),
        hsl: hsl,
        hwb: convertColor(hsl, "hwb"),
        lab: convertColor(hsl, "lab"),
        lch: convertColor(hsl, "lch"),
        oklab: convertColor(hsl, "oklab"),
        oklch: convertColor(hsl, "oklch"),
      };
      break;
    }
    case "hwb": {
      const hwb = current as ColorSpace<"hwb">;
      color = {
        rgb: convertColor(hwb, "rgb"),
        hsl: convertColor(hwb, "hsl"),
        hwb: hwb,
        lab: convertColor(hwb, "lab"),
        lch: convertColor(hwb, "lch"),
        oklab: convertColor(hwb, "oklab"),
        oklch: convertColor(hwb, "oklch"),
      };
      break;
    }
    case "lab": {
      const lab = current as ColorSpace<"lab">;
      color = {
        rgb: convertColor(lab, "rgb"),
        hsl: convertColor(lab, "hsl"),
        hwb: convertColor(lab, "hwb"),
        lab: lab,
        lch: convertColor(lab, "lch"),
        oklab: convertColor(lab, "oklab"),
        oklch: convertColor(lab, "oklch"),
      };
      break;
    }
    case "lch": {
      const lch = current as ColorSpace<"lch">;
      color = {
        rgb: convertColor(lch, "rgb"),
        hsl: convertColor(lch, "hsl"),
        hwb: convertColor(lch, "hwb"),
        lab: convertColor(lch, "lab"),
        lch: lch,
        oklab: convertColor(lch, "oklab"),
        oklch: convertColor(lch, "oklch"),
      };
      break;
    }
    case "oklab": {
      const oklab = current as ColorSpace<"oklab">;
      color = {
        rgb: convertColor(oklab, "rgb"),
        hsl: convertColor(oklab, "hsl"),
        hwb: convertColor(oklab, "hwb"),
        lab: convertColor(oklab, "lab"),
        lch: convertColor(oklab, "lch"),
        oklab: oklab,
        oklch: convertColor(oklab, "oklch"),
      };
      break;
    }
    case "oklch": {
      const oklch = current as ColorSpace<"oklch">;
      color = {
        rgb: convertColor(oklch, "rgb"),
        hsl: convertColor(oklch, "hsl"),
        hwb: convertColor(oklch, "hwb"),
        lab: convertColor(oklch, "lab"),
        lch: convertColor(oklch, "lch"),
        oklab: convertColor(oklch, "oklab"),
        oklch: oklch,
      };
      break;
    }
  }

  return [color, mode];
};

export { createPRNG, createToken, randomColor, randomMode, shuffleColor };
