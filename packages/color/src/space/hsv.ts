import type { ColorSpace } from "../types";
import { minimal, maximal, absolute } from "../utils";

const rgbToHsv = (r: number, g: number, b: number): ColorSpace<"hsv"> => {
  const max = maximal(r, g, b);
  const min = minimal(r, g, b);
  const delta = max - min;
  let h: number, s: number, v: number;
  if (delta === 0) {
    h = 0;
  } else if (max === r) {
    h = ((g - b) / delta) % 6;
  } else if (max === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }
  h *= 60;
  if (h < 0) {
    h += 360;
  }
  if (max === 0) {
    s = 0;
  } else {
    s = delta / max;
  }
  v = max;
  return [h, s, v] as ColorSpace<"hsv">;
};

const hsvToRgb = (h: number, s: number, v: number): ColorSpace<"rgb"> => {
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = v;
  } else {
    const u = v * s;
    const i = u * (1 - absolute(((h / 60) % 2) - 1));
    const o = v - u;
    let c: number, t: number, x: number;
    if (h < 60) {
      c = u;
      t = i;
      x = 0;
    } else if (h < 120) {
      c = i;
      t = u;
      x = 0;
    } else if (h < 180) {
      c = 0;
      t = u;
      x = i;
    } else if (h < 240) {
      c = 0;
      t = i;
      x = u;
    } else if (h < 300) {
      c = i;
      t = 0;
      x = u;
    } else {
      c = u;
      t = 0;
      x = i;
    }
    r = c + o;
    g = t + o;
    b = x + o;
  }
  return [r, g, b] as ColorSpace<"rgb">;
};

export { rgbToHsv, hsvToRgb };
