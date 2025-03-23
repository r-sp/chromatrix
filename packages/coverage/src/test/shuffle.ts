import { randomColor, randomMode } from "@repo/color/fn";
import { nearest } from "@repo/color/utils";
import { shuffleColor } from "../lib/shuffle";
import { createToken } from "../utils";

const token = createToken();
const mode = randomMode(token);
const input = randomColor(mode, token);
const output: ReturnType<typeof shuffleColor>[] = [];

console.time("benchmark");

for (let i = 0; i < 1000; i++) {
  output.push(shuffleColor(input));
}

console.timeLog("benchmark", {
  mode,

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  rgb: nearest(output[0]!.rgb, 3),

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  hsl: nearest(output[0]!.hsl, 3),

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  hwb: nearest(output[0]!.hwb, 3),

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  lab: nearest(output[0]!.lab, 3),

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  lch: nearest(output[0]!.lch, 3),

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  oklab: nearest(output[0]!.oklab, 3),

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  oklch: nearest(output[0]!.oklch, 3),
});
