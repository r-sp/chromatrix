import { createHarmony, randomColor, randomMode } from "@repo/color/fn";
import type { ColorFormat } from "@repo/color/types";
import { createToken } from "../utils";

const token = createToken();
const mode = randomMode(token);
const input = randomColor(mode, token);
const output: {
  name: string;
  ratio: ColorFormat<typeof mode>[];
}[][] = [];

console.time("benchmark");

for (let i = 0; i < 1000; i++) {
  output.push(
    createHarmony(input, [
      { name: "Complementary", ratio: [0, 180] },
      { name: "Analogous", ratio: [-30, 0, 30] },
      { name: "Triadic", ratio: [0, 120, 240] },
      { name: "Adjacent", ratio: [0, 150, 210] },
      { name: "Tetradic", ratio: [0, 90, 180, 270] },
      { name: "Rectangle", ratio: [0, 60, 180, 240] },
    ]),
  );
}

console.timeLog("benchmark", {
  from: input,
  to: output[0]?.[0]?.ratio,
});
