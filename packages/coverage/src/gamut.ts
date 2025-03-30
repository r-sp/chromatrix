import { testing } from "./utils";

const { random, converter, iteration } = testing;

const input = random.range(-123, 321);
const output: ReturnType<typeof converter.gamut>[] = [];

console.time("benchmark");

for (let i = 0; i < iteration; i++) {
  output.push(converter.gamut(input));
}

console.timeLog("benchmark", {
  origin: input,
  expect: output[0],
});
