import {
  convertColor,
  convertHue,
  createHarmony,
  createPRNG,
  createParams,
  createScales,
  createShades,
  getColor,
  getParams,
  getValues,
  nearest,
  parseColor,
  parseCss,
  randomColor,
  randomMode,
  rgbToHex,
} from "@repo/color/fn";
import type { ColorFormat, ColorMode } from "@repo/color/types";

const createToken = (): { token: () => number } => {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();

  return createPRNG(seconds + minutes);
};

const createTokens = (): [{ token: () => number }, { token: () => number }] => {
  const date = new Date();
  const local = date.getSeconds() + date.getMinutes();
  const time = date.getTime();

  return [createPRNG(local), createPRNG(time)];
};

const shuffleColor = <T extends ColorMode>(input: ColorFormat<T>): { [I in ColorMode]: ColorFormat<I> } => {
  switch (input[0]) {
    case "rgb": {
      const rgb = input as ColorFormat<"rgb">;
      return {
        rgb: rgb,
        hsl: convertColor(rgb, "hsl"),
        hwb: convertColor(rgb, "hwb"),
        lab: convertColor(rgb, "lab"),
        lch: convertColor(rgb, "lch"),
        oklab: convertColor(rgb, "oklab"),
        oklch: convertColor(rgb, "oklch"),
      };
    }
    case "hsl": {
      const hsl = input as ColorFormat<"hsl">;
      return {
        rgb: convertColor(hsl, "rgb"),
        hsl: hsl,
        hwb: convertColor(hsl, "hwb"),
        lab: convertColor(hsl, "lab"),
        lch: convertColor(hsl, "lch"),
        oklab: convertColor(hsl, "oklab"),
        oklch: convertColor(hsl, "oklch"),
      };
    }
    case "hwb": {
      const hwb = input as ColorFormat<"hwb">;
      return {
        rgb: convertColor(hwb, "rgb"),
        hsl: convertColor(hwb, "hsl"),
        hwb: hwb,
        lab: convertColor(hwb, "lab"),
        lch: convertColor(hwb, "lch"),
        oklab: convertColor(hwb, "oklab"),
        oklch: convertColor(hwb, "oklch"),
      };
    }
    case "lab": {
      const lab = input as ColorFormat<"lab">;
      return {
        rgb: convertColor(lab, "rgb"),
        hsl: convertColor(lab, "hsl"),
        hwb: convertColor(lab, "hwb"),
        lab: lab,
        lch: convertColor(lab, "lch"),
        oklab: convertColor(lab, "oklab"),
        oklch: convertColor(lab, "oklch"),
      };
    }
    case "lch": {
      const lch = input as ColorFormat<"lch">;
      return {
        rgb: convertColor(lch, "rgb"),
        hsl: convertColor(lch, "hsl"),
        hwb: convertColor(lch, "hwb"),
        lab: convertColor(lch, "lab"),
        lch: lch,
        oklab: convertColor(lch, "oklab"),
        oklch: convertColor(lch, "oklch"),
      };
    }
    case "oklab": {
      const oklab = input as ColorFormat<"oklab">;
      return {
        rgb: convertColor(oklab, "rgb"),
        hsl: convertColor(oklab, "hsl"),
        hwb: convertColor(oklab, "hwb"),
        lab: convertColor(oklab, "lab"),
        lch: convertColor(oklab, "lch"),
        oklab: oklab,
        oklch: convertColor(oklab, "oklch"),
      };
    }
    case "oklch": {
      const oklch = input as ColorFormat<"oklch">;
      return {
        rgb: convertColor(oklch, "rgb"),
        hsl: convertColor(oklch, "hsl"),
        hwb: convertColor(oklch, "hwb"),
        lab: convertColor(oklch, "lab"),
        lch: convertColor(oklch, "lch"),
        oklab: convertColor(oklch, "oklab"),
        oklch: oklch,
      };
    }
  }
};

const testing = {
  iteration: 1000,
  random: {
    color: <T extends ColorMode>(kind: T) => randomColor(kind, createToken()),
    mode: () => randomMode(createToken()),
    ext: () => {
      const token = createToken();
      const mode = randomMode(token);
      return randomColor(mode, token);
    },
    hex: () => rgbToHex(nearest(randomColor("rgb", createToken()))),
    duotone: (): [string, string] => {
      const token = createTokens();
      const startColor = randomColor("rgb", token[0]);
      const endColor = randomColor("rgb", token[1]);

      const startHex = rgbToHex(nearest(startColor));
      const endHex = rgbToHex(nearest(endColor));

      return [startHex, endHex];
    },
  },
  round: nearest,
  converter: {
    color: convertColor,
    hue: convertHue,
    hex: rgbToHex,
  },
  parser: {
    color: parseColor,
    css: parseCss,
  },
  interpolate: {
    harmony: createHarmony,
    shades: createShades,
    scales: createScales,
    shuffle: shuffleColor,
  },
  parameters: {
    create: createParams,
    extract: getParams,
    value: getValues,
    color: getColor,
  },
};

export { testing };
