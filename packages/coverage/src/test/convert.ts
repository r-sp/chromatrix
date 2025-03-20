import { convertColor } from "@repo/color/fn";
import type { ColorFormat } from "@repo/color/types";

const input: ColorFormat<"rgb"> = ["rgb", 0, 0, 0];

console.time("benchmark");

const output = convertColor(input, "lch");

console.timeLog("benchmark", output);
