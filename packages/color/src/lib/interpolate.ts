import { hexToRgb } from "../mode/rgb";
import type { ColorFormat } from "../types";

const createShades = (startColor: string, endColor: string, steps: number): ColorFormat<"rgb">[] => {
  const start = hexToRgb(startColor);
  const end = hexToRgb(endColor);

  const interpolate: ColorFormat<"rgb">[] = [];
  const total = steps - 1;

  for (let i = 0; i < steps; i++) {
    const ratio = total === 0 ? 0 : i / total;

    const r = Math.round(start[1] + (end[1] - start[1]) * ratio);
    const g = Math.round(start[2] + (end[2] - start[2]) * ratio);
    const b = Math.round(start[3] + (end[3] - start[3]) * ratio);

    interpolate.push(["rgb", r, g, b]);
  }

  return interpolate;
};

const createScales = (shades: string[], steps: number): ColorFormat<"rgb">[] => {
  const total = shades.length - 1;
  const ratio = Math.ceil(steps / total);

  const interpolate: ColorFormat<"rgb">[] = [];

  for (let i = 0; i < total; i++) {
    const startColor = shades[i] || "";
    const endColor = shades[i + 1] || "";

    interpolate.push(...createShades(startColor, endColor, ratio));
  }

  const seen = new Set<string>();
  const scales: ColorFormat<"rgb">[] = interpolate.filter((color) => {
    const rgb = JSON.stringify(color);

    if (seen.has(rgb)) {
      return false;
    }

    seen.add(rgb);
    return true;
  });

  if (scales.length > steps) {
    scales.splice(steps);
  }

  return scales;
};

export { createShades, createScales };
