import { createPRNG, randomColor, randomMode } from "@repo/color/fn";
import { nearest } from "@repo/color/utils";
import { shuffleColor } from "../lib/shuffle";

const date = new Date();
const seconds = date.getSeconds();
const minutes = date.getMinutes();

const token = createPRNG(seconds + minutes);
const mode = randomMode(token);
const input = randomColor(mode, token);

console.time("benchmark");

const output = shuffleColor(input);

console.timeLog("benchmark", {
  mode,
  rgb: nearest(output.rgb, 3),
  hsl: nearest(output.hsl, 3),
  hwb: nearest(output.hwb, 3),
  lab: nearest(output.lab, 3),
  lch: nearest(output.lch, 3),
  oklab: nearest(output.oklab, 3),
  oklch: nearest(output.oklch, 3),
});
