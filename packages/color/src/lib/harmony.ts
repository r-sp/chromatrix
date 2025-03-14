import type { ColorMode, ColorFormat } from "../types";
import { convertColor, convertHue } from "./convert";

const createHarmony = <T extends ColorMode>(
  input: ColorFormat<T>,
  variants: { name: string; ratio: number[] }[],
): {
  name: string;
  ratio: ColorFormat<T>[];
}[] => {
  const [mode, c, t, x] = convertHue(input);
  const color = input[0];

  const createColor = (
    deg: number,
  ):
    | ColorFormat<"hsl" | "hwb" | "lch" | "oklch">
    | ColorFormat<"rgb" | "lab" | "oklab"> => {
    const hue = (deg + c) % 360;

    return color !== "hsl" &&
      color !== "hwb" &&
      color !== "lch" &&
      color !== "oklch"
      ? convertColor([mode, hue, t, x] as ReturnType<typeof convertHue>, color)
      : ([mode, hue, t, x] as ReturnType<typeof convertHue>);
  };

  const harmony: { name: string; ratio: ColorFormat<T>[] }[] = [];

  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i]!;
    const ratio: ColorFormat<T>[] = [];

    for (let r = 0; r < variant.ratio.length; r++) {
      ratio.push(createColor(variant.ratio[r]!) as ColorFormat<T>);
    }

    harmony.push({
      name: variant.name,
      ratio: ratio,
    });
  }

  return harmony;
};

export { createHarmony };
