import type { ColorFormat, ColorMode } from "../types";
import { convertColor, convertHue } from "./convert";

const createHarmony = <T extends ColorMode>(
  input: ColorFormat<T>,
  variants: { name: string; ratio: number[] }[],
): { name: string; ratio: ColorFormat<T>[] }[] => {
  const hue = convertHue(input);
  const base = hue[0];
  const mode = input[0];

  const c = input[1];
  const t = input[2];
  const x = input[3];

  const nonHue = mode === "rgb" || mode === "lab" || mode === "oklab";
  const isHsv = base === "hsl" || base === "hwb";
  const angle = isHsv ? hue[1] : hue[3];

  const invert = (deg: number): ColorFormat<T> => {
    const h = (deg + angle) % 360;

    const color = nonHue
      ? isHsv
        ? (convertColor([base, h, t, x], mode) as ColorFormat<"rgb">)
        : (convertColor([base, c, t, h], mode) as ColorFormat<"lab" | "oklab">)
      : isHsv
        ? ([base, h, t, x] as ColorFormat<"hsl" | "hwb">)
        : ([base, c, t, h] as ColorFormat<"lch" | "oklch">);

    return color as ColorFormat<T>;
  };

  const harmony: { name: string; ratio: ColorFormat<T>[] }[] = [];

  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i] || { name: "", ratio: [] };
    const ratio: ColorFormat<T>[] = [];

    for (let r = 0; r < variant.ratio.length; r++) {
      ratio.push(invert(variant.ratio[r] || 0));
    }

    harmony.push({
      name: variant.name,
      ratio: ratio,
    });
  }

  return harmony;
};

export { createHarmony };
