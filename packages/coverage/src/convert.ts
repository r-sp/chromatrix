import { testing } from "./utils";

const { random, converter, iteration, round } = testing;

const [input, target] = random.conversion();
const output: ReturnType<typeof random.color>[] = [];

console.time("benchmark");

for (let i = 0; i < iteration; i++) {
  output.push(converter.color(input, target));
}

console.timeLog("benchmark", {
  origin: round(input, 3),

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  expect: round(output[0]!, 3),
});
