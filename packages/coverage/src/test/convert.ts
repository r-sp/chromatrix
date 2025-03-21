import { convertColor, createPRNG, randomColor } from "@repo/color/fn";
import { nearest } from "@repo/color/utils";
import { createToken } from "../utils";

const token = createPRNG(createToken());
const input = randomColor("oklab", token);
const output: ReturnType<typeof randomColor>[] = [];

console.time("benchmark");

for (let i = 0; i < 1000; i++) {
  output.push(convertColor(input, "lab"));
}

console.timeLog("benchmark", {
  from: nearest(input, 3),

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  to: nearest(output[0]!, 3),
});
