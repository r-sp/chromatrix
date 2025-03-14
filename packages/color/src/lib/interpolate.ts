import type { ColorSpace } from "../types";
import { hexToRgb } from "../mode/rgb";

const createShades = (
  start: string,
  end: string,
  steps: number,
): ColorSpace<"rgb">[] => {
  const interpolate: ColorSpace<"rgb">[] = [];
  const [rs, gs, bs] = hexToRgb(start);
  const [re, ge, be] = hexToRgb(end);

  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);

    const r = rs + (re - rs) * ratio;
    const g = gs + (ge - gs) * ratio;
    const b = bs + (be - bs) * ratio;

    interpolate.push([r, g, b] as ColorSpace<"rgb">);
  }

  return interpolate;
};

const createScales = (input: string[], steps: number): ColorSpace<"rgb">[] => {
  const interpolate: ColorSpace<"rgb">[] = [];

  for (let i = 0; i < input.length - 1; i++) {
    const startColor = input[i] || "";
    const endColor = input[i + 1] || "";
    const segmentColor = createShades(startColor, endColor, steps);

    interpolate.push(...segmentColor);
  }

  return interpolate.filter(
    (_, index, arr) => index > 0 && index < arr.length - 1,
  );
};

export { createShades, createScales };
