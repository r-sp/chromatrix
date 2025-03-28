import { testing } from "./utils";

const { random, interpolate, iteration, converter } = testing;

const input = random.duotone();
const output: ReturnType<typeof interpolate.shades>[] = [];

console.time("benchmark");

for (let i = 0; i < iteration; i++) {
  output.push(interpolate.shades(input[0], input[1], 6 + i));
}

console.timeLog("benchmark", {
  output: output[0]?.map((c) => converter.hex(c)),
  length: output[0]?.length,
});
