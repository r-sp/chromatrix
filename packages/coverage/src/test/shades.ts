import { createShades, randomColor, rgbToHex } from "@repo/color/fn";
import type { ColorFormat } from "@repo/color/types";
import { nearest } from "@repo/color/utils";
import { createTokens } from "../utils";

const token = createTokens();
const startColor = randomColor("rgb", token[0]);
const endColor = randomColor("rgb", token[1]);

const startHex = rgbToHex(nearest(startColor));
const endHex = rgbToHex(nearest(endColor));

const output: ColorFormat<"rgb">[][] = [];

console.time("benchmark");

for (let i = 0; i < 1000; i++) {
  output.push(createShades(startHex, endHex, 6 + i));
}

console.timeLog("benchmark", {
  output: output[0]?.map((c) => rgbToHex(c)),
  length: output[0]?.length,
});
