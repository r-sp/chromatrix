import type { ColorFormat, ColorMode } from "@repo/color/types";
import { convertColor, convertHue } from "@repo/color/convert";
import { rgbToHex } from "@repo/color/fn";
import { checkGamut, colorKind } from "@repo/color/gamut";
import { createHarmony } from "@repo/color/harmony";
import { createScales, createShades } from "@repo/color/interpolate";
import { createParams, getColor, getParams, getValues } from "@repo/color/params";
import { parseColor, parseCss } from "@repo/color/parse";
import { createPRNG, createToken, randomColor, randomMode } from "@repo/color/random";
import { nearest } from "@repo/color/utils";

const getToken = (): { token: () => number } => {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();

  return createPRNG(seconds + minutes);
};

const getTokens = (): [{ token: () => number }, { token: () => number }] => {
  const date = new Date();
  const local = date.getSeconds() + date.getMinutes();
  const time = date.getTime();

  return [createPRNG(local), createPRNG(time)];
};

const shuffleConverter: {
  [T in ColorMode]: (input: ColorFormat<T>) => { [R in ColorMode]: ColorFormat<R> };
} = {
  rgb: (input) => ({
    rgb: input,
    hsl: convertColor(input, "hsl"),
    hwb: convertColor(input, "hwb"),
    lab: convertColor(input, "lab"),
    lch: convertColor(input, "lch"),
    oklab: convertColor(input, "oklab"),
    oklch: convertColor(input, "oklch"),
  }),
  hsl: (input) => ({
    rgb: convertColor(input, "rgb"),
    hsl: input,
    hwb: convertColor(input, "hwb"),
    lab: convertColor(input, "lab"),
    lch: convertColor(input, "lch"),
    oklab: convertColor(input, "oklab"),
    oklch: convertColor(input, "oklch"),
  }),
  hwb: (input) => ({
    rgb: convertColor(input, "rgb"),
    hsl: convertColor(input, "hsl"),
    hwb: input,
    lab: convertColor(input, "lab"),
    lch: convertColor(input, "lch"),
    oklab: convertColor(input, "oklab"),
    oklch: convertColor(input, "oklch"),
  }),
  lab: (input) => ({
    rgb: convertColor(input, "rgb"),
    hsl: convertColor(input, "hsl"),
    hwb: convertColor(input, "hwb"),
    lab: input,
    lch: convertColor(input, "lch"),
    oklab: convertColor(input, "oklab"),
    oklch: convertColor(input, "oklch"),
  }),
  lch: (input) => ({
    rgb: convertColor(input, "rgb"),
    hsl: convertColor(input, "hsl"),
    hwb: convertColor(input, "hwb"),
    lab: convertColor(input, "lab"),
    lch: input,
    oklab: convertColor(input, "oklab"),
    oklch: convertColor(input, "oklch"),
  }),
  oklab: (input) => ({
    rgb: convertColor(input, "rgb"),
    hsl: convertColor(input, "hsl"),
    hwb: convertColor(input, "hwb"),
    lab: convertColor(input, "lab"),
    lch: convertColor(input, "lch"),
    oklab: input,
    oklch: convertColor(input, "oklch"),
  }),
  oklch: (input) => ({
    rgb: convertColor(input, "rgb"),
    hsl: convertColor(input, "hsl"),
    hwb: convertColor(input, "hwb"),
    lab: convertColor(input, "lab"),
    lch: convertColor(input, "lch"),
    oklab: convertColor(input, "oklab"),
    oklch: input,
  }),
};

const shuffleColor = <T extends ColorMode>(input: ColorFormat<T>): { [I in ColorMode]: ColorFormat<I> } => {
  return shuffleConverter[input[0]](input);
};

const testing = {
  iteration: 1000,
  random: {
    color: <T extends ColorMode>(kind: T) => {
      const token = getToken();
      return randomColor(kind, token);
    },
    conversion: (): [ColorFormat<"rgb">, Exclude<ColorMode, "rgb">] => {
      const token = getToken();
      const mode = randomMode(token) as "rgb";
      const color = randomColor(mode, token);

      const index = colorKind.filter((current) => current !== mode);
      const shuffle = randomMode(token, index) as Exclude<ColorMode, "rgb">;

      return [color, shuffle];
    },
    mode: () => {
      const token = getToken();
      return randomMode(token);
    },
    ext: () => {
      const token = getToken();
      const mode = randomMode(token);
      return randomColor(mode, token);
    },
    hex: () => {
      const token = getToken();
      const color = randomColor("rgb", token);
      const gamut = nearest(color);
      return rgbToHex(gamut);
    },
    duotone: (): [string, string] => {
      const token = getTokens();
      const startColor = randomColor("rgb", token[0]);
      const endColor = randomColor("rgb", token[1]);

      const startHex = rgbToHex(nearest(startColor));
      const endHex = rgbToHex(nearest(endColor));

      return [startHex, endHex];
    },
    range: (min: number, max: number): ColorFormat<ColorMode> => {
      const token = getToken();
      const mode = randomMode(token);

      const c = createToken(token, min, max);
      const t = createToken(token, min, max);
      const x = createToken(token, min, max);

      return [mode, c, t, x];
    },
  },
  round: nearest,
  converter: {
    color: convertColor,
    hue: convertHue,
    hex: rgbToHex,
    gamut: checkGamut,
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
