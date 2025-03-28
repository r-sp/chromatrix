import { testing } from "./utils";

const { random, interpolate, iteration, round } = testing;

const input = random.ext();
const output: ReturnType<typeof interpolate.shuffle>[] = [];

console.time("benchmark");

for (let i = 0; i < iteration; i++) {
  output.push(interpolate.shuffle(input));
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const parse = output[0]!;

console.timeLog("benchmark", {
  mode: input[0],
  rgb: round(parse.rgb, 3),
  hsl: round(parse.hsl, 3),
  hwb: round(parse.hwb, 3),
  lab: round(parse.lab, 3),
  lch: round(parse.lch, 3),
  oklab: round(parse.oklab, 3),
  oklch: round(parse.oklch, 3),
});
