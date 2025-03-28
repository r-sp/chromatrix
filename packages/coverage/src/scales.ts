import { testing } from "./utils";

const { random, interpolate, iteration, converter } = testing;

const input = random.hex();
const output: ReturnType<typeof interpolate.scales>[] = [];

console.time("benchmark");

for (let i = 0; i < iteration; i++) {
  output.push(interpolate.scales(["#ffffff", input, "#000000"], 11));
}

console.timeLog("benchmark", {
  output: output[0]?.map((c) => converter.hex(c)),
  length: output[0]?.length,
});
