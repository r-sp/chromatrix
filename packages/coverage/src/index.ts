import { createPRNG, randomColor, randomMode } from "@repo/color/fn";
import { nearest } from "@repo/color/utils";
import { shuffleColor } from "./shuffle";

const date = new Date();
const seconds = date.getSeconds();
const minutes = date.getMinutes();
const recents = seconds + minutes;

const token = createPRNG(recents);

const mode = randomMode(token);
const base = randomColor(mode, token);

console.time("benchmark");

const color = shuffleColor(base);

console.timeLog("benchmark", {
  mode,
  rgb: nearest(color.rgb, 3),
  hsl: nearest(color.hsl, 3),
  hwb: nearest(color.hwb, 3),
  lab: nearest(color.lab, 3),
  lch: nearest(color.lch, 3),
  oklab: nearest(color.oklab, 3),
  oklch: nearest(color.oklch, 3),
});
