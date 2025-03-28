import { testing } from "./utils";

const { random, converter, iteration, round } = testing;

const input = random.color("rgb");
const output: ReturnType<typeof random.color>[] = [];

console.time("benchmark");

for (let i = 0; i < iteration; i++) {
  output.push(converter.color(input, "oklch"));
}

console.timeLog("benchmark", {
  origin: round(input, 3),

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  expect: round(output[0]!, 3),
});
