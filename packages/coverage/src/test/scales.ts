import { createScales, randomColor, rgbToHex } from "@repo/color/fn";
import type { ColorFormat } from "@repo/color/types";
import { nearest } from "@repo/color/utils";
import { createToken } from "../utils";

const token = createToken();
const input = rgbToHex(nearest(randomColor("rgb", token)));
const output: ColorFormat<"rgb">[][] = [];

console.time("benchmark");

for (let i = 0; i < 1000; i++) {
  output.push(createScales(["#ffffff", input, "#000000"], 11));
}

console.timeLog("benchmark", {
  output: output[0]?.map((c) => rgbToHex(c)),
  length: output[0]?.length,
});
